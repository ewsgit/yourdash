/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitReactInterop from "@yourdash/uikit/core/ReactInterop";
import UIKitReactRoot from "@yourdash/uikit/core/ReactRoot";
import Div from "@yourdash/uikit/html/div";
import * as React from "react";

const UIKitDemoApplication: React.FC = () => {
  return (
    <>
      <UIKitReactRoot
        onLoad={(fw) => {
          return fw;
        }}
      />
      <UIKitReactInterop
        onLoad={(root) => {
          const div = new Div();
          root.addChild(div);

          div.setStyle();

          return root;
        }}
      />
    </>
  );
};

export default UIKitDemoApplication;
