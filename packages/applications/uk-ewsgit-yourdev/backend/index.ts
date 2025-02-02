/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class YourDevModule {
  constructor() {
    return this;
  }

  // public loadEndpoints() {
  //   super.loadEndpoints();
  //
  //   const wss = this.api.core.websocketManager.createServer("/app/yourdev");
  //   wss.onConnection((connection) => {
  //     connection.onChannel("message", (message) => {
  //       console.log(message);
  //       connection.emit("message", "world");
  //     });
  //   });
  //
  //   this.api.request.get("/app/yourdev/", (_req, res) => {
  //     return res.json({ success: true });
  //   });
  // }
}
