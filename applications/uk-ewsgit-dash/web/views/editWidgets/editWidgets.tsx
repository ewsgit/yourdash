/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { UKC } from "@yourdash/uikit";
import React from "react";

const EditWidgets: React.FC = () => {
  return (
    <div>
      <UKC.Heading text="Edit widgets" />
      <UKC.Button
        text="Edit"
        onClick={() => {
          console.log("Edit widgets dialog");
        }}
      />
    </div>
  );
};

export default EditWidgets;
