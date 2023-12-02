import React from "react";

import styles from "./ProfileContent.module.scss";

export const MyOrders = () => {
  return <div>order</div>;
};

export const MyPayments = () => {
  return "MYPAYMENTS";
};

export const MyRatingsAndReviews = () => {
  return "MyRatingsAndReviews";
};

export const MyAddresses = () => {
  return "MYPAYMEMyAddressesNTS";
};

const ContentWrapper = ({ children }) => {
  return children;
};
const ProfileContent = ({ activeTab }) => {
  console.log({ url: activeTab });
  return (
    <div className={styles.component}>
      <ContentWrapper>
        {activeTab === "/profile/order" && <MyOrders />}
        {activeTab === "/profile/payment" && <MyPayments />}
        {activeTab === "/profile/review" && <MyRatingsAndReviews />}
        {activeTab === "/profile/address" && <MyAddresses />}
      </ContentWrapper>
    </div>
  );
};

export default ProfileContent;
