import React from "react";
import Chip from "@/components/base/Chip";
import Items from "@/components/Items"
import styles from "./Category.module.scss";

function Category() {
  return (
    <div className={styles.component}>
      <div style={{ display: "flex", margin: "auto", width: "80%" }}>
        <Chip text="All" />
        <Chip text="green" />
        <Chip text="organic" />
        <Chip text="sports" />
        <Chip text="ftr" />
      </div>
      <Items/>
    </div>
  );
}

export default Category;
