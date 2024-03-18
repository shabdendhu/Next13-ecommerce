"use client";
import TransitionsModal from "@/components/base/Modal";
import ProductForm from "@/components/forms/ProductForms";
import ImageGallery from "@/components/sections/ImageGallary";
import { apiDelete, apiGet, apiGetById, apiPost, apiPut } from "@/helpers/api";
import { useSnackbar } from "@/hooks/useSnakBar";
import useWindowSize from "@/hooks/useWindowSize";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import styles from "./productmanager.module.scss";
const emptyProduct = {
  name: "",
  description: "",
  price: 0,
  category_ids: [],
  brand: "",
  stock_quantity: 0,
  images: [],
  attributes: [],
  discount: 0,
  ratings: {
    average: 0,
    count: 0,
  },
  reviews: [],
  created_at: new Date(),
  updated_at: new Date(),
  sku: "",
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  tags: [],
  availability: "",
  shipping_info: {
    free_shipping: false,
    estimated_delivery: "",
  },
  related_products: [],
  unitQuantity: {
    value: 0,
    unit: "",
  },
};

export default function ProductManager() {
  const size = useWindowSize();
  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const { openSnackbar } = useSnackbar();

  const handleViewProduct = async (id) => {
    setOpen(true);
    const getProductById = await apiGetById("/api/products", id, openSnackbar);
    setProduct(getProductById.data);
  };

  const getAllProduct = async () => {
    const productRes = await apiGet(
      `/api/products?page=${page}&limit=10`,
      {},
      openSnackbar
    );
    setProducts(productRes.data);
    setTotalPages(productRes.totalPages);
  };

  const handleSearch = async (query) => {
    try {
      const searchRes = await apiGet("/api/products?searchText=" + query); // Call the search API
      setProducts(searchRes.data); // Update the products state with the search results
    } catch (error) {
      console.error("Error searching for products:", error);
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product._id) {
      const updateRes = await apiPut(
        "/api/products/" + product._id,
        product,
        openSnackbar
      );
    } else {
      const addRes = await apiPost("/api/products", product, openSnackbar);
    }
    setProduct(emptyProduct);
    getAllProduct();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    const deleteRes = await apiDelete("/api/products", id, openSnackbar);
    getAllProduct();
  };

  const handleCloseModal = () => {
    setOpen(false);
    setProduct(emptyProduct);
  };

  useEffect(() => {
    getAllProduct();
  }, [page]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      getAllProduct();
    }
  }, [searchQuery]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={styles.productManagerContainer}>
      <div className={styles.header}>
        <div className={styles.searchBarContainer}>
          <h1>PRODUCT MANAGER</h1>
          <TextField
            placeholder="Search Product"
            className={styles.searchInput}
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <TransitionsModal
          formName={(product?._id ? "Edit" : "Add") + " Product"}
          handleClose={handleCloseModal}
          openButton={
            <Button
              onClick={() => setOpen(!open)}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              ADD
            </Button>
          }
          open={open}
          setOpen={(e) => setOpen(e)}
        >
          <ProductForm
            product={product}
            setProduct={setProduct}
            handleSubmit={handleSubmit}
          />
        </TransitionsModal>
      </div>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table
          className={styles.table}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Stock Quantity</TableCell>
              <TableCell align="right">Images</TableCell>
              <TableCell align="right">Ratings</TableCell>
              <TableCell align="right">Reviews</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Dimensions</TableCell>
              <TableCell align="right">Tags</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  {row.category_ids.map((e, index) => (
                    <span key={e._id}>{e.name}</span>
                  ))}
                </TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.stock_quantity}</TableCell>
                <TableCell align="right">
                  <ImageGallery images={row.images} />
                </TableCell>
                <TableCell align="right">
                  {`${row?.ratings?.average} (${row?.ratings?.count} reviews)`}
                </TableCell>
                <TableCell align="right">
                  {row.reviews.map((review, index) => (
                    <div key={index}>
                      <strong>{review.user}:</strong>{" "}
                      {`${review?.rating} stars - ${review?.comment}`}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="right">{row?.weight}</TableCell>
                <TableCell align="right">
                  {`${row?.dimensions?.length} x ${row?.dimensions?.width} x ${row?.dimensions?.height}`}
                </TableCell>
                <TableCell align="right">{row.tags}</TableCell>
                <TableCell align="right">
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                    onClick={() => handleViewProduct(row._id)}
                  >
                    <EditIcon />
                  </ButtonBase>
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteIcon />
                  </ButtonBase>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>
    </div>
  );
}
