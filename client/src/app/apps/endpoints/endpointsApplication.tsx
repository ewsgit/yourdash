import React, { useState, useEffect } from "react";
import { Icon, Button, DropdownButton, TextBox } from "../../../ui";
import csi from "../../../helpers/csi";
import AutocompletedTextInput from "../../../ui/components/autocompletedTextInput/AutocompletedTextInput";

function loadPossibleEndpoints( setEndpoints: ( data: string[] ) => void ) {
  csi.getJson( "/app/endpoints/endpoints", data => {
    const endpoints = data.map( ( endpoint: any ) => endpoint?.route?.path || null ).filter( ( endpoint: any ) => endpoint !== null );
    
    setEndpoints( endpoints );
  } );
}

const EndpointsApplication: React.FC = () => {
  const [requestType, setRequestType] = useState<"Text" | "JSON">( "JSON" );
  const [requestMethod, setRequestMethod] = useState<"GET" | "POST" | "DELETE">( "GET" );
  const [requestHeaders, setRequestHeaders] = useState<{
    [ key: string ]: string
  }>( {} );
  const [requestBody, setRequestBody] = useState<string>( "" );
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>( "" );
  const [endpoints, setEndpoints] = useState<string[]>( [] );
  const [loading, setLoading] = useState<boolean>( true );
  const [didError, setDidError] = useState<string | false>( false );
  const [response, setResponse] = useState<string>( "" );
  
  useEffect( () => {
    loadPossibleEndpoints( endpoints => setEndpoints( endpoints ) );
  }, [] );
  
  return (
    <main>
      <header className={"w-full p-3 flex items-center justify-between sticky top-0 bg-container-bg text-container-fg"}>
        <section className={"flex items-center justify-center h-full gap-2"}>
          <DropdownButton
            items={
              [
                {
                  name: "Get",
                  onClick() {
                    setRequestMethod( "GET" );
                  }
                },
                {
                  name: "Post",
                  onClick() {
                    setRequestMethod( "POST" );
                  }
                },
                {
                  name: "Delete",
                  onClick() {
                    setRequestMethod( "DELETE" );
                  }
                }
              ]
            }
          >
            {"Get"}
          </DropdownButton>
          <DropdownButton
            items={
              [
                {
                  name: "Text",
                  onClick() {
                    setRequestType( "Text" );
                  }
                },
                {
                  name: "JSON",
                  onClick() {
                    setRequestType( "JSON" );
                  }
                }
              ]
            }
          >
            {"JSON"}
          </DropdownButton>
        </section>
        <section className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
          <div className={"flex items-center justify-center h-full gap-1.5"}>
            <Icon className={"h-9 aspect-square"} useDefaultColor name={"yourdash-logo"}/>
            <h2 className={"text-3xl font-semibold tracking-wide"}>
              YourDash Endpoints tester
            </h2>
          </div>
        </section>
        <section className={"flex items-center justify-center h-full gap-2"}>
          <Button
            onClick={() => {
              setDidError( false );
              setLoading( true );
              
              switch ( requestMethod ) {
                case "GET":
                  switch ( requestType ) {
                    case "Text":
                      csi.getText( selectedEndpoint, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    case "JSON":
                      csi.getJson( selectedEndpoint, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    default:
                      setDidError( "[INTERNAL] This should never happen" );
                  }
                  break;
                case "POST":
                  switch ( requestType ) {
                    case "Text":
                      csi.postText( selectedEndpoint, requestBody, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    case "JSON":
                      csi.postJson( selectedEndpoint, requestBody, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    default:
                      setDidError( "[INTERNAL] This should never happen" );
                  }
                  break;
                case "DELETE":
                  switch ( requestType ) {
                    case "Text":
                      csi.deleteText( selectedEndpoint, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    case "JSON":
                      csi.deleteJson( selectedEndpoint, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    default:
                      setDidError( "[INTERNAL] This should never happen" );
                  }
                  break;
                default:
                  setDidError( "[INTERNAL] This should never happen" );
              }
            }}
          >
            {"Send request"}
          </Button>
        </section>
      </header>
      <main className={"p-3 grid grid-cols-[2fr,3fr] gap-2"}>
        <section className={"bg-container-bg text-container-fg rounded-container-rounding p-2 h-max flex flex-col"}>
          <AutocompletedTextInput
            options={endpoints}
            label={"Request Endpoint"}
            onChange={value => {
              setSelectedEndpoint( value );
            }}
            className={"mb-2"}
          />
          {
            requestMethod !== "GET" && (
              <>
                <span className={"-mb-0.5 text-opacity-60 text-container-fg"}>Request Body</span>
                <TextBox
                  defaultValue={"{\n  \n}"}
                  onChange={e => {
                    setRequestBody( e.currentTarget.value );
                  }}
                />
              </>
            )
          }
          <span className={"-mb-0.5 text-opacity-60 text-container-fg"}>Request Extra Headers</span>
          <TextBox
            defaultValue={"{\n  \n}"}
            onChange={e => {
              setRequestHeaders( JSON.parse( e.currentTarget.value ) );
            }}
          />
        </section>
        <section className={"overflow-x-auto w-auto"}>
          <pre className={"bg-container-tertiary-bg text-container-fg p-4 rounded-container-rounding w-auto"}>
            {
              requestType === "JSON"
                ? JSON.stringify( response, null, 2 )
                : response
            }
          </pre>
          {
            didError && (
              <pre className={"bg-container-tertiary-bg text-red-400 p-4 rounded-container-rounding"}>
                {
                  didError
                }
              </pre>
            )
          }
        </section>
      </main>
    </main>
  );
};

export default EndpointsApplication;
