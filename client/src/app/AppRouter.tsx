/**
 * This file is auto-generated by meta/generateApplicationRoutes.js don't edit this file for any reason
*/

import loadable from "@loadable/component";
import React from "react";
import {Route, Routes} from "react-router";

const Application0 = loadable(() => import("./apps/code_studio"));
const Application1 = loadable(() => import("./apps/dash"));
const Application2 = loadable(() => import("./apps/diffusion_lab"));
const Application3 = loadable(() => import("./apps/endpoints"));
const Application4 = loadable(() => import("./apps/files"));
const Application5 = loadable(() => import("./apps/global_db"));
const Application6 = loadable(() => import("./apps/photos"));
const Application7 = loadable(() => import("./apps/settings"));
const Application8 = loadable(() => import("./apps/store"));
const Application9 = loadable(() => import("./apps/weather"));

const AppRouter = () => {
  return (
    <Routes>
      <Route path={"code_studio/*"} element={<Application0/>}/>
      <Route path={"dash/*"} element={<Application1/>}/>
      <Route path={"diffusion_lab/*"} element={<Application2/>}/>
      <Route path={"endpoints/*"} element={<Application3/>}/>
      <Route path={"files/*"} element={<Application4/>}/>
      <Route path={"global_db/*"} element={<Application5/>}/>
      <Route path={"photos/*"} element={<Application6/>}/>
      <Route path={"settings/*"} element={<Application7/>}/>
      <Route path={"store/*"} element={<Application8/>}/>
      <Route path={"weather/*"} element={<Application9/>}/>
    </Routes>
  );
};

export default AppRouter
