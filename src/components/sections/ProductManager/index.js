// "use client";
// import TransitionsModal from "@/components/base/Modal";
// import ProductForm from "@/components/forms/ProductForms";
// import ImageGallery from "@/components/sections/ImageGallary";
// import { apiGet, apiGetById, apiPost, apiPut } from "@/helpers/api";
// import { useSnackbar } from "@/hooks/useSnakBar";
// import useWindowSize from "@/hooks/useWindowSize";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Button from "@mui/material/Button";
// import ButtonBase from "@mui/material/ButtonBase";
// import Pagination from "@mui/material/Pagination";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { useEffect, useState } from "react";

// const emptyProduct = {
//   name: "",
//   description: "",
//   price: 0,
//   category_ids: [],
//   brand: "",
//   stock_quantity: 0,
//   images: [],
//   attributes: [],
//   discount: 0,
//   ratings: {
//     average: 0,
//     count: 0,
//   },
//   reviews: [],
//   created_at: new Date(),
//   updated_at: new Date(),
//   sku: "",
//   weight: 0,
//   dimensions: {
//     length: 0,
//     width: 0,
//     height: 0,
//   },
//   tags: [],
//   availability: "",
//   shipping_info: {
//     free_shipping: false,
//     estimated_delivery: "",
//   },
//   related_products: [],
// };

// export default function ProductManager() {
//   const size = useWindowSize();
//   const [product, setProduct] = useState(emptyProduct);
//   const [products, setProducts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const { openSnackbar } = useSnackbar();

//   const handleViewProduct = async (id) => {
//     setOpen(true);
//     const getProductById = await apiGetById("/api/products", id, openSnackbar);
//     setProduct(getProductById.data);
//   };

//   const getAllProduct = async () => {
//     const productRes = await apiGet(
//       `/api/products?page=${page}&limit=10`,
//       {},
//       openSnackbar
//     );
//     setProducts(productRes.data);
//     setTotalPages(productRes.totalPages);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (product._id) {
//       const updateRes = await apiPut(
//         "/api/products/" + product._id,
//         product,
//         openSnackbar
//       );
//     } else {
//       const addRes = await apiPost("/api/products", product, openSnackbar);
//     }
//     setProduct(emptyProduct);
//     getAllProduct();
//     handleCloseModal();
//   };

//   const handleDelete = async (id) => {
//     const deleteRes = await apiDelete("/api/products", id, openSnackbar);
//     getAllProduct();
//   };

//   const handleCloseModal = () => {
//     setOpen(false);
//     setProduct(emptyProduct);
//   };

//   useEffect(() => {
//     getAllProduct();
//   }, [page]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       <div
//         style={{
//           padding: "10px",
//           border: "1px solid blue",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderRadius: 5,
//         }}
//       >
//         <h1 style={{ fontSize: "20px", fontWeight: 600 }}>PRODUCT MANAGER</h1>
//         <TransitionsModal
//           formName={(product?._id ? "Edit" : "Add") + " Product"}
//           handleClose={handleCloseModal}
//           openButton={
//             <Button
//               onClick={() => setOpen(!open)}
//               style={{ backgroundColor: "blue", color: "white" }}
//             >
//               ADD
//             </Button>
//           }
//           open={open}
//           setOpen={(e) => setOpen(e)}
//         >
//           <ProductForm
//             product={product}
//             setProduct={setProduct}
//             handleSubmit={handleSubmit}
//           />
//         </TransitionsModal>
//       </div>
//       <TableContainer
//         component={Paper}
//         sx={{ width: "100%", maxHeight: size.height - 200 }}
//       >
//         <Table
//           sx={{ minWidth: 650 }}
//           stickyHeader
//           aria-label="sticky table"
//           size="small"
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               {/* <TableCell align="right">Description</TableCell> */}
//               <TableCell align="right">Price</TableCell>
//               <TableCell align="right">Category</TableCell>
//               <TableCell align="right">Brand</TableCell>
//               <TableCell align="right">Stock Quantity</TableCell>
//               <TableCell align="right">Images</TableCell>
//               {/* <TableCell align="right">Attributes</TableCell> */}
//               <TableCell align="right">Ratings</TableCell>
//               <TableCell align="right">Reviews</TableCell>
//               {/* <TableCell align="right">SKU</TableCell> */}
//               <TableCell align="right">Weight</TableCell>
//               <TableCell align="right">Dimensions</TableCell>
//               <TableCell align="right">Tags</TableCell>
//               {/* <TableCell align="right">Availability</TableCell> */}
//               {/* <TableCell align="right">Free Shipping</TableCell> */}
//               {/* <TableCell align="right">Estimated Delivery</TableCell> */}
//               {/* <TableCell align="right">Warranty</TableCell> */}
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{
//                   "&:last-child td, &:last-child th": { border: 0 },
//                   cursor: "pointer",
//                 }}
//               >
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 {/* <TableCell align="right">{row.description}</TableCell> */}
//                 <TableCell align="right">{row.price}</TableCell>
//                 {/* Display category names */}
//                 <TableCell align="right">
//                   {row.category_ids.map((e, index) => (
//                     <span key={e._id}>{e.name}</span>
//                   ))}
//                 </TableCell>
//                 <TableCell align="right">{row.brand}</TableCell>
//                 <TableCell align="right">{row.stock_quantity}</TableCell>
//                 {/* Display images */}
//                 <TableCell align="right">
//                   {/* {row.images.map((image, index) => (
//                     <img
//                       key={index}
//                       src={image}
//                       alt={`Image ${index}`}
//                       style={{ width: "50px", height: "auto" }}
//                     />
//                   ))} */}
//                   <ImageGallery images={row.images} />
//                 </TableCell>
//                 {/* Display attributes */}
//                 {/* <TableCell align="right">
//                   {row.attributes.map((attribute, index) => (
//                     <div key={index}>
//                       <strong>{attribute?.name}:</strong> {attribute?.value}
//                     </div>
//                   ))}
//                 </TableCell> */}
//                 <TableCell align="right">
//                   {`${row?.ratings?.average} (${row?.ratings?.count} reviews)`}
//                 </TableCell>
//                 {/* Display reviews */}
//                 <TableCell align="right">
//                   {row.reviews.map((review, index) => (
//                     <div key={index}>
//                       <strong>{review.user}:</strong>{" "}
//                       {`${review?.rating} stars - ${review?.comment}`}
//                     </div>
//                   ))}
//                 </TableCell>
//                 {/* <TableCell align="right">{row?.sku}</TableCell> */}
//                 <TableCell align="right">{row?.weight}</TableCell>
//                 <TableCell align="right">
//                   {`${row?.dimensions?.length} x ${row?.dimensions?.width} x ${row?.dimensions?.height}`}
//                 </TableCell>
//                 {/* Display tags */}
//                 <TableCell align="right">
//                   {/* {row.tags.map((tag, index) => (
//                     <span key={index}>
//                       {index > 0 ? ", " : ""}
//                       {tag}
//                     </span>
//                   ))} */}
//                   {row.tags}
//                 </TableCell>
//                 {/* <TableCell align="right">{row?.availability}</TableCell> */}
//                 {/* Display free shipping and estimated delivery */}
//                 {/* <TableCell align="right">
//                   {row?.shipping_info?.free_shipping ? "Yes" : "No"}
//                 </TableCell>
//                 <TableCell align="right">
//                   {row?.shipping_info?.estimated_delivery}
//                 </TableCell> */}
//                 {/* Display warranty details */}
//                 {/* <TableCell align="right">{`${row?.warranty?.type} - ${row?.warranty?.duration} months: ${row?.warranty?.details}`}</TableCell> */}
//                 <TableCell align="right">
//                   <ButtonBase
//                     style={{
//                       marginRight: 10,
//                       padding: "5px 10px",
//                       borderRadius: 10,
//                     }}
//                     onClick={() => handleViewProduct(row._id)}
//                   >
//                     <EditIcon />
//                   </ButtonBase>
//                   {/* <ButtonBase
//                     style={{
//                       marginRight: 10,
//                       padding: "5px 10px",
//                       borderRadius: 10,
//                     }}
//                     onClick={() => handleDelete(row._id)}
//                   >
//                     <DeleteIcon />
//                   </ButtonBase> */}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <div>
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={handlePageChange}
//           variant="outlined"
//           shape="rounded"
//           color="primary"
//         />
//       </div>
//     </div>
//   );
// }

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
    <div style={{ width: "100%" }}>
      <div
        style={{
          padding: "10px",
          border: "1px solid blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 5,
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 600 }}>PRODUCT MANAGER</h1>
        <TextField onChange={(e) => setSearchQuery(e.target.value)} />
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
      <TableContainer
        component={Paper}
        sx={{ width: "100%", maxHeight: size.height - 200 }}
      >
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* <TableCell align="right">Description</TableCell> */}
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Stock Quantity</TableCell>
              <TableCell align="right">Images</TableCell>
              {/* <TableCell align="right">Attributes</TableCell> */}
              <TableCell align="right">Ratings</TableCell>
              <TableCell align="right">Reviews</TableCell>
              {/* <TableCell align="right">SKU</TableCell> */}
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Dimensions</TableCell>
              <TableCell align="right">Tags</TableCell>
              {/* <TableCell align="right">Availability</TableCell> */}
              {/* <TableCell align="right">Free Shipping</TableCell> */}
              {/* <TableCell align="right">Estimated Delivery</TableCell> */}
              {/* <TableCell align="right">Warranty</TableCell> */}
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
                {/* <TableCell align="right">{row.description}</TableCell> */}
                <TableCell align="right">{row.price}</TableCell>
                {/* Display category names */}
                <TableCell align="right">
                  {row.category_ids.map((e, index) => (
                    <span key={e._id}>{e.name}</span>
                  ))}
                </TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.stock_quantity}</TableCell>
                {/* Display images */}
                <TableCell align="right">
                  <ImageGallery images={row.images} />
                </TableCell>
                {/* Display ratings */}
                <TableCell align="right">
                  {`${row?.ratings?.average} (${row?.ratings?.count} reviews)`}
                </TableCell>
                {/* Display reviews */}
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
                {/* Display tags */}
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
