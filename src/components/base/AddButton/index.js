"use client";
import React, { useState } from "react";
import styles from "./AddButton.module.scss";
import RemoveIcon from "@mui/icons-material/Remove";
import { apiPost } from "@/helpers/api";
import { useSession } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { openOtpModal } from "@/redux/auth/auth";
import { useSnackbar } from "@/hooks/useSnakBar";
const AddButton = ({
  product,
  setproductQuantity,
  productQuantity,
  onAdd,
  onRemove,
  deleteFromBasket,
  disableAddButton,
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { openSnackbar } = useSnackbar();

  const addRemoveApi = async (count) => {
    try {
      setLoading(true);
      console.log(count);
      const res = await apiPost(
        "/api/basket",
        {
          userId: session.user.id,
          productId: product?._id,
          quantity: count,
        },
        openSnackbar
      );
      if (res.success) {
        setLoading(false);
        setproductQuantity(
          res.data.items.find((e) => e.product == product._id).quantity
        );
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const deleteproduceFromCart = async () => {
    setLoading(true);
    const res = await apiPost(
      "/api/basket/delete",
      {
        userId: session.user.id,
        itemId: product?._id,
      },
      openSnackbar
    );
    if (res.success) {
      setLoading(false);
      // setproductQuantity(productQuantity - 1);
    }
  };
  // const handleAdd = async (e) => {
  //   e.stopPropagation();
  //   if (!session) return router.push("/login");
  //   addRemoveApi(1);
  //   // tokenDecoded(session.accessToken);
  //   setproductQuantity(productQuantity + 1);
  // };
  // const handleRemove = (e) => {
  //   e.stopPropagation();
  //   setproductQuantity(productQuantity - 1);
  //   if (!session) return router.push("/login");
  //   if (productQuantity == 1) return deleteproduceFromCart();
  //   addRemoveApi(-1);
  // };

  const handleAdd = async (e) => {
    e.stopPropagation();
    if (!session) return dispatch(openOtpModal());

    addRemoveApi(1);
    onAdd(); // Call the provided callback
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (!session) return dispatch(openOtpModal());

    onRemove(); // Call the provided callback
    if (productQuantity == 1) {
      deleteproduceFromCart();
      deleteFromBasket();
      return;
    }
    addRemoveApi(-1);
  };
  if (!product.stock_quantity)
    return (
      <button disabled={true} className={styles.addButton}>
        Comming Soon
      </button>
    );
  return (
    <>
      {productQuantity === 0 ? (
        <button
          disabled={disableAddButton}
          className={styles.addButton}
          onClick={handleAdd}
        >
          {loading ? (
            <CircularProgress size={25} style={{ color: "blue" }} />
          ) : (
            "ADD"
          )}
        </button>
      ) : (
        <div className={styles.addRemoveButton}>
          <button
            disabled={disableAddButton}
            className={styles.decrement}
            onClick={handleRemove}
          >
            <RemoveIcon />
          </button>
          {loading ? (
            <CircularProgress size={25} style={{ color: "#FFFFFF" }} />
          ) : (
            <div className={styles.itemamt}>{productQuantity}</div>
          )}
          <button
            disabled={disableAddButton}
            className={styles.increment}
            onClick={handleAdd}
          >
            <AddIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default AddButton;
