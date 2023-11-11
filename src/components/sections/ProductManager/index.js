"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { Button, ButtonBase } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TransitionsModal from "@/components/base/Modal";
import ProductForm from "@/components/forms/ProductForms";
import useWindowSize from "@/hooks/useWindowSize";
import { apiGet, apiPost } from "@/helpers/api";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    name: "Product 1",
    description: "Description of Product 1",
    price: 19.99,
    category_ids: ["category_id_1", "category_id_2"],
    brand: "Brand A",
    stock_quantity: 50,
    images: [
      "https://www.jiomart.com/images/product/original/491586627/desi-kitchen-maharashtrian-mixed-veg-pickle-400-g-product-images-o491586627-p590033921-0-202203152215.jpg?im=Resize=(1000,1000)",
      "https://5.imimg.com/data5/ANDROID/Default/2023/7/328216046/JN/ZE/YL/41938364/product-jpeg-500x500.jpg",
      "https://5.imimg.com/data5/BL/YQ/GLADMIN-23225565/afp-mixed-pickle-200g-500x500.jpg",
      "https://rukminim2.flixcart.com/image/850/1000/l26hdow0/pickle-murabba/f/i/p/1-mixed-pickle-made-with-pure-and-organic-mixed-vegetables-and-original-imagdkythd5hndhe.jpeg?q=20",
    ],
    attributes: [
      { name: "Waterproof", value: "Yes" },
      { name: "Built-in GPS", value: "No" },
    ],
    ratings: { average: 4.5, count: 10 },
    reviews: [
      { user: "User1", rating: 5, comment: "Great product!" },
      { user: "User2", rating: 4, comment: "Good value for money" },
    ],
    sku: "SKU123",
    weight: 2.5,
    dimensions: { length: 10, width: 5, height: 3 },
    tags: ["Tag1", "Tag2"],
    availability: "In Stock",
    shipping_info: { free_shipping: true, estimated_delivery: "2-3 days" },
    warranty: {
      type: "Manufacturer Warranty",
      duration: 12,
      details: "Full coverage",
    },
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    price: 29.99,
    category_ids: ["category_id_3"],
    brand: "Brand B",
    stock_quantity: 30,
    images: ["image_url_3", "image_url_4"],
    attributes: [
      { name: "Attribute 1", value: "Value 3" },
      { name: "Attribute 2", value: "Value 4" },
    ],
    ratings: { average: 4.2, count: 8 },
    reviews: [
      { user: "User3", rating: 4, comment: "Solid product!" },
      { user: "User4", rating: 3, comment: "Not bad, but could be improved" },
    ],
    sku: "SKU456",
    weight: 3.0,
    dimensions: { length: 12, width: 6, height: 4 },
    tags: ["Tag3", "Tag4"],
    availability: "In Stock",
    shipping_info: { free_shipping: false, estimated_delivery: "4-5 days" },
    warranty: {
      type: "Extended Warranty",
      duration: 24,
      details: "Extended coverage for two years",
    },
  },
  // Add more products as needed
];
const emptyProduct = {
  name: "",
  description: "",
  price: 0,
  category_ids: [],
  brand: "",
  stock_quantity: 0,
  images: [],
  attributes: [],
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

  const getAllProduct = async () => {
    const productRes = await apiGet("/api/products");
    setProducts(productRes.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    const addRes = apiPost("/api/products", product);
    console.log(addRes);
    setProducts([...products, product]);

    // Handle form submission, e.g., send the data to the server
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div
      style={{
        // maxHeight: "50vh",
        // border: "1px solid red",
        width: "100%",
      }}
    >
      <div
        style={{
          // position: "sticky",
          // top: 90,
          padding: "10px",
          border: "1px solid blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 5,
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          PRODUCT MANAGER
        </h1>
        <TransitionsModal formName={"Add Product"}>
          <ProductForm
            product={product}
            setProduct={setProduct}
            handleSubmit={handleSubmit}
          />
        </TransitionsModal>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxHeight: size.height - 200,
          // border: '1px solid red',
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Stock Quantity</TableCell>
              <TableCell align="right">Images</TableCell>
              <TableCell align="right">Attributes</TableCell>
              <TableCell align="right">Ratings</TableCell>
              <TableCell align="right">Reviews</TableCell>
              <TableCell align="right">SKU</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Dimensions</TableCell>
              <TableCell align="right">Tags</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Free Shipping</TableCell>
              <TableCell align="right">Estimated Delivery</TableCell>
              <TableCell align="right">Warranty</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.name}
                onClick={() => console.log("slkdjddsj")}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                {/* Display category names */}
                <TableCell align="right">
                  {row.category_ids.map((categoryId, index) => (
                    <span key={categoryId}>
                      {index > 0 ? ", " : ""}Category Name
                    </span>
                  ))}
                </TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.stock_quantity}</TableCell>
                {/* Display images */}
                <TableCell align="right">
                  {row.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index}`}
                      style={{ width: "50px", height: "auto" }}
                    />
                  ))}
                </TableCell>
                {/* Display attributes */}
                <TableCell align="right">
                  {row.attributes.map((attribute, index) => (
                    <div key={index}>
                      <strong>{attribute.name}:</strong> {attribute.value}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="right">
                  {`${row.ratings.average} (${row.ratings.count} reviews)`}
                </TableCell>
                {/* Display reviews */}
                <TableCell align="right">
                  {row.reviews.map((review, index) => (
                    <div key={index}>
                      <strong>{review.user}:</strong>{" "}
                      {`${review.rating} stars - ${review.comment}`}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="right">{row.sku}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">
                  {`${row.dimensions.length} x ${row.dimensions.width} x ${row.dimensions.height}`}
                </TableCell>
                {/* Display tags */}
                <TableCell align="right">
                  {/* {row.tags.map((tag, index) => (
                    <span key={index}>
                      {index > 0 ? ", " : ""}
                      {tag}
                    </span>
                  ))} */}
                  {row.tags}
                </TableCell>
                <TableCell align="right">{row.availability}</TableCell>
                {/* Display free shipping and estimated delivery */}
                <TableCell align="right">
                  {row.shipping_info.free_shipping ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">
                  {row.shipping_info.estimated_delivery}
                </TableCell>
                {/* Display warranty details */}
                <TableCell align="right">{`${row?.warranty?.type} - ${row?.warranty?.duration} months: ${row?.warranty?.details}`}</TableCell>
                <TableCell align="right">
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                  >
                    <EditIcon />
                  </ButtonBase>
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                  >
                    <DeleteIcon />
                  </ButtonBase>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
