import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductCard from "../ProductCard";

const OrderSummaryComponent = ({
  address,
  onQuantityChange,
  onNextStep,
  basket,
}) => {
  const handleQuantityChange = (productId, newQuantity) => {
    // Handle quantity change logic
    onQuantityChange(productId, newQuantity);
  };

  const handleRemoveProduct = (productId) => {
    // Handle removing product logic
    // Example: removeProductFromOrder(productId);
  };

  return (
    <div>
      <Typography variant={"h4"} textAlign={"center"} marginTop={"10px"}>
        Order Summary
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {basket.items.map((e) => (
          // <ListItem key={product.product._id}>
          //   <Avatar
          //     alt={product.product.name}
          //     src={product.product.images[0]}
          //   />
          //   <ListItemText
          //     primary={product.product.name}
          //     secondary={
          //       <>
          //         <Typography variant="body1">
          //           Price: ${product.price.toFixed(2)}
          //         </Typography>
          //         <Typography variant="body2">
          //           {Math.round(
          //             product.price / (1 - product.product.discount / 100)
          //           )}
          //           /kg
          //         </Typography>
          //         <Typography variant="body2">
          //           Discount: {product.product.discount}%
          //         </Typography>
          //       </>
          //     }
          //   />
          //   <ListItemSecondaryAction>
          //     <IconButton
          //       edge="end"
          //       onClick={() => handleRemoveProduct(product.product._id)}
          //     >
          //       <DeleteIcon />
          //     </IconButton>
          //   </ListItemSecondaryAction>
          // </ListItem>
          <ProductCard
            key={e?._id}
            quantity={e?.quantity}
            data={e?.product}
            style={{
              border: "1px solid #3f0d0d7a",
            }}
          />
        ))}

        <ListItem
          style={{
            backgroundColor: "#e0e0e0",
            marginBottom: "10px",
            borderRadius: "7px",
          }}
        >
          <ListItemText
            primary={`${address.addressLine1}, ${address.addressLine2}`}
            secondary={`${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`}
          />
        </ListItem>
      </div>
    </div>
  );
};

export default OrderSummaryComponent;
