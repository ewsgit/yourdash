/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKBox from "@yourdash/uikit/src/components/box/UKBox.js";
import styles from "./Panel.module.scss";
import React, { memo, useEffect, useState } from "react";
import loadable from "@loadable/component";
import tun from "@yourdash/tunnel/src";
import { z } from "zod";

const Panel: React.FC<{
  side: "top" | "right" | "bottom" | "left";
  setLayoutReloadNumber: (num: number) => void;
}> = ({ side, setLayoutReloadNumber }) => {
  const [widgets, setWidgets] = useState<string[]>([
    "InstanceLogo",
    "ApplicationLauncher",
    "Separator",
    "QuickShortcuts",
    "LocalhostIndicator",
    "UserProfile",
  ]);
  const [panelSize, setPanelSize] = useState<"small" | "medium" | "large">("medium");
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let req = await tun.get(
        "/core/panel",
        "json",
        z.object({
          widgets: z.string().array(),
          size: z.enum(["small", "medium", "large"]),
        }),
      );

      if (!req.data) return;

      setPanelSize(req.data.size);
      setWidgets(req.data.widgets);
    })();
  }, [num]);

  // @ts-ignore
  window.__yourdashCorePanelReload = () => {
    setNum(num + 1);
    setLayoutReloadNumber(num + 1);
  };

  if (panelSize === undefined) {
    return <></>;
  }

  return (
    <UKBox
      className={clippy(
        styles.panel,
        side === "top" && styles.top,
        side === "right" && styles.right,
        side === "bottom" && styles.bottom,
        side === "left" && styles.left,
        panelSize === "small" && styles.small,
        panelSize === "medium" && styles.medium,
        panelSize === "large" && styles.large,
      )}
    >
      {widgets.map((widget) => {
        // noinspection LocalVariableNamingConventionJS
        const LoadableWidget = loadable(() => import(`./widgets/${widget}/Widget`));

        return (
          <LoadableWidget
            key={widget}
            side={side}
            panelSize={panelSize}
          />
        );
      })}
    </UKBox>
  );
};

export default memo(Panel, (prevProps, nextProps) => prevProps.side === nextProps.side);
