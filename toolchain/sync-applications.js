import fs from "fs"
import path from "node:path"

console.log(`Syncing applications!`)

function sync() {
    let apps = fs.readdirSync(path.resolve(`./apps/`))

    apps.forEach(app => {
        if (!fs.existsSync(path.resolve(`./apps/${app}/client`))) return console.error(`Application ${app} requires a ./client/ directory`)

        if (!fs.existsSync(path.resolve(`./apps/${app}/server`))) return console.error(`Application ${app} requires a ./server/ directory`)

        if (!fs.existsSync(path.resolve(`./apps/${app}/client/src`))) return console.error(`Application ${app} requires a ./client/src/ directory`)

        if (!fs.existsSync(path.resolve(`./apps/${app}/server/src`))) return console.error(`Application ${app} requires a ./server/src/ directory`)

        if (!fs.existsSync(path.resolve(`./apps/${app}/application.json`))) return console.error(`Application ${app} requires an application.json in it's root dir`)

        if (!fs.existsSync(path.resolve(`./client/src/app/apps/${app}`))) fs.mkdirSync(path.resolve(`./client/src/app/apps/${app}`), {recursive: true})

        if (!fs.existsSync(path.resolve(`./server/apps/${app}`))) fs.mkdirSync(path.resolve(`./server/apps/${app}`), {recursive: true})

        if (!fs.existsSync(path.resolve(`./apps/${app}/client/node_modules`))) fs.symlinkSync(path.resolve(`./client/node_modules`), path.resolve(`./apps/${app}/client/node_modules`))

        if (!fs.existsSync(path.resolve(`./apps/${app}/server/node_modules`))) fs.symlinkSync(path.resolve(`./server/node_modules`), path.resolve(`./apps/${app}/server/node_modules`))

        if (!fs.existsSync(path.resolve(`./apps/${app}/client/tsconfig.json`))) fs.symlinkSync(path.resolve(`./client/tsconfig.json`), path.resolve(`./apps/${app}/client/tsconfig.json`))

        if (!fs.existsSync(path.resolve(`./apps/${app}/server/tsconfig.json`))) fs.symlinkSync(path.resolve(`./server/tsconfig.json`), path.resolve(`./apps/${app}/server/tsconfig.json`))

        if (!fs.existsSync(path.resolve(`./apps/${app}/client/package.json`))) fs.symlinkSync(path.resolve(`./client/package.json`), path.resolve(`./apps/${app}/client/package.json`))

        if (!fs.existsSync(path.resolve(`./apps/${app}/server/package.json`))) fs.symlinkSync(path.resolve(`./server/package.json`), path.resolve(`./apps/${app}/server/package.json`))

        try {
            fs.cpSync(path.resolve(`./apps/${app}/client/src/`), path.resolve(`./client/src/app/apps/${app}`), {
                recursive: true, verbatimSymlinks: true
            })
        } catch (e) {
            console.error(e)
        }
        try {
            fs.cpSync(path.resolve(`./apps/${app}/server/src/`), path.resolve(`./server/apps/${app}`), {
                recursive: true, verbatimSymlinks: true
            })
        } catch (e) {
            console.error(e)
        }
        try {
            fs.copyFileSync(path.resolve(`./apps/${app}/application.json`), path.resolve(`./server/apps/${app}/application.json`))
        } catch (e) {
            console.error(e)
        }
    })
    try {
        fs.writeFileSync(path.resolve(`./client/src/app/ApplicationIndex.tsx`), `/*DO NOT EDIT THIS FILE, THIS FILE IS AUTO-GENERATED BY "sync-applications.js" IN THE TOOLCHAIN FOLDER*/import React from "react";import { Route, Routes } from "react-router";${apps.map(app => `import Application${app} from "./apps/${app}/index";`)}const ApplicationIndex: React.FC = () => {return <Routes>${apps.map(app => `<Route path={'${app}/*'} element={<Application${app}/>}/>`)}</Routes>};export default ApplicationIndex`)
    } catch (e) {
        console.error(e)
    }
}

sync()
