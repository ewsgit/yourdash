/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ChipletIcon } from "@yourdash/chiplet/components/icon/iconDictionary.js";
import toAuthImgUrl from "@yourdash/tunnel/src/getAuthImage.js";
import UKContextMenu from "@yourdash/uikit/src/components/contextMenu/UKContextMenu.js";
import React from "react";
import IPanelApplicationsLauncherFrontendModule from "@yourdash/shared/core/panel/applicationsLauncher/application.ts";
import styles from "./ApplicationList.module.scss";
import { useNavigate } from "react-router";
import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import tun from "@yourdash/tunnel/src";
import { z } from "zod";
import DropdownIconButton from "@yourdash/chiplet/components/dropdownIconButton/dropdownIconButton.tsx";

const ApplicationList: React.FC<{ applications: IPanelApplicationsLauncherFrontendModule[] }> = ({ applications }) => {
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
                    z.object({}),
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
            <UKCard
              className={styles.itemContent}
              onClick={() => {
                switch (application.type) {
                  case "frontend":
                    navigate(application.endpoint!);
                    break;
                  case "externalFrontend":
                    window.location.href = application.url!;
                    break;
                }
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
              <DropdownIconButton
                className={"ml-auto"}
                items={[
                  {
                    label: "Pin To Panel",
                    async onClick() {
                      await tun.post(
                        "/core/panel/quick-shortcuts/create",
                        { id: application.id, moduleType: application.type },
                        "json",
                        z.object({}),
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
                icon={ChipletIcon.ThreeBars}
              />
            </UKCard>
          </UKContextMenu>
        );
      })}
    </section>
  );
};

export default ApplicationList;
