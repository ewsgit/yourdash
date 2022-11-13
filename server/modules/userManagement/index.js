import fs from 'fs';
import { ENV } from '../../index.js';
import path from 'path';
import { decrypt, encrypt, generateRandomStringOfLength } from '../../encryption.js';
import chalk from 'chalk';
let USER_CACHE = {};
const Module = {
    name: 'userManagement',
    id: 'userManagement',
    load(app, _api) {
        app.use((req, res, next) => {
            if (req.path.startsWith('/test'))
                return next();
            if (req.path.startsWith('/api/get/server'))
                return next();
            if (req.path.startsWith('/api/user/login'))
                return next();
            if (req.headers?.username) {
                let userName = req.headers.username;
                let sessionToken = req.headers.sessiontoken;
                if (USER_CACHE[userName]) {
                    if (USER_CACHE[userName] === sessionToken) {
                        next();
                    }
                    else {
                        console.log(chalk.bgRed(' Unauthorized '));
                        return res.sendStatus(401);
                    }
                }
                else {
                    fs.readFile(path.resolve(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`), (err, data) => {
                        if (err)
                            return res.sendStatus(404);
                        let sessionKey = JSON.parse(data.toString()).sessionToken;
                        if (sessionKey === sessionToken) {
                            USER_CACHE[userName] = sessionKey;
                            next();
                        }
                    });
                }
            }
            else {
                res.sendStatus(401);
            }
        });
        app.post('/api/user/create/:username', (req, res) => {
            let { username } = req.params;
            let password = req.headers.password;
            console.log(password);
            if (!password)
                return res.sendStatus(500);
            if (fs.existsSync(path.resolve(`${ENV.FS_ORIGIN}/data/users/${username}`)))
                return res.sendStatus(403);
            fs.mkdir(`${ENV.FS_ORIGIN}/data/users/${username}/`, { recursive: true }, (err) => {
                if (err)
                    return res.sendStatus(500);
                fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/user.json`, JSON.stringify({
                    name: 'name',
                    userName: username,
                    profile: {
                        banner: '',
                        description: '',
                        externalLinks: {
                            git: '',
                            twitter: '',
                            youtube: '',
                        },
                    },
                }), (err) => {
                    if (err)
                        return res.sendStatus(500);
                    fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/keys.json`, JSON.stringify({
                        hashedKey: encrypt(password),
                    }), (err) => {
                        if (err)
                            return res.sendStatus(500);
                        fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/config.json`, JSON.stringify({
                            panel: {
                                launcher: {
                                    shortcuts: [
                                        {
                                            icon: URL.createObjectURL(new Blob([fs.readFileSync(`${ENV.FS_ORIGIN}/yourdash.svg`)])),
                                        },
                                    ],
                                },
                            },
                        }), (err) => {
                            if (err)
                                return res.sendStatus(500);
                            return res.send(`hello new user ${req.params.username}`);
                        });
                    });
                });
            });
        });
        app.get('/api/user/login', (req, res) => {
            let userName = req.headers.username;
            let password = req.headers.password;
            if (!userName || !password)
                return res.sendStatus(401);
            fs.readFile(path.resolve(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`), (err, data) => {
                if (err)
                    return res.sendStatus(404);
                let parsedKeysFile = JSON.parse(data.toString());
                if (password === decrypt(parsedKeysFile.hashedKey)) {
                    let sessionToken = generateRandomStringOfLength(256);
                    fs.writeFile(path.resolve(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`), JSON.stringify({ ...parsedKeysFile, sessionToken: sessionToken }), (err) => {
                        if (err) {
                            console.log('ERROR: ', err);
                            return res.sendStatus(404);
                        }
                    });
                    return res.send(sessionToken);
                }
                else {
                    return res.sendStatus(403);
                }
            });
        });
        app.get('/api/get/current/user', (req, res) => {
            fs.readFile(`${ENV.FS_ORIGIN}/data/users/${req.header('username')}/user.json`, (err, data) => {
                if (err)
                    return res.sendStatus(404);
                return res.send(data);
            });
        });
    },
    unload() { },
    install() { },
};
export default Module;
