'use client'
import React, { useState } from "react";
import styles from  './AddButton.module.scss'

const AddButton = () => {
  const [itemAmt, setItemAmt] = useState(0);
  const handleAdd = () => {
    setItemAmt(itemAmt + 1);
  };
  const handleRemove = () => {
    setItemAmt(itemAmt - 1);
  };
  return (
    <>
      {itemAmt === 0 ? (
        <button className={styles.addButton} onClick={handleAdd}>ADD</button>
      ) : (
        <button className={styles.addRemoveButton}>
          <div className={styles.decrement}onClick={handleRemove}>-</div>
          <div className={styles.itemamt}>{itemAmt}</div>
          <div className={styles.increment} onClick={handleAdd}>+</div>
        </button>
      )}
    </>
  );
};

export default AddButton;
