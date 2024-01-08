/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BackendModule, { YourDashModuleArguments } from "backend/src/core/moduleManager/backendModule.js";

export default class DiffusionLabModule extends BackendModule {
  constructor( args: YourDashModuleArguments ) {
    super( args );
    this.API.request.get( "/app/diffusion_lab/models", async ( req, res ) => res.json( { models: [ "everything v5", "stable diffusion 2.1", "blueberry mix" ] } )
    )
  }
}
