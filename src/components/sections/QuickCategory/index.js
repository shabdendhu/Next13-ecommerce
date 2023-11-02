import React from "react";
import styles from "./QuickCategory.module.scss";
const QuickCategory = () => {
  return (
    <div className={styles.component}>
      {Array(10)
        .fill("")
        .map((e) => (
          <div className={styles.item}>
            {/* <img src="https://www.jiomart.com/images/product/original/491586158/shree-ram-bikaneri-papad-480-g-product-images-o491586158-p491586158-0-202203170206.jpg?im=Resize=(300,300)" /> */}
          </div>
        ))}
    </div>
  );
};

export default QuickCategory;
