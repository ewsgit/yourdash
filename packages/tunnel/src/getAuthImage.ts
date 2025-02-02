/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import tun from "./index.js";

export default function toAuthImgUrl(authenticatedImageSrc: string) {
  return tun.baseUrl + authenticatedImageSrc;
}
