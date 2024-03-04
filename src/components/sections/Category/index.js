"use client";
import React, { useState } from "react";
import Chip from "@/components/base/Chip";
import ProductCard from "@/components/sections/ProductCard";
import styles from "./Category.module.scss";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import PageWrapper from "../PageWrapper";
import { apiGet, apiPost } from "@/helpers/api";
import { useRouter, useSearchParams } from "next/navigation";

function Category() {
  const search = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const getProductbyCategory = async (query = "") => {
    const res = await apiPost("/api/products/getByCategory", {
      categoryIds: [query],
    });
    setProducts(res.data || []);
  };
  const getAllCategory = async () => {
    const res = await apiGet("/api/category");
    console.log(res);
    setCategory(res.data || []);
  };
  React.useEffect(() => {
    if (search.get("id")) getProductbyCategory(search.get("id") || "");
    else getAllCategory();
  }, [search.get("id")]);
  return (
    <PageWrapper>
      <div className={styles.component}>
        {/* <div className={styles.chip}>
          <Chip text="All" />
          <Chip text="green" />
          <Chip text="organic" />
          <Chip text="sports" />
          <Chip text="ftr" />
        </div> */}
        {/* products */}

        {/* <Grid container justifyContent={"center"} gap={3}> */}
        <div className={styles.productcardContainer}>
          <Grid container gap={3}>
            {products.length ? (
              products.map((e) => (
                <Grid item key={e._id}>
                  <ProductCard
                    className={styles.productContainer}
                    data={e}
                    key={e._id}
                    length
                    // wishlist={true}
                  />
                </Grid>
              ))
            ) : (
              <Grid container gap={3}>
                {category.map((e, i) => (
                  <Grid item key={e._id}>
                    <Card
                      onClick={() => router.push(`/category?id=${e._id}`)}
                      style={{
                        maxHeight: "100px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      key={i}
                    >
                      <img
                        src={e.image}
                        style={{
                          maxHeight: "80px",
                          aspectRatio: 1,
                        }}
                      />
                      <p>{e.name}</p>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </div>
        {/* </Grid> */}
      </div>
    </PageWrapper>
  );
}

export default Category;
