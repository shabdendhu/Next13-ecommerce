import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { apiGet } from "@/helpers/api";

const CategoryForm = ({ newCategory, setNewCategory, handleSubmit }) => {
  const [categoryOptions, setCategoryptions] = useState([]);
  const handleChange = (field, value) => {
    setNewCategory({ ...newCategory, [field]: value });
  };

  const handleImageChange = async (e) => {
    try {
      const data = new FormData();
      data.set("file", e.target.files?.[0]);

      const res = await axios.post("/api/upload", data);
      // handle the error
      const imageUrl = `https://acharpapad.in/api/upload?id=${res.data.data._id}`;
      if (res.status === 200) {
        setNewCategory({ ...newCategory, image: imageUrl });
      }
    } catch (e) {
      console.error(e);
    }
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
              labelId="parentCategory-label"
              id="parent_category"
              name="parent_category"
              value={newCategory.parent_category}
              onChange={(e) => handleChange("parent_category", e.target.value)}
              fullWidth
              variant="outlined"
            >
              {categoryOptions.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          {/* <TextField
            label="Image URL"
            fullWidth
            value={newCategory.image}
            onChange={(e) => handleChange("image", e.target.value)}
          /> */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newCategory?.image ? (
            <>
              <img
                src={newCategory.image}
                style={{
                  maxHeight: "100px",
                  maxWidth: "100px",
                }}
              />
              {/* <Button>Delete</Button> */}
            </>
          ) : (
            <></>
          )}
        </Grid>
        {/* Other form fields */}
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
        style={{ backgroundColor: "blue" }}
      >
        Save
      </Button>
    </form>
  );
};

export default CategoryForm;
