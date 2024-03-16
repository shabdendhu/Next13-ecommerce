"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import store from "@/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "@/providers/SnackbarProvider"; // Import the SnackbarProvider from the new file

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <SnackbarProvider>
      <SessionProvider>
        <Provider store={store}>{props.children}</Provider>
      </SessionProvider>
    </SnackbarProvider>
  );
};

export default Providers;
