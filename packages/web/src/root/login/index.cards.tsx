/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import EndpointResponseLoginInstanceMetadata from "@yourdash/shared/endpoints/login/instance/metadata.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import toAuthImgUrl from "@yourdash/tunnel/src/getAuthImage.js";
import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";
import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import UKFlex from "@yourdash/uikit/src/components/flex/UKFlex.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKImage from "@yourdash/uikit/src/components/image/UKImage.js";
import UKSubtext from "@yourdash/uikit/src/components/subtext/UKSubtext.js";
import UKTextInput from "@yourdash/uikit/src/components/textInput/UKTextInput.js";
import UKSeparator from "@yourdash/uikit/src/components/separator/UKSeparator.js";
import useToast from "@yourdash/uikit/src/core/toasts/useToast.js";
import styles from "./index.cards.module.scss";
import loginUser from "./lib/loginUser.ts";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import tun from "@yourdash/tunnel/src/index.ts";

const IndexCardsPage: FC<{ metadata: EndpointResponseLoginInstanceMetadata | null }> = (props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<{ avatar: string; fullName: { first: string; last: string }; isValid: boolean }>({
    avatar: "",
    fullName: { first: "", last: "" },
    isValid: false,
  });

  useEffect(() => {
    if (localStorage.getItem("current_user_username") || "" !== "") {
      setUsername(localStorage.getItem("current_user_username") || "");
      fetch(`${tun.baseUrl}/login/user/${localStorage.getItem("current_user_username") || ""}`, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.error) {
            setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
          } else {
            setUser({
              avatar: `/login/user/${localStorage.getItem("current_user_username") || ""}/avatar`,
              fullName: resp.name,
              isValid: true,
            });
          }
        })
        .catch(() => {
          setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
        });
    }
  }, []);

  useEffect(() => {
    fetch(`${tun.baseUrl}/login/user/${username}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.error) {
          setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
        } else {
          setUser({
            avatar: `/login/user/${username}/avatar`,
            fullName: resp.name,
            isValid: true,
          });
        }
      })
      .catch(() => {
        setUser({ avatar: "", fullName: { first: "", last: "" }, isValid: false });
      });
  }, [username]);

  return (
    <div className={styles.page}>
      <UKCard className={clippy(styles.formCard)}>
        {user.isValid ? (
          <>
            <UKImage
              className={styles.avatar}
              src={toAuthImgUrl(user.avatar)}
              accessibleLabel={"Your Avatar"}
            />
            <UKHeading
              level={2}
              text={`${user.fullName.first} ${user.fullName.last}`}
            />
          </>
        ) : (
          <UKHeading
            level={3}
            text={"Login"}
          />
        )}
        <UKSeparator direction={"column"} />
        <UKTextInput
          accessibleName={"Username"}
          placeholder={"Username"}
          type={"username"}
          defaultValue={localStorage.getItem("current_user_username") || ""}
          getValue={setUsername}
          autoComplete={`yourdash-instance-login username instance-${tun.baseUrl}`}
        />
        <UKTextInput
          accessibleName={"Password"}
          placeholder={"Password"}
          type={"password"}
          getValue={setPassword}
          autoComplete={`yourdash-instance-login password instance-${tun.baseUrl}`}
          onSubmit={() => {
            if (!(username === "" || password === "" || !user.isValid)) {
              loginUser(username, password)
                .then(() => {
                  navigate("/login/success");
                })
                .catch(() => {
                  console.log("TODO: implement a toasts notification here for a failed login!");
                });
            }
          }}
        />
        <UKSeparator direction={"column"} />
        <UKButton
          className={styles.button}
          text={"Login"}
          disabled={username === "" || password === "" || !user.isValid}
          onClick={() => {
            loginUser(username, password)
              .then(() => {
                navigate("/login/success");
              })
              .catch(() => {
                toast.create({
                  type: "error",
                  content: { title: "Login Failure", body: "You login attempt failed, please try again. The password may be incorrect!" },
                });
              });
          }}
        />
        <UKSubtext
          className={styles.instanceUrl}
          text={tun.baseUrl}
        />
      </UKCard>
      <UKCard
        className={styles.metadataCard}
        containerClassName={styles.metadataCardContainer}
      >
        <UKImage
          containerClassName={styles.backgroundImageContainer}
          className={styles.backgroundImage}
          src={toAuthImgUrl("/login/instance/background")}
          accessibleLabel={""}
        />
        <UKFlex
          direction={"column"}
          className={styles.metadata}
        >
          <UKHeading
            level={1}
            text={props.metadata?.title || "Unknown instance title"}
            className={styles.title}
          />
          {props.metadata?.message && (
            <UKSubtext
              className={styles.message}
              text={props.metadata.message}
            />
          )}
        </UKFlex>
      </UKCard>
    </div>
  );
};

export default IndexCardsPage;
