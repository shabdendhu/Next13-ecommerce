// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Autocomplete,
// } from "@mui/material";
import BillingAddressForm from "../../sections/BillingAddress";
import ShippingAddressForm from "../../sections/ShippingAddress";

// const OrderForm = () => {
//   const [productOptions, setProductOptions] = useState([]); // Options for Autocomplete
//   const [shippingAddress, setShippingAddress] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//   });

//   const [billingAddress, setBillingAddress] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//   });
//   const [order, setOrder] = useState({
//     user: "",
//     products: [],
//     totalAmount: 0,
//     status: "pending",
//     paymentMethod: "credit_card",
//     paymentStatus: "pending",
//   });

//   const handleChange = (field, value) => {
//     setOrder({ ...order, [field]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., send the data to the server
//   };

//   useEffect(() => {
//     // Fetch product options from your API and update productOptions state
//     // For example, you can use axios or fetch for API requests
//     // const fetchData = async () => {
//     //   const response = await fetch('your_api_endpoint');
//     //   const data = await response.json();
//     //   setProductOptions(data);
//     // };
//     // fetchData();

//     // Mock data for demonstration
//     const mockProductOptions = [
//       { id: "1", name: "Product A", price: 10 },
//       { id: "2", name: "Product B", price: 20 },
//       { id: "3", name: "Product C", price: 30 },
//     ];
//     setProductOptions(mockProductOptions);
//   }, []);
//   const handleProductChange = (event, newValue) => {
//     if (newValue) {
//       // Add the selected product to the products array
//       setOrder((prevOrder) => ({
//         ...prevOrder,
//         products: [
//           ...prevOrder.products,
//           { product: newValue, quantity: 1 }, // Default quantity is 1
//         ],
//       }));
//     }
//   };

//   const handleQuantityChange = (index, value) => {
//     const updatedProducts = [...order.products];
//     updatedProducts[index].quantity = value;
//     setOrder({ ...order, products: updatedProducts });
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = [...order.products];
//     updatedProducts.splice(index, 1);
//     setOrder({ ...order, products: updatedProducts });
//   };
//   const calculateTotalAmount = () => {
//     const total = order.products.reduce(
//       (acc, product) => acc + product.quantity * product.product.price,
//       0
//     );
//     setOrder({ ...order, totalAmount: total });
//   };

//   useEffect(() => {
//     calculateTotalAmount();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [order.products]);

//   return (
//     <form onSubmit={handleSubmit}>
//       <Typography variant="h5">Order Information</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <TextField
//             label="User"
//             fullWidth
//             value={order.user}
//             onChange={(e) => handleChange("user", e.target.value)}
//           />
//         </Grid>
//         {/* Products section */}
//         <Grid item xs={12}>
//           <Typography variant="h6">Products</Typography>
//           {order.products.map((product, index) => (
//             <Grid container spacing={2} key={index}>
//               <Grid item xs={6}>
//                 <Autocomplete
//                   options={productOptions}
//                   getOptionLabel={(option) => option.name}
//                   renderInput={(params) => (
//                     <TextField {...params} label="Product" fullWidth />
//                   )}
//                   onChange={handleProductChange}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   label="Quantity"
//                   type="number"
//                   fullWidth
//                   value={product.quantity}
//                   onChange={(e) => handleQuantityChange(index, e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={2}>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => handleRemoveProduct(index)}
//                 >
//                   Remove
//                 </Button>
//               </Grid>
//             </Grid>
//           ))}
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Total Amount"
//             type="number"
//             fullWidth
//             value={order.totalAmount}
//             onChange={(e) => handleChange("totalAmount", e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <FormControl fullWidth>
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={order.status}
//               onChange={(e) => handleChange("status", e.target.value)}
//             >
//               <MenuItem value="pending">Pending</MenuItem>
//               <MenuItem value="processing">Processing</MenuItem>
//               <MenuItem value="shipped">Shipped</MenuItem>
//               <MenuItem value="delivered">Delivered</MenuItem>
//               <MenuItem value="cancelled">Cancelled</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography variant="h6">Shipping Address</Typography>
//             <ShippingAddressForm
//               address={shippingAddress}
//               setAddress={setShippingAddress}
//             />
//           </Grid>
//         </Grid>

//         <Grid item xs={12}>
//           <Grid item xs={12}>
//             <Typography variant="h6">Billing Address</Typography>
//             <BillingAddressForm
//               address={billingAddress}
//               setAddress={setBillingAddress}
//             />
//           </Grid>
//         </Grid>
//         <Grid item xs={6}>
//           <FormControl fullWidth>
//             <InputLabel>Payment Method</InputLabel>
//             <Select
//               value={order.paymentMethod}
//               onChange={(e) => handleChange("paymentMethod", e.target.value)}
//             >
//               <MenuItem value="credit_card">Credit Card</MenuItem>
//               <MenuItem value="paypal">PayPal</MenuItem>
//               <MenuItem value="cash_on_delivery">Cash on Delivery</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={6}>
//           <FormControl fullWidth>
//             <InputLabel>Payment Status</InputLabel>
//             <Select
//               value={order.paymentStatus}
//               onChange={(e) => handleChange("paymentStatus", e.target.value)}
//             >
//               <MenuItem value="pending">Pending</MenuItem>
//               <MenuItem value="completed">Completed</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       <Button variant="contained" color="primary" type="submit">
//         Save
//       </Button>
//     </form>
//   );
// };

// export default OrderForm;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";

const OrderForm = () => {
  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [order, setOrder] = useState({
    user: "",
    products: [], // Array of { product: productObject, quantity: number }
    totalAmount: 0,
    status: "pending",
    paymentMethod: "credit_card",
    paymentStatus: "pending",
  });

  const [productOptions, setProductOptions] = useState([]); // Options for Autocomplete

  useEffect(() => {
    // Fetch product options from your API and update productOptions state
    // For example, you can use axios or fetch for API requests
    // const fetchData = async () => {
    //   const response = await fetch('your_api_endpoint');
    //   const data = await response.json();
    //   setProductOptions(data);
    // };
    // fetchData();

    // Mock data for demonstration
    const mockProductOptions = [
      { id: "1", name: "Product A", price: 10 },
      { id: "2", name: "Product B", price: 20 },
      { id: "3", name: "Product C", price: 30 },
    ];
    setProductOptions(mockProductOptions);
  }, []);

  const handleChange = (field, value) => {
    setOrder({ ...order, [field]: value });
  };

  const handleShippingAddressChange = (field, value) => {
    setShippingAddress({ ...shippingAddress, [field]: value });
  };

  const handleBillingAddressChange = (field, value) => {
    setBillingAddress({ ...billingAddress, [field]: value });
  };

  const handleProductChange = (event, newValue) => {
    if (newValue) {
      // Add the selected product to the products array
      setOrder((prevOrder) => ({
        ...prevOrder,
        products: [
          ...prevOrder.products,
          { product: newValue, quantity: 1 }, // Default quantity is 1
        ],
      }));
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...order.products];
    updatedProducts[index].quantity = value;
    setOrder({ ...order, products: updatedProducts });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...order.products];
    updatedProducts.splice(index, 1);
    setOrder({ ...order, products: updatedProducts });
  };

  const calculateTotalAmount = () => {
    const total = order.products.reduce(
      (acc, product) => acc + product.quantity * product.product.price,
      0
    );
    setOrder({ ...order, totalAmount: total });
  };

  useEffect(() => {
    calculateTotalAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Order Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Shipping Address</Typography>
          <ShippingAddressForm
            address={shippingAddress}
            setAddress={handleShippingAddressChange}
          />
        </Grid>
        <Grid item xs={12}>
          <BillingAddressForm
            address={billingAddress}
            setAddress={handleBillingAddressChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">User Information</Typography>
          <TextField
            label="User"
            fullWidth
            value={order.user}
            onChange={(e) => handleChange("user", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Products</Typography>
          {order.products.map((product, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={6}>
                <Autocomplete
                  options={productOptions}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Product" fullWidth />
                  )}
                  onChange={handleProductChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Quantity"
                  type="number"
                  fullWidth
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveProduct(index)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Total Amount"
            type="number"
            fullWidth
            value={order.totalAmount}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={order.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={order.paymentMethod}
              onChange={(e) => handleChange("paymentMethod", e.target.value)}
            >
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="cash_on_delivery">Cash on Delivery</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Payment Status</InputLabel>
            <Select
              value={order.paymentStatus}
              onChange={(e) => handleChange("paymentStatus", e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
};

export default OrderForm;
