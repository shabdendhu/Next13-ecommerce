import React from "react";
import styles from "./ProductsHomeSection.module.scss";
import ProductCard from "../ProductCard";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const ProductsHomeSection = ({ headerText = "HEADER", ...props }) => {
  return (
    <div className={styles.component} {...props}>
      <div className={styles.header}>{headerText}</div>
      <div className={styles.content}>
        <ArrowBackIosNewOutlinedIcon
          style={{ color: "#208b16", fontSize: 35, cursor: "pointer" }}
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
          style={{ color: "#208b16", fontSize: 35, cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ProductsHomeSection;
