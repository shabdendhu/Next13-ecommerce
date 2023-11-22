"use client";
import React, { useState } from "react";
import styles from "./AddButton.module.scss";
import { apiGet, apiPost } from "@/helpers/api";
import { useSession } from "next-auth/react";
import tokenDecoded from "@/helpers/tokenDecoded";
const AddButton = ({ product, setproductQuantity, productQuantity }) => {
  const { data: session } = useSession();
  // console.log(product);
  const handleAdd = async (e) => {
    e.stopPropagation();
    const addRes = await apiPost("/api/basket", {
      userId: session.user.id,
      productId: product._id,
      quantity: 1,
    });
    tokenDecoded(session.accessToken);
    setproductQuantity(productQuantity + 1);
  };
  const handleRemove = (e) => {
    e.stopPropagation();
    setproductQuantity(productQuantity - 1);
  };
  return (
    <>
      {productQuantity === 0 ? (
        <button className={styles.addButton} onClick={handleAdd}>
          ADD
        </button>
      ) : (
        <button className={styles.addRemoveButton}>
          <div className={styles.decrement} onClick={handleRemove}>
            -
          </div>
          <div className={styles.itemamt}>{productQuantity}</div>
          <div className={styles.increment} onClick={handleAdd}>
            +
          </div>
        </button>
      )}
    </>
  );
};

export default AddButton;
