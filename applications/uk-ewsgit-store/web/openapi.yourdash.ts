/**
 * This file is auto-generated by backend/src/core.ts during vite server startup don't edit this file for any reason
*/
type OpenApiApplicationRouteData = {"/home/promotedApplications":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Sample description */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        displayName: string;
                        bannerBackground: string;
                        developer: string;
                        icon: string;
                        id: string;
                        tags: string[];
                        description: string;
                    }[];
                };
            };
        };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {}},"/home/applicationCategories":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Sample description */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: string;
                        displayName: string;
                        description: string;
                        moduleCount: number;
                        applicationCount: number;
                        backgroundImage: number;
                    }[];
                };
            };
        };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {}},"/home/category/:categoryId":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Sample description */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        applications: string[];
                        displayName: string;
                    } | {
                        error: string;
                    };
                };
            };
        };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {"categoryId": string}},"/home/application/:applicationId":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Sample description */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        description: string;
                        displayName: string;
                        developer: string;
                        id: string;
                        moduleCount: number;
                    };
                };
            };
        };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {"applicationId": string}},};
      type openapi = OpenApiApplicationRouteData;
      export default openapi;
      