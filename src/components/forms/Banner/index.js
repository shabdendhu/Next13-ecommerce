import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ImageUpload from "@/components/base/ImageUpload";
// Custom component for uploading an image

const BannerForm = () => {
  const [banner, setBanner] = useState({
    title: "",
    imageUrl: "",
    targetURL: "",
    startDate: new Date(),
    endDate: new Date(),
    isActive: true,
  });

  const handleChange = (field, value) => {
    setBanner({ ...banner, [field]: value });
  };

  const handleImageChange = (imageUrl) => {
    setBanner({ ...banner, imageUrl });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Banner Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Title"
            fullWidth
            value={banner.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <ImageUpload
            imageUrl={banner.imageUrl}
            setImageUrl={handleImageChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Target URL"
            fullWidth
            value={banner.targetURL}
            onChange={(e) => handleChange("targetURL", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={banner.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={banner.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={banner.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
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

export default BannerForm;
