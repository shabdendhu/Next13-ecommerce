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
  const [suggestion, setSuggestion] = useState({
    productIds: "",
    screenName: "",
    sequence: "",
  });

  const handleChange = (field, value) => {
    setSuggestion({ ...suggestion, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="product Ids"
            fullWidth
            value={suggestion.productIds}
            onChange={(e) => handleChange("productIds", e.target.value)}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <TextField
            label="screenName"
            fullWidth
            value={suggestion.screenName}
            onChange={(e) => handleChange("screenName", e.target.value)}
          />
        </Grid> */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel> Screen Name</InputLabel>
            <Select
              value={suggestion.screenName}
              onChange={(e) => handleChange("screenName", e.target.value)}
            >
              {/* Render parent category options here */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="sequence"
            fullWidth
            value={suggestion.sequence}
            onChange={(e) => handleChange("sequence", e.target.value)}
          />
        </Grid>
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
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginTop: "10px", border: "2px solid blue", color: "green" }}
      >
        Save
      </Button>
    </form>
  );
};

export default SuggestionForm;
