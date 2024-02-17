"use client";
import React, { useState, useEffect } from "react";
import AddressComponent from "./AddressComponentCheckout";
import OrderSummaryComponent from "./OrderSummaryComponent";
import { LoginContent } from "../OtpLoginModal";
import PageWrapper from "../PageWrapper";
import { Button } from "@mui/material";
import { set } from "mongoose";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { apiPost } from "@/helpers/api";
import calculateTotalPriceAndDiscount from "@/helpers/calculateTotalPriceAndDiscount";
import axios from "axios";
const buttontxt = {
  1: "Confirm Address",
  2: "Confirm Order",
  3: "Proceed To Payment",
};
const CheckoutComponent = () => {
  const [step, setStep] = useState(1);
  const query = useSearchParams();
  console.log(query.get("checkoutItems"));
  const { data: session } = useSession();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const basket = useSelector((state) => state.basket);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    // Fetch user login status from your authentication system
    // Update the loggedIn state accordingly
    // Example: fetchLoginStatus().then((status) => setLoggedIn(status));
  }, []);

  const handleLogin = () => {
    // Handle login logic
    // Example: setLoggedIn(true);
    // You might want to implement a more sophisticated login mechanism
  };

  const handleAddressConfirmation = (address) => {
    // Handle address confirmation logic
    // Example: setSelectedAddress(address);
    setStep(3);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Handle quantity change logic
    // Example: Update the orderSummary state with the new quantity
  };

  const handleNextStep = () => {
    // Handle logic to proceed to the next step
    if (!selectedAddress) return alert("Please select an address");

    if (step == 2) return confirmOrder();

    setStep(step + 1);
  };
  const handleBack = () => {
    if (step == 1) return router.push("/basket");
    setStep(step - 1);
  };
  const confirmOrder = async () => {
    const orderRes = await apiPost("/api/order", {
      user: session?.user?.id,
      // product: basket.items.map((e) => ({
      //   product: e.product._id,
      //   quantity: e.quantity,
      //   price: e.product.price,
      // })),
      // totalAmount:
      //   parseInt(
      //     calculateTotalPriceAndDiscount(basket.items, query.get(checkoutItems))
      //       .totalDiscountPrice
      //   ) + 40,
      // status: "pending",
      // paymentStatus: "pending",
      productIds: query.get("checkoutItems").split(","),
    });

    if (orderRes.success) {
      router.push("/confirmOrder?orderId=" + orderRes.data._id);
    }
  };

  return (
    <PageWrapper>
      {step === 1 && (
        <AddressComponent onSelectAddress={(e) => setSelectedAddress(e)} />
      )}
      {step === 2 && (
        <OrderSummaryComponent
          basket={basket}
          address={selectedAddress}
          selectedItems={query.get("checkoutItems")}
          onQuantityChange={handleQuantityChange}
          onNextStep={handleNextStep}
        />
      )}

      <div
        style={{
          textAlign: "right",
        }}
      >
        {step > 0 ? (
          <Button
            onClick={handleBack}
            style={{
              backgroundColor: "#e0e0e0",
              marginRight: "10px",
            }}
          >
            Back
          </Button>
        ) : (
          <></>
        )}
        <Button
          onClick={handleNextStep}
          style={{
            backgroundColor: "blue",
            color: "white",
          }}
        >
          {buttontxt[step]}
        </Button>
      </div>
    </PageWrapper>
  );
};

export default CheckoutComponent;
