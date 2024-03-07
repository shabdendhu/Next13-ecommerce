import React from "react";
import styles from "./PageWrapper.module.scss";
import cx from "classnames";
const PageWrapper = ({ children, classNames = "", ...props }) => {
  return (
    <div className={cx(styles.component, classNames)} {...props}>
      {children}
    </div>
  );
};

export default PageWrapper;
