/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { LoginLayout } from "@yourdash/shared/core/login/loginLayout.js";
import Spinner from "@yourdash/uikit/components/spinner/spinner.js";
import { Component, Suspense, createResource } from "solid-js";
import IndexCardsPage from "./index.cards.js";
import styles from "./index.module.scss";

const LoginIndexPage: Component = () => {
  const [instanceMetadata] = createResource(async () =>
    csi.getJson<{ title: string; message?: string; loginLayout: LoginLayout }>("/login/instance/metadata"),
  );

  return (
    <Suspense
      fallback={
        <div class={styles.spinner}>
          <Spinner />
        </div>
      }
    >
      {instanceMetadata()?.loginLayout === LoginLayout.MODAL && <>MODAL layout</>}
      {instanceMetadata()?.loginLayout === LoginLayout.CARDS && <IndexCardsPage metadata={instanceMetadata()} />}
      {instanceMetadata()?.loginLayout === LoginLayout.SIDEBAR && <>SIDEBAR layout</>}
    </Suspense>
  );
};

export default LoginIndexPage;
