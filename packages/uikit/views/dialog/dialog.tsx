/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import Card from "../../components/card/card.tsx";
import styles from "./dialog.module.scss";

const Dialog: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  return <Card containerClassName={styles.view}>{children}</Card>;
};

export default Dialog;
