/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

export interface IWidgetGrid {
  widgets: {
    position: { x: number; y: number };
    id: string;
    size: {
      preferred: { width: number; height: number };
      min: { width: number; height: number };
      max: { width: number; height: number };
    };
  }[];
}
