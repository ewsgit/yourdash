/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";
import log, { LOG_TYPES } from "./log.js";
import { FS_DIRECTORY_PATH } from "./../main.js";

export function generateLogos() {
  sharp(
    fs.readFileSync( path.join( FS_DIRECTORY_PATH, "./instance_logo.avif" ) ) )
    .resize( 31, 31 )
    .toFile( path.join( FS_DIRECTORY_PATH, "./logo_panel_small.avif" ) )
    .catch( err => {
      log( LOG_TYPES.ERROR, `unable to create "fs/logo_panel_small.avif" ${ err }` );
    } );
  
  sharp(
    fs.readFileSync( path.join( FS_DIRECTORY_PATH, "./instance_logo.avif" ) ) )
    .resize( 39, 39 )
    .toFile( path.join( FS_DIRECTORY_PATH, "./logo_panel_medium.avif" ) )
    .catch( err => {
      log( LOG_TYPES.ERROR, `unable to create "fs/logo_panel_medium.avif" ${ err }` );
    } );
  
  sharp(
    fs.readFileSync( path.join( FS_DIRECTORY_PATH, "./instance_logo.avif" ) ) )
    .resize( 55, 55 )
    .toFile( path.join( FS_DIRECTORY_PATH, "./logo_panel_large.avif" ) )
    .catch( err => {
      log( LOG_TYPES.ERROR, `unable to create "fs/logo_panel_large.avif" ${ err }` );
    } );
}

export function getInstanceLogoBase64(): string {
  return fs.readFileSync( path.join( FS_DIRECTORY_PATH, "./instance_logo.avif" ) ).toString( "base64" );
}
