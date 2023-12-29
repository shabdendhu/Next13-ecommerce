"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiGet, apiPost } from "@/helpers/api";
import { useSession } from "next-auth/react";
import OrderDetails from "@/components/sections/OrderDetails";

const ConfirmOrder = () => {
  const [order, setOrder] = useState({});
  const { data: session }: any = useSession();
  const query = useSearchParams();
  console.log(query.get("orderId"));
  //   call an api useing apiPost()
  const getAllOrder = async () => {
    const orderRes = await apiGet("/api/order/" + query.get("orderId"));
    console.log({ orderRes });
    setOrder(orderRes.data);
  };
  useEffect(() => {
    if (session) {
      getAllOrder();
    }
  }, [session]);

  return (
    <div>
      <OrderDetails order={order} />
    </div>
  );
};

export default ConfirmOrder;
