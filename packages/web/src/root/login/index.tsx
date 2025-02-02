/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { LoginLayout } from "@yourdash/shared/core/login/loginLayout.ts";
import UKFlex from "@yourdash/uikit/src/components/flex/UKFlex.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKSpinner from "@yourdash/uikit/src/components/spinner/UKSpinner.js";
import { z } from "zod";
import IndexCardsPage from "./index.cards.tsx";
import styles from "./index.module.scss";
import React, { FC, Suspense } from "react";
import useResource from "@yourdash/tunnel/src/useResource.ts";
import tun from "@yourdash/tunnel/src/index.ts";

const LoginIndexPage: FC = () => {
  const instanceMetadata = useResource(
    () =>
      tun.get(
        "/login/instance/metadata",
        "json",
        z.object({ title: z.string(), message: z.string(), loginLayout: z.nativeEnum(LoginLayout) }),
      ),
    { return: "data" },
  );

  const SelectedLayout: FC = () => {
    switch (instanceMetadata?.loginLayout) {
      case LoginLayout.MODAL:
        return <>MODAL layout</>;
      case LoginLayout.CARDS:
        return <IndexCardsPage metadata={instanceMetadata} />;
      case LoginLayout.SIDEBAR:
        return <>SIDEBAR layout</>;
      default:
        return (
          <UKFlex
            centerHorizontally
            centerVertically
            padding
            direction={"column"}
          >
            <UKHeading text={"Awaiting instance response..."} />
          </UKFlex>
        );
    }
  };

  return (
    <>
      <Suspense
        fallback={
          <div className={styles.spinner}>
            <UKSpinner />
          </div>
        }
      >
        <SelectedLayout />
      </Suspense>
    </>
  );
};

export default LoginIndexPage;
