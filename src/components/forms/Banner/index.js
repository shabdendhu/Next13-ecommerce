import React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

// Custom component for uploading an image
import screenUrls from "@/static/screens";
import axios from "axios";

const BannerForm = ({ banner, setBanner, handleSubmit }) => {
  const handleChange = (field, value) => {
    setBanner({ ...banner, [field]: value });
  };

  const handleImageChange = async (e) => {
    try {
      const data = new FormData();
      data.set("file", e.target.files?.[0]);

      const res = await axios.post("/api/upload", data);
      // handle the error
      const bannerImageUrl = `https://acharpapad.in/api/upload?id=${res.data.data._id}`;
      if (res.status === 200) {
        setBanner({ ...banner, imageUrl: bannerImageUrl });
      }
      console.log(bannerImageUrl);
      // if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
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

export default BannerForm;
