/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import initEngine from "opengfx"
import loadObject from "../../../../runtime/core/object/loadObject.ts";
// @ts-ignore
import BOEING_MODEL from "./../public/boeing/Boeing_787.obj?raw"

// @ts-ignore
const engine = await initEngine( document.body as HTMLDivElement )

await loadObject( BOEING_MODEL, engine.screen, engine )

// engine.setScene( new Scene( { id: "default_scene", objects: [] }, engine.screen ) )
