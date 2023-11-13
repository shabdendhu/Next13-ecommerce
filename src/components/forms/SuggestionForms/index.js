import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const SuggestionForm = () => {
  const [category, setCategory] = useState({
    productIds: "",
    screenName: "",
    sequence: "",
  });

  const handleChange = (field, value) => {
    setCategory({ ...category, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="productIds"
            fullWidth
            value={category.name}
            onChange={(e) => handleChange("productIds", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="screenName"
            fullWidth
            value={category.description}
            onChange={(e) => handleChange("screenName", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Parent Category</InputLabel>
            <Select
              value={category.sequence}
              onChange={(e) => handleChange("parent_category", e.target.value)}
            >
              {/* Render parent category options here */}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={6}>
          <TextField
            label="Subcategories"
            fullWidth
            value={category.subcategories}
            onChange={(e) => handleChange("subcategories", e.target.value)}
          />
        </Grid> */}
        {/* <Grid item xs={6}>
          <TextField
            label="Image URL"
            fullWidth
            value={category.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
        </Grid> */}
        {/* <Grid item xs={6}>
          <TextField
            label="Meta Keywords"
            fullWidth
            value={category.meta_keywords}
            onChange={(e) => handleChange("meta_keywords", e.target.value)}
          />
        </Grid> */}
        {/* <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={category.is_active}
                onChange={(e) => handleChange("is_active", e.target.checked)}
              />
            }
            label="Is Active"
          />
        </Grid> */}
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
};

export default SuggestionForm;
