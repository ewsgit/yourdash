/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { OpenApiGeneratorV31, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  Application as ExpressApplication,
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import nodeJsFs from "fs";
import openApiTS, { astToString } from "openapi-typescript/dist/index.js";
import path from "path";
import ts, { SyntaxKind } from "typescript";
import z from "zod";
import timeMethod from "../lib/time.js";
import { Core } from "./core.js";

export type RequestHeaders = { username: string; sessionid: string };
export type RequestExtras = { headers: RequestHeaders; sessionId: string; username: string };

export default class CoreRequest {
  rawExpress: ExpressApplication;
  endpoints: string[];
  openApiRegistry: OpenAPIRegistry;
  private core: Core;
  private currentNamespace: string;

  constructor(core: Core) {
    this.rawExpress = core.rawExpressJs;
    this.core = core;
    this.currentNamespace = "";
    this.endpoints = [];
    this.openApiRegistry = new OpenAPIRegistry();
  }

  setNamespace(namespace: string): this {
    this.currentNamespace = namespace;

    return this;
  }

  async __internal_generateOpenAPIDefinitions() {
    const generator = new OpenApiGeneratorV31(this.openApiRegistry.definitions);

    const documentation = generator.generateDocument({
      openapi: "3.1.0",
      info: {
        version: "1.0.0",
        title: "YourDash Backend API",
        description: "This is the YourDash Backend API for the current YourDash Instance and it's loaded modules",
      },
      servers: [{ url: "http://localhost:3563/" }],
    });

    const jsonDocumentation = JSON.stringify(documentation, null, 2);

    const cwd = process.cwd();

    nodeJsFs.writeFileSync(path.join(cwd, "../csi/", "openapi.json"), jsonDocumentation, { encoding: "utf8" });

    try {
      const contents = await openApiTS(new URL("../../../csi/openapi.json", import.meta.url) as unknown as string);

      let propertySignatures: ts.Node[] = [];

      contents[0].forEachChild((c) => {
        if (c.kind === SyntaxKind.PropertySignature) {
          propertySignatures.push(c);
        }
      });

      let applicationRoutes: { [application: string]: ts.Node[] } = {};
      let coreRoutes: ts.Node[] = [];

      propertySignatures.forEach((c) => {
        let sigPath = astToString(c).split('": {')[0].slice(1);

        if (sigPath.startsWith("/app/")) {
          const applicationName = sigPath.slice(5).split("/")[0];

          if (!applicationRoutes[applicationName]) {
            applicationRoutes[applicationName] = [];
          }

          applicationRoutes[applicationName].push(c);
        } else {
          coreRoutes.push(c);
        }
      });

      Object.keys(applicationRoutes).forEach((application) => {
        let astStrings = `/**
 * This file is auto-generated by backend/src/coreRequest.ts during vite server startup don't edit this file for any reason
*/
type OpenApiApplicationRouteData = {`;

        applicationRoutes[application].forEach((c) => {
          let astString = astToString(c).slice(0, -2) + ",";
          let unmodifiedPathString = astString.split('"')[1].split('"')[0];
          let pathString = astString.split('"')[1].split('"')[0];
          let pathParams: string[] = [];

          pathString = pathString.replace(`/app/${application}/`, "/");

          pathString.split("/").map((segment) => {
            if (segment === undefined) {
              return;
            }

            if (segment.startsWith(":")) {
              pathParams.push(segment.slice(1));
            }
          });

          astString = `"${pathString}":${astString.replace(`"${unmodifiedPathString}": `, "").slice(0, -2)}pathParams: {${pathParams.map(
            (param) => {
              return `"${param}": string`;
            },
          )}}},`;

          astStrings += astString;
        });

        astStrings += `};
      type openapi = OpenApiApplicationRouteData;
      export default openapi;
      `;

        nodeJsFs.writeFileSync(
          path.join(cwd, `../../applications/${application.replace("-backend", "")}/web/openapi.yourdash.ts`),
          astStrings,
        );

        this.core.log.info("core/request", `Created OpenApi definitions for ${application}`);
      });

      let astStrings = `/**
 * This file is auto-generated by backend/src/core.ts during vite server startup don't edit this file for any reason
*/
type OpenApiApplicationRouteData = {`;

      coreRoutes.forEach((c) => {
        let astString = astToString(c).slice(0, -2) + ",";
        let unmodifiedPathString = astString.split('"')[1].split('"')[0];
        let pathString = astString.split('"')[1].split('"')[0];
        let pathParams: string[] = [];

        pathString.split("/").map((segment) => {
          if (segment === undefined) {
            return;
          }

          if (segment.startsWith(":")) {
            pathParams.push(segment.slice(1));
          }
        });

        astString = `"${pathString}":${astString.replace(`"${unmodifiedPathString}": `, "").slice(0, -2)}pathParams: {${pathParams.map(
          (param) => {
            return `"${param}": string`;
          },
        )}}},`;

        astStrings += astString;
      });

      astStrings += `};
      type openapi = OpenApiApplicationRouteData;
      export default openapi;
      `;

      nodeJsFs.writeFileSync(path.join(cwd, "../csi/", "openapi.ts"), astStrings);
    } catch (e) {
      this.core.log.error("request", "Failed to create typescript data for openapi.json \n", e);

      return this;
    }

    return this;
  }

  // async __internal_generateOpenAPIDefinitions() {
  //   const generator = new OpenApiGeneratorV31(this.openApiRegistry.definitions);
  //
  //   const documentation = generator.generateDocument({
  //     openapi: "3.1.0",
  //     info: {
  //       version: "1.0.0",
  //       title: "YourDash Backend API",
  //       description: "This is the YourDash Backend API for the current YourDash Instance and it's loaded modules",
  //     },
  //     servers: [{ url: "http://localhost:3563/" }],
  //   });
  //
  //   const jsonDocumentation = JSON.stringify(documentation, null, 2);
  //
  //   const cwd = process.cwd();
  //
  //   nodeJsFs.writeFileSync(path.join(cwd, "../../", "openapi.json"), jsonDocumentation, { encoding: "utf8" });
  //
  //   try {
  //     const contents = astToString(await openApiTS(path.join(cwd, "../../", "openapi.json").toString()));
  //
  //     nodeJsFs.writeFileSync(path.join(cwd, "../csi/", "openapi.ts"), contents);
  //   } catch (e) {
  //     this.core.log.error("request", "Failed to create typescript data for openapi.json \n", e);
  //
  //     return this;
  //   }
  //
  //   return this;
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<TResBody extends z.ZodTypeAny>(
    path: string | string[],
    resBodyType: TResBody,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<z.infer<TResBody>>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<z.infer<TResBody>, Record<string, any>> | void>,
    description: string = "Sample description",
  ): this {
    let endpointPath: string[];

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      // TODO: add a cli flag to re-enable this
      // if (this.core.isDebugMode) {
      this.core.log.info("request", `Request created: ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`);
      // }

      if (!(resBodyType instanceof z.ZodType)) {
        throw `resBodyType is not a Zod Typing @ ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`;
      }

      this.openApiRegistry.registerPath({
        method: "get",
        path: (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        description: description,
        responses: {
          200: {
            content: {
              "application/json": {
                schema: resBodyType,
              },
            },
            description: description,
          },
        },
      });

      this.rawExpress.get(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        async (req: ExpressRequest, res: ExpressResponse<TResBody>) => {
          try {
            const time = await timeMethod(() =>
              callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res),
            );
            res.setHeader(
              "yourdash-metrics-time-took",
              JSON.stringify({ microsecconds: time.microseconds, formattedMicrosecconds: time.formattedMicrosecconds }),
            );
          } catch (err) {
            if (err instanceof Error) {
              this.core.log.error("request_error", `GET ${req.path}; Request error not caught: ${err.message}`);
            }
          }
        },
      );
    }

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<TReqBody extends z.ZodTypeAny, TResBody extends z.ZodTypeAny>(
    path: string | string[],
    reqBodyType: TReqBody,
    resBodyType: TResBody,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<z.infer<TResBody>>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<z.infer<TResBody>, Record<string, any>> | void>,
    description: string = "Sample description",
  ): this {
    let endpointPath: string[];

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      if (!(resBodyType instanceof z.ZodType)) {
        throw `resBodyType is not a Zod Typing @ ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`;
      }

      if (!(reqBodyType instanceof z.ZodType)) {
        throw `reqBodyType is not a Zod Typing @ ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`;
      }

      this.openApiRegistry.registerPath({
        method: "post",
        path: (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        description: description,
        responses: {
          200: {
            content: {
              "application/json": {
                schema: resBodyType,
              },
            },
            description: description,
          },
          400: {
            content: {
              "application/json": {
                schema: z.object({ error: z.string() }),
              },
            },
            description: "Request error",
          },
        },
      });

      this.rawExpress.post(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path, // @ts-ignore
        async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
          try {
            if (!(await reqBodyType.safeParseAsync(req.body)).success) {
              return res.status(400).json({ error: "Invalid Request Body" });
            }

            await callback(req, res);
          } catch (err) {
            if (err instanceof Error) {
              this.core.log.error(`request_error`, new Error());
              this.core.log.error("request_error", `POST ${req.path}\nRequest error not caught: ${err?.message || ""}`);
            }
          }
        },
      );
    }

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<TReqBody extends z.ZodTypeAny, TResBody extends z.ZodTypeAny>(
    path: string | string[],
    reqBodyType: TReqBody,
    resBodyType: TResBody,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<z.infer<TResBody>>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<z.infer<TResBody>, Record<string, any>> | void>,
    description: string = "Sample description",
  ): this {
    let endpointPath: string[];

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      if (!(resBodyType instanceof z.ZodType)) {
        throw `resBodyType is not a Zod Typing @ ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`;
      }

      if (!(reqBodyType instanceof z.ZodType)) {
        throw `reqBodyType is not a Zod Typing @ ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`;
      }

      this.openApiRegistry.registerPath({
        method: "put",
        path: (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        description: description,
        responses: {
          200: {
            content: {
              "application/json": {
                schema: resBodyType,
              },
            },
            description: description,
          },
          400: {
            content: {
              "application/json": {
                schema: z.object({ error: z.string() }),
              },
            },
            description: "Request error",
          },
        },
      });

      this.rawExpress.put(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path, // @ts-ignore
        async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
          try {
            if (!(await reqBodyType.safeParseAsync(req.body)).success) {
              return res.status(400).json({ error: "Invalid Request Body" });
            }

            await callback(req, res);
          } catch (err) {
            if (err instanceof Error) {
              this.core.log.error(`request_error`, new Error());
              this.core.log.error("request_error", `PUT ${req.path}\nRequest error not caught: ${err?.message || ""}`);
            }
          }
        },
      );
    }

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<TResBody extends z.ZodTypeAny>(
    path: string | string[],
    resBodyType: TResBody,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<z.infer<TResBody>>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<z.infer<TResBody>, Record<string, any>> | void>,
    description: string = "Sample description",
  ): this {
    let endpointPath: string[];

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      // TODO: add a cli flag to re-enable this
      // if (this.core.isDebugMode) {
      // this.core.log.info("request", "Request created: " + this.endpointFromPath(path));
      // }

      if (!(resBodyType instanceof z.ZodType)) {
        throw `resBodyType is not a Zod Typing @ ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`;
      }

      this.openApiRegistry.registerPath({
        method: "delete",
        path: (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        description: description,
        responses: {
          200: {
            content: {
              "application/json": {
                schema: resBodyType,
              },
            },
            description: description,
          },
        },
      });

      this.rawExpress.delete(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        async (req: ExpressRequest, res: ExpressResponse<TResBody>) => {
          try {
            const time = await timeMethod(() =>
              callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res),
            );
            res.setHeader(
              "yourdash-metrics-time-took",
              JSON.stringify({ microsecconds: time.microseconds, formattedMicrosecconds: time.formattedMicrosecconds }),
            );
          } catch (err) {
            if (err instanceof Error) {
              this.core.log.error("request_error", `DELETE ${req.path}; Request error not caught: ${err.message}`);
            }
          }
        },
      );
    }

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch<TReqBody extends z.ZodTypeAny, TResBody extends z.ZodTypeAny>(
    path: string | string[],
    reqBodyType: TReqBody,
    resBodyType: TResBody,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<z.infer<TResBody>>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<z.infer<TResBody>, Record<string, any>> | void>,
    description: string = "Sample description",
  ): this {
    let endpointPath: string[];

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      if (!(resBodyType instanceof z.ZodType)) {
        throw `resBodyType is not a Zod Typing @ ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`;
      }

      if (!(reqBodyType instanceof z.ZodType)) {
        throw `reqBodyType is not a Zod Typing @ ${(this.currentNamespace ? "/" : "") + this.currentNamespace + path}`;
      }

      this.openApiRegistry.registerPath({
        method: "patch",
        path: (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        description: description,
        responses: {
          200: {
            content: {
              "application/json": {
                schema: resBodyType,
              },
            },
            description: description,
          },
          400: {
            content: {
              "application/json": {
                schema: z.object({ error: z.string() }),
              },
            },
            description: "Request error",
          },
        },
      });

      this.rawExpress.patch(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path, // @ts-ignore
        async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
          try {
            if (!(await reqBodyType.safeParseAsync(req.body)).success) {
              return res.status(400).json({ error: "Invalid Request Body" });
            }

            await callback(req, res);
          } catch (err) {
            if (err instanceof Error) {
              this.core.log.error(`request_error`, new Error());
              this.core.log.error("request_error", `PATCH ${req.path}\nRequest error not caught: ${err?.message || ""}`);
            }
          }
        },
      );
    }

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options<TResponse = any>(
    path: string,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<TResponse>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<TResponse, Record<string, any>> | void>,
  ): this {
    this.rawExpress.options(
      (this.currentNamespace ? "/" : "") + this.currentNamespace + path, // @ts-ignore
      async (req: ExpressRequest & RequestExtras, res: ExpressResponse<TResponse>) => {
        try {
          await callback(req, res);
        } catch (err) {
          if (err instanceof Error) {
            this.core.log.error(`request_error`, new Error().stack);
            this.core.log.error("request_error", `OPTIONS ${req.path}; Request error not caught: ${err.message}`);
          }
        }
      },
    );

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propfind<TResponse = unknown>(
    path: string | string[],
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse<TResponse>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ExpressResponse<TResponse, Record<string, any>> | void>,
    options?: { debugTimer: boolean },
  ): this {
    let endpointPath: string[];

    if (typeof path === "string") {
      endpointPath = [path];
    } else {
      endpointPath = path;
    }

    for (const path of endpointPath) {
      // TODO: add a cli flag to re-enable this
      // if (this.core.isDebugMode) {
      // this.core.log.info("request", "Request created: " + this.endpointFromPath(path));
      // }

      if (this.core.processArguments) {
        if (options?.debugTimer) {
          this.rawExpress.propfind(
            (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
            async (req: ExpressRequest, res: ExpressResponse<TResponse>) => {
              try {
                const time = await timeMethod(() =>
                  callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res),
                );

                this.core.log.debug("response_time", `${req.path} took ${time.formattedMicrosecconds}`);
              } catch (err) {
                if (err instanceof Error) {
                  this.core.log.error(`request_error`, new Error().stack);
                  this.core.log.error(
                    "request_error",
                    `PROPFIND ${req.path}; Request error not caught: ${err?.message || "No error message provided"}`,
                  );
                }
              }
            },
          );

          return this;
        }
      }

      this.rawExpress.propfind(
        (this.currentNamespace ? "/" : "") + this.currentNamespace + path,
        async (req: ExpressRequest, res: ExpressResponse<TResponse>) => {
          try {
            await callback({ ...req, sessionId: req.headers.sessionid as string, username: req.headers.username as string } as never, res);
          } catch (err) {
            if (err instanceof Error) {
              this.core.log.error("request_error", `PROPFIND ${req.path}; Request error not caught: ${err.message}`);
            }
          }
        },
      );
    }

    return this;
  }

  use(
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse,
      next: ExpressNextFunction, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>,
  ): this {
    // @ts-ignore
    this.rawExpress.use(async (req: ExpressRequest & RequestExtras, res: ExpressResponse, next: ExpressNextFunction) => {
      try {
        await callback(req, res, next);
      } catch (err) {
        if (err instanceof Error) {
          this.core.log.error(`request_error`, new Error().stack);
          this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
        }
      }
    });

    return this;
  }

  usePath(
    path: string,
    callback: (
      req: ExpressRequest & RequestExtras,
      res: ExpressResponse,
      next: ExpressNextFunction, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>,
  ): this {
    this.rawExpress.use(
      path, // @ts-ignore
      async (req: ExpressRequest & RequestExtras, res: ExpressResponse, next: ExpressNextFunction) => {
        try {
          await callback(req, res, next);
        } catch (err) {
          if (err instanceof Error) {
            this.core.log.error(`request_error`, new Error().stack);
            this.core.log.error("request_error", `${req.path}; Request error not caught: ${err.message}`);
          }
        }
      },
    );

    return this;
  }

  private endpointFromPath(path: string): string {
    return (this.currentNamespace ? "/" : "") + this.currentNamespace + path;
  }
}
