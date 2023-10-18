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
        <button className={styles.addRemoveButton} onClick={handleAdd}>add</button>
      ) : (
        <button className={styles.addRemoveButton}>
          <div onClick={handleAdd}>+</div>
          <div>{itemAmt}</div>
          <div onClick={handleRemove}>-</div>
        </button>
      )}
    </>
  );
};

export default AddButton;
