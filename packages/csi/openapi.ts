/**
 * This file is auto-generated by backend/src/core.ts during vite server startup don't edit this file for any reason
*/
type OpenApiApplicationRouteData = {"/":{
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
                    "application/json": null;
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
pathParams: {}},"/test":{
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
                        /** @enum {integer} */
                        status: 0 | 1 | 2;
                        type: string;
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
pathParams: {}},"/ping":{
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
                    "application/json": string;
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
pathParams: {}},"/core/test/self-ping":{
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
                        success: boolean;
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
pathParams: {}},"/login/user/:username/avatar":{
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
                    "application/json": unknown;
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
pathParams: {"username": string}},"/login/user/:username":{
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
                        name: {
                            first: string;
                            last: string;
                        };
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
pathParams: {"username": string}},"/login/is-authenticated":{
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
                        success: boolean;
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
pathParams: {}},"/core/theme/:username":{
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
                    "application/json": unknown | {
                        error: string;
                    } | null;
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
pathParams: {"username": string}},"/login/instance/metadata":{
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
                        title: string;
                        message: string;
                        /** @enum {integer} */
                        loginLayout: 0 | 1 | 2;
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
pathParams: {}},"/login/instance/background":{
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
                    "application/json": unknown;
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
pathParams: {}},"/webdav":{
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
                    "application/json": string;
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
pathParams: {}},"/core/auth-img/:username/:sessionId/:id":{
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
                    "application/json": unknown;
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
pathParams: {"username": string,"sessionId": string,"id": string}},"/core/auth-video/:username/:sessionId/:id":{
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
                    "application/json": unknown;
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
pathParams: {"username": string,"sessionId": string,"id": string}},"/status.php":{
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
                        installed: boolean;
                        maintenance: boolean;
                        needsDbUpgrade: boolean;
                        version: string;
                        versionstring: string;
                        edition: string;
                        productname: string;
                        extendedSupport: boolean;
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
pathParams: {}},"/ocs/v2.php/cloud/capabilities":{
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
                        ocs: {
                            meta: {
                                status: string;
                                statuscode: number;
                                message: string;
                            };
                            data: {
                                version: {
                                    major: number;
                                    minor: number;
                                    micro: number;
                                    string: string;
                                    edition: string;
                                    extendedSupport: boolean;
                                };
                                capabilities: {
                                    bruteforce: {
                                        delay: number;
                                        "allow-listed": boolean;
                                    };
                                    theming: {
                                        name: string;
                                        url: string;
                                        slogan: string;
                                        color: string;
                                        "color-text": string;
                                        "color-element": string;
                                        "color-element-bright": string;
                                        "color-element-dark": string;
                                        logo: string;
                                        background: string;
                                        "background-plain": boolean;
                                        "background-default": boolean;
                                        logoheader: string;
                                        favicon: string;
                                    };
                                };
                            };
                        };
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
pathParams: {}},"/ocs/v1.php/cloud/capabilities":{
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
                        ocs: {
                            meta: {
                                status: string;
                                statuscode: number;
                                message: string;
                            };
                            data: {
                                version: {
                                    major: number;
                                    minor: number;
                                    micro: number;
                                    string: string;
                                    edition: string;
                                    extendedSupport: boolean;
                                };
                                capabilities: {
                                    bruteforce: {
                                        delay: number;
                                        "allow-listed": boolean;
                                    };
                                    theming: {
                                        name: string;
                                        url: string;
                                        slogan: string;
                                        color: string;
                                        "color-text": string;
                                        "color-element": string;
                                        "color-element-bright": string;
                                        "color-element-dark": string;
                                        logo: string;
                                        background: string;
                                        "background-plain": boolean;
                                        "background-default": boolean;
                                        logoheader: string;
                                        favicon: string;
                                    };
                                };
                            };
                        };
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
pathParams: {}},"/ocs/v1.php/cloud/user":{
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
                        ocs: {
                            meta: {
                                status: string;
                                statuscode: number;
                                message: string;
                                totalitems: number;
                                itemsperpage: number;
                            };
                            data: {
                                enabled: boolean;
                                storageLocation: string;
                                id: string;
                                lastLogin: number;
                                backend: string;
                                subadmin: unknown[];
                                quota: {
                                    free: number;
                                    used: number;
                                    total: number;
                                    relative: number;
                                    quota: number;
                                };
                                manager: string;
                                avatarScope: string;
                                email: null;
                                emailScope: string;
                                aditional_mail: string[];
                                aditional_mailScope: string[];
                                displayname: string;
                                "display-name": string;
                                displaynameScope: string;
                                phone: string;
                                phoneScope: string;
                                address: string;
                                addressScope: string;
                                website: string;
                                websiteScope: string;
                                twitter: string;
                                twitterScope: string;
                                fediverse: string;
                                fediverseScope: string;
                                organisation: string;
                                organisationScope: string;
                                role: string;
                                roleScope: string;
                                headline: string;
                                headlineScope: string;
                                biography: string;
                                biographyScope: string;
                                profile_enabled: string;
                                profile_enabledScope: string;
                                groups: string[];
                                language: string;
                                locale: string;
                                notify_email: string | null;
                                backendCapabilities: {
                                    setDisplayName: boolean;
                                    setPassword: boolean;
                                };
                            };
                        };
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
pathParams: {}},"/remote.php/dav/avatars/:username/*":{
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
                    "application/json": unknown;
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
pathParams: {"username": string}},"/remote.php/dav/avatars/:username/:size.png":{
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
                    "application/json": unknown;
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
pathParams: {"username": string,"size.png": string}},"/core/login/notice":{
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
                        author?: string;
                        message?: string;
                        timestamp?: number;
                        display: boolean;
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
pathParams: {}},"/core/hosted-applications/":{
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
pathParams: {}},"/user/sessions":{
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
                        sessions: Record<string, never>;
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
pathParams: {}},"/core/user_db":{
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
                    "application/json": unknown;
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
pathParams: {}},"/core/panel/applications":{
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
                        type: string;
                        url?: string;
                        icon: string;
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
pathParams: {}},"/core/panel/quick-shortcuts":{
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
                        name: string;
                        module: {
                            id: string;
                            moduleType: string;
                        };
                        icon: string;
                        url: string;
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
pathParams: {}},"/core/panel/position":{
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
                        /** @enum {integer} */
                        position: 0 | 1 | 2 | 3;
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
pathParams: {}},"/core/panel/launcher-type":{
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
                        /** @enum {integer} */
                        launcher: 0 | 1;
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
pathParams: {}},"/core/panel/logo":{
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
                        small: string;
                        medium: string;
                        large: string;
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
pathParams: {}},"/core/user/current/avatar/0":{
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
                    "application/json": unknown;
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
pathParams: {}},"/core/user/current/avatar/1":{
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
                    "application/json": unknown;
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
pathParams: {}},"/core/user/current/avatar/2":{
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
                    "application/json": unknown;
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
pathParams: {}},"/core/user/current/avatar/3":{
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
                    "application/json": unknown;
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
pathParams: {}},"/core/user/current/avatar/4":{
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
                    "application/json": unknown;
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
pathParams: {}},"/core/user/current/fullname":{
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
                        first: string;
                        last: string;
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
pathParams: {}},"/core/user/current/teams":{
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
                    "application/json": Record<string, never>;
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
pathParams: {}},"/core/teams/get/current-user":{
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
                    "application/json": Record<string, never>;
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
pathParams: {}},};
      type openapi = OpenApiApplicationRouteData;
      export default openapi;
      