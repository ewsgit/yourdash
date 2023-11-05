/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Socket as SocketIoSocket } from "socket.io";
import { IYourDashSession, YOURDASH_SESSION_TYPE } from "shared/core/session.js";

export function executeCommand(
  username: string,
  session: IYourDashSession<YOURDASH_SESSION_TYPE.desktop>,
  command: string
): Promise<any> {
  return new Promise( resolve => {
    const socket = getSocketFromSession( username, session );
    socket.emit( "execute-command", command, data => {
      resolve( data );
    } );
  } );
}

export function getSocketFromSession(
  username: string,
  session: IYourDashSession<YOURDASH_SESSION_TYPE.desktop>
): SocketIoSocket | undefined {
  if ( !session || !username ) {
    return undefined;
  }

  const connection = ACTIVE_SOCKET_IO_SOCKETS[username]?.find( socket => socket.id === session.id.toString() ) || undefined;

  if ( !connection ) {
    return undefined;
  }

  return ACTIVE_SOCKET_IO_SOCKETS[username]?.find( sock => sock.id === session.id.toString() )?.socket || undefined;
}

export class PersonalServerAcceleratorCommunication {
  socketConnection: SocketIoSocket;

  constructor( username: string, session: IYourDashSession<YOURDASH_SESSION_TYPE.desktop> ) {
    if ( !session ) {
      return undefined;
    }

    this.socketConnection = getSocketFromSession( username, session );

    return this;
  }

  listenFor( path: string, callBack: ( data: any ) => void ) { // eslint-disable-line @typescript-eslint/no-explicit-any
    this.socketConnection.on( path, callBack );
  }

  emit( path: string, data: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
    this.socketConnection.emit( path, data );
  }
}
