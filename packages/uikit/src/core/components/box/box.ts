/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKSlotComponent } from "../../component.ts";
import styles from "./box.module.scss";

export interface BoxProps {
  noBorder?: boolean | { top?: boolean, right?: boolean, bottom?: boolean, left?: boolean };
  noRounding?: boolean;
  dimensions?: {
    width?: CSSStyleDeclaration["width"],
    height?: CSSStyleDeclaration["height"]
  }
}

export default class Box extends UKSlotComponent<BoxProps> {
  constructor( props: BoxProps ) {
    super( props );

    this.domElement = document.createElement( "div" )
    this.domElement.classList.add( styles.component )

    if ( props.noBorder !== undefined )
      this.setNoBorder( props.noBorder );

    if ( props.noRounding !== undefined )
      this.setNoRounding( props.noRounding );

    if ( props.dimensions !== undefined )
      this.setDimensions( props.dimensions );
  }

  setNoBorder( noBorder: Box["props"]["noBorder"] ) {
    if ( noBorder ) {
      if ( typeof noBorder === "boolean" ) {
        this.domElement.classList.add( styles.noBorder )
        return this
      }

      if ( noBorder.top )
        this.domElement.classList.add( styles.noTopBorder )

      if ( noBorder.right )
        this.domElement.classList.add( styles.noRightBorder )

      if ( noBorder.bottom )
        this.domElement.classList.add( styles.noBottomBorder )

      if ( noBorder.left )
        this.domElement.classList.add( styles.noLeftBorder )
    } else {
      this.domElement.classList.remove( styles.noBorder )
    }

    return this
  }

  setNoRounding( noRounding: Box["props"]["noRounding"] ) {
    if ( noRounding ) {
      this.domElement.classList.add( styles.noRounding );
    } else {
      this.domElement.classList.remove( styles.noRounding );
    }

    return this
  }

  setDimensions( dimensions: Box["props"]["dimensions"] ) {
    if ( dimensions?.width !== undefined ) {
      this.domElement.style.width = dimensions.width;
    }

    if ( dimensions?.height !== undefined ) {
      this.domElement.style.height = dimensions.height;
    }

    return this;
  }
}
