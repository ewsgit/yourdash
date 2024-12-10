/**
 * This file is auto-generated by backend/src/core.ts during vite server startup don't edit this file for any reason
*/

import loadable from "@loadable/component";
import React from "react";
import { Route, Routes } from "react-router";

const Application0=loadable(()=>import("../../../../applications/uk-ewsgit-files/web/index"));const Application1=loadable(()=>import("../../../../applications/uk-ewsgit-dash/web/index"));const Application2=loadable(()=>import("../../../../applications/uk-ewsgit-photos/web/index"));const Application3=loadable(()=>import("../../../../applications/uk-ewsgit-store/web/index"));const Application4=loadable(()=>import("../../../../applications/uk-ewsgit-weather/web/index"));const Application5=loadable(()=>import("../../../../applications/uk-ewsgit-settings/web/index"));const AppRouter=()=><Routes><Route path={"uk-ewsgit-files-frontend/*"} element={<Application0/>}/><Route path={"uk-ewsgit-dash-frontend/*"} element={<Application1/>}/><Route path={"uk-ewsgit-photos-frontend/*"} element={<Application2/>}/><Route path={"uk-ewsgit-store-frontend/*"} element={<Application3/>}/><Route path={"uk-ewsgit-weather-frontend/*"} element={<Application4/>}/><Route path={"uk-ewsgit-settings-frontend/*"} element={<Application5/>}/></Routes>;export default AppRouter
