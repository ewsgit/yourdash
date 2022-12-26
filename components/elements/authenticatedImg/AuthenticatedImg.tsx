/*
 * Created on Tue Oct 25 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "../../../lib/server";
import { YourDashIconRawDictionary } from "../icon/iconDictionary";

export interface IAuthenticatedImg extends React.ComponentPropsWithoutRef<'img'> {
  src: string
}

const AuthenticatedImg: React.FC<IAuthenticatedImg> = ({ src, ...imgElementProps }) => {
  const [ imgSrc, setImgSrc ] = useState("")
  useEffect(() => {
    verifyAndReturnJson(
      SERVER.get(src),
      (json) => {
        setImgSrc(json?.image || YourDashIconRawDictionary[ "server-error" ])
      },
      () => {
        setImgSrc(YourDashIconRawDictionary[ "server-error" ])
      })
  }, [ src ])

  return <img draggable={false} src={imgSrc} onError={() => {
    console.log("Failed to load image")
    setImgSrc(YourDashIconRawDictionary[ "server-error" ])
  }} alt="" {...imgElementProps} />
};

export default AuthenticatedImg;
