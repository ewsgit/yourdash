/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashService from "../../core/serviceManager/service.js";
import YourDashServiceStartupType from "../../core/serviceManager/serviceStartupType.js";

export default class ApplicationService extends YourDashService {
  constructor() {
    super(
      "dev.pages.yourdash.applicationservice",
      "Application Service",
      "Ewsgit",
      [],
      YourDashServiceStartupType.default,
    );

    return this;
  }

  onInit() {
    // load applications
  }
}
