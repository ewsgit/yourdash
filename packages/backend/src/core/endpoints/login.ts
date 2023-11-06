/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashUser from "backend/src/core/core/user/index.js";
import { compareHash } from "backend/src/helpers/encryption.js";
import { createSession } from "backend/src/helpers/session.js";
import { Application as ExpressApplication } from "express";
import { promises as fs } from "fs";
import path from "path";
import coreApi from "../core/coreApi.js";
import { userAvatarSize } from "../core/user/avatarSize.js";
import { YOURDASH_SESSION_TYPE } from "../core/user/session.js";
import { __internalGetSessionsDoNotUseOutsideOfCore } from "../session.js";

export default function defineLoginEndpoints( exp: ExpressApplication ) {
  exp.get( "/core/login/user/:username/avatar", ( req, res ) => {
    const user = new YourDashUser( req.params.username );
    return res.sendFile( user.getAvatar( userAvatarSize.LARGE ) );
  } );

  exp.get( "/core/login/user/:username", async ( req, res ) => {
    const user = new YourDashUser( req.params.username );
    if ( await user.doesExist() ) {
      return res.json( { name: await user.getName() } );
    } else {
      return res.json( { error: "Unknown user" } );
    }
  } );

  exp.post( "/core/login/user/:username/authenticate", async ( req, res ) => {
    const username = req.params.username;
    const password = req.body.password;

    if ( !username || username === "" ) {
      return res.json( { error: "Missing username" } );
    }

    if ( !password || password === "" ) {
      return res.json( { error: "Missing password" } );
    }

    const user = new YourDashUser( username );

    const savedHashedPassword = ( await fs.readFile( path.join( user.path, "core/password.enc" ) ) ).toString();

    return compareHash( savedHashedPassword, password )
      .then( async result => {
        if ( result ) {
          const session = await createSession(
            username,
            req.headers?.type === "desktop"
              ? YOURDASH_SESSION_TYPE.desktop
              : YOURDASH_SESSION_TYPE.web
          );
          return res.json( {
            token: session.sessionToken,
            id: session.id
          } );
        } else {
          return res.json( { error: "Incorrect password" } );
        }
      } )
      .catch( () => {
        return res.json( { error: "Hash comparison failure" } );
      } );
  } );

  exp.get( "/core/login/is-authenticated", async ( req, res ) => {
    const { username, token } = req.headers as { username?: string, token?: string };

    if ( !username || !token )
      return res.json( { error: true } );

    if ( !__internalGetSessionsDoNotUseOutsideOfCore()[username] ) {
      try {
        const user = new YourDashUser( username );

        // FIXME: This appears to be strange behaviour
        //        (update: 2/11/23) [Ewsgit] What is strange?!?!?!
        __internalGetSessionsDoNotUseOutsideOfCore()[username] = ( await user.getAllLoginSessions() ) || [];
      } catch ( _err ) {
        return res.json( { error: true } );
      }
    }

    if ( __internalGetSessionsDoNotUseOutsideOfCore()[username].find( session => session.sessionToken === token ) ) {
      return res.json( { success: true } );
    }
    return res.json( { error: true } );
  } );

  exp.get( "/core/login/instance/metadata", ( req, res ) => {
    return res.json( {
      title: coreApi.globalDb.get( "core:instance:name" ) || "Placeholder name",
      message: coreApi.globalDb.get( "core:instance:message" ) || "Placeholder message. Hey system admin, you should change this!",
    } )
  } )
  
  exp.get( "/core/login/instance/background",( _req, res ) => {
    res.set( "Content-Type", "image/avif" );
    return res.sendFile( path.resolve( process.cwd(),"./fs/login_background.avif" ) );
  } );
}
