/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import ChatbotsApplication from "./chatbotsApplication";
import CreateBotPage from "./views/bot/views/create/CreateBotPage";

const DiffusionLabRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ChatbotsApplication />} />
      <Route path={"create-bot"} element={<CreateBotPage />} />
    </Routes>
  );
};

export default DiffusionLabRouter;
