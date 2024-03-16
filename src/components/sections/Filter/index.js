import React, { useState, useEffect } from "react";
import { TextField, Button, FormControlLabel, Checkbox } from "@mui/material";
import { apiGet } from "@/helpers/api";
import MultiSelect from "@/components/base/MultiSelect"; // Import the MultiSelect component
import { useSnackbar } from "@/hooks/useSnakBar";

function FilterComponent({ handleFilterChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch category list on component mount
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await apiGet("/api/category/", {}, openSnackbar);
      if (res.success) {
        setCategoryList(res.data);
      }
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };

  const handleApplyFilters = () => {
    // Prepare filters object
    const filters = {};
    if (minPrice !== "") filters.minPrice = parseFloat(minPrice);
    if (maxPrice !== "") filters.maxPrice = parseFloat(maxPrice);
    if (selectedCategories.length > 0) filters.category = selectedCategories;
    if (selectedBrands.length > 0) filters.brand = selectedBrands;
    // Pass filters to parent component
    handleFilterChange(filters);
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "whitesmoke",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        marginBottom: "10px",
        flexDirection: "column",
        height: "fit-content",
      }}
    >
      <TextField
        size="small"
        label="Min Price"
        fullWidth
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <TextField
        size="small"
        label="Max Price"
        fullWidth
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <MultiSelect
        label="Category"
        options={categoryList.map((category) => category.name)}
        value={selectedCategories}
        onChange={(selectedItems) => setSelectedCategories(selectedItems)}
      />

      <Button
        size="small"
        variant="contained"
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
    </div>
  );
}

export default FilterComponent;
