/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import KeyValueDatabase from "../../helpers/keyValueDatabase.js";
import { CoreApi } from "./coreApi.js";
import YourDashUser from "./user/index.js";
import { IYourDashSession } from "./user/session.js";

const SESSION_TOKEN_LENGTH = 128;
export { SESSION_TOKEN_LENGTH }

export default class CoreApiUsers {
  private usersMarkedForDeletion: string[] = [];
  private readonly userDatabases: { [ username: string ]: { db: KeyValueDatabase, changed: boolean } };
  private readonly coreApi: CoreApi;
  private sessions: {
    [ key: string ]: IYourDashSession<any>[]
  } = {};

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi;
    this.userDatabases = {};

    return this;
  }

  __internal__getSessionsDoNotUseOutsideOfCore() {
    return this.sessions;
  }

  __internal__startUserDatabaseService() {
    this.coreApi.scheduler.scheduleTask( "core:userdb_write_to_disk", "*/5 * * * *", async () => {
      Object.keys( this.userDatabases ).map( async username => {
        if ( !this.userDatabases[ username ].changed ) {
          return;
        }

        const user = new YourDashUser( username );

        await this.userDatabases[ username ].db.writeToDisk( path.join( user.path, "core/user_db.json" ) );
      } );
    } );
  }

  __internal__startUserDeletionService() {
    this.coreApi.scheduler.scheduleTask( "core:users:delete_all_marked_users", "*/5 * * * *", /* every 5 minutes */
      async () => {
        for ( const username of this.usersMarkedForDeletion ) {
          await this.coreApi.users.forceDelete( username );
        }
      }
    );
  }

  async __internal__getUserDatabase( username: string ) {
    if ( this.userDatabases[ username ] ) {
      return this.userDatabases[ username ].db;
    }

    this.userDatabases[ username ] = {
      db: new KeyValueDatabase(),
      changed: false
    };
    const user = new YourDashUser( username );
    await this.userDatabases[ username ].db.readFromDisk( path.join( user.path, "core/user_db.json" ) );

    return this.userDatabases[ username ].db;
  }

  __internal__addUserDatabaseToSaveQueue( username: string ) {
    this.userDatabases[ username ].changed = true;
  }

  async __internal__saveUserDatabaseInstantly( username: string ) {
    this.userDatabases[ username ].changed = false;

    const user = new YourDashUser( username );

    await this.userDatabases[ username ].db.writeToDisk( path.join( user.path, "core/user_db.json" ) );

    return this;
  }

  get( username: string ) {
    return new YourDashUser( username );
  }

  async create( username: string ) {
    const user = new YourDashUser( username );

    await user.create()

    return user
  }

  delete( username: string ) {
    this.usersMarkedForDeletion.push( username );
    return this;
  }

  async forceDelete( username: string ) {
    if ( this.usersMarkedForDeletion.includes( username ) ) {
      this.usersMarkedForDeletion.splice( this.usersMarkedForDeletion.indexOf( username ), 1 );
    }

    // TODO: DELETE THE USER FROM THE FS

    await this.coreApi.fs.removePath( path.join( this.coreApi.fs.ROOT_PATH, `./users/${ username }` ) );
    delete this.userDatabases[ username ];

    return this;
  }

  update() {
    return this;
  }

  read() {
    return this;
  }

  getByUsername( username: string ): YourDashUser {
    return new YourDashUser( username );
  }

  async getAllUsers(): Promise<string[]> {
    return ( await this.coreApi.fs.getDirectory( path.join( this.coreApi.fs.ROOT_PATH, "./users" ) ) ).getChildren()
  }
}
