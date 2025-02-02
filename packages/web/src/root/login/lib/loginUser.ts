/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import tun from "@yourdash/tunnel/src";
import { z } from "zod";

export default function loginUser(username: string, password: string) {
  return new Promise<void>(async (resolve, reject) => {
    const req = await tun.post(
      `/login/user/authenticate`,
      { username: username, password: password },
      "json",
      z.object({ sessionId: z.string(), token: z.string() }),
    );

    if (req.status !== 200) {
      // FIXME: show a toasts if the login failed
      // csi.createClientNotification.toasts.error("Login Error", "Invalid password");
      reject();

      return;
    }

    localStorage.setItem("current_user_username", username);

    resolve();
  });
}
