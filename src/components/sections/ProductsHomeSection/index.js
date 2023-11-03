"use client";
import React, { useRef } from "react";
import styles from "./ProductsHomeSection.module.scss";
import ProductCard from "../ProductCard";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import cx from "classnames";

const ProductsHomeSection = ({ headerText = "HEADER", ...props }) => {
  const scrollContainerRef = useRef(null);
  const handleScroll = (direction) => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      if (direction === "left") {
        scrollContainer.scrollLeft -= 200; // Adjust the scroll amount as needed
      } else if (direction === "right") {
        scrollContainer.scrollLeft += 200; // Adjust the scroll amount as needed
      }
    }
  };
  return (
    <div className={styles.component} {...props}>
      <div className={styles.header}>{headerText}</div>
      <div className={styles.content}>
        <ArrowBackIosNewOutlinedIcon
          onClick={() => handleScroll("left")}
          className={styles.arrowLeft}
        />
        <div className={styles.cardContainer} ref={scrollContainerRef}>
          {Array(20)
            .fill(1)
            .map((e, i) => (
              <ProductCard
                key={i}
                data={i}
                className={cx(styles.scrollItem)}
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              />
            ))}
        </div>
        <ArrowForwardIosOutlinedIcon
          onClick={() => handleScroll("right")}
          className={styles.arrowRight}
        />
      </div>
    </div>
  );
};

export default ProductsHomeSection;
