import React, { useEffect, useState } from "react";
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
import { apiGet } from "@/helpers/api";

const CategoryForm = ({ newCategory, setNewCategory, handleSubmit }) => {
  const [categoryOptions, setCategoryptions] = useState([]);
  const handleChange = (field, value) => {
    setNewCategory({ ...newCategory, [field]: value });
  };

  const getAllCategories = async () => {
    const categoryRes = await apiGet("/api/category");
    setCategoryptions((e) => [
      ...e,
      ...categoryRes.data.map((i) => ({
        name: i.name || "un named",
        value: i._id,
      })),
    ]);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Name"
            fullWidth
            required
            value={newCategory.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            fullWidth
            value={newCategory.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Parent Category</InputLabel>
            <Select
              labelId="productIds-label"
              id="parent_category"
              name="parent_category"
              value={newCategory.parent_category}
              onChange={(e) => handleChange("parent_category", e.target.value)}
              fullWidth
              variant="outlined"
            >
              {/* Replace the items with your actual product options */}
              {categoryOptions.map((e, i) => (
                <MenuItem key={e.name} value={e.value}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          {/* <TextField
            label="Subcategories"
            fullWidth
            value={newCategory.subcategories}
            onChange={(e) => handleChange("subcategories", e.target.value)}
          /> */}
          <Select
            labelId="productIds-label"
            id="subcategories"
            name="subcategories"
            multiple
            value={newCategory.subcategories}
            onChange={(e) => handleChange("subcategories", e.target.value)}
            fullWidth
            variant="outlined"
          >
            {/* Replace the items with your actual product options */}
            {categoryOptions.map((e, i) => (
              <MenuItem key={e.name} value={e.value}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Image URL"
            fullWidth
            value={newCategory.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Meta Keywords"
            fullWidth
            value={newCategory.meta_keywords}
            onChange={(e) => handleChange("meta_keywords", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={newCategory.is_active}
                onChange={(e) => handleChange("is_active", e.target.checked)}
              />
            }
            label="Is Active"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{
          backgroundColor: "blue",
        }}
      >
        Save
      </Button>
    </form>
  );
};

export default CategoryForm;
