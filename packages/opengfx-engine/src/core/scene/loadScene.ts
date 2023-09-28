/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default function loadScene( fileData: string ) {
  try {
    const sceneJson = JSON.parse( fileData )
    
    const scene = new Scene()

    scene.load( sceneJson )
    
    return scene
  } catch ( e ) {
    return new Scene()
  }
}
