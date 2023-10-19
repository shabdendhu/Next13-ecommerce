import React from "react";
import styles from "./ProductCard.module.scss";
import AddButton from "@/components/base/AddButton";
const ProductCard = ({ className, ...props }) => {
  return (
    <div className={styles.cardContainer} {...props}>
      <div className={styles.cardimg}>
        <img src="https://m.media-amazon.com/images/I/81W7r1x6GYL.jpg" />
      </div>

      <div className={styles.cardinfo}>
        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>ACHAR</div>

        <div className={styles.details}>
          <div style={{ fontSize: "13px", fontWeight: "100px" }}>
            $50/kg<span>$40/kg</span>
          </div>
          <div style={{ fontWeight: "bold" }}>$30</div>
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
