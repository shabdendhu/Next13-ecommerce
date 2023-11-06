import React from "react";
import Chip from "@/components/base/Chip";
import ProductCard from "@/components/sections/ProductCard";
import styles from "./Category.module.scss";
import { Grid } from "@mui/material";
import PageWrapper from "../PageWrapper";

function Category() {
  return (
    <PageWrapper>
      <div className={styles.component}>
        <div className={styles.chip}>
          <Chip text="All" />
          <Chip text="green" />
          <Chip text="organic" />
          <Chip text="sports" />
          <Chip text="ftr" />
        </div>
        {/* products */}

        {/* <Grid container justifyContent={"center"} gap={3}> */}
        <div className={styles.productcardContainer}>
          {Array(20)
            .fill("k")
            .map((e, i) => (
              // <Grid item key={i} xl={2} lg={3} md={4} sm={6} xs={12}>
              <ProductCard key={i} className={styles.productContainer} />
              // </Grid>
            ))}
        </div>
        {/* </Grid> */}
      </div>
    </PageWrapper>
  );
}

export default Category;
