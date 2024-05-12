/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Image from "@yourdash/uikit/components/image/image.js";
import { FC } from "react";
import styles from "./viewImage.module.scss";

const ViewImage: FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  return (
    <Image
      className={styles.viewImage}
      src={mediaUrl}
      authenticatedImage
      accessibleLabel={""}
    />
  );
};

export default ViewImage;
