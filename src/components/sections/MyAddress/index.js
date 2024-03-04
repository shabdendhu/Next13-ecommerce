// src/AddressComponent.js
import { apiDelete, apiGet, apiPost, apiPut } from "@/helpers/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./MyAddress.module.scss";

const AddressComponent = ({ userDetails, reloadUserDetails }) => {
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isDefault, setIsDefault] = useState(false);
  const { data: session } = useSession();
  // Mock addresses for testing
  const getAllAddressByUserId = async () => {
    const addressRes = await apiGet("/api/address/" + session?.user?.id);
    setAddresses(addressRes?.data);
  };
  useEffect(() => {
    if (session) getAllAddressByUserId();
  }, [session]);

  const handleAddAddress = () => {
    setSelectedAddress({});
    setIsDefault(false);
    setOpenDialog(true);
  };
  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setOpenDialog(true);
  };
  const handleSaveAddress = async () => {
    if (selectedAddress?._id) {
      const editRes = await apiPut(
        "/api/address/" + session?.user?.id + "/" + selectedAddress?._id,
        {
          addressLine1: selectedAddress?.addressLine1,
          addressLine2: selectedAddress?.addressLine2,
          city: selectedAddress?.city,
          state: selectedAddress?.state,
          postalCode: selectedAddress?.postalCode,
          country: selectedAddress?.country,
        }
      );
      reloadUserDetails();
      // Make an API call to edit the existing address
      // Example: editAddressInAPI(selectedAddress);
    } else {
      const addRes = await apiPost("/api/address", {
        userId: session?.user?.id,
        addressData: {
          addressLine1: selectedAddress?.addressLine1,
          addressLine2: selectedAddress?.addressLine2,
          city: selectedAddress?.city,
          state: selectedAddress?.state,
          postalCode: selectedAddress?.postalCode,
          country: selectedAddress?.country,
        },
      });
      reloadUserDetails();
      // Make an API call to add a new address
      // Example: addAddressToAPI(selectedAddress);
    }
    setSelectedAddress({});
    getAllAddressByUserId();
    setOpenDialog(false);
  };

  const handleRemoveAddress = async (addressId) => {
    const deleteRes = await apiDelete(
      "/api/address/" + session?.user?.id,
      addressId
    );
    getAllAddressByUserId();
    // Make an API call to remove the address
    // Example: removeAddressFromAPI(addressId);
  };

  const handleMakeDefault = async (addressId) => {
    const res = await apiPost("/api/address/make-address-default", {
      userId: session?.user?.id,
      addressId,
    });
    reloadUserDetails();
    // Make an API call to set the default address
    // Example: makeDefaultAddressInAPI(addressId);
  };

  return (
    <div className={styles.component}>
      <Button
        className={styles.addButton}
        variant="contained"
        style={{ backgroundColor: "#510909" }}
        onClick={handleAddAddress}
      >
        Add Address
      </Button>

      <List style={{ marginTop: 40 }}>
        {addresses.map((address) => (
          <ListItem key={address._id}>
            <ListItemText
              primary={`${address.addressLine1} | ${address.addressLine2}`}
              secondary={`${address.city}, ${address.country}, ${address.postalCode}, ${address.state}`}
            />
            <div className={styles.listItemButton}>
              <IconButton onClick={() => handleEditAddress(address)}>
                <EditIcon
                  style={{ fontSize: 30, color: "green", cursor: "pointer" }}
                />
              </IconButton>
              <IconButton
                disabled={address?._id == userDetails?.defaultAddress}
                onClick={() => handleRemoveAddress(address._id)}
              >
                <DeleteIcon
                  style={{
                    fontSize: 30,
                    color:
                      address?._id == userDetails?.defaultAddress
                        ? "gray"
                        : "red",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <IconButton onChange={() => handleMakeDefault(address._id)}>
                <Switch
                  edge="end"
                  checked={address?._id == userDetails?.defaultAddress}
                />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedAddress._id ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <TextField
            label="Street"
            fullWidth
            value={selectedAddress.addressLine1 || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                addressLine1: e.target.value,
              })
            }
          />
          <TextField
            label="House/Building No."
            fullWidth
            value={selectedAddress.addressLine2 || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                addressLine2: e.target.value,
              })
            }
          />
          <TextField
            label="City"
            fullWidth
            value={selectedAddress.city || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                city: e.target.value,
              })
            }
          />
          <TextField
            label="State"
            fullWidth
            value={selectedAddress.state || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                state: e.target.value,
              })
            }
          />
          <TextField
            label="Postal Code"
            fullWidth
            value={selectedAddress.postalCode || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                postalCode: e.target.value,
              })
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveAddress}
            color="primary"
            style={{
              backgroundColor: "blue",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddressComponent;
