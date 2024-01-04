import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { NextPage } from "next";
import React, { useState } from "react";


import {useConnectSocket} from "../hooks/useConnectSocket";
import {SocketApi} from "../api/socket-api";

const WebSocketPage: NextPage = () => {
  const [text, setText] = useState<string>('')
  useConnectSocket()

  const sendMessage = () => {
    SocketApi.socket?.emit('server-path', { text })
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Web Sockets</h1>
        <div>
          <input type='text' onChange={(e)=> setText(e.currentTarget.value)} />
            <button onClick={sendMessage}>SEND MESSAGE</button>
        </div>
      </main>
    </>
  );
};


export default WebSocketPage;
