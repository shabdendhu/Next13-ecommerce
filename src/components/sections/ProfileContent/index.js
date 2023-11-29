import React from "react";

import styles from "./ProfileContent.module.scss";

export const MyOrders = () => {
  return <div>order</div>;
};

export const MyPayments = () => {
  return "MYPAYMENTS";
};

export const MyRatingsAndReviews = () => {
  return "MYPAYMENTS";
};

export const MyAddresses = () => {
  return "MYPAYMENTS";
};

const ContentWrapper = ({ children }) => {
  return children;
};
const ProfileContent = () => {
  return (
    <div className={styles.component}>
      <ContentWrapper>
        <MyOrders />
      </ContentWrapper>
    </div>
  );
};

export default ProfileContent;
