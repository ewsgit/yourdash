/*
 * Created on Sun Oct 23 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import SERVER, { verifyAndReturnJson } from "../../../../lib/server";
import YourDashUser, { YourDashUserSettings } from '../../../../lib/user';
import Card from '../../../containers/card/Card';
import ColContainer from '../../../containers/ColContainer/ColContainer';
import RowContainer from '../../../containers/RowContainer/RowContainer';
import Button from '../../../elements/button/Button';
import Icon from '../../../elements/icon/Icon';
import RightClickMenu from '../../../elements/rightClickMenu/RightClickMenu';
import TextInput from '../../../elements/textInput/TextInput';
import styles from './Panel.module.scss';
import QuickShortcut from '../../../../types/core/panel/quickShortcut';
import AuthenticatedImg from '../../../elements/authenticatedImg/AuthenticatedImg';
import InstalledApplication from '../../../../types/store/installedApplication';

export interface IPanel { }

const Panel: React.FC<IPanel> = () => {
  const router = useRouter()
  const [ launcherSlideOutVisible, setLauncherSlideOutVisible ] = useState(false)
  const [ accountDropdownVisible, setAccountDropdownVisible ] = useState(false)
  const [ userData, setUserData ] = useState(undefined as YourDashUser | undefined)
  const [ searchQuery, setSearchQuery ] = useState("")
  const [ quickShortcuts, setQuickShortcuts ] = useState([] as QuickShortcut[])
  const [ installedApps, setInstalledApps ] = useState([] as InstalledApplication[])

  useEffect(() => {
    verifyAndReturnJson(
      SERVER.get(`/userManagement/current/user/settings`),
      (_res: YourDashUserSettings) => {

        // the following is no longer supported
        // document.body.style.setProperty("--app-panel-launcher-grid-columns", res.panel?.launcher?.slideOut?.gridColumns.toString() || "3")
      },
      () => {
        localStorage.removeItem("sessionToken")
        return router.push("/login")
      }
    )

    verifyAndReturnJson(
      SERVER.get(`/userManagement/current/user`),
      (res) => {
        setUserData(res.user)
      },
      () => {
        localStorage.removeItem("sessionToken")
        return router.push("/login")
      }
    )

    verifyAndReturnJson(
      SERVER.get(`/core/panel/quick-shortcuts/`),
      (res) => {
        setQuickShortcuts(res)
      },
      () => {
        console.error(`error fetching user's quick-shortcuts`)
      })

    verifyAndReturnJson(
      SERVER.get(`/core/panel/launcher/apps`),
      (res) => {
        setInstalledApps(res)
      },
      () => {
        console.error(`error fetching the instance's installed apps`)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className={styles.component}>
    <div className={styles.launcher} onClick={() => {
      setLauncherSlideOutVisible(!launcherSlideOutVisible)
    }}>
      <Icon
        name='app-launcher-16'
        style={{
          height: "100%",
          aspectRatio: "1/1"
        }}
        color={"var(--app-panel-fg)"}
      />
    </div>
    <div className={`${styles.launcherSlideOut} ${launcherSlideOutVisible ? styles.launcherSlideOutVisible : ""}`}>
      <div data-header>
        <div data-title>Hiya, {userData?.name?.first}</div>
        <TextInput data-search onChange={(e) => {
          setSearchQuery(e.currentTarget.value.toLowerCase())
        }} placeholder="Search" />
      </div>
      <div className={styles.launcherGrid}>
        {
          installedApps ?
            installedApps.map((app, ind) => {
              if (app?.name?.toLowerCase()?.includes(searchQuery) || app?.description?.toLowerCase()?.includes(searchQuery))
                return <RightClickMenu
                  items={[
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
                          () => {
                            router.reload()
                          },
                          () => {
                            console.error(`unable to create quick shortcut with name: ${app.name}`)
                          }
                        )
                      }
                    },
                  ]} key={ind}>
                  <div className={styles.launcherGridItem} onClick={() => {
                    setLauncherSlideOutVisible(false)
                    router.push(app.path)
                  }}>
                    <img src={app.icon} draggable={false} alt="" />
                    <span>{app.name}</span>
                    {/* <div onClick={() => {
                  // show a dropdown
                }}><Icon name='three-bars-16' color={"var(--button-fg)"} /></div> */}
                  </div>
                </RightClickMenu>
            })
            : <Button onClick={() => {
              router.reload()
            }}>
              Reload Launcher Items
            </Button>
        }
      </div>
      <footer data-footer>
        <AuthenticatedImg onClick={() => {
          router.push(`/app/user/profile/${userData?.userName}`)
        }} tabIndex={0} src={"/core/panel/user/profile/picture"} alt="" />
        <span>{userData?.name?.first} {userData?.name?.last}</span>
        <div onClick={() => {
          setLauncherSlideOutVisible(false)
          router.push("/app/settings")
        }} data-settings>
          <Icon name='gear-16' color={"var(--container-fg)"}></Icon>
        </div>
      </footer>
    </div>
    <AuthenticatedImg
      onClick={() => {
        router.push(`/app/dash`)
      }}
      src={"/core/instance/logo"}
      className={styles.serverLogo}
    />
    {/* <h2 className={styles.serverName}>YourDash</h2> */}
    <div className={styles.shortcuts}>
      {
        quickShortcuts?.length !== 0
          ? quickShortcuts?.map((shortcut, ind) => {
            return <RightClickMenu key={ind} items={[
              {
                name: "Remove quick shortcut",
                onClick: () => {
                  verifyAndReturnJson(
                    SERVER.delete(`/core/panel/quick-shortcut/${shortcut.id}`),
                    () => {
                      router.reload()
                    },
                    () => {
                      console.error(`unable to delete quick shortcut ${shortcut.id}`)
                    }
                  )
                }
              }
            ]}>
              <div className={styles.shortcut} onClick={() => {
                router.push(shortcut.url)
              }}>
                <div>
                  <img draggable={false} src={shortcut.icon} alt="" />
                  {
                    router.pathname === shortcut.url ?
                      <div data-active-indicator></div> : <div></div>
                  }
                </div>
                <span>{shortcut.name}</span>
              </div>
            </RightClickMenu>
          })
          : <Button onClick={() => {
            verifyAndReturnJson(
              SERVER.post(`/core/panel/quick-shortcut/create`, {
                body: JSON.stringify({
                  name: "files",
                  url: "/app/files"
                })
              }),
              () => {
                router.reload()
              },
              () => {
                console.error(`unable to create quick shortcut with name: files`)
              }
            )
          }}>Add Quick Shortcuts</Button>
      }
    </div>
    {/* <div className={styles.tray}>
      <Icon name="browser-16" className={styles.trayIcon} color={"var(--app-panel-fg)"} />
    </div> */}
    <div className={styles.account}>
      <AuthenticatedImg onClick={() => {
        setAccountDropdownVisible(!accountDropdownVisible)
      }} tabIndex={0} src={"/core/panel/user/profile/picture"} alt="" />
      <div style={{
        width: "100vw",
        transition: "var(--transition)",
        height: "100vh",
        background: "#00000040",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: accountDropdownVisible ? "all" : "none",
        opacity: accountDropdownVisible ? 1 : 0
      }} onClick={() => {
        setAccountDropdownVisible(false)
      }}></div>
      <div>
        <Card
          style={{
            opacity: !accountDropdownVisible ? "0" : "1",
            transform: !accountDropdownVisible ? "scale(0.9)" : "scale(1)",
            pointerEvents: accountDropdownVisible ? "all" : "none",
          }}
          compact={true}
          className={styles.accountDropdown}>
          <RowContainer className={styles.accountDropdownQuickActions} >
            <div onClick={() => {
              setAccountDropdownVisible(false)
              localStorage.removeItem("sessiontoken")
              localStorage.removeItem("username")
              router.push("/login/")
            }}>
              <Icon name='logout' color="var(--button-fg)" />
            </div>
            <div onClick={() => {
              setAccountDropdownVisible(false)
              router.push("/about")
            }}>
              <Icon name='info-16' color="var(--button-fg)" />
            </div>
            <div onClick={() => {
              setAccountDropdownVisible(false)
              router.push("/app/settings")
            }}>
              <Icon name='gear-16' color="var(--button-fg)" />
            </div>
          </RowContainer>
          <ColContainer>
            <Button onClick={() => {
              router.push(`/app/user/profile/${userData?.userName}`)
              setAccountDropdownVisible(false)
            }}>Profile</Button>
            <Button onClick={() => {
              localStorage.removeItem("currentServer")
              router.push("/login/server")
              setAccountDropdownVisible(false)
            }}>Switch instance</Button>
          </ColContainer>
        </Card>
        <ColContainer
          className={styles.accountNotificationList}
          style={{
            opacity: !accountDropdownVisible ? "0" : "1",
            transform: !accountDropdownVisible ? "scale(0.9)" : "scale(1)",
            pointerEvents: accountDropdownVisible ? "all" : "none",
          }}>
          <Card>
            <RowContainer data-header={true}>
              <img src={require(`./../../../../public/assets/productLogos/yourdash.svg`).default.src} alt=""></img>
              <span>Notification Test</span>
            </RowContainer>
            <ColContainer>
              <p>
                This is some sample text for a notification
              </p>
              <Button onClick={() => { }}>
                Ok
              </Button>
            </ColContainer>
          </Card>
        </ColContainer>
      </div>
    </div>
  </div >;
};

export default Panel;
