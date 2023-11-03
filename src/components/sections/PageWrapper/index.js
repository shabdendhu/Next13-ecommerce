import React from "react";
import styles from "./PageWrapper.module.scss";

const PageWrapper = ({ children }) => {
  return <div className={styles.component}>{children}</div>;
};

export default PageWrapper;
