import React from "react";
import styles from "./ProductsHomeSection.module.scss";
import ProductCard from "../ProductCard";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const ProductsHomeSection = () => {
  return (
    <div className={styles.component}>
      <div className={styles.header}>HEADER</div>
      <div className={styles.content}>
        <ArrowBackIosNewOutlinedIcon
          style={{ color: "#208b16", fontSize: 35 }}
        />
        <div className={styles.cardContainer}>
          {Array(20)
            .fill(1)
            .map((e, i) => (
              <ProductCard
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              />
            ))}
        </div>
        <ArrowForwardIosOutlinedIcon
          style={{ color: "#208b16", fontSize: 35 }}
        />
      </div>
    </div>
  );
};

export default ProductsHomeSection;
