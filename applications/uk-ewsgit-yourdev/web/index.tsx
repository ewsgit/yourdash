/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import YourDevApplication from "./YourDevApplication";

const WeatherRouter: React.FC = () => (
  <Routes>
    <Route index element={<YourDevApplication/>}/>
  </Routes>
);

export default WeatherRouter;
