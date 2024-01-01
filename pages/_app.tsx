import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import client from "./../apollo-client";

interface Props extends AppProps {
  Component: AppProps["Component"] & {
    getLayout: (page: React.ReactElement) => React.ReactNode;
  };
}

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
    </ApolloProvider>
  );
}
