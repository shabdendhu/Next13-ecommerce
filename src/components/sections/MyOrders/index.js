"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { apiGet } from "@/helpers/api";
import ProductCard from "../ProductCard";
import styles from "./MyOrder.module.scss";

const MyOrders = () => {
  const { data: session } = useSession();
  const [order, setOrder] = useState([]);
  const getAllorder = async () => {
    try {
      const orderRes = await apiGet("/api/order?user=" + session?.user?.id);
      setOrder(orderRes.data);
    } catch (error) {
      console.error(error);
    }
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
export default MyOrders;
