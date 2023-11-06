"use client";
import React, { useState } from "react";
import styles from "./savedupi.module.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/navigation";

const SavedUPI = () => {
  const [name, setName] = React.useState("");
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/profile-hub");
  };
  const handleNavigate = () => {
    router.push("/address");
  };
  const handleOrder = () => {
    router.push("/basket");
  };
  const handlecard = () => {
    router.push("/savedcard");
  };
  const handleUPI = () => {
    router.push("/savedupi");
  };
  const handleRatingreviews = () => {
    router.push("./my-rating-reviews");
  };
  const handleWishlist = () => {
    router.push("./mywishlist");
  };

  return (
    <div className={styles.profilebgcontainer}>
      <div className={styles.profilecontainer}>
        <div className={styles.leftcontainer}>
          <div className={styles.heading}>
            <AccountCircleRoundedIcon className={styles.accountIcon} />
            <span className={styles.headingText}>
              <p>Hello</p>
              <b style={{ fontSize: "25px" }}>swoyamprava</b>
            </span>
          </div>
          <div className={styles.leftSubContainer}>
            <div className={styles.smallSubContainers}>
              <InventoryIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                  cursor: "pointer",
                }}
                onClick={handleOrder}
              >
                MY ORDERS
              </div>
            </div>

            <div className={styles.smallSubContainers}>
              <AccountCircleIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                }}
              >
                ACCOUNT
              </div>
            </div>

            <div>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleRedirect}
              >
                Profile Informations
              </p>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleNavigate}
              >
                Manage Address
              </p>
            </div>

            <div className={styles.smallSubContainers}>
              <AccountBalanceWalletIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                }}
              >
                PAYMENT METHOD
              </div>
            </div>

            <div>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handlecard}
              >
                Saved card
              </p>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleUPI}
              >
                Saved UPI
              </p>
            </div>

            <div className={styles.smallSubContainers}>
              <FolderSharedIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                }}
              >
                MY STUFF
              </div>
            </div>

            <div
              style={{
                fontSize: "15px",
              }}
            >
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleRatingreviews}
              >
                My Ratings & My Reviews
              </p>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleWishlist}
              >
                My Wishlist
              </p>
            </div>

            <div className={styles.smallSubContainers}>
              <LogoutRoundedIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                }}
              >
                LAGOUT
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightbgcontainer}>
          <div className={styles.rightcontainer}>
            <div className={styles.contentHeading}>
              <b>No VPAs saved to be shown</b>
            </div>
            <div>
              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "15px",
                  fontWeight: "550",
                }}
              >
                FAQS
              </div>
              <div>
                <h1 style={{ marginBottom: "5px", fontWeight: "550" }}>
                  1. Why is my UPI being saved on your cart?
                </h1>
                <p>
                  It's quicker. You can save the hassle of typing in the
                  complete UPI information every time you shop at Flipkart by
                  saving your UPI details. You can make your payment by
                  selecting the saved UPI ID of your choice at checkout. While
                  this is obviously faster, it is also very secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedUPI;
