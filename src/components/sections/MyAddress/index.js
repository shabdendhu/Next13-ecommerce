// src/AddressComponent.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
} from "@mui/material";

const AddressComponent = () => {
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isDefault, setIsDefault] = useState(false);

  // Mock addresses for testing
  useEffect(() => {
    setAddresses([
      {
        id: 1,
        street: "123 Main St",
        city: "Sample City",
        country: "Sample Country",
        isDefault: true,
      },
      {
        id: 2,
        street: "456 Side St",
        city: "Test City",
        country: "Test Country",
        isDefault: false,
      },
    ]);
  }, []);

  const handleAddAddress = () => {
    setSelectedAddress({});
    setIsDefault(false);
    setOpenDialog(true);
  };

  const handleSaveAddress = () => {
    if (selectedAddress.id) {
      // Make an API call to edit the existing address
      // Example: editAddressInAPI(selectedAddress);
    } else {
      // Make an API call to add a new address
      // Example: addAddressToAPI(selectedAddress);
    }

    setOpenDialog(false);
  };

  const handleRemoveAddress = (addressId) => {
    // Make an API call to remove the address
    // Example: removeAddressFromAPI(addressId);
  };

  const handleMakeDefault = (addressId) => {
    // Make an API call to set the default address
    // Example: makeDefaultAddressInAPI(addressId);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddAddress}>
        Add Address
      </Button>

      <List>
        {addresses.map((address) => (
          <ListItem key={address.id}>
            <ListItemText
              primary={address.street}
              secondary={`${address.city}, ${address.country}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleRemoveAddress(address.id)}
              >
                Delete
              </IconButton>
              <Switch
                edge="end"
                onChange={() => handleMakeDefault(address.id)}
                checked={address.isDefault || false}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedAddress.id ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Street"
            fullWidth
            value={selectedAddress.street || ""}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, street: e.target.value })
            }
          />
          <TextField
            label="House/Building No."
            fullWidth
            value={selectedAddress.houseNumber || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                houseNumber: e.target.value,
              })
            }
          />
          <TextField
            label="Pin Code"
            fullWidth
            value={selectedAddress.pinCode || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                pinCode: e.target.value,
              })
            }
          />
          <TextField
            label="City"
            fullWidth
            value={selectedAddress.city || ""}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, city: e.target.value })
            }
          />
          <TextField
            label="Country"
            fullWidth
            value={selectedAddress.country || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                country: e.target.value,
              })
            }
          />
          <TextField
            label="Map Location (Latitude, Longitude)"
            fullWidth
            value={selectedAddress.mapLocation || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                mapLocation: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveAddress} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddressComponent;
