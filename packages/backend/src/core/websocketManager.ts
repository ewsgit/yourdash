/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Server as SocketIOServer } from "socket.io"
import * as http from "http";
import coreApi from "./core/coreApi.js";

export class WebsocketManager {
  servers: {
    [ app: string ]: {
      server: SocketIOServer,
      connections: {
        [ socket: string ]: string[],
      }[]
    }
  };
  
  httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  
  constructor( httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> ) {
    this.servers = {};
    this.httpServer = httpServer;
  }
  
  _selfDestruct() {
    Object.keys( this.servers ).map( async appName => {
      if ( ( await this.servers[ appName ].server.fetchSockets() ).length === 0 ) {
        this.servers[ appName ].server.close();
        delete this.servers[ appName ];
        coreApi.log.info( "core:websocket_manager", `${ appName } was closed as it has no clients connected.` );
      } else {
        coreApi.log.info( "core:websocket_manager", `${ appName } is connected with ${ Object.keys( this.servers[ appName ].server.fetchSockets() ).length } clients.` );
      }
    } );
  }
  
  createServer( appName: string ) {
    const server = new SocketIOServer(
      this.httpServer,
      {
        path: `/core/app/${ appName }/`,
        cors: { origin: "*" }
      }
    );
    
    this.servers[ appName ] = {
      server,
      connections: []
    };
    
    coreApi.log.info( "core:websocket_manager", `${ appName } was created.` );
    
    return server;
  }
  
  getServer( appName: string ) {
    return this.servers[ appName ];
  }
  
  closeServer( appName: string ) {
    this.servers[ appName ].server.close();
  }
}
