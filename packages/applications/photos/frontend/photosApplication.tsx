/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import { IPhotoCategory } from "../shared/types/photoCategory";
import PhotoCategory from "./components/photoCategory/PhotoCategory";

const PhotosApplication: React.FC = () => {
  const [ photoCategories, setPhotoCategories ] = useState<IPhotoCategory[]>( [] );

  useEffect( () => {
    setPhotoCategories(
      Array.from( { length: 10 } ).map( ( _, i ) => {
        return {
          items: [
            ...Array.from( { length: 10 } ).map( ( __, j ) => {
              return {
                fileName: `Photo ${ i }`,
                dimensions: {
                  width: 800,
                  height: 600
                },
                tags: [],
                people: [],
                date: new Date().toISOString(),
                url: `https://picsum.photos/${800}/${600}/?random=${i.toString() + j}`
              }
            } )
          ],
          id: i.toString(),
          name: `Photos Cat ${ i }`,
        }
      }
      ) )
  }, [] );

  return (
    <div className={"grid grid-rows-[auto,1fr] h-full bg-bg overflow-auto"}>
      {
        photoCategories.map( photoCategory => {
          return <PhotoCategory key={photoCategory.id} name={photoCategory.name} items={photoCategory.items} id={photoCategory.id} />
        } )
      }
    </div>
  );
};

export default PhotosApplication;
