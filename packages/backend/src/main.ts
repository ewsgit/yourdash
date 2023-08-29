/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// The YourDash project
//  - https://github.com/yourdash-app/yourdash
//  - https://yourdash-app.github.io

import { promises as fs, writeFile } from "fs";
import path from "path";
import * as http from "http";
import cors from "cors";
import express from "express";
import { Server as SocketIoServer, Socket as SocketIoSocket } from "socket.io";
import chalk from "chalk";
import minimist from "minimist";
import { YourDashSessionType } from "shared/core/session.js";
import log, { logTypes, logHistory } from "./helpers/log.js";
import YourDashUnreadUser from "./helpers/user.js";
import globalDatabase from "./helpers/globalDatabase.js";
import killPort from "kill-port";
import startupChecks from "./core/startupChecks.js";
import { __internalGetSessionsDoNotUseOutsideOfCore } from "./core/sessions.js";
import { YourDashServerDiscoveryStatus } from "./core/discovery.js";
import startupTasks from "./core/startupTasks.js";
import defineCorePanelRoutes from "./core/endpoints/panel.js";
import loadApplications from "./core/loadApplications.js";
import startRequestLogger from "./core/requestLogger.js";
import { startAuthenticatedImageHelper } from "./core/authenticatedImage.js";
import defineLoginEndpoints from "./core/endpoints/login.js";
import defineUserDatabaseRoutes, { userDatabases } from "./core/endpoints/userDatabase.js";

/*

  Server Startup steps
  
  1. Fetch arguments
  2. Load the global database
  3. Load authentication service
  4. Begin listening for requests
  5. Start startup services
    - request logger
    - authenticated image
    - user sanitization
    - caching service
  6. Load applications
  7. Load post-startup services
  
*/

// THIS FILE IS A WORK IN PROGRESS

// 1. Fetch arguments
const PROCESS_ARGUMENTS = minimist( process.argv.slice( 2 ) );
export { PROCESS_ARGUMENTS };

// 2. Load the global database
await globalDatabase.readFromDisk( path.resolve( process.cwd(), "./fs/globalDatabase.json" ) );

await startupChecks();
await startupTasks();

const exp = express();
const httpServer = http.createServer( exp );
const io = new SocketIoServer( httpServer );

export interface ISocketActiveSocket {
  id: string,
  token: string,
  socket: SocketIoSocket
}

const activeSockets: {
  [ username: string ]: ISocketActiveSocket[]
} = {};

// save the database before process termination
const handleShutdown = () => {
  log( logTypes.info, "Shutting down... (restart of core should occur automatically)" );
  
  const logOutput = logHistory.map( hist => {
    return `${ hist.type }: ${ hist.message }`;
  } ).join( "\n" );
  
  writeFile( path.resolve( process.cwd(), "./fs/log.log" ), logOutput, () => {
    globalDatabase._internalDoNotUseOnlyIntendedForShutdownSequenceWriteToDisk( path.resolve( process.cwd(), "./fs/globalDatabase.json" ), () => {
      process.kill( process.pid );
    } );
  } );
};

process.on( "SIGINT", handleShutdown );

// Handle socket.io connections
io.on( "connection", ( socket: SocketIoSocket<any, any, any, any> ) => {
  // Check that all required parameters are present
  
  if ( !socket.handshake.query.username || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId ) {
    log( logTypes.error, "[PSA-BACKEND]: Closing connection! Missing required parameters!" );
    
    socket.disconnect( true );
    return;
  }
  
  if ( !activeSockets[socket.handshake.query.username as string] ) {
    activeSockets[socket.handshake.query.username as string] = [];
  }
  
  activeSockets[socket.handshake.query.username as string].push( <ISocketActiveSocket>{
    id: socket.handshake.query.sessionId as string,
    token: socket.handshake.query.sessionToken as string,
    socket
  } );
  
  socket.on( "execute-command-response", ( output: any ) => {
    log( logTypes.info, output );
  } );
  
  socket.on( "disconnect", () => {
    activeSockets[socket.handshake.query.username as string].forEach( () => {
      activeSockets[socket.handshake.query.username as string].filter( sock => sock.id !== socket.id );
    } );
    
    log( logTypes.info, "[PSA-BACKEND]: Closing PSA connection" );
  } );
  
  return;
} );

// handle socket.io session authentication
io.use( async ( socket: SocketIoSocket<any, any, any, any>, next ) => {
  const {
    username,
    sessionToken
  } = socket.handshake.query as {
    username?: string,
    sessionToken?: string
  };
  if ( !username || !sessionToken ) {
    return socket.disconnect();
  }
  if ( !__internalGetSessionsDoNotUseOutsideOfCore()[username] ) {
    try {
      const user = await new YourDashUnreadUser( username ).read();
      __internalGetSessionsDoNotUseOutsideOfCore()[username] = await user.getSessions() || [];
    } catch ( _err ) {
      return socket.disconnect();
    }
  }
  if ( __internalGetSessionsDoNotUseOutsideOfCore()[username].find( session => session.sessionToken === sessionToken ) ) {
    return next();
  }
  return socket.disconnect();
} );

export { io, activeSockets };

if ( PROCESS_ARGUMENTS["log-requests"] ) {
  startRequestLogger( exp, {
    logOptionsRequests: !!PROCESS_ARGUMENTS["log-options-requests"]
  } );
}

exp.use( cors() );
exp.use( express.json( { limit: "50mb" } ) );
exp.use( ( _req, res, next ) => {
  res.removeHeader( "X-Powered-By" );
  next();
} );

process.stdin.on( "data", data => {
  const commandAndArgs = data.toString().replaceAll( "\n", "" ).replaceAll( "\r", "" ).split( " " );
  const command = commandAndArgs[0];
  // const args = commandAndArgs.slice(1);
  
  switch ( command ) {
  case "exit":
    handleShutdown();
    break;
  default:
    log( logTypes.error, `Unknown command: ${ command }` );
  }
} );

exp.get( "/", ( _req, res ) => res.send( "Hello from the yourdash server software" ) );

exp.get( "/test", ( _req, res ) => {
  const discoveryStatus: YourDashServerDiscoveryStatus = YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus;
  
  switch ( discoveryStatus ) {
  case YourDashServerDiscoveryStatus.MAINTENANCE:
    return res.json( {
      status: YourDashServerDiscoveryStatus.MAINTENANCE,
      type: "yourdash"
    } );
  case YourDashServerDiscoveryStatus.NORMAL:
    return res.json( {
      status: YourDashServerDiscoveryStatus.NORMAL,
      type: "yourdash"
    } );
  default:
    log( logTypes.error, "discovery status returned an invalid value" );
    return res.json( {
      status: YourDashServerDiscoveryStatus.MAINTENANCE,
      type: "yourdash"
    } );
  }
} );

startAuthenticatedImageHelper( exp );
defineLoginEndpoints( exp );

// check for authentication
exp.use( async ( req, res, next ) => {
  const {
    username,
    token
  } = req.headers as {
    username?: string,
    token?: string
  };
  
  if ( !username || !token ) {
    return res.json( { error: "authorization fail" } );
  }
  
  if ( !__internalGetSessionsDoNotUseOutsideOfCore()[username] ) {
    try {
      const user = await ( new YourDashUnreadUser( username ).read() );
      
      __internalGetSessionsDoNotUseOutsideOfCore()[username] = ( await user.getSessions() ) || [];
      
      const database = fs.readFile( path.resolve( user.getPath(), "./userdb.json" ) )?.toString()
      
      if ( database ) {
        userDatabases.set( username, JSON.parse( database ) );
      } else {
        userDatabases.set( username, {} );
        fs.writeFile( path.resolve( user.getPath(), "./userdb.json" ), JSON.stringify( {} ) );
      }
    } catch ( _err ) {
      return res.json( { error: "authorization fail" } );
    }
  }
  
  if ( __internalGetSessionsDoNotUseOutsideOfCore()[username].find( session => session.sessionToken === token ) ) {
    return next();
  }
  
  return res.json( { error: "authorization fail" } );
} );

/**
 * --------------------------------------------------------------
 * WARNING: all endpoints require authentication after this point
 * --------------------------------------------------------------
 */

await defineCorePanelRoutes( exp );

exp.get( "/core/sessions", async ( req, res ) => {
  const { username } = req.headers as {
    username: string
  };
  
  const user = await ( new YourDashUnreadUser( username ).read() );
  
  return res.json( { sessions: await user.getSessions() } );
} );

exp.delete( "/core/session/:id", async ( req, res ) => {
  const { username } = req.headers as {
    username: string
  };
  const { id: sessionId } = req.params;
  
  const user = await ( new YourDashUnreadUser( username ).read() );
  
  user.getSession( parseInt( sessionId, 10 ) ).invalidate();
  
  return res.json( { success: true } );
} );

exp.get( "/core/personal-server-accelerator/sessions", async ( req, res ) => {
  const { username } = req.headers as {
    username: string
  };
  
  const user = await ( new YourDashUnreadUser( username ).read() );
  
  return res.json( {
    sessions: ( await user.getSessions() ).filter( session => session.type === YourDashSessionType.desktop )
  } );
} );

exp.get( "/core/personal-server-accelerator/", async ( req, res ) => {
  const { username } = req.headers as {
    username: string
  };
  
  const unreadUser = new YourDashUnreadUser( username );
  
  try {
    return JSON.parse( ( await fs.readFile( path.resolve( unreadUser.getPath(), "personal_server_accelerator.json" ) ) ).toString() );
  } catch ( _err ) {
    return res.json( { error: `Unable to read ${ username }/personal_server_accelerator.json` } );
  }
} );

exp.post( "/core/personal-server-accelerator/", async ( req, res ) => {
  const { username } = req.headers as {
    username: string
  };
  const body = req.body;
  
  const user = new YourDashUnreadUser( username );
  
  try {
    await fs.writeFile( path.resolve( user.getPath(), "personal_server_accelerator.json" ), JSON.stringify( body ) );
  } catch ( _err ) {
    return res.json( { error: `Unable to write to ${ username }/personal_server_accelerator.json` } );
  }
  
  return res.json( { success: true } );
} );

exp.get( "/core/userdb", async ( req, res ) => {
  const { username } = req.headers as {
    username: string
  };
  
  const user = new YourDashUnreadUser( username );
  
  let output: object;
  
  try {
    const fileData = JSON.parse( fs.readFile( path.resolve( user.getPath(), "./userdb.json" ) ).toString() );
    if ( fileData ) {
      output = fileData;
    } else {
      const readUser = await user.read();
      
      output = {
        "user:username": username,
        "user:full_name": readUser.getName()
      };
      
      await fs.writeFile( path.resolve( user.getPath(), "./userdb.json" ), JSON.stringify( output ) );
    }
  } catch ( _err ) {
    const readUser = await user.read();
    
    output = {
      "user:username": username,
      "user:full_name": readUser.getName()
    };
    
    await fs.writeFile( path.resolve( user.getPath(), "./userdb.json" ), JSON.stringify( output ) );
  }
  
  return res.json( output );
} );

// TODO: implement this
exp.post( "/core/userdb", async ( req, res ) => {
  const { username } = req.headers as {
    username: string
  };
  
  const user = new YourDashUnreadUser( username );
  
  let output = {};
  
  try {
    output = JSON.parse( fs.readFile( path.resolve( user.getPath(), "./userdb.json" ) ).toString() );
  } catch ( _err ) {
    output = {};
    fs.writeFile( path.resolve( user.getPath(), "./userdb.json" ), "{}" );
  }
  
  return res.json( output );
} );

defineUserDatabaseRoutes( exp )

loadApplications( exp, io );

/*
 * Start listening for requests
 */
async function listenForRequests() {
  await killPort( 3560 )
  try {
    httpServer.listen( 3560, () => {
      log( logTypes.info, `${ chalk.bold.yellow( "CORE" ) }: -------------------- server now listening on port 3560! --------------------` );
    } );
  } catch ( _err ) {
    log( logTypes.error, `${ chalk.bold.yellow( "CORE" ) }: Unable to start server!, retrying...` );
    
    await listenForRequests();
  }
}

await listenForRequests();


if ( JSON.stringify( globalDatabase.keys ) === JSON.stringify( {} ) ) {
  await fs.rm( path.resolve( process.cwd(), "./fs/globalDatabase.json" ) );
}