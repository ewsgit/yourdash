/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import toAuthImgUrl from "@yourdash/tunnel/src/getAuthImage.js";
import tun from "@yourdash/tunnel/src/index.js";
import React from "react";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application.ts";
import { z } from "zod";
import styles from "./SmallApplicationGrid.module.scss";
import { useNavigate } from "react-router";
import UKContextMenu from "@yourdash/uikit/src/components/contextMenu/UKContextMenu";

const SmallApplicationGrid: React.FC<{
  applications: IPanelApplicationsLauncherFrontendModule[];
}> = ({ applications }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.grid}>
      {applications.map((application) => {
        return (
          <UKContextMenu
            items={[
              {
                label: "Pin To Panel",
                async onClick() {
                  await tun.post(
                    "/core/panel/quick-shortcuts/create",
                    { id: application.id, moduleType: application.type },
                    "json",
                    z.object({ success: z.boolean() }),
                  );
                  // @ts-ignore
                  window.__yourdashCorePanelQuickShortcutsReload?.();
                  return 0;
                },
              },
              {
                label: "Open In New Tab",
                onClick() {
                  window.open(`${window.location.origin}${window.location.pathname}/app/a/${application.id}`, "_blank");
                  return 0;
                },
              },
            ]}
            className={styles.item}
            key={application.id}
          >
            <div
              className={styles.itemContent}
              onClick={() => {
                navigate(application.endpoint || application?.url || "");
              }}
            >
              <img
                loading={"lazy"}
                className={styles.itemIcon}
                src={toAuthImgUrl(application.icon)}
                draggable={false}
                alt=""
              />
              <span className={styles.itemLabel}>{application.displayName}</span>
            </div>
          </UKContextMenu>
        );
      })}
    </section>
  );
};

export default SmallApplicationGrid;
