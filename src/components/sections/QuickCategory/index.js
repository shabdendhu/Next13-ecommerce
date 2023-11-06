import React from "react";
import styles from "./QuickCategory.module.scss";
const QuickCategory = () => {
  return (
    <div className={styles.component}>
      {Array(10)
        .fill("")
        .map((e, i) => (
          <div className={styles.item} key={i}>
            <img
              alt="image"
              src="https://www.vkrusa.com/wp-content/uploads/2020/04/PAPAD.jpg"
            />
          </div>
        ))}
    </div>
  );
};

export default QuickCategory;
