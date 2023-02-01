/*
 * Created on Sun Oct 23 2022-2023
 *
 * Copyright © 2022-2023 Ewsgit
 */

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SERVER, { verifyAndReturnJson } from "../../../server";
import { type YourDashUser } from '../../../../../packages/types/core/user';
import Chiplet from "ui"
import RightClickMenu from 'ui/backup/elements/rightClickMenu/RightClickMenu';
import TextInput from 'ui/backup/elements/textInput/TextInput';
import styles from './Panel.module.scss';
import { type quickShortcut as QuickShortcut } from 'types/core/panel/quickShortcut';
import { type InstalledApplication } from 'types/store/installedApplication';
import ServerImage from "../../../pages/app/components/serverImage/ServerImage";

export interface IPanel {
  appIsOpening: (_value: boolean) => void,
  backgroundImage: string
}

const Panel: React.FC<IPanel> = ({
                                   appIsOpening,
                                   backgroundImage
                                 }) => {
  const router = useRouter()
  const [ launcherSlideOutVisible, setLauncherSlideOutVisible ] = useState(false)
  const [ accountDropdownVisible, setAccountDropdownVisible ] = useState(false)
  const [ userData, setUserData ] = useState(undefined as YourDashUser | undefined)
  const [ searchQuery, setSearchQuery ] = useState("")
  const [ quickShortcuts, setQuickShortcuts ] = useState([] as QuickShortcut[])
  const [ installedApps, setInstalledApps ] = useState([] as InstalledApplication[])

  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(`/userManagement/current/user`),
        (res: YourDashUser) => {
          setUserData(res)
        },
        () => {
          console.error(`error fetching user`)
          localStorage.removeItem("sessionToken")
          return router.push("/login")
        }
    )

    verifyAndReturnJson(
        SERVER.get(`/core/panel/quick-shortcuts/`),
        res => {
          setQuickShortcuts(res)
        },
        () => {
          console.error(`error fetching user's quick-shortcuts`)
        })

    verifyAndReturnJson(
        SERVER.get(`/core/panel/launcher/apps`),
        res => {
          setInstalledApps(res)
        },
        () => {
          console.error(`error fetching the instance's installed apps`)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={ styles.component }>
      <div
        className={ styles.launcher }
        onClick={ () => {
              setLauncherSlideOutVisible(!launcherSlideOutVisible)
            } }
      >
        <Chiplet.Icon
          name='app-launcher-16'
          style={ {
                aspectRatio: "1/1",
                height: "100%",
              } }
          color={ "var(--app-panel-fg)" }
        />
      </div>
      <div className={ `${styles.launcherSlideOut} ${launcherSlideOutVisible ? styles.launcherSlideOutVisible : ""}` }>
        <div data-header style={ { backgroundImage } }>
          <div data-title>Hiya, {userData?.name?.first}</div>
          <TextInput
            data-search
            onChange={ e => {
                  setSearchQuery(e.currentTarget.value.toLowerCase())
                } }
            placeholder="Search"
          />
        </div>
        <div className={ styles.launcherGrid }>
          {
              installedApps ?
                  installedApps.map((app, ind) => {
                    if (app?.name?.toLowerCase()?.includes(searchQuery) || app?.description?.toLowerCase()?.includes(searchQuery))
                      return (
                        <RightClickMenu
                          items={ [
                                {
                                  name: "Pin to quick shortcuts",
                                  onClick: () => {
                                    verifyAndReturnJson(
                                        SERVER.post(`/core/panel/quick-shortcut/create`, {
                                          body: JSON.stringify({
                                            name: app.name,
                                            url: app.path
                                          })
                                        }),
                                        data => {
                                          setQuickShortcuts([ ...quickShortcuts, data[0] ])
                                        },
                                        () => {
                                          console.error(`unable to create quick shortcut with name: ${app.name}`)
                                        }
                                    )
                                  }
                                },
                              ] }
                          key={ app.name }
                        >
                          <div
                            className={ styles.launcherGridItem }
                            onClick={ () => {
                                  if (app.path === router.pathname) return setLauncherSlideOutVisible(false)
                                  setLauncherSlideOutVisible(false)
                                  router.prefetch(app.path)
                                  appIsOpening(true)
                                  setTimeout(() => {
                                    router.push(app.path)
                                    appIsOpening(false)
                                  }, 500)
                                } }
                          >
                            <img src={ app.icon } draggable={ false } alt=""/>
                            <span>{app.displayName}</span>
                          </div>
                        </RightClickMenu>
                      )
                  })
                  : (
                    <Chiplet.Button onClick={ () => {
                        router.reload()
                      } }
                    >
                      Reload Launcher Items
                    </Chiplet.Button>
                  )
            }
        </div>
        <footer data-footer>
          <ServerImage
            onClick={ () => {
                  router.push(`/app/user/profile/${userData?.userName}`)
                } }
            tabIndex={ 0 }
            src={ "/core/panel/user/profile/picture" }
            alt=""
          />
          <span>{userData?.name?.first} {userData?.name?.last}</span>
          <div
            onClick={ () => {
                  setLauncherSlideOutVisible(false)
                  router.push("/app/settings")
                } }
            data-settings
          >
            <Chiplet.Icon name='gear-16' color={ "var(--container-fg)" }/>
          </div>
        </footer>
      </div>
      <ServerImage
        onClick={ () => {
              router.push(`/app/dash`)
            } }
        src={ "/core/instance/logo" }
        className={ styles.serverLogo }
      />
      {/* <h2 className={styles.serverName}>YourDash</h2> */}
      <div className={ styles.shortcuts }>
        {
            quickShortcuts?.length !== 0
                ? quickShortcuts?.map((shortcut, ind) => {return (
                  <RightClickMenu
                    key={ shortcut.name }
                    items={ [
                          {
                            name: "Remove quick shortcut",
                            onClick: () => {
                              verifyAndReturnJson(
                                  SERVER.delete(`/core/panel/quick-shortcut/${shortcut.id}`),
                                  () => {
                                    setQuickShortcuts(quickShortcuts.filter(sc => {return sc.id !== shortcut.id}))
                                  },
                                  () => {
                                    console.error(`unable to delete quick shortcut ${shortcut.id}`)
                                  }
                              )
                            }
                          }
                        ] }
                  >
                    <div
                      className={ styles.shortcut }
                      onClick={ () => {
                            setLauncherSlideOutVisible(false)
                            if (shortcut.url === router.pathname) return
                            router.prefetch(shortcut.url)
                            appIsOpening(true)
                            setTimeout(() => {
                              router.push(shortcut.url)
                              appIsOpening(false)
                            }, 500)
                          } }
                    >
                      <div>
                        <img draggable={ false } src={ shortcut.icon } alt=""/>
                        {
                            router.pathname === shortcut.url ?
                              <div data-active-indicator/> : <div/>
                          }
                      </div>
                      <span>{shortcut.name}</span>
                    </div>
                  </RightClickMenu>
                )})
                : (
                  <Chiplet.Button onClick={ () => {
                      verifyAndReturnJson(
                          SERVER.post(`/core/panel/quick-shortcut/create`, {
                            body: JSON.stringify({
                              name: "files",
                              url: "/app/files"
                            })
                          }),
                          data => {
                            setQuickShortcuts([ ...quickShortcuts, data[0] ])
                          },
                          () => {
                            console.error(`unable to create quick shortcut with name: files`)
                          }
                      )
                    } }
                  >Add default quick shortcuts</Chiplet.Button>
                )
          }
      </div>
      {/* <div className={styles.tray}>
      <Icon name="browser-16" className={styles.trayIcon} color={"var(--app-panel-fg)"} />
    </div> */}
      <div className={ styles.account }>
        <ServerImage
          onClick={ () => {
                setAccountDropdownVisible(!accountDropdownVisible)
              } }
          tabIndex={ 0 }
          src={ "/core/panel/user/profile/picture" }
          alt=""
        />
        <div
          style={ {
                background: "#00000040",
                height: "100vh",
                left: 0,
                opacity: accountDropdownVisible ? 1 : 0,
                pointerEvents: accountDropdownVisible ? "all" : "none",
                position: "fixed",
                top: 0,
                transition: "var(--transition)",
                width: "100vw",
              } }
          onClick={ () => {
                setAccountDropdownVisible(false)
              } }
        />
        <div>
          <Chiplet.Card
            style={ {
                  opacity: !accountDropdownVisible ? "0" : "1",
                  pointerEvents: accountDropdownVisible ? "all" : "none",
                  transform: !accountDropdownVisible ? "scale(0.9)" : "scale(1)",
                } }
            compact
            className={ styles.accountDropdown }
          >
            <Chiplet.Row className={ styles.accountDropdownQuickActions }>
              <div onClick={ () => {
                  setAccountDropdownVisible(false)
                  localStorage.removeItem("sessiontoken")
                  localStorage.removeItem("username")
                  router.push("/login/")
                } }
              >
                <Chiplet.Icon name='logout' color="var(--button-fg)"/>
              </div>
              <div onClick={ () => {
                  setAccountDropdownVisible(false)
                  router.push("/about")
                } }
              >
                <Chiplet.Icon name='info-16' color="var(--button-fg)"/>
              </div>
              <div onClick={ () => {
                  setAccountDropdownVisible(false)
                  router.push("/app/settings")
                } }
              >
                <Chiplet.Icon name='gear-16' color="var(--button-fg)"/>
              </div>
            </Chiplet.Row>
            <Chiplet.Column>
              <Chiplet.Button onClick={ () => {
                  router.push(`/app/user/profile/${userData?.userName}`)
                  setAccountDropdownVisible(false)
                } }
              >Profile</Chiplet.Button>
              <Chiplet.Button onClick={ () => {
                  localStorage.removeItem("currentServer")
                  router.push("/login/server")
                  setAccountDropdownVisible(false)
                } }
              >Switch instance</Chiplet.Button>
            </Chiplet.Column>
          </Chiplet.Card>
          <Chiplet.Column
            className={ styles.accountNotificationList }
            style={ {
                  opacity: !accountDropdownVisible ? "0" : "1",
                  pointerEvents: accountDropdownVisible ? "all" : "none",
                  transform: !accountDropdownVisible ? "scale(0.9)" : "scale(1)",
                } }
          >
            <Chiplet.Card>
              <Chiplet.Row data-header>
                <img src={ `/assets/productLogos/yourdash.svg` } alt=""/>
                <span>Notification Test</span>
              </Chiplet.Row>
              <Chiplet.Column>
                <p>
                  This is some sample text for a notification
                </p>
                <Chiplet.Button onClick={ () => {
                    console.log("Implenment me!")
                  } }
                >
                  Ok
                </Chiplet.Button>
              </Chiplet.Column>
            </Chiplet.Card>
            <Chiplet.Card>
              <Chiplet.Row data-header>
                <img src={ `/assets/productLogos/yourdash.svg` } alt=""/>
                <span>Notification Test</span>
              </Chiplet.Row>
              <Chiplet.Column>
                <p>
                  This is some sample text for a notification
                </p>
                <Chiplet.Button onClick={ () => {
                    console.log("Implenment me!")
                  } }
                >
                  Ok
                </Chiplet.Button>
              </Chiplet.Column>
            </Chiplet.Card>
            <Chiplet.Card>
              <Chiplet.Row data-header>
                <img src={ `/assets/productLogos/yourdash.svg` } alt=""/>
                <span>Notification Test</span>
              </Chiplet.Row>
              <Chiplet.Column>
                <p>
                  This is some sample text for a notification
                </p>
                <Chiplet.Button onClick={ () => {
                    console.log("Implenment me!")
                  } }
                >
                  Ok
                </Chiplet.Button>
              </Chiplet.Column>
            </Chiplet.Card>
          </Chiplet.Column>
        </div>
      </div>
    </div>
  );
};

export default Panel;
