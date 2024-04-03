/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../htmlElement.js";
import { ComponentType } from "./componentType.js";
import { ContainerComponent } from "./containerComponent.js";
import { ComponentTreeContext } from "./treeContext.js";

export interface BaseComponentInternals {
  componentType: ComponentType;
  debugId: string;
  parentComponent?: ContainerComponent | UKHTMLElement;
  renderCount: number;
  treeContext: ComponentTreeContext;
  treeContextChildOverrides?: ComponentTreeContext;
  isInitialized: boolean;
}
