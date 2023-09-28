/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default function lerp( a: number, b: number, t: number ): number {
  return a * ( 1 - t ) + b * t
}
