/*
 * Created on Sun Oct 23 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IncludedApps from '../../../../data/includedApps';
import YourDashUser, { YourDashUserSettings } from '../../../../lib/user';
import ColContainer from '../../../containers/ColContainer/ColContainer';
import RowContainer from '../../../containers/RowContainer/RowContainer';
import Button from '../../../elements/button/Button';
import Card from '../../../elements/card/Card';
import Icon from '../../../elements/icon/Icon';
import TextInput from '../../../elements/textInput/TextInput';
import Server from "./../../../../lib/server";
import AuthedImg from "./../../../elements/authedImg/AuthedImg";
import styles from './Panel.module.scss';

export interface IPanel { }

const Panel: React.FC<IPanel> = () => {
  const router = useRouter()
  const [ serverConfig, setServerConfig ] = useState({} as { [ key: string ]: any | undefined })
  const [ launcherSlideOutVisible, setLauncherSlideOutVisible ] = useState(false)
  const [ accountDropdownVisible, setAccountDropdownVisible ] = useState(false)
  const [ userData, setUserData ] = useState(undefined as YourDashUser | undefined)
  const [ userSettings, setUserSettings ] = useState(undefined as YourDashUserSettings | undefined)
  const [ searchQuery, setSearchQuery ] = useState("")
  useEffect(() => {
    Server.get(`/get/server/config`)
      .then(res => res.json())
      .then(res => {
        setServerConfig(res)
      })
    Server.get(`/get/current/user/settings`)
      .then(res => res.json() as Promise<YourDashUserSettings>)
      .then(res => {
        setUserSettings(res)
        document.body.style.setProperty("--panel-launcher-grid-columns", res.panel?.launcher?.slideOut?.gridColumns.toString() || "3")
      })
    Server.get(`/get/current/user`)
      .then(res => res.json() as Promise<YourDashUser>)
      .then(res => {
        setUserData(res)
      })
  }, [])
  return <div className={styles.component}>
    <div className={styles.launcher} onClick={() => { setLauncherSlideOutVisible(!launcherSlideOutVisible) }}>
      <Icon name='app-launcher-16' style={{ height: "100%", aspectRatio: "1/1" }} color={"var(--app-panel-fg)"} />
    </div>
    <div className={`${styles.launcherSlideOut} ${launcherSlideOutVisible ? styles.launcherSlideOutVisible : ""}`}>
      <div data-header>
        <div data-title>Hiya, {userData?.name}</div>
        <TextInput className={styles.launcherSlideOutSearch} onChange={(e) => {
          setSearchQuery(e.currentTarget.value)
        }} placeholder="Search" />
      </div>
      <div className={styles.launcherGrid}>
        {
          IncludedApps.map((app, ind) => {
            if (app.name.includes(searchQuery) || app.path.includes(searchQuery))
              return <div key={ind} onClick={() => {
                router.push(app.path)
              }}>
                <img src={app.icon} draggable={false} alt="" />
                <span>{app.name}</span>
              </div>
          })
        }
      </div>
    </div>
    <AuthedImg src={"/get/logo"} className={styles.serverLogo} />
    <div className={styles.tray}>
      <Icon name="browser-16" className={styles.trayIcon} color={"#ffffff"} />
    </div>
    <div className={styles.account}>
      <img src={
        userData?.profile.image
      } alt="" onClick={() => { setAccountDropdownVisible(!accountDropdownVisible) }} />
      <Card style={{
        opacity: !accountDropdownVisible ? "0" : "1",
        pointerEvents: !accountDropdownVisible ? "none" : "auto"
      }} compact={true} className={styles.accountDropdown}>
        <RowContainer className={styles.accountDropdownQuickActions}>
          <div>a</div>
          <div>a</div>
          <div>a</div>
        </RowContainer>
        <ColContainer>
          <Button onClick={() => {
            console.log("Profile")
          }}>Profile</Button>
          <Button onClick={() => {
            console.log("Settings")
          }}>Settings</Button>
          <Button onClick={() => {
            localStorage.removeItem("currentServer")
            router.push("/login/server")
          }}>Switch instance</Button>
          <Button onClick={() => {
            localStorage.removeItem("currentServer")
            localStorage.removeItem("githubToken")
            router.push("/login/server")
          }}>Logout</Button>
        </ColContainer>
      </Card>
    </div>
  </div>;
};

export default Panel;
