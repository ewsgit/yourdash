/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React from "react";
import Head from "next/head";

// this is an empty page in the devdash app,
// this page is used to create the dark, light and auto preview images
// when setting the color theme in settings or the introduction

export default class Component extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>DevDash | App</title>
        </Head>
        <div
          className={`w-full dark:bg-bg-dark-secondary bg-bg-light-secondary grid grid-cols-1 sm:grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr] lg:grid-cols-[1fr,1fr,1fr,1fr] p-2 gap-2`}>
        </div>
      </>
    );
  }
}
