import chalk from "chalk";
import fs from "fs";
import path from "path";
import { decrypt, encrypt, generateRandomStringOfLength } from "../../encryption.js";
import { ENV } from "../../index.js";
import { type YourDashModule } from "../../module.js";
import { type YourDashUser } from "types/core/user.js";
import { log } from "../../libServer.js";
import { type CurrentUser } from "types/userManagement/currentUser.js";
import User from "../../helpers/user.js";

const USER_CACHE: { [key: string]: string } = {};

const Module: YourDashModule = {
    load(request, moduleApi) {
        request.legacy().use((req, res, next) => {
            if (req.path.startsWith("/test")) return res.send("YourDash instance");
            if (req.path.startsWith(`/api/userManagement/login`)) return next();
            if (req.path.startsWith(`/api/core/instance/login`)) return next();
            if (req.headers.username) {
                const userName = req.headers.username as string;
                const sessionToken = req.headers.sessiontoken as string;
                if (USER_CACHE[userName]) {
                    if (USER_CACHE[userName] === sessionToken) {
                        next();
                    } else {
                        process.stdout.write(
                            `${chalk.black(chalk.bgYellow("Cached data was used!"))} ${chalk.bgRed(" Unauthorized ")}`
                        );
                        return res.json({ error: true });
                    }
                } else {
                    fs.readFile(path.resolve(`${ENV.FsOrigin}/data/users/${userName}/keys.json`), (err, data) => {
                        if (err) return res.json({ error: true });
                        const sessionKey = JSON.parse(data.toString()).sessionToken;
                        if (sessionKey === sessionToken) {
                            USER_CACHE[userName] = sessionKey;
                            next();
                        } else {
                            process.stdout.write(chalk.bgRed(" Unauthorized "));
                            return res.json({ error: true });
                        }
                    });
                }
            } else {
                return res.json({ error: true });
            }
        });

        request.post(`/create/:username`, (req, res) => {
            const { username } = req.params;
            const password = req.headers.password as string;
            const { name } = req.headers;

            if (!password) return res.json({ error: true });

            if (fs.existsSync(path.resolve(`${ENV.FsOrigin}/data/users/${username}`))) return res.sendStatus(403);

            fs.mkdir(`${moduleApi.FsOrigin}/data/users/${username}/profile`, { recursive: true }, (err) => {
                if (err) return res.json({ error: true });

                fs.writeFileSync(
                    `${moduleApi.FsOrigin}/data/users/admin/profile/picture.png`,
                    fs.readFileSync(path.resolve(`${moduleApi.FsOrigin}/../default_user_profile.png`))
                );

                fs.writeFile(
                    `${ENV.FsOrigin}/data/users/${username}/user.json`,
                    JSON.stringify({
                        name: {
                            first: name,
                            last: "",
                        },
                        permissions: [],
                        profile: {
                            banner: "",
                            description: "",
                            externalLinks: {
                                custom: {
                                    public: false,
                                    value: "",
                                },
                                facebook: {
                                    public: false,
                                    value: "",
                                },
                                git: {
                                    org: [],
                                    personal: {
                                        public: false,
                                        value: "",
                                    },
                                },
                                instagram: {
                                    public: false,
                                    value: "",
                                },
                                mastodon: {
                                    public: false,
                                    value: "",
                                },
                                tiktok: {
                                    public: false,
                                    value: "",
                                },
                                twitter: {
                                    public: false,
                                    value: "",
                                },
                                youtube: {
                                    public: false,
                                    value: "",
                                },
                            },
                            image: "",
                            location: {
                                public: false,
                                value: "",
                            },
                            status: "",
                        },
                        quota: 0,
                        userName: username,
                        version: "1",
                    } as YourDashUser),
                    (err) => {
                        if (err) return res.sendStatus(500);
                        fs.writeFile(
                            `${ENV.FsOrigin}/data/users/${username}/keys.json`,
                            JSON.stringify({ hashedKey: encrypt(password, moduleApi.SERVER_CONFIG) }),
                            (err) => {
                                if (err) return res.sendStatus(500);
                            }
                        );
                    }
                );
            });
        });

        request.get(`/login`, (req, res) => {
            const username = req.headers.username as string;
            const password = req.headers.password as string;

            // check that the username and password was supplied
            if (!(username && password)) {
                res.json({ error: `A username or password was not provided!` });
                return log(`ERROR a username or password was not provided in the headers for /user/login!`);
            }

            // check that the user actually exists
            if (!fs.existsSync(`${ENV.UserFs(req)}`)) {
                res.json({ error: `Unknown user` });
                return log(`ERROR unknown user: ${username}`);
            }

            // fetch the user's password from the fs
            fs.readFile(`${ENV.UserFs(req)}/keys.json`, (err, data) => {
                if (err) {
                    res.json({ error: `An issue occurred reading saved user data.` });
                    return log(`ERROR an error occurred reading ${username}'s keys.json`);
                }
                const keysJson = JSON.parse(data.toString());

                // check if the password is correct
                if (password === decrypt(keysJson.hashedKey, moduleApi.SERVER_CONFIG)) {
                    const newSessionToken = generateRandomStringOfLength(256);

                    // write the user's new session token
                    fs.writeFile(
                        `${ENV.UserFs(req)}/keys.json`,
                        JSON.stringify({
                            hashedKey: keysJson.hashedKey,
                            sessionToken: newSessionToken,
                        }),
                        (err) => {
                            if (err) {
                                res.json({ error: `There was an issue with starting a new session.` });
                                return log(
                                    `ERROR ${username}'s keys.json could not be overwritten during the login process!`
                                );
                            }

                            // the password was correct and the user is now authenticated successfully!
                            res.json({
                                error: false,
                                sessionToken: newSessionToken,
                            });
                            USER_CACHE[username] = newSessionToken;
                        }
                    );
                }
            });
        });

        request.get(`/current/user`, (req, res) => {
            if (!fs.existsSync(`${ENV.UserFs(req)}`)) {
                log(`ERROR: no user directory for ${req.headers.username}`);
                return res.json({ error: true });
            }
            fs.readFile(`${ENV.UserFs(req)}/user.json`, (err, data) => {
                if (err) {
                    log(`ERROR: unable to read ${req.headers.username}/user.json`);
                    return res.json({ error: true });
                }
                const user: YourDashUser = JSON.parse(data.toString());
                return res.send({
                    name: user.name,
                    userName: user.userName,
                } as CurrentUser);
            });
        });

        request.get(`/current/user/profile`, (req, res) => {
            if (!fs.existsSync(`${ENV.UserFs(req)}`)) {
                log(`ERROR: no user directory for ${req.headers.username}`);
                return res.json({ error: true });
            }
            fs.readFile(`${ENV.UserFs(req)}/user.json`, (err, data) => {
                if (err) {
                    log(`ERROR: unable to read ${req.headers.username}/user.json`);
                    return res.json({ error: true });
                }
                const user: YourDashUser = JSON.parse(data.toString());
                return res.json({ profile: user.profile });
            });
        });

        request.get(`/current/user/permissions`, (req, res) => {
            if (!fs.existsSync(`${ENV.UserFs(req)}`)) {
                log(`ERROR: no user directory for ${req.headers.username}`);
                return res.json({ error: true });
            }
            return res.json(new User(req.headers.username as string).getPermissions() || []);
        });
    },
    requiredModules: [],
    configuration: {},
    install: () => {
        return 0;
    },
    unload: () => {
        return 0;
    },
    uninstall: () => {
        return 0;
    },
};

export default Module;
