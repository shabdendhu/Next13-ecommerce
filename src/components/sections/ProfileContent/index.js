"use client";
import React, { useEffect, useState } from "react";

import styles from "./ProfileContent.module.scss";
import { apiGet } from "@/helpers/api";
import { useSession } from "next-auth/react";
import ProductCard from "../ProductCard";

export const MyOrders = () => {
  const { data: session } = useSession();
  const [order, setOrder] = useState([]);
  const getAllorder = async () => {
    const orderRes = await apiGet(
      "/api/order?user=655f1eef08e2627ece694b9c"
      // + session?.user?.id
    );
    // setOrder()
    console.log({ orderRes, session });
    console.log(orderRes.data, "iiiiiiiiii");
    setOrder(orderRes.data);
  };
  useEffect(() => {
    if (session) getAllorder();
  }, [session]);
  return (
    <div className={styles.orderComponent}>
      {order?.map((e) => (
        <div className={styles.orderContainer} key={e._id}>
          <div className={styles.orderStatus}>{e.status}</div>
          <div className={styles.orders}>
            {e.products.map((item) => (
              <ProductCard
                className={styles.product}
                data={item.product}
                key={item.product._id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
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
