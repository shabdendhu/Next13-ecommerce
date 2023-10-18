import React from "react";
import styles from "./ProductCard.module.scss";
const ProductCard = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardComponents}>
        <div className={styles.cardimg}>
          <img src="https://img.crofarm.com/images/prodsmall/f0c339326201.jpg" />
        </div>

        <div className={styles.cardinfo}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>ALU</div>

          <div className={styles.details}>
            <div style={{ fontSize: "13px", fontWeight: "100px" }}>
              $50/kg<span>$40/kg</span>
            </div>
            <div style={{ fontWeight: "bold" }}>$30</div>
          </div>

          <div className={styles.cardlower}>
            <div style={{ fontSize: "13px", fontWeight: "100px" }}>1kg</div>
            <button className={styles.btn}>ADD</button>
          </div>
        </div>

        <div className={styles.cardimg}>
          <img src="https://img.crofarm.com/images/prodsmall/f5b57e271972.jpg" />
        </div>

        <div className={styles.cardinfo}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>ALU</div>

          <div className={styles.details}>
            <div style={{ fontSize: "13px", fontWeight: "100px" }}>
              $50/kg<span>$40/kg</span>
            </div>
            <div style={{ fontWeight: "bold" }}>$30</div>
          </div>

          <div className={styles.cardlower}>
            <div style={{ fontSize: "13px", fontWeight: "100px" }}>1kg</div>
            <button className={styles.btn}>ADD</button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProductCard;
