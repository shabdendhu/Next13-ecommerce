"use client";
import ProductCard from "@/components/sections/ProductCard";
import { apiGet, apiPost } from "@/helpers/api";
import { useSnackbar } from "@/hooks/useSnakBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import styles from "./Category.module.scss";

function Category() {
  const search = useSearchParams();
  const router = useRouter();
  const { openSnackbar } = useSnackbar(); // Use the useSnackbar hook
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({}); // State for filters

  const getProductbyCategory = async (query = "", page = 1) => {
    const res = await apiPost(
      "/api/products/getByCategory",
      {
        categoryIds: [query],
        page: page,
        limit: 10, // Adjust the limit as needed
        // filters: filters, // Pass filters to API
      },
      openSnackbar
    );
    setProducts(res.data || []);
    setTotalPages(res.totalPages || 1);
  };

  const getAllCategory = async () => {
    const res = await apiGet("/api/category", {}, openSnackbar);
    setCategory(res.data || []);
  };

  useEffect(() => {
    if (search.get("id"))
      getProductbyCategory(search.get("id") || "", currentPage);
    else getAllCategory();
  }, [search.get("id"), currentPage]); // Listen for changes in filters

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
    setCurrentPage(1); // Reset current page when filters change
    setFilters(newFilters);
  };

  return (
    <PageWrapper>
      <div className={styles.component}>
        <div className={styles.productcardContainer}>
          {products.length ? (
            <div className={styles.products}>
              {/* <Filter handleFilterChange={handleFilterChange} /> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid
                  container
                  justifyContent={"space-around"}
                  gap={3}
                  height={"100%"}
                  maxHeight={"75vh"}
                  overflow={"auto"}
                >
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
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    className={styles.pagination}
                  />
                )}
              </div>
            </div>
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
        </div>
      </div>
    </PageWrapper>
  );
}

export default Category;
