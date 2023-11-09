import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const CategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    parent_category: "",
    subcategories: [],
    image: "",
    meta_keywords: [],
    is_active: false,
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
            label="Name"
            fullWidth
            value={category.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            fullWidth
            value={category.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Parent Category</InputLabel>
            <Select
              value={category.parent_category}
              onChange={(e) => handleChange("parent_category", e.target.value)}
            >
              {/* Render parent category options here */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Subcategories"
            fullWidth
            value={category.subcategories}
            onChange={(e) => handleChange("subcategories", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Image URL"
            fullWidth
            value={category.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Meta Keywords"
            fullWidth
            value={category.meta_keywords}
            onChange={(e) => handleChange("meta_keywords", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={category.is_active}
                onChange={(e) => handleChange("is_active", e.target.checked)}
              />
            }
            label="Is Active"
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
};

export default CategoryForm;
