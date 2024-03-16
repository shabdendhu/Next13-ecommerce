// Install Material-UI components
// npm install @mui/material @emotion/react @emotion/styled
"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { apiGet } from "@/helpers/api";
import screenUrls from "@/static/screens";

const ProductSuggestionForm = ({
  suggestions,
  setSuggestions,
  handleSubmit,
}) => {
  const { openSnackbar } = useSnackbar();

  const [products, setProducts] = useState([]);
  const [screen, setScreen] = useState(screenUrls);
  const getAllProducts = async () => {
    const productRes = await apiGet("/api/products", {}, openSnackbar);
    setProducts(productRes.data);
    setScreen((e) => [
      ...e,
      ...productRes.data.map((i) => ({
        name: i.name,
        value: "/product-details/" + i._id,
      })),
    ]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuggestions((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductIdsChange = (event) => {
    setSuggestions((prevData) => ({
      ...prevData,
      productIds: event.target.value,
    }));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={suggestions?.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="screenName-label">Screen Name</InputLabel>
        <Select
          labelId="screenName-label"
          id="screenName"
          name="screenName"
          value={suggestions?.screenName} //ethi suggestion kahiki lekhithilu
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        >
          {/* Replace the items with your actual screen name options */}
          {screen.map((e) => (
            <MenuItem key={e.value} value={e.value}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="productIds-label">Product IDs</InputLabel>
        <Select
          labelId="productIds-label"
          id="productIds"
          name="productIds"
          multiple
          value={suggestions?.productIds}
          onChange={handleProductIdsChange}
          fullWidth
          variant="outlined"
        >
          {/* Replace the items with your actual product options */}
          {products.map((e, i) => (
            <MenuItem key={e.name} value={e._id}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Sequence"
        name="sequence"
        type="number"
        value={suggestions?.sequence}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ProductSuggestionForm;
