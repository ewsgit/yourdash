/**
 * # UIKit - a vanilla JS UI library
 * https://github.com/ewsgit/yourdash
 */

import UKComponent, { UKComponentProps, UKComponentSlots } from "./component.ts";
import defaultStyles from "./default.module.scss"
export {}

// @ts-ignore
window.__uikit__ = {
  componentTree: [],
}

export default class UIKit {
  domElement: HTMLDivElement = document.createElement( "div" )
  children: UKComponent<UKComponentProps, UKComponentSlots>[] = []

  constructor( container: HTMLElement ) {
    // @ts-ignore
    window.__uikit__.componentTree.push( this )
    container.appendChild( this.domElement )
    this.domElement.classList.add( defaultStyles.uikit )
    
    // define the accent color
    this.domElement.style.setProperty( "--accent-bg", "#469ff5" )
    
    // define the accent color text color either black or white depending on the accent color's contrast
    this.domElement.style.setProperty(
      "--accent-fg",
      window.getComputedStyle( document.body ).getPropertyValue( "--accent-color" ) === "#469ff5"
        ? "0, 0, 0"
        : "255, 255, 255"
    )
    
    return this
  }

  add<P extends UKComponentProps, S extends UKComponentSlots>( component: typeof UKComponent<P, S>, props: P, slots?: S ) {
    const comp = new component( props, slots )

    comp.parentDomElement = this.domElement
    comp.parentDomElement.appendChild( comp.domElement )

    this.children.push( comp )
    return comp
  }
}