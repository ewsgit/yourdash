/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import bodyParser from 'body-parser';
import chalk from 'chalk';
import { exec } from 'child_process';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { log } from './libServer.js';
import YourDashModule from './module.js';
import startupCheck from './startupCheck.js';

export const ENV: {
  FsOrigin: string;
  UserFs: (_req: express.Request) => string;
  UserAppData: (_req: express.Request) => string;
} = {
  FsOrigin: process.env.FsOrigin as string,
  UserFs: (req) => `${ENV.FsOrigin}/data/users/${req.headers.username}`,
  UserAppData: (req) => `${ENV.FsOrigin}/data/users/${req.headers.username}/AppData`,
};

if (!ENV.FsOrigin) console.error('FsOrigin was not defined.');

export interface YourDashServerConfig {
  name: string;
  defaultBackground: string;
  favicon: string;
  logo: string;
  themeColor: `#${string}`;
  activeModules: string[];
  version: string;
  instanceEncryptionKey: string;
  loginPageConfig: {
    logo: {
      src: string;
      position: {
        top: number | null;
        left: number | null;
        bottom: number | null;
        right: number | null;
      };
    };
    background: {
      src: string;
    };
    message: {
      content: string;
      position: {
        top: number | null;
        left: number | null;
        bottom: number | null;
        right: number | null;
      };
    };
  };
}


startupCheck(async () => {
  const SERVER_CONFIG: YourDashServerConfig = JSON.parse(
    fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString()
  );

  if (
    SERVER_CONFIG.name === undefined ||
    SERVER_CONFIG.defaultBackground === undefined ||
    SERVER_CONFIG.favicon === undefined ||
    SERVER_CONFIG.logo === undefined ||
    SERVER_CONFIG.themeColor === undefined ||
    SERVER_CONFIG.activeModules === undefined ||
    SERVER_CONFIG.version === undefined
  ) {
    log(
      chalk.redBright(
        'Missing configuration!, the configuration requires at least the properties: \nname,\ndefaultBackground,\nfavicon,\nlogo,\nthemeColor,\nactiveModules,\nversion'
      )
    );
    process.exit(1);
  }

  if (!SERVER_CONFIG.activeModules.includes('core'))
    console.error(
      chalk.redBright(
        `[ERROR] the 'core' module is not enabled, this ${chalk.bold(
          'WILL'
        )} lead to missing features and crashes.`
      )
    );

  if (!SERVER_CONFIG.activeModules.includes('userManagement'))
    console.error(
      chalk.redBright(
        `[ERROR] the 'userManagement' module is not enabled, this ${chalk.bold(
          'WILL'
        )} lead to missing features and crashes.`
      )
    );

  const app = express();

  app.use(bodyParser.json());

  let loadedModules: YourDashModule[] = [];

  // TODO: implement the server module unload and install methods
  SERVER_CONFIG.activeModules.forEach((module) => {
    import('./modules/' + module + '/index.js').then((mod) => {
      let currentModule = mod.default;
      currentModule.load(app, { SERVER_CONFIG: SERVER_CONFIG });
      log('loaded module: ' + module);
      loadedModules.push(currentModule);
    });
  });

  log('All modules loaded');

  app.use((req, res, next) => {
    let date = new Date();
    switch (req.method) {
      case 'GET':
        log(
          `${date.getHours()}:${date.getMinutes()}:${
            date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgGreen(chalk.whiteBright(' GET '))} ${req.path}`
        );
        break;
      case 'POST':
        log(
          `${date.getHours()}:${date.getMinutes()}:${
            date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgBlue(chalk.whiteBright(' POST '))} ${req.path}`
        );
        break;
      case 'DELETE':
        log(
          `${date.getHours()}:${date.getMinutes()}:${
            date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()
          } ${chalk.bgRed(chalk.whiteBright(' DELETE '))} ${req.path}`
        );
        break;
    }
    next();
  });

  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://yourdash.vercel.app', 'https://ddsh.vercel.app'],
    })
  );

  setInterval(() => {
    console.log('update');
    exec('git pull');
    process.exit();
  }, 43200000);

  app.get('/', (req, res) => {
    res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
  });

  // this is used during the login page to check if the provided url is a yourdash instance
  app.get('/test', (_req, res) => {
    res.send('yourdash instance');
  });

  app.get('/api/get/server/config', (_req, res) => {
    fs.readFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), (err, data) => {
      let parsedFile = JSON.parse(data.toString()) as YourDashServerConfig;
      let serverConfig = {
        activeModules: parsedFile.activeModules,
        defaultBackground: parsedFile.defaultBackground,
        favicon: parsedFile.favicon,
        logo: parsedFile.logo,
        name: parsedFile.name,
        themeColor: parsedFile.themeColor,
        version: parsedFile.version,
      } as Omit<YourDashServerConfig, 'instanceEncryptionKey'>;
      res.json(serverConfig);
    });
  });

  app.get('/api/get/server/default/background', (_req, res) => {
    res.sendFile(path.resolve(`${ENV.FsOrigin}/${SERVER_CONFIG.defaultBackground}`));
  });

  app.get('/api/get/server/favicon', (_req, res) => {
    res.sendFile(path.resolve(`${ENV.FsOrigin}/${SERVER_CONFIG.favicon}`));
  });

  app.get('/api/get/server/logo', (_req, res) => {
    res.sendFile(path.resolve(`${ENV.FsOrigin}/${SERVER_CONFIG.logo}`));
  });

  app.get('/api/server/version', (_req, res) => {
    res.send(SERVER_CONFIG.version);
  });

  // the following section of code is for nextcloud application compatibility.

  app.get('/nextcloud/remote.php/dav/files/:username', (_req, _res) => {});

  app.listen(3560, () => {
    log('Server online :D');
  });
});
