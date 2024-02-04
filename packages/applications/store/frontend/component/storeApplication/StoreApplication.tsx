/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@yourdash/web-client/src/ui/index";
import csi from "@yourdash/web-client/src/helpers/csi";
import styles from "./StoreApplication.module.scss";

export interface IStoreApplicationComponent {
  displayName: string;
  id: string;
  icon: string;
}

const StoreApplication: React.FC<IStoreApplicationComponent> = ({ displayName, id, icon }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/app/a/store/app/${id}`)} className={styles.component}>
      <img loading={"lazy"} src={`${csi.getInstanceUrl()}${icon}`} className={"aspect-square h-16"} alt={""} />
      <div className={styles.section}>
        <span className={styles.label}>{displayName}</span>
      </div>
    </Card>
  );
};

export default StoreApplication;
