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
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./MyAddress.module.scss";
const initialAddress = {
  name: "",
  locality: "",
  mobile: "",
  pincode: "",
  city: "",
  landmark: "",
  address: "",
  alternateMobileNumber: "",
  locationType: "",
};
const AddressComponent = ({ userDetails, reloadUserDetails }) => {
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [address, setAddress] = useState(initialAddress);
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
    setAddress({});
    setIsDefault(false);
    setOpenDialog(true);
  };
  const handleEditAddress = (address) => {
    console.log(address);
    setAddress(address);
    setOpenDialog(true);
  };
  // const handleSaveAddress = async () => {
  //   if (address?._id) {
  //     const editRes = await apiPut(
  //       "/api/address/" + session?.user?.id + "/" + selectedAddress?._id,
  //       {
  //         addressLine1: selectedAddress?.addressLine1,
  //         addressLine2: selectedAddress?.addressLine2,
  //         city: selectedAddress?.city,
  //         state: selectedAddress?.state,
  //         postalCode: selectedAddress?.postalCode,
  //         country: selectedAddress?.country,
  //       }
  //     );
  //     reloadUserDetails();
  //     // Make an API call to edit the existing address
  //     // Example: editAddressInAPI(selectedAddress);
  //   } else {
  //     const addRes = await apiPost("/api/address", {
  //       userId: session?.user?.id,
  //       addressData: {
  //         addressLine1: selectedAddress?.addressLine1,
  //         addressLine2: selectedAddress?.addressLine2,
  //         city: selectedAddress?.city,
  //         state: selectedAddress?.state,
  //         postalCode: selectedAddress?.postalCode,
  //         country: selectedAddress?.country,
  //       },
  //     });
  //     reloadUserDetails();
  //     // Make an API call to add a new address
  //     // Example: addAddressToAPI(selectedAddress);
  //   }
  //   setSelectedAddress({});
  //   getAllAddressByUserId();
  //   setOpenDialog(false);
  // };
  const handleSaveAddress = async () => {
    const addressData = {
      name: address?.name,
      locality: address?.locality,
      mobile: address?.mobile,
      pincode: address?.pincode,
      city: address?.city,
      landmark: address?.landmark,
      address: address?.address,
      alternateMobileNumber: address?.alternateMobileNumber,
      locationType: address?.locationType,
    };

    if (address?._id) {
      apiPut(
        `/api/address/${session?.user?.id}/${address?._id}`,
        addressData
      ).then((e) => {
        if (e.success) {
          reloadUserDetails();
          getAllAddressByUserId();
          setOpenDialog(false);
        }
      });
    } else {
      apiPost("/api/address", {
        userId: session?.user?.id,
        addressData: addressData,
      }).then((e) => {
        if (e.success) {
          reloadUserDetails();
          getAllAddressByUserId();
          setOpenDialog(false);
        }
      });
    }

    // After saving or editing address, reload user details and close dialog
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
    console.log(addressId);

    const res = await apiPost("/api/address/make-address-default", {
      userId: session?.user?.id,
      addressId,
    });
    reloadUserDetails();
    // Make an API call to set the default address
    // Example: makeDefaultAddressInAPI(addressId);
  };
  const onChangeAddress = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });
  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

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
              primary={`${address.name} | ${address.locality}`}
              secondary={`${address.city}, ${address.pincode}, ${address.state} , ${address._id}`}
            />
            <div className={styles.listItemButton}>
              <IconButton onClick={() => handleEditAddress(address)}>
                <EditIcon
                  style={{ fontSize: 30, color: "green", cursor: "pointer" }}
                />
              </IconButton>
              <IconButton
                disabled={address?._id === userDetails?.defaultAddress}
                onClick={() => handleRemoveAddress(address._id)}
              >
                <DeleteIcon
                  style={{
                    fontSize: 30,
                    color:
                      address?._id === userDetails?.defaultAddress
                        ? "gray"
                        : "red",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              {console.log(address)}
              <IconButton onClick={() => handleMakeDefault(address._id)}>
                <Switch
                  edge="end"
                  checked={address?._id === userDetails?.defaultAddress}
                  onChange={() => handleMakeDefault(address._id)}
                />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {address._id ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* <TextField
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
          /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: "around",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            <TextField
              id="outlined-multiline-flexible"
              label="Name"
              multiline
              sx={{ minWidth: "200px" }}
              maxRows={4}
              size="small"
              type="number"
              name="name"
              value={address.name}
              onChange={onChangeAddress}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="10-Digit Mobile Number"
              multiline
              sx={{ minWidth: "200px" }}
              maxRows={4}
              size="small"
              type="number"
              name="mobile"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91 </InputAdornment>
                ),
              }}
              onChange={onChangeAddress}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Pincode"
              multiline
              sx={{ minWidth: "200px" }}
              maxRows={4}
              size="small"
              type="number"
              name="pincode"
              value={address.pincode}
              onChange={onChangeAddress}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Locality"
              multiline
              sx={{ minWidth: "200px" }}
              maxRows={4}
              size="small"
              value={address.locality}
              name="locality"
              onChange={onChangeAddress}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="City"
              multiline
              sx={{ minWidth: "200px" }}
              maxRows={4}
              size="small"
              value={address.city}
              name="city"
              onChange={onChangeAddress}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Landmark"
              multiline
              sx={{ minWidth: "200px" }}
              maxRows={4}
              value={address.landmark}
              size="small"
              name="landmark"
              onChange={onChangeAddress}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Address (Area and Street)"
              multiline
              fullWidth
              sx={{ minWidth: "200px" }}
              maxRows={4}
              value={address.address}
              size="small"
              name="address"
              onChange={onChangeAddress}
            />
            {/* <Autocomplete
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={[
                      { label: "The Shawshank Redemption", year: 1994 },
                      { label: "The Godfather", year: 1972 },
                      { label: "The Godfather: Part II", year: 1974 },
                      { label: "The Dark Knight", year: 2008 },
                      { label: "12 Angry Men", year: 1957 },
                    ]}
                    onChange={(e) => console.log(e.target.value)}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Movie" />
                    )}
                  /> */}
            <TextField
              id="outlined-multiline-flexible"
              label="Alternate Mobile Number"
              multiline
              sx={{ minWidth: "200px" }}
              maxRows={4}
              size="small"
              type="number"
              value={address.alternateMobileNumber}
              name="alternameMobileNumber"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91 </InputAdornment>
                ),
              }}
              onChange={onChangeAddress}
            />
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              row
              // value={value}
              // onChange={handleChange}
              value={address.locationType}
              onChange={onChangeAddress}
            >
              <FormControlLabel
                value="work"
                control={<Radio />}
                label="Work"
                name="locationType"
              />
              <FormControlLabel
                value="home"
                control={<Radio />}
                label="Home"
                name="locationType"
              />
            </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveAddress}
            color="primary"
            style={{
              backgroundColor: "blue",
              color: "white",
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
