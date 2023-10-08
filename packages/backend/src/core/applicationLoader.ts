/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import globalDatabase from "../helpers/globalDatabase.js";
import log, { logType } from "../helpers/log.js";
import { existsSync as fsExistsSync } from "fs";
import chalk from "chalk";
import { type Application as ExpressApplication } from "express";
import YourDashModule from "./yourDashModule.js";
import http, { Server as HttpServer } from "http"

function checkIfApplicationIsValidToLoad( applicationName: string ): boolean {
  // Required
  if ( !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/application.json` ) ) ) {
    log( logType.ERROR,"core", `application ${ applicationName } does not contain an application.json file!` );
    return false;
  }
  
  // Not Required ( use 'placeholder.avif' instead)
  if ( !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/icon.avif` ) ) ) {
    log( logType.WARNING,"core", `application ${ applicationName } does not contain an icon.avif file!` );
  }
  
  // Only required if the application needs a backend
  if ( !fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/backend` ) ) ) {
    return false;
  }
  
  // Only required if the application needs a backend
  return fsExistsSync( path.resolve( process.cwd(), `../applications/${ applicationName }/backend/index.js` ) );
}

export function loadApplication( appName: string, exp: ExpressApplication, httpServer: http.Server ) {
  // check if the application contains a valid backend plugin
  if ( !checkIfApplicationIsValidToLoad( appName ) ) {
    // some applications don't have a backend plugin to load
    // in this case we return as this is not required
    return;
  }

  // import and load all application modules
  import( `applications/${ appName }/backend/index.js` )
    .then( ( mod: { default?: typeof YourDashModule } ) => {
      try {
        log( logType.INFO, "core", `Loading application: ${ appName }` );

        if ( !mod.default ) {
          log(
            logType.ERROR,
            "core",
            `Unable to load ${ appName }! This application does not contain a default export!`
          );
          return;
        }

        try {
          new mod.default( {
            moduleName: appName,
            exp,
            httpServer
          } )
        /* BACKUP: {
          exp: exp, // express Application
          io, // socket.io instance
          pluginFilesystemPath: path.resolve( path.join( process.cwd(), `../applications/${ appName }` ) ),
          APPLICATION_ID: appName
        } */
        } catch ( err ) {
          log( logType.ERROR, "core", `Error during application execution: ${ appName }\n`, err );
          return
        }
        
        log( logType.SUCCESS, "core", `Initialized application: ${ appName }` );
        return
      } catch ( err ) {
        log( logType.ERROR, "core", `Error during application initialization: ${ appName }\n`, err );
        return
      }
    } ).catch( ( err ) => {
      log( logType.ERROR, "core", `Error while loading application: ${ appName }\n`, err );
      return
    } );
}

export default function applicationLoader( exp: ExpressApplication, httpServer: HttpServer ) {
  if ( fsExistsSync( path.resolve( process.cwd(), "../applications/" ) ) ) {
    const apps = globalDatabase.get( "installedApplications" ) || [];
    if ( apps?.length === 0 ) {
      log( logType.WARNING, "core", "No applications were loaded" )
    } else {
      log( logType.INFO, "core", `Loading applications ${apps}` );
    }
    apps.forEach( ( appName: string ) => {
      try {
        loadApplication( appName, exp, httpServer );
      } catch ( e ) {
        log( logType.ERROR, "core", `Unable to load application: ${appName}` )
        console.trace( e )
      }
    } );
  } else {
    log( logType.ERROR, "core", "No applications found!" );
  }
}
