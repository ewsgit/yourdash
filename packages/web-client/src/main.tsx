/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import "animate.css";
import "./tailwindcss.css";
import "./ui/ui.scss";
import "./main.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createHashRouter } from "react-router-dom";
import loadable from "@loadable/component";
import ApplicationRedirectToDash from "./app/ApplicationRedirectToDash.jsx";
import AppLayout from "./app/AppLayout";
import ComingSoon from "./ComingSoon";
import DocsLayout from "./root/docs/Layout";
import ErrorElement from "./ErrorElement";
import ServerLoginPage from "./root/login/Page";
import Index from "./root/index/Index";
import ProjectsIndexPage from "./root/projects/Index";
import RootLayout from "./root/RootLayout";
import UIKitRootIntegration from "./ui/RootIntegration";
import LinkerDesktopClientStartupPage from "./root/linker-desktop-client-startup/Index";

const AppRouter = loadable(() => import("./app/AppRouter"));
const DocsRouter = loadable(() => import("./root/docs/DocsRouter"));
const ProjectsRouter = loadable(() => import("./root/projects/ProjectsRouter"));

function main() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
      <UIKitRootIntegration>
        <RouterProvider
          router={createHashRouter(
            createRoutesFromElements(
              <Route errorElement={<ErrorElement />}>
                <Route path={"/linker-desktop-client-startup"} element={<LinkerDesktopClientStartupPage />} />
                <Route element={<RootLayout />}>
                  <Route index element={<Index />} />
                  <Route path={"/signup"} element={<ComingSoon />} />
                  <Route path={"docs/*"} element={<DocsLayout />}>
                    <Route path={"*"} element={<DocsRouter />} />
                  </Route>
                  <Route path={"projects"} index element={<ProjectsIndexPage />} />
                </Route>
                <Route path={"projects/*"} element={<ProjectsRouter />} />
                <Route path={"project/*"} element={<ProjectsRouter />} />
                <Route path={"proj/*"} element={<ProjectsRouter />} />
                <Route path={"/login"}>
                  <Route index element={<ServerLoginPage />} />
                </Route>
                <Route path={"app"}>
                  <Route element={<AppLayout />}>
                    <Route index element={<ApplicationRedirectToDash />} />
                    <Route path={"a/*"} element={<AppRouter />} />
                  </Route>
                </Route>
              </Route>,
            ),
          )}
        />
      </UIKitRootIntegration>
    </StrictMode>,
  );
}

const element = document.getElementById("root") as HTMLElement;

const loadingElement = document.createElement("h1");

loadingElement.style.display = "flex";
loadingElement.style.width = "100%";
loadingElement.style.height = "100%";
loadingElement.style.justifyContent = "center";
loadingElement.style.alignItems = "center";
loadingElement.innerText = "Loading YourDash...";

element.appendChild(loadingElement);

main();
