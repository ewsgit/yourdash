import fs from 'fs';
import path from 'path';
import { encrypt, generateRandomStringOfLength } from './encryption.js';
import { ENV, RELEASE_CONFIGURATION } from './index.js';
import { log, returnBase64Image } from './libServer.js';
import includedApps from './includedApps.js';
export default async function main(cb) {
    await checkEnvironmentVariables();
    await checkYourDashConfigJson();
    await checkIfAdministratorUserExists();
    await checkConfigurationVersion();
    await checkIfAllInstalledAppsStillExist();
    await checkIfAllUsersHaveTheLatestConfig();
    cb();
}
function checkIfAllUsersHaveTheLatestConfig() {
    return;
}
function checkIfAllInstalledAppsStillExist() {
    if (fs.existsSync(path.resolve(`${ENV.FsOrigin}/installed_apps.json`))) {
        fs.readFile(`${ENV.FsOrigin}/installed_apps.json`, (err, data) => {
            if (err) {
                log(`(Start up) CRITICAL ERROR: unable to read installed_apps.json`);
                return process.exit(1);
            }
            let json = JSON.parse(data.toString());
            json.forEach(app => {
                if (includedApps.find(includedApplication => {
                    return includedApplication.name === app;
                }))
                    return;
                json = json.filter(application => {
                    return application !== app;
                });
            });
            fs.writeFile(`${ENV.FsOrigin}/installed_apps.json`, JSON.stringify(json), err => {
                if (err) {
                    log(`(Start up) CRITICAL ERROR: unable to write to installed_apps.json`);
                    return process.exit(1);
                }
                return;
            });
        });
    }
    else {
        return;
    }
}
function checkEnvironmentVariables() {
    if (!fs.existsSync(path.resolve(ENV.FsOrigin))) {
        fs.mkdir(ENV.FsOrigin, { recursive: true }, err => {
            if (err) {
                log(`(Start up) ERROR: the 'FsOrigin' environment variable is invalid`);
                return process.exit(1);
            }
            log(`(Start up) a folder has been created at the location of the 'FsOrigin' environment variable`);
            return;
        });
    }
    else {
        return;
    }
}
function checkYourDashConfigJson() {
    if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`))) {
        fs.writeFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), JSON.stringify({
            activeModules: ['userManagement', 'core', 'files', 'store'],
            defaultBackground: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../background.jpg`)),
            favicon: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
            instanceEncryptionKey: generateRandomStringOfLength(32),
            loginPageConfig: {
                background: { src: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../background.jpg`)), },
                logo: {
                    position: {
                        bottom: null,
                        left: null,
                        right: null,
                        top: null,
                    },
                    src: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
                },
                message: {
                    content: 'This server is new. Welcome to YourDash!',
                    position: {
                        bottom: null,
                        left: null,
                        right: null,
                        top: null,
                    },
                },
            },
            logo: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
            name: 'YourDash Instance',
            themeColor: '#a46',
            version: 1,
        }), err => {
            if (err) {
                log(`(Start up) ERROR: a yourdash.config.json file could not be created!`);
                process.exit(1);
            }
            log(`config file was created in the data origin directory.`);
            return;
        });
    }
    else {
        return;
    }
}
function checkConfigurationVersion() {
    const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString());
    if (SERVER_CONFIG.version === RELEASE_CONFIGURATION.CURRENT_VERSION)
        return;
    switch (SERVER_CONFIG.version) {
        case 1:
            fs.readFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), (err, data) => {
                if (err) {
                    log(`(Start up) [Configuration Updater] ERROR: unable to read yourdash.config.json`);
                    return process.exit(1);
                }
                const jsonData = JSON.parse(data.toString());
                jsonData.version = 2;
                fs.writeFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), JSON.stringify(jsonData), err => {
                    if (err) {
                        log(`(Start up) [Configuration Updater] ERROR: unable to write to yourdash.config.json`);
                        return process.exit(1);
                    }
                    return checkConfigurationVersion();
                });
            });
        default:
            return;
    }
}
function checkIfAdministratorUserExists() {
    if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/data/users/admin/user.json`))) {
        fs.mkdir(path.resolve(`${ENV.FsOrigin}/data/users/admin/profile/`), { recursive: true }, err => {
            if (err) {
                log(`${err}`);
                process.exit(1);
            }
            fs.writeFileSync(`${ENV.FsOrigin}/data/users/admin/profile/picture.png`, fs.readFileSync(path.resolve(`${ENV.FsOrigin}/../default_user_profile.png`)));
            fs.writeFile(`${ENV.FsOrigin}/data/users/admin/user.json`, JSON.stringify({
                name: {
                    first: 'Admin',
                    last: 'istrator'
                },
                profile: {
                    banner: '',
                    description: '',
                    externalLinks: {},
                    image: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../default_user_profile.png`)),
                    location: {
                        public: false,
                        value: '',
                    },
                    status: {
                        public: false, value: ''
                    },
                },
                userName: 'admin',
                version: '1',
            }), err => {
                if (err)
                    return log(`${err}`);
                const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString());
                fs.writeFile(path.resolve(`${ENV.FsOrigin}/data/users/admin/keys.json`), JSON.stringify({ hashedKey: encrypt('admin', SERVER_CONFIG), }), err => {
                    if (err) {
                        log(`(Start up) ERROR: could not encrypt (during administrator default credential generation): ${err}`);
                        process.exit(1);
                    }
                    fs.writeFile(`${ENV.FsOrigin}/data/users/admin/config.json`, JSON.stringify({
                        panel: {
                            launcher: {
                                shortcuts: [
                                    {
                                        icon: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
                                        name: 'Dashboard',
                                        url: '/app/dash',
                                    },
                                ],
                            },
                        },
                    }), err => {
                        if (err) {
                            log(`(Start up) ERROR: could not write configuration (during administrator default configuration generation): ${err}`);
                            process.exit(1);
                        }
                        return;
                    });
                });
            });
        });
    }
    else {
        return;
    }
}
