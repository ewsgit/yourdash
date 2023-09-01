/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as React from "react";
import BasePageLayout from "../../../components/BasePageLayout";
import BooleanSettingComponent from "../../../components/BooleanSettingComponent";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import csi from "web-client/src/helpers/csi";
import KeyValueDatabase from "shared/core/database";

const Index: React.FC = () => {
  const [num, setNum] = React.useState<number>( 0 );
  const [useBrowserLayout, setUseBrowserLayout] = React.useState<undefined | boolean>( undefined );
  const [db, setDb] = React.useState<KeyValueDatabase | undefined>( undefined )
  
  React.useEffect( () => {
    const database = csi.getUserDB();
    
    setDb( database )
  }, [] );
  
  React.useEffect( () => {
    if ( !db ) return
    
    try {
      csi.setUserDB( db )
    } catch ( err ) {
      console.log( "Unable to set the user database" )
    }
  }, [num] )
  
  if ( !db ) {
    return null
  }
  
  return (
    <BasePageLayout title={"Dashboard personalization"}>
      <BooleanSettingComponent
        title={"Use browser layout"}
        icon={YourDashIcon.Browser16}
        description={"Use the \"browser\" layout instead of the \"dashboard\" layout"}
        value={db.get( "dash:useBrowserLayout" )}
        setValue={val => {
          db.set( "dash:useBrowserLayout", val )
          setNum( num + 1 )
        }}
      />
    </BasePageLayout>
  );
};

export default Index;
