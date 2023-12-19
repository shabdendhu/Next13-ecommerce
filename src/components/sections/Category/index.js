"use client";
import React, { useState } from "react";
import Chip from "@/components/base/Chip";
import ProductCard from "@/components/sections/ProductCard";
import styles from "./Category.module.scss";
import { Grid } from "@mui/material";
import PageWrapper from "../PageWrapper";
import { apiPost } from "@/helpers/api";
import { useSearchParams } from "next/navigation";

function Category() {
  const search = useSearchParams();
  console.log(search.get("id"));
  const [products, setProducts] = useState([]);
  const getProductbyCategory = async (query = "") => {
    const res = await apiPost("/api/products/search", {
      query,
    });
    setProducts(res.data);
  };
  React.useEffect(() => {
    getProductbyCategory(search.get("id") || "");
  }, [search.get("id")]);
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
          <Grid container gap={3} padding={3}>
            {products.map((e) => (
              <Grid item key={e._id}>
                <ProductCard
                  className={styles.productContainer}
                  data={e}
                  key={e._id}
                  length
                  // wishlist={true}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        {/* </Grid> */}
      </div>
    </PageWrapper>
  );
}

export default Category;
