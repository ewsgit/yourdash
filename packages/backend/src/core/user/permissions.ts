/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export enum YourDashCoreUserPermissions {
  WriteFiles,
  ReadFiles,
  DeleteFiles,
  Administrator
}

type yourDashUserPermission = YourDashCoreUserPermissions | string;

export type { yourDashUserPermission }