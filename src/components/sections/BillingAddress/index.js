import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

const BillingAddressForm = ({ address, setAddress }) => {
  const handleAddressChange = (field, value) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <div>
      <Typography variant="h6">Billing Address</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Address Line 1"
            fullWidth
            value={address.addressLine1}
            onChange={(e) =>
              handleAddressChange("addressLine1", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address Line 2"
            fullWidth
            value={address.addressLine2}
            onChange={(e) =>
              handleAddressChange("addressLine2", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="City"
            fullWidth
            value={address.city}
            onChange={(e) => handleAddressChange("city", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            fullWidth
            value={address.state}
            onChange={(e) => handleAddressChange("state", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Postal Code"
            fullWidth
            value={address.postalCode}
            onChange={(e) => handleAddressChange("postalCode", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Country"
            fullWidth
            value={address.country}
            onChange={(e) => handleAddressChange("country", e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BillingAddressForm;
