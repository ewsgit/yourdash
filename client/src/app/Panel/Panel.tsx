import React, { useEffect, useState } from "react"
import clippy from "../../helpers/clippy"
import csi from "helpers/csi"
import { IconButton, RightClickMenu } from "../../ui"
import PanelApplicationLauncher from "./launcher/PanelLaunchers"
import { useNavigate } from "react-router-dom"
import PanelDesktopIndicator from "./desktop/PanelDesktopIndicator"

export enum PanelPosition {
  left,
  top,
  right,
  bottom,
}

export interface IPanel {
  side: PanelPosition;
  setSide: ( side: PanelPosition ) => void;
}

interface IPanelQuickShortcut {
  displayName: string;
  url: string;
  icon: string;
}

const PanelQuickShortcuts: React.FC<{ num: number; side: PanelPosition }> = ( { num, side } ) => {
  const navigate = useNavigate()
  const [quickShortcuts, setQuickShortcuts] = useState<IPanelQuickShortcut[]>(
    []
  )

  useEffect( () => {
    csi.getJson( "/panel/quick-shortcuts", resp => {
      return setQuickShortcuts( resp )
    } )
  }, [num] )

  return (
    <>
      { quickShortcuts.map( ( shortcut, ind ) => {
        return (
          <RightClickMenu
            key={ shortcut.url }
            items={ [
              {
                name: "Unpin from panel",
                onClick() {
                  csi.deleteJson( `/panel/quick-shortcut/${ ind }`, () => {
                    // @ts-ignore
                    Panel.reload() // eslint-disable-line no-use-before-define
                  } )
                }
              }
            ] }
          >
            <button
              type={ "button" }
              className={ "w-full aspect-square relative group flex items-center justify-center mr-1 cursor-pointer outline-0 !bg-transparent" }
              onClick={ e => {
                e.currentTarget.blur()
                navigate( shortcut.url )
              } }
            >
              <img
                draggable={ false }
                src={ shortcut.icon }
                alt=""
                className={ "w-[2rem] group-hover:scale-110 group-focus-within:scale-125 group-active:scale-95 transition-[var(--transition)]" }
              />
              <span
                className={ clippy(
                  "absolute z-50 pl-2 pr-2 pt-0.5 pb-0.5 bg-container-bg rounded-lg" +
                  " pointer-events-none group-hover:opacity-100 opacity-0" +
                  " group-hover:[transition:var(--transition-fast)] shadow-lg" +
                  " [transition:var(--transition)]",
                  side === PanelPosition.left &&
                  "ml-4 left-full top-1/2 -translate-y-1/2",
                  side === PanelPosition.top &&
                  "mt-4 top-full left-1/2 -translate-x-1/2",
                  side === PanelPosition.right &&
                  "mr-4 right-full top-1/2 -translate-y-1/2",
                  side === PanelPosition.bottom &&
                  "mb-4 bottom-full left-1/2 -translate-x-1/2"
                ) }
              >
                { shortcut.displayName }
              </span>
            </button>
          </RightClickMenu>
        )
      } ) }
    </>
  )
}

const PanelInstanceIcon: React.FC = () => {
  const navigate = useNavigate()
  const [instanceUrl, setInstanceUrl] = useState<string | null>( null )

  useEffect( () => {
    setInstanceUrl( localStorage.getItem( "current_server" ) )
  }, [] )

  if ( !instanceUrl ) {
    return <div/>
  }

  return (
    <button
      type={ "button" }
      className={ "border-none !bg-transparent" }
      onClick={ () => {
        return navigate( "/app/a/dash" )
      } }
    >
      <img
        src={ `${ instanceUrl }/panel/logo/small` }
        alt={ "" }
        className={ "cursor-pointer select-none" }
      />
    </button>
  )
}

const PanelAuthorizer: React.FC = () => {
  const navigate = useNavigate()
  useEffect( () => {
    if ( !localStorage.getItem( "current_server" ) ) {
      setTimeout( () => {
        console.clear()
      }, 1000 )
      navigate( "/login" )
    } else {
      csi.getJson(
        "/login/is-authenticated",
        () => {
          return null
        },
        () => {
          setTimeout( () => {
            console.clear()
          }, 1000 )
          localStorage.removeItem( "session_token" )
          navigate( "/login/server" )
        }
      )
    }
  }, [navigate] )

  return null
}

export interface YourDashLauncherApplication {
  name: string;
  displayName: string;
  icon: string;
  description: string;
}

const Panel: React.FC<IPanel> = ( { side, setSide } ) => {
  const [num, setNum] = useState<number>( 0 )
  const [launcherType, setLauncherType] = useState<number>( 0 )

  //  @ts-ignore
  Panel.reload = () => {
    setNum( num + 1 )
  }

  useEffect( () => {
    csi.getJson( "/panel/position", res => {
      setSide( res.position )
    } )

    csi.getJson( "/panel/launcher", res => {
      setLauncherType( res.launcher )
    } )
  }, [num] ) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={ {
        ...( side === PanelPosition.top || side === PanelPosition.bottom
          ? {
            flexDirection: "row",
            width: "100%"
          }
          : {
            flexDirection: "column",
            height: "100%"
          } ),
        ...( side === PanelPosition.left && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        } ),
        ...( side === PanelPosition.right && {
          borderLeft: "0.1rem solid var(--application-panel-border)",
          gridRowEnd: -1,
          gridColumnStart: 2
        } ),
        ...( side === PanelPosition.top && {
          borderBottom: "0.1rem solid var(--application-panel-border)"
        } ),
        ...( side === PanelPosition.bottom && {
          borderTop: "0.1rem solid var(--application-panel-border)",
          gridColumnEnd: -1,
          gridRowStart: 2
        } )
      } }
      className={ "bg-container-bg flex p-2 gap-1 relative justify-center items-center z-10" }
    >
      {/* invisible component which checks that the user is authorized on the first load of the panel*/ }
      <PanelAuthorizer/>
      <PanelApplicationLauncher side={ side } type={ launcherType }/>
      <PanelInstanceIcon/>
      {/* separator */ }
      <div
        className={ clippy(
          `
          rounded-full
          bg-[var(--application-panel-border)]
          `,
          side === PanelPosition.top || side === PanelPosition.bottom
            ? "h-full w-0.5 ml-1 mr-1"
            : "w-full h-0.5 mt-1 mb-1"
        ) }
      />
      <PanelQuickShortcuts num={ num } side={ side }/>
      <section
        className={ clippy(
          side === PanelPosition.left || side === PanelPosition.right
            ? "mt-auto w-full flex-col"
            : "ml-auto h-full",
          "justify-center items-center flex gap-2"
        ) }
      >
        <PanelDesktopIndicator side={ side }/>
        {/*
         
         TODO: feature idea, Quick search ( basically just opens a command panel for all of yourdash )
         Note: remember include application filtering
         
         */ }
        <IconButton icon={ "search-16" }/>
      </section>
    </div>
  )
}

export default Panel
