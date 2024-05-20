/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import { Core } from "./core.js";
import YourDashUser from "./user/index.js";

type JSONValue = boolean | number | string | null | JSONFile;

type JSONFile = {
  [key: string]: JSONValue;
};

// This class only manages the user databases, the databases should be accessed through coreUser not directly from USER_DATABASES
export default class CoreUserDatabase {
  private core: Core;
  userDatabases: Map<string, JSONFile>;

  constructor(core: Core) {
    this.core = core;
    this.userDatabases = new Map<string, JSONFile>();

    return this;
  }

  async saveDatabases() {
    const databases = Array.from(this.userDatabases);

    databases.map(async ([key, database]) => {
      const user = new YourDashUser(key);

      this.core.log.info("core:user_db", `Saving database for '${key}'`);

      await (await this.core.fs.getFile(path.join(user.path, "core/user_db.json"))).write(JSON.stringify(database));
    });
  }

  async loadUserDatabase(username: string): Promise<JSONFile> {
    const user = new YourDashUser(username);

    try {
      // attempt to parse json data from "user_db.json"
      return (await (await this.core.fs.getFile(path.join(user.path, "core/user_db.json"))).read("json")) as JSONFile;
    } catch (_err) {
      this.core.log.warning("core:userdb", `Unable to parse "${username}"'s user database.`);

      // throw an error because we can't parse user_db.json
      throw new Error(`Unable to parse "${username}"'s user database.`);
    }
  }

  __internal__loadEndpoints() {
    this.core.request.get("/core/user_db", async (req, res) => {
      const { username } = req.headers;

      if (!this.userDatabases.get(username)) {
        this.userDatabases.set(username, await this.loadUserDatabase(username));
      }

      return res.json(this.userDatabases.get(username) || {});
    });

    this.core.request.post("/core/user_db", async (req, res) => {
      const { username } = req.headers;

      this.userDatabases.set(username, req.body);

      return res.json({ success: true });
    });
  }
}
