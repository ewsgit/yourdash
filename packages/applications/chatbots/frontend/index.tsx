/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import NodesView from "@yourdash/uikit/views/nodes/NodesView";
import ComingSoon from "@yourdash/web-client/src/ComingSoon";
import generateUUID from "@yourdash/web-client/src/helpers/uuid";
import React from "react";
import { Routes, Route } from "react-router";
import ChatbotsApplication from "./chatbotsApplication";
import CreateBotPage from "./views/bot/views/create/CreateBotPage";

const DiffusionLabRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ChatbotsApplication />} />
      <Route path={"create-bot"} element={<CreateBotPage />} />
      <Route path={"manage"}>
        <Route path={":uuid"}>
          <Route index element={<ComingSoon />} />
          <Route path={"nodes"}>
            <Route
              index
              element={
                <NodesView
                  nodes={{
                    "number-variable": {
                      displayName: "Number",
                      outputs: {
                        value: "number",
                      },
                      exec: (inputs) => {
                        return inputs;
                      },
                    },
                    "log-to-console": {
                      displayName: "Console Log",
                      inputs: {
                        value: "string",
                      },
                      exec: (inputs) => {
                        console.log(inputs?.value);
                        return inputs;
                      },
                    },
                  }}
                  nodesData={[
                    {
                      id: generateUUID(),
                      type: "number-variable",
                      content: "Number Node",
                      inputs: {},
                      outputs: {
                        value: "number",
                      },
                      position: {
                        x: 12,
                        y: 60,
                      },
                    },
                    {
                      id: generateUUID(),
                      type: "number-variable",
                      content: "Number Node",
                      inputs: {},
                      outputs: {
                        value: "number",
                      },
                      position: {
                        x: 12,
                        y: 60,
                      },
                    },
                    {
                      id: generateUUID(),
                      type: "log-to-console",
                      content: "Console Log",
                      inputs: {
                        value: "john doe",
                      },
                      outputs: {},
                      position: {
                        x: 12,
                        y: 60,
                      },
                    },
                  ]}
                />
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default DiffusionLabRouter;
