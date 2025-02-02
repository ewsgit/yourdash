/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import toAuthImgUrl from "@yourdash/tunnel/src/getAuthImage.js";
import tun from "@yourdash/tunnel/src/index.js";
import useResource from "@yourdash/tunnel/src/useResource.js";
import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKIcon from "@yourdash/uikit/src/components/icon/UKIcon.js";
import UKImage from "@yourdash/uikit/src/components/image/UKImage.js";
import UKSeparator from "@yourdash/uikit/src/components/separator/UKSeparator.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";
import { z } from "zod";
import styles from "./manageWallpaper.module.scss";
import React from "react";

const ManageWallpaper: React.FC = () => {
  const currentWallpaper = useResource(
    () => tun.get("/uk-ewsgit-settings/current/wallpaper", "json", z.object({ thumbnail: z.string() })),
    { return: "data" },
  );

  return (
    <UKCard>
      <UKHeading
        level={2}
        className={styles.heading}
        text={"Manage Wallpaper"}
      />
      <UKSeparator direction={"column"} />
      {currentWallpaper ? (
        <UKImage
          width={480}
          src={toAuthImgUrl(currentWallpaper.thumbnail)}
          accessibleLabel={"current wallpaper"}
          className={styles.currentWallpaper}
        />
      ) : (
        <div>no current wallpaper</div>
      )}
      <UKSeparator direction={"column"} />
      <div className={styles.previousWallpapers}>
        <UKCard className={styles.newWallpaperButton}>
          <UKIcon
            className={styles.icon}
            icon={UKIcons.Plus}
          />
          <UKText text={"Add new wallpaper"} />
        </UKCard>
      </div>
    </UKCard>
  );
};

export default ManageWallpaper;
