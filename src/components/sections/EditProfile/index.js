import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";

const EditProfile = ({ userDetails, onSave }) => {
  const [formData, setFormData] = useState({
    username: userDetails?.username || "",
    email: userDetails?.email || "",
    name: userDetails?.profile?.name || "",
    avatar: userDetails?.profile?.avatar || "",
    phone: userDetails?.profile?.phone || "",
    dateOfBirth: userDetails?.profile?.dateOfBirth || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <form style={{ padding: "15px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Avatar URL"
            fullWidth
            margin="normal"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Date of Birth"
            fullWidth
            margin="normal"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={handleSave}
        style={{ marginTop: "20px", background: "red" }}
      >
        Save
      </Button>
    </form>
  );
};

export default EditProfile;
