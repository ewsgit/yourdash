/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import RightClickMenuRootContainer from "./components/rightClickMenu/RightClickMenuRootContainer";
import ToastContextProvider from "./components/toast/ToastContextProvider";

const ChipletRootIntegration: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastContextProvider>
      <RightClickMenuRootContainer>{children}</RightClickMenuRootContainer>
    </ToastContextProvider>
  );
};

export default ChipletRootIntegration;
