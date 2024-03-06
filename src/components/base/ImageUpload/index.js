import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { apiPost } from "@/helpers/api";
import axios from "axios";

const ImageUpload = ({ images, setImages }) => {
  const [mode, setMode] = useState("upload");
  const [link, setLink] = useState("");
  console.log(process.env.base_url);

  const handleImageChange = async (e) => {
    try {
      const data = new FormData();
      data.set("file", e.target.files?.[0]);

      const res = await axios.post("/api/upload", data);
      // handle the error
      const productImageUrl = `http://localhost:3000/api/upload?id=${res.data.data._id}`;
      if (res.status === 200) {
        setImages([...images, productImageUrl]);
      }
      console.log(`http://localhost:3000/api/upload?id=${res.data.data._id}`);
      // if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };

  const handleAddLink = () => {
    if (link) {
      setImages([...images, link]);
      setLink(""); // Clear the link input after adding
    }
  };

  return (
    <div>
      {/* <span style={{}}>Toggle Mode</span>
      <Button
        variant="contained"
        style={{
          backgroundColor: "green",
        }}
        onClick={() => setMode(mode === "upload" ? "link" : "upload")}
      >
        {mode === "upload" ? "Switch to Link" : "Switch to Upload"}
      </Button> */}
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Upload</Grid>
          <Grid item>
            <Switch
              checked={mode === "link"}
              onChange={() => setMode(mode === "upload" ? "link" : "upload")}
              name="modeSwitch"
              inputProps={{ "aria-label": "toggle image upload mode" }}
            />
          </Grid>
          <Grid item>Link</Grid>
        </Grid>
      </Typography>
      {mode === "upload" ? (
        <div>
          <span style={{}}>Upload Images</span>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload-button"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload-button">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    backgroundColor: "green",
                  }}
                >
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
      ) : (
        <div>
          <span style={{}}>Add Image Links</span>
          <TextField
            label="Image Link"
            variant="outlined"
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddLink}
            style={{
              backgroundColor: "green",
              marginTop: "10px",
            }}
          >
            Add Link
          </Button>
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
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
