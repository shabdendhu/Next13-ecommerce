"use client";
import React from "react";
import styles from "./ProductCard.module.scss";
import Productdetails from "@/components/sections/Productdetails";
import cx from "classnames";
import AddButton from "@/components/base/AddButton";
import { useRouter } from "next/navigation";

const ProductCard = ({ data, className, ...props }) => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/product-details");
  };

  return (
    <div
      onClick={handleRedirect}
      className={cx(styles.cardContainer, className)}
      {...props}
    >
      <div className={styles.discountLabel}>{data.discount}% off</div>
      <div className={styles.cardimg}>
        <img src={data.images[0]} />
      </div>

      <div className={styles.cardinfo}>
        <div className={styles.productName}>{data.name}</div>

        <div className={styles.details}>
          <div className={styles.priceInfo}>
            <del> {Math.round(data.price / (1 - data.discount / 100))}/kg</del>{" "}
            <span>{data.price}</span>
          </div>
          <div className={styles.price}>₹{data.price}</div>
        </div>

        <div className={styles.cardlower}>
          <div style={{ fontSize: "13px", fontWeight: "100px" }}>1kg</div>
          <AddButton />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
