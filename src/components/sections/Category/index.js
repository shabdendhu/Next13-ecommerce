import React from "react";
import Chip from "@/components/base/Chip";
import ProductCard from "@/components/sections/ProductCard";
import styles from "./Category.module.scss";
import { Grid } from "@mui/material";

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

      <Grid container justifyContent={"center"} gap={3}>
        {Array(20)
          .fill("k")
          .map((e, i) => (
            <Grid item key={i} xl={2} lg={3} md={4} sm={6} xs={12}>
              <ProductCard />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Category;
