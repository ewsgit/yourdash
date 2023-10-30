/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashUser from "backend/src/core/user/index.js";
import { YourDashCoreUserPermissions } from "backend/src/core/user/permissions.js";
import globalDatabase from "backend/src/helpers/globalDatabase.js";
import path from "path";
import Module, { YourDashModuleArguments } from "backend/src/core/module.js";

export default class GlobalDbModule extends Module {
  constructor( args: YourDashModuleArguments ) {
    super( args );
    this.API.request.get( "/app/global_db/db", async ( req, res ) => {
      const { username } = req.headers as {
        username: string
      };
      
      const user = new YourDashUser( username );
      
      if ( await user.hasPermission( YourDashCoreUserPermissions.Administrator ) ) {
        return res.json( {
          db: globalDatabase.keys
        } );
      }
      
      return res.json( {
        error: true
      } );
    } );
    
    this.API.request.post( "/app/global_db/db", async ( req, res ) => {
      const { username } = req.headers as {
        username: string
      };
      
      const keys = req.body;
      
      const user = new YourDashUser( username );
      
      if ( await user.hasPermission( YourDashCoreUserPermissions.Administrator ) ) {
        globalDatabase.merge( keys );
        
        return res.json( {
          success: true
        } );
      }
      
      return res.json( { error: true } );
    } );
    
    this.API.request.post( "/app/global_db/db/force-write", async ( req, res ) => {
      const { username } = req.headers as {
        username: string
      };
      
      const keys = req.body;
      
      const user = new YourDashUser( username );
      
      if ( await user.hasPermission( YourDashCoreUserPermissions.Administrator ) ) {
        globalDatabase.merge( keys );
        await globalDatabase.writeToDisk( path.resolve( process.cwd(), "./fs/globalDatabase.json" ) );
        
        return res.json( {
          success: true
        } );
      }
      
      return res.json( { error: true } );
    } );
  }
}
