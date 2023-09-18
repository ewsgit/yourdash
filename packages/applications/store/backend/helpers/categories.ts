/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashApplication, { getAllApplications } from "backend/src/helpers/applications.js";
import log, { logType } from "backend/src/helpers/log.js";

export default async function getAllCategories(): Promise<string[]> {
  const applications = await getAllApplications();

  const categories: { [ key: string ]: boolean } = {};

  for ( const applicationName of applications ) {
    const unreadApplication = new YourDashApplication( applicationName );
    
    if ( !( await unreadApplication.exists() ) ) {
      continue;
    }
    
    const app = await unreadApplication.read();
    
    try {
      categories[app.getCategory()] = true;
    } catch ( _err ) {
      log( logType.ERROR, `application: ${ app?.getName() || applicationName } doesn't have a category defined` );
    }
  }

  return Object.keys( categories );
}

export async function getAllApplicationsFromCategory( category: string ): Promise<string[]> {
  const applications = await getAllApplications();

  const results = await Promise.all( applications.map( async application => await ( new YourDashApplication( application ).read() ) ) );

  return results.filter( app => app.getCategory() === category ).map( app => app.getName() );
}
