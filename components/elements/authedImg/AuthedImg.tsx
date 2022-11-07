/*
 * Created on Tue Oct 25 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useEffect, useState } from "react";
import { YourDashIconRawDictionary } from "../icon/iconDictionary";
import { getServer } from "./../../../lib/server"

export interface IAuthedImg extends React.ComponentPropsWithoutRef<'img'> {
  src: string
}

const AuthedImg: React.FC<IAuthedImg> = ({ src, ...imgElementProps }) => {
  const [ imgSrc, setImgSrc ] = useState(YourDashIconRawDictionary["server-error"])
  useEffect(() => {
    getServer(src)
      .then(res => res.blob())
      .then(blob => {
        setImgSrc(URL.createObjectURL(blob))
      });
  }, [src])

  return <img src={imgSrc} alt="" {...imgElementProps} />
};

export default AuthedImg;
