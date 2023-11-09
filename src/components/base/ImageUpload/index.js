import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";

const ImageUpload = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages(imageUrls);
  };

  return (
    <div>
      <Typography variant="h6">Upload Images</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload-button"
            multiple
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload-button">
            <Button variant="contained" color="primary" component="span">
              Choose Images
            </Button>
          </label>
        </Grid>
        {images.map((imageUrl, index) => (
          <Grid item key={index} xs={3}>
            <Box display="flex" flexDirection="column">
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                width="100"
                height="100"
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  const updatedImages = [...images];
                  updatedImages.splice(index, 1);
                  setImages(updatedImages);
                }}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageUpload;
