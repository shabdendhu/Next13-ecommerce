"use client";
import EditProfile from "@/components/sections/EditProfile";
import AddressComponent from "@/components/sections/MyAddress";
import MyOrders from "@/components/sections/MyOrders";
import MyWishList from "@/components/sections/MyWishList";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import styles from "./ProfileContent.module.scss";

export const MyAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isDefault, setIsDefault] = useState(false);

  // Fetch addresses from API on component mount
  useEffect(() => {
    // Make an API call to get addresses and update the state
    // Example: fetchAddressesFromAPI().then((data) => setAddresses(data));
  }, []);

  const handleAddAddress = () => {
    setSelectedAddress({});
    setIsDefault(false);
    setOpenDialog(true);
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsDefault(address.isDefault || false);
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
            <ListItemText primary={address.street} secondary={address.city} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEditAddress(address)}>
                Edit
              </IconButton>
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
                inputProps={{
                  "aria-labelledby": "switch-list-label-bluetooth",
                }}
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
            label="City"
            fullWidth
            value={selectedAddress.city || ""}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, city: e.target.value })
            }
          />
          {/* Add more fields as needed */}
          <Switch
            label="Default Address"
            checked={isDefault}
            onChange={() => setIsDefault(!isDefault)}
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
    </>
  );
};

const ContentWrapper = ({ children }) => {
  return children;
};
const ProfileContent = ({
  activeTab,
  reloadUserDetails = () => {},
  userDetails = {},
}) => {
  return (
    <div className={styles.component}>
      <ContentWrapper>
        {activeTab == "/profile/order" && <MyOrders />}
        {activeTab == "/profile/wishlist" && <MyWishList />}
        {activeTab == "/profile/address" && (
          <AddressComponent
            userDetails={userDetails}
            reloadUserDetails={reloadUserDetails}
          />
        )}
        {activeTab == "/profile/editprofile" && (
          <EditProfile
            userDetails={userDetails}
            reloadUserDetails={reloadUserDetails}
          />
        )}
      </ContentWrapper>
    </div>
  );
};

export default ProfileContent;
