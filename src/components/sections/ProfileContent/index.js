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
const ProfileContent = ({ url }) => {
  console.log({ url });
  return (
    <div className={styles.component}>
      <ContentWrapper>
        {url === "order" && <MyOrders />}
        {url === "payment" && <MyPayments />}
        {url === "review" && <MyRatingsAndReviews />}
        {url === "address" && <MyAddresses />}
      </ContentWrapper>
    </div>
  );
};

export default ProfileContent;
