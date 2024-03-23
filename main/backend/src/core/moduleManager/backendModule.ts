/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Request as ExpressRequest } from "express";
import path from "path";
import coreApi, { CoreApi } from "../coreApi.js";
import { LOG_TYPE } from "../coreApiLog.js";
import YourDashUser from "../user/index.js";

export interface YourDashModuleArguments {
  moduleName: string;
  modulePath: string;
}

export default class BackendModule {
  readonly moduleName: string;
  protected readonly API: {
    websocket: CoreApi["websocketManager"];
    request: CoreApi["request"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(type: LOG_TYPE, ...message: any[]): void;
    getPath(): string;
    applicationName: string;
    moduleName: string;
    getUser(req: ExpressRequest): YourDashUser;
    core: CoreApi;
    path: string;
    modulePath: string;
  };
  public unload?: () => void;

  constructor(args: YourDashModuleArguments) {
    this.moduleName = args.moduleName;
    this.API = {
      websocket: coreApi.websocketManager,
      request: coreApi.request,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      log(type: LOG_TYPE, ...message: any[]) {
        switch (type) {
          case LOG_TYPE.INFO:
            coreApi.log.info(`app:${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.ERROR:
            coreApi.log.error(`app:${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.SUCCESS:
            coreApi.log.success(`app:${this.moduleName}`, ...message);
            return;
          case LOG_TYPE.WARNING:
            coreApi.log.warning(`app:${this.moduleName}`, ...message);
            return;
          default:
            coreApi.log.info(`app:${this.moduleName}`, ...message);
        }
      },
      getPath() {
        return path.resolve(path.join(process.cwd(), "../applications", this.moduleName));
      },
      applicationName: args.moduleName,
      moduleName: args.moduleName,
      getUser(req: ExpressRequest) {
        const username = req.headers.username as string;

        return coreApi.users.get(username);
      },
      core: coreApi,
      path: args.modulePath,
      modulePath: args.modulePath,
    };

    return this;
  }

  loadEndpoints() {}

  loadPreAuthEndpoints() {}
}
