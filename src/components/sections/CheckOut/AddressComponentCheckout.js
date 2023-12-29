// AddressCheckoutComponent.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Switch,
  Typography,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import styles from "./AddressCheckoutComponent.module.scss";
import { apiGet, apiDelete } from "@/helpers/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddressCheckoutComponent = ({ onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState({});
  const { data: session } = useSession();

  const getAllAddressByUserId = async () => {
    const addressRes = await apiGet("/api/address/" + session?.user?.id);
    setAddresses(addressRes?.data);
  };

  useEffect(() => {
    if (session) getAllAddressByUserId();
  }, [session]);

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    onSelectAddress(address);
  };
  if (addresses.length === 0)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20,
        }}
      >
        <div>No Address Found </div>
        <Button
          onClick={() => {
            if (window.innerWidth > 900) router.push("/profile?tab=address");
            else router.push("/profile/address");
          }}
          style={{
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Add New Address
        </Button>
      </div>
    );
  return (
    <div
      style={{
        height: "60vh",
      }}
    >
      <Typography variant={"h4"} textAlign={"center"} marginTop={"10px"}>
        Select Delivery Address
      </Typography>
      <div>
        <List>
          {addresses.map((address) => (
            <ListItem
              key={address._id}
              button
              onClick={() => handleAddressSelection(address)}
              style={{
                backgroundColor: "#e0e0e0",
                marginBottom: "10px",
                borderRadius: "7px",
              }}
            >
              <Checkbox
                checked={address._id === selectedAddress._id}
                style={{
                  marginRight: "12px",
                }}
              />
              <ListItemText
                primary={`${address.addressLine1}, ${address.addressLine2}`}
                secondary={`${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default AddressCheckoutComponent;
