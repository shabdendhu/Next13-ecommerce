"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import store from "@/store";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>{props.children}</Provider>
    </SessionProvider>
  );
};

export default Providers;
