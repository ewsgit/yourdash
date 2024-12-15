/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Log from "./log.js";
import RequestManager from "./requestManager.js";
import dotenv from "dotenv";

dotenv.config();

class Instance {
  flags: {
    isDebugmode: boolean;
    logQueryParameters: boolean;
    logOptionsRequests: boolean;
    isDevmode: boolean;
    port: number;
    postgresPassword: string;
    postgresPort: number;
    postgresUser: string;
  };
  log: Log;
  requestManager: RequestManager;

  constructor() {
    // FLAGS FOR DEVELOPMENT FEATURES
    this.flags = {
      isDebugmode: process.env.IS_DEBUGMODE === "true" || false,
      logOptionsRequests: process.env.LOG_OPTIONS_REQUESTS === "true" || false,
      logQueryParameters: process.env.LOG_QUERY_PARAMETERS === "true" || false,
      isDevmode: process.env.IS_DEVMODE === "true" || false,
      port: Number(process.env.PORT) || 3563,
      postgresPassword: process.env.POSTGRES_PASSWORD || "",
      postgresPort: Number(process.env.POSTGRES_PORT) || 5432,
      postgresUser: process.env.POSTGRES_USER || "",
    };

    this.log = new Log(this);
    this.requestManager = new RequestManager(this);
  }

  startup() {
    this.log.info("startup", "YourDash Instance Startup Complete");
  }
}

export { type Instance };

const instance = new Instance();

export default instance;

/*
 *https://fastify-vite.dev/guide/getting-started
 *https://github.com/fastify/fastify-schedule
 *https://github.com/fastify/session
 *https://github.com/fastify/fastify-websocket
 *https://github.com/turkerdev/fastify-type-provider-zod
 *https://github.com/fastify/fastify-cors
 *https://github.com/fastify/fastify-cookie
 *https://github.com/fastify/fastify-express
 *https://node-postgres.com/
 *https://github.com/fastify/fastify-auth
 *https://fastify.dev/docs/latest/Reference/Hooks/#hooks
 *http://localhost:3563/swagger
 */
