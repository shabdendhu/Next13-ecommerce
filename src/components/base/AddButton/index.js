"use client";
import React, { useState } from "react";
import styles from "./AddButton.module.scss";
import RemoveIcon from "@mui/icons-material/Remove";
import { apiDelete, apiGet, apiPost } from "@/helpers/api";
import { useSession } from "next-auth/react";
import tokenDecoded from "@/helpers/tokenDecoded";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { Diversity3 } from "@mui/icons-material";
const AddButton = ({ product, setproductQuantity, productQuantity }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // console.log(product);
  const addRemoveApi = async (count) => {
    setLoading(true);
    const res = await apiPost("/api/basket", {
      userId: session.user.id,
      productId: product?._id,
      quantity: count,
    });
    if (res.success) setLoading(false);
  };
  const deleteproduceFromCart = async () => {
    setLoading(true);
    const res = await apiPost("/api/basket/delete", {
      userId: session.user.id,
      itemId: product?._id,
    });
    if (res.success) setLoading(false);
  };
  const handleAdd = async (e) => {
    e.stopPropagation();
    if (!session) return router.push("/login");
    addRemoveApi(1);
    // tokenDecoded(session.accessToken);
    setproductQuantity(productQuantity + 1);
  };
  const handleRemove = (e) => {
    e.stopPropagation();
    setproductQuantity(productQuantity - 1);
    if (!session) return router.push("/login");
    if (productQuantity == 1) return deleteproduceFromCart();
    addRemoveApi(-1);
  };
  return (
    <>
      {productQuantity === 0 ? (
        <button className={styles.addButton} onClick={handleAdd}>
          ADD
        </button>
      ) : (
        <div className={styles.addRemoveButton}>
          <button className={styles.decrement} onClick={handleRemove}>
            <RemoveIcon />
          </button>
          {loading ? (
            <CircularProgress size={25} style={{ color: "#FFFFFF" }} />
          ) : (
            <div className={styles.itemamt}>{productQuantity}</div>
          )}
          <button className={styles.increment} onClick={handleAdd}>
            <AddIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default AddButton;
