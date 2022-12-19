/*
 * Created on Tue Oct 25 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useEffect, useState } from "react";
import SERVER from "../../../lib/server";
import { YourDashIconRawDictionary } from "../icon/iconDictionary";

export interface IAuthenticatedImg extends React.ComponentPropsWithoutRef<'img'> {
  src: string
}

const AuthenticatedImg: React.FC<IAuthenticatedImg> = ({ src, ...imgElementProps }) => {
  const [ imgSrc, setImgSrc ] = useState("")
  useEffect(() => {
    SERVER.get(src)
      .then((res) => res.json())
      .then((json) => {
        setImgSrc(json.image)
      })
      .catch((err) => {
        console.error(err); setImgSrc(YourDashIconRawDictionary[ "server-error" ])
      })
  }, [ src ])

  return <img draggable={false} src={imgSrc} alt="" {...imgElementProps} />
};

export default AuthenticatedImg;
