/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, ParentProps } from "solid-js";
import styles from "./flex.module.scss";

const Flex: Component<ParentProps & { direction: "row" | "column"; extraClass?: string }> = ({
  direction,
  children,
  extraClass,
}) => {
  return <div class={`${styles.component} ${styles[direction]} ${extraClass}`}>{children}</div>;
};

export default Flex;
