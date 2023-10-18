import React from "react";
import Chip from "@/components/base/Chip";
import ProductCard from "@/components/sections/ProductCard";
import styles from "./Category.module.scss";

function Category() {
  return (
    <div className={styles.component}>
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "100%",
          padding: "10px 0px",
        }}
      >
        <Chip text="All" />
        <Chip text="green" />
        <Chip text="organic" />
        <Chip text="sports" />
        <Chip text="ftr" />
      </div>
      {/* products */}
      <div
        style={{
          // border: "1px solid red",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default Category;
