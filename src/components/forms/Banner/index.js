import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import ImageUpload from "@/components/base/ImageUpload";
// Custom component for uploading an image
import screenUrls from "@/static/screens";

const BannerForm = ({ banner, setBanner, handleSubmit }) => {
  const handleChange = (field, value) => {
    setBanner({ ...banner, [field]: value });
  };

  const handleImageChange = (imageUrl) => {
    setBanner({ ...banner, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <TextField
            label="Image Url"
            fullWidth
            value={banner.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="pathURL"
            fullWidth
            type="url"
            value={banner.pathURL}
            onChange={(e) => handleChange("pathURL", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            labelId="screenName-label"
            id="targetURL"
            value={banner.targetURL}
            onChange={(e) => handleChange("targetURL", e.target.value)}
            fullWidth
            variant="outlined"
            required
          >
            {/* Replace the items with your actual screen name options */}
            {screenUrls.map((e) => (
              <MenuItem key={e.value} value={e.value}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
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
