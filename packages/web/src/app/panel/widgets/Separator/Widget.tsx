/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import Separator from "@yourdash/uikit/components/separator/separator.tsx";
import React from "react";
import styles from "./Widget.module.scss";

const SeparatorWidget: React.FC<{ side: "top" | "right" | "bottom" | "left" }> = ({ side }) => {
  return (
    // <div
    //   className={clippy(styles.separator, side === "top" || side === "bottom" ? styles.horizontal : styles.vertical)}
    // ></div>
    <Separator direction={side === "top" || side === "bottom" ? "row" : "column"} />
  );
};

export default SeparatorWidget;
