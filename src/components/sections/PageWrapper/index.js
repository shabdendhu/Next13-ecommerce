import React from "react";
import styles from "./PageWrapper.module.scss";
import cx from "classnames";
const PageWrapper = ({ children, classNames = "" }) => {
  return <div className={cx(styles.component, classNames)}>{children}</div>;
};

export default PageWrapper;
