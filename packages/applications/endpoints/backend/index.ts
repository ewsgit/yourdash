/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Module, { YourDashModuleArguments } from "backend/src/core/module.js";

export default class EndpointsModule extends Module {
  constructor( args: YourDashModuleArguments ) {
    super( args );
    this.API.request.get( "/app/endpoints/endpoints", ( req, res ) => res.json( this.API.request._router.stack ) )
  }
}
