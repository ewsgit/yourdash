/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useYourDashLib from "web-client/src/helpers/ydsh";
import { IconButton, Spinner, Card, Button, Icon, MajorButton, Carousel } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import StoreApplicationDefaultHeaderBackground from "./default_background.svg";
import useTranslate from "web-client/src/helpers/i10n";
import { type IYourDashStoreApplication } from "shared/apps/store/storeApplication";
import InstallationPopup from "./components/InstallationPopup";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

function requestApplication( applicationId: string, setAppData: ( data: IYourDashStoreApplication ) => void, setIsLoading: ( data: boolean ) => void, navigate: ( data: string ) => void ) {
  csi.getJson( `/app/store/application/${ applicationId }`, data => {
    setAppData( data );
    setIsLoading( false );
  }, () => {
    navigate( "/app/a/store" );
  } );
}

const StoreApplicationPage: React.FC = () => {
  const trans = useTranslate( "store" );
  const ydsh = useYourDashLib()
  const navigate = useNavigate();
  const { id: applicationId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>( true );
  const [appData, setAppData] = useState<IYourDashStoreApplication>();
  const [showInstallationConfirmation, setShowInstallationConfirmation] = useState<boolean>( false );
  
  useEffect( () => {
    setShowInstallationConfirmation( false );
    setIsLoading( true );
    requestApplication( applicationId || "dash", data => setAppData( data ), setIsLoading, navigate );
  }, [applicationId, navigate] );
  
  if ( !applicationId ) {
    navigate( "/app/a/store" );
    return null;
  }
  
  return ( <div className={ "h-full relative" }>
    { showInstallationConfirmation && ( <InstallationPopup
      applicationData={ appData }
      onClose={ () => setShowInstallationConfirmation( false ) }
      onConfirm={ () => {
        csi.postJson( `/app/store/application/install/${ appData?.name }`, {}, resp => {
          if ( resp.success ) {
            requestApplication( applicationId, setAppData, setIsLoading, navigate );
            ydsh.toast.success( `Installed "${appData?.name}" successfully` )
          }
          
          // @ts-ignore
          window.__yourdashCorePanelReload();
        } );
        setShowInstallationConfirmation( false );
      } }
    /> ) }
    {
      isLoading
        ? <div className={ "w-full h-full flex items-center justify-center" }>
          <Spinner />
          { /* TODO: add a back button */ }
        </div>
        : appData && ( <>
          <header className={ "flex flex-col w-full bg-container-bg" }>
            <div
              style={ {
                backgroundImage: `url(${ StoreApplicationDefaultHeaderBackground })`
              } }
              className="sm:h-64 h-32 transition-all bg-cover bg-center flex select-none items-center justify-center flex-row gap-3 animate__animated animate__fadeIn"
            >
              <img
                className={ "aspect-square drop-shadow-lg sm:w-24 w-0 transition-all" }
                src={ appData.icon }
                draggable={ false }
                alt=""
              />
              <h1 className={ "text-5xl tracking-wider font-black drop-shadow-lg w-max" }>
                { appData.displayName }
              </h1>
            </div>
            <section className={ "flex items-center p-4 gap-4 max-w-[50rem] w-full ml-auto mr-auto animate__animated animate__fadeIn animate__250ms" }>
              <IconButton
                icon={ YourDashIcon.ChevronLeft }
                onClick={ () => {
                  navigate( `/app/a/store/cat/${ appData?.category }` );
                } }
              />
              <img
                className={ "w-24 aspect-square select-none" }
                src={ appData.icon }
                draggable={ false }
                alt=""
              />
              <h1 className={ "text-4xl font-semibold tracking-wide mr-auto" }>
                { appData.displayName }
              </h1>
              <div className={ "flex gap-2" }>
                { appData.installed && ( <MajorButton
                  onClick={ () => {
                    navigate( `/app/a/${ appData.name }` );
                  } }
                >
                  { trans( "OPEN_APPLICATION" ) }
                </MajorButton> ) }
                <Button onClick={ () => {
                  if ( appData.installed ) {
                    csi.postJson( `/app/store/application/uninstall/${ appData.name }`, {}, resp => {
                      if ( resp.success ) {
                        requestApplication( applicationId, setAppData, setIsLoading, navigate );
                        ydsh.toast.success( `Uninstalled "${appData.name}" successfully` )
                      }
                  
                      // @ts-ignore
                      window.__yourdashCorePanelReload();
                    } );
                  } else {
                    setShowInstallationConfirmation( true );
                  }
                } }
                >
                  { appData.installed ? trans( "UNINSTALL" ) : trans( "INSTALL" ) }
                </Button>
              </div>
            </section>
          </header>
          <main
            className={ "p-4 flex flex-col gap-2 max-w-[50rem] w-full ml-auto mr-auto animate__500ms animate__animated animate__fadeIn" }
          >
            <Card showBorder>
              { appData.description }
            </Card>
            <h2 className={ "text-2xl font-medium" }>{ trans( "ABOUT_SECTION" ) }</h2>
            <Card
              showBorder
              className={ "flex flex-col items-start" }
            >
              <div>
                { `Category: ${ appData.category }` }
              </div>
              <div>
                { `ID: ${ appData.name }` }
              </div>
              <br />
              <div>
                { "Created as part of the YourDash Project" }
              </div>
            </Card>
            <Card
              showBorder
              onClick={ () => {
                window.open( `https://github.com/yourdash-app/yourdash/tree/main/packages/applications/${ appData.name }` );
              } }
              className={ "flex gap-1 items-center" }
            >
              <Icon className={ "h-5" } icon={ YourDashIcon.Link } />
              <span>
                { "View Source" }
              </span>
            </Card>
            <h2 className={ "text-2xl font-medium" }>{ trans( "AUTHORS_SECTION" ) }</h2>
            <section className={ "w-full" }>
              <Carousel>
                { appData.authors?.map( author => (
                  <Card
                    key={ author.avatarUrl }
                    className={ "flex flex-col gap-2" }
                    showBorder
                    onClick={ () => {
                      window.location.href = author.site;
                    } }
                  >
                    <img
                      className={ "h-24 aspect-square rounded-container-rounding" }
                      src={ author.avatarUrl }
                      alt={ author.avatarUrl }
                    />
                    <div className={ "flex items-center justify-between gap-2 flex-col w-full" }>
                      <span>{ author.displayName }</span>
                      { author.role && (
                        <div className={"bg-container-secondary-bg text-container-secondary-fg w-[calc(100%+1rem)] -mb-2 text-center rounded-b-container-secondary-rounding rounded-t-sm p-1"}>
                          {author.role}
                        </div>
                      ) }
                    </div>
                  </Card> ) ) }
              </Carousel>
            </section>
          </main>
        </> ) }
  </div> );
};

export default StoreApplicationPage;
