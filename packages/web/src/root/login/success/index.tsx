/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useResource from "@yourdash/tunnel/src/useResource.js";
import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";
import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKRedirect from "@yourdash/uikit/src/components/redirect/UKRedirect.js";
import UKSubtext from "@yourdash/uikit/src/components/subtext/UKSubtext.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import { z } from "zod";
import styles from "./index.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router";
import tun from "@yourdash/tunnel/src";

const LoginSuccessPage: FC = () => {
  const navigate = useNavigate();
  // const notice = useResource(() => coreCSI.getJson("/core/login/notice", "/core/login/notice"));
  const notice = useResource(
    () =>
      tun.get(
        "/core/login/notice",
        "json",
        z.object({ author: z.string(), message: z.string(), timestamp: z.number(), display: z.boolean() }),
      ),
    {
      return: "data",
    },
  );

  return (
    <div className={styles.page}>
      {notice ? (
        <UKCard
          containerClassName={styles.notice}
          headerClassName={styles.noticeHeader}
          actions={
            <>
              <UKButton
                onClick={() => {
                  navigate("/app");
                }}
                text={"Continue"}
              />
            </>
          }
          header={
            <>
              <UKHeading
                className={styles.heading}
                level={1}
                text={"Notice"}
              />
              <UKSubtext text={"authored: " + new Date(notice.timestamp || 0).toLocaleDateString()} />
            </>
          }
        >
          <UKText
            className={styles.message}
            text={notice?.message || "No message..."}
          />
          <UKSubtext
            className={styles.author}
            text={`- ${notice?.author || "Unknown author"}`}
          />
        </UKCard>
      ) : (
        // @ts-ignore
        <>{notice?.display === false && <UKRedirect to="/app" />}</>
      )}
    </div>
  );
};

export default LoginSuccessPage;
