import Head from "next/head";
import React, { useEffect, useState } from "react";
import Button from "../../../components/elements/button/Button";
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import SERVER, { verifyAndReturnJson } from "../../../lib/server";
import { NextPageWithLayout } from '../../page';
import styles from "./dash.module.scss";
import { useRouter } from "next/router";

const Dash: NextPageWithLayout = () => {
  const router = useRouter()

  const [ name, setName ] = useState("")
  const [ currentTime, setCurrentTime ] = useState("00:01")

  useEffect(() => {
    verifyAndReturnJson(
      SERVER.get("/userManagement/current/user"),
      (response) => {
        const user = response.user
        setName(user?.name?.first + " " + user?.name?.last)
      },
      () => {
        setName("ERROR")
      })
  }, [])

  useEffect(() => {
    setCurrentTime((new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`) + ":" + (new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`))

    const interval = setInterval(() => {
      setCurrentTime((new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`) + ":" + (new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`))
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (name === "") return <></>
  return (
    <>
      <Head>
        <title>YourDash | Dashboard</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.welcome}>
          <span className={styles.clock}>{currentTime}</span>
          <span>Hiya, {name}</span>
        </div>
        <div className={styles.main}>
          <div className={styles.homeMessage}>
            <div>
              <h1>Oh no!</h1>
              <p>It appears that you have no dash widgets installed.</p>
              <Button onClick={() => {
                router.push(`/app/store`)
              }} vibrant>Explore dash widgets</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dash;

Dash.getLayout = (page) => {
  return <AppLayout transparentBackground={true}>{page}</AppLayout>
}