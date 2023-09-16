/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import styles from "./StoreApplicationComponent.module.scss";

export interface IStoreApplicationComponent {
  displayName: string;
  id: string;
  icon: string;
}

const StoreApplicationComponent: React.FC<IStoreApplicationComponent> = ( {
  displayName,
  id,
  icon
} ) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate( `/app/a/store/app/${ id }` )}
      className={styles.component}
    >
      <img loading={"lazy"} src={`${ csi.getInstanceUrl() }${ icon }`} className={"aspect-square h-16"} alt={""}/>
      <div className={styles.section}>
        <span className={styles.label}>
          {displayName}
        </span>
      </div>
    </Card>
  );
};

export default StoreApplicationComponent;
