/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import tun from "@yourdash/tunnel/src/index.js";
import { useNavigate } from "react-router";
import styles from "./Widget.module.scss";
import React, { memo } from "react";

const InstanceLogoWidget: React.FC<{ panelSize: "small" | "medium" | "large" }> = ({ panelSize }) => {
  const navigate = useNavigate();

  const INSTANCE_PANEL_LOGOS = {
    small: "/panel/logo/small",
    medium: "/panel/logo/medium",
    large: "/panel/logo/large",
  };

  return (
    <img
      src={`${tun.baseUrl}${INSTANCE_PANEL_LOGOS[panelSize]}`}
      alt={"Instance logo"}
      draggable={false}
      className={styles.icon}
      onClick={() => {
        navigate("/app/a/uk-ewsgit-dash");
      }}
    />
  );
};

export default memo(InstanceLogoWidget);
