import { promises as fs } from "fs"
import path from "path"

let fileTemplate =
  `//
// This file is auto-generated by meta/generateApplicationRoutes.js don't edit this file for any reason
//

import loadable from "@loadable/component"
import React from "react"
import { Route, Routes } from "react-router"

/* region loadable */
const AppRouter = () => {
  return (
    <Routes>
      {/* region routes */}
    </Routes>
  )
}

export default AppRouter
`

const applicationsPathNames = await fs.readdir( path.resolve( process.cwd(), "./electron/app/apps" ) )

let loadableRegionReplacement = ""
let routeRegionReplacement = ""
applicationsPathNames.forEach( ( app, ind ) => {
  loadableRegionReplacement += `const Application${ind} = loadable( () => {
  return import( "./apps/${app}" )
} )
`
  if ( ind === 0 ) {
    routeRegionReplacement += `<Route path={ "${applicationsPathNames[ind]}/*" } element={ <Application${ind}/> }/>`
  } else {
    routeRegionReplacement += `
      <Route path={ "${applicationsPathNames[ind]}/*" } element={ <Application${ind}/> }/>`
  }
} )

fileTemplate = fileTemplate.replace( "/* region loadable */", loadableRegionReplacement )
fileTemplate = fileTemplate.replace( "{/* region routes */}", routeRegionReplacement )

fs.writeFile( path.resolve( process.cwd(), "./electron/app/AppRouter.tsx" ), fileTemplate )
