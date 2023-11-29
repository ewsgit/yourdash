/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"
import FilesListView from "../files/FilesListView";
import StatusBar from "../statusBar/StatusBar";
import styles from "./FilePane.module.scss"

const FilePane: React.FC = () => {
  return <section className={styles.view}>
    <span>fileControlsHeader</span>
    <FilesListView files={[
      { type: "file", name: "test.txt" },
      { type: "file", name: "test2.txt" },
      { type: "file", name: "test3.txt" },
      { type: "file", name: "test4.txt" }
    ]} />
    <StatusBar/>
  </section>
}

export default FilePane
