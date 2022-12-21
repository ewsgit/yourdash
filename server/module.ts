/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import { IEnv, YourDashServerConfig } from './index.js';
import Express from 'express';

export default interface YourDashModule {
  name: string;
  load: (_app: Express.Application, _api: { SERVER_CONFIG: YourDashServerConfig } & IEnv) => void;
  unload: () => void;
  install: () => void;
}
