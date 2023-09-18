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

import { exec } from "child_process";
import minimist from "minimist";
import chalk from "chalk";

console.log( `-------------------------\n     ${ chalk.whiteBright( "YourDash CLI v0.0.1" ) }     \n-------------------------` );

// eslint-disable-next-line no-magic-numbers
const args = minimist( process.argv.slice( 2 ) );

console.log( `Starting with arguments: ${ JSON.stringify( args ) }` );

if ( !args.dev && args.compile ) {
  const childProcess = exec( "yarn run compile" );
  
  childProcess.stdout.on( "data", ( data: string ) => {
    if ( data.toString() === "$ tsc\n" ) {
      return;
    }
    if ( data.toString() === "\x1Bc" ) {
      return;
    }
    if ( data.toString() === "" ) {
      return;
    }
    
    console.log( `[${ chalk.bold.blue( "TSC" ) }]: ${ data.toString().replaceAll( "\n", "" ).replaceAll( "\x1Bc", "" ).replaceAll( "error", `${ chalk.bold.redBright( "ERROR" ) }` ) }` );
  } );
  
  childProcess.stderr.on( "data", data => {
    if ( data.toString() === "$ tsc\n" ) {
      return;
    }
    if ( data.toString() === "\x1Bc" ) {
      return;
    }
    if ( data.toString() === "" ) {
      return;
    }
    
    console.log( `[${ chalk.bold.blue( "TSC ERROR" ) }]: ${ data.toString().replaceAll( "\n", "" ).replaceAll( "\x1Bc", "" ).replaceAll( "error", `${ chalk.bold.redBright( "ERROR" ) }` ) }` );
  } );
  
  process.on( "exit", () => {
    console.log( `${ chalk.yellow.bold( "CORE" ) }: Server about to exit!` );
    
    if ( childProcess && !childProcess.killed ) {
      console.log( `${ chalk.yellow.bold( "CORE" ) }: Killing child process [ ${ childProcess.pid } ] (${ chalk.bold.blue( "TSC" ) })` );
      childProcess.kill();
    }
  } );
}

function startDevServer() {
  console.log( `[${ chalk.hex( "#fc6f45" ).bold( "DEV" ) }]: starting server \"node ./src/main.js --color=full ${ process.argv.slice(
    2 ).join( " " ) }\"` );
  
  const devProcess = exec( `yarn run compile && nodemon --signal SIGINT${ args.debug
    ? " --inspect-brk"
    : "" } ./src/main.js --color=full ${ process.argv.slice( 2 ).join( " " ) }` );
  
  const compilationProcess = exec( "yarn run compile --watch" );
  
  devProcess.on( "close", code => {
    console.log( `child process exited with code ${ code }, will not auto-restart!` );
  } );
  
  devProcess.stdout.on( "data", data => {
    // remove all messages from nodemon
    if ( data.toString().includes( "[nodemon]" ) ) {
      return;
    }
    
    if ( data.toString().includes( "Shutting down... (restart of core should occur automatically)" ) ) {
      devProcess.on( "close", () => {
        console.log( devProcess.killed );
        if (
          compilationProcess.kill( "SIGTERM" )
        ) {
          startDevServer();
        } else {
          console.log( "Unable to kill child processes" );
        }
      } );
    }
    
    process.stdout.write( data );
  } );
  
  devProcess.stderr.on( "data", data => {
    if ( data.toString().indexOf(
      "warning From Yarn 1.0 onwards, scripts don't require \"--\" for options to be forwarded. In a future version, any explicit \"--\" will be forwarded as-is to the scripts." ) !==
         -1 ) {
      return;
    }
    
    process.stdout.write( data );
  } );
  
  process.stdin.on( "data", chunk => {
    devProcess.stdin.write( chunk );
  } );
  
  process.stdin.on( "end", () => {
    devProcess.stdin.end();
  } );
  
  compilationProcess.on( "close", code => {
    console.log( `compilation process exited with code ${ code }` );
  } );
  
  compilationProcess.stdout.on( "data", data => {
    if ( data.toString().includes( "\x1Bc" ) ) {
      return;
    }
    if ( data.toString() === "\n" ) {
      return;
    }
    
    process.stdout.write( data );
  } );
  
  compilationProcess.stderr.on( "data", data => {
    process.stdout.write( data );
  } );
}

if ( args.dev ) {
  startDevServer();
} else {
  await import( "./main.js" );
}
