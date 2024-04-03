/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary.js";
import { SoloComponent } from "../../core/component/soloComponent.js";
import DivElement from "../../html/divElement.js";
import styles from "./icon.module.scss";

export default class Icon extends SoloComponent {
  icon: UKIcon = UKIcon.Alert;

  constructor() {
    super();

    this.htmlElement = new DivElement();
    this.htmlElement.addClass(styles.component);

    return this;
  }

  setIcon(icon: UKIcon) {
    this.htmlElement.setStyleVariable("--icon", `url(${icon})`);

    return this;
  }

  setPreserveColor(preserve: boolean) {
    if (preserve) {
      this.htmlElement.addClass(styles.preserveColor);
    } else {
      this.htmlElement.removeClass(styles.preserveColor);
    }

    return this;
  }

  setColor(color: string) {
    this.htmlElement.setStyleVariable("--color", color);
    return this;
  }

  clearColor() {
    this.htmlElement.clearStyleVariable("--color");

    return this;
  }

  setSize(size: string) {
    this.htmlElement.setStyleVariable("--size", size);

    return this;
  }
}
