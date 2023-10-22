import React from "react";
import styles from "./BestSeller.module.scss";

const BestSeller = () => {
  return (
    <div className={styles.component}>
      {Array(30)
        .fill("")
        .map((e, i) => (
          <div className={styles.sellers} key={i}>
            Item1,Item2 and Item3
          </div>
        ))}
    </div>
  );
};

export default BestSeller;
