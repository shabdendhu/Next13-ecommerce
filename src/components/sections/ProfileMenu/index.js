import React from "react";

import styles from "./profilehubmenu.module.scss";
import { Avatar, Divider } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { useRouter } from "next/navigation";
import {} from "next-auth";
const ProfileMenu = () => {
  const router = useRouter();
  const hanleClick = (url) => {
    router.push(url);
  };
  const hanleClickLogout = () => {
    Logout();
  };
  return (
    <div className={styles.component}>
      <div className={styles.profileContainer}>
        <div className={styles.uderDetailContainer}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            sx={{ width: 70, height: 70 }}
          />
          <div className={styles.userDetails}>
            <p>Shabdendhu</p>
            <p>tshabdendhu@gmail.com</p>
            <p>98861177199</p>
          </div>
          <div>
            <CreateOutlinedIcon style={{ color: "#ffffff" }} />
          </div>
        </div>
        <div className={styles.addressContainer}>
          <LocationOnOutlinedIcon />
          <div className={styles.address}>
            107, galexy tower, chandaka, bhubuneswar, 756100
          </div>
          <button>Change</button>
        </div>
      </div>
      <button
        className={styles.menuItems}
        onClick={() => hanleClick("/profile/order")}
      >
        <UpdateOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>My Orders</div>
      </button>
      <Divider />
      <button
        className={styles.menuItems}
        onClick={() => hanleClick("/profile/payment")}
      >
        <PaymentOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>My Payments</div>
      </button>
      <Divider />
      <button
        className={styles.menuItems}
        onClick={() => hanleClick("/profile/review")}
      >
        <ReviewsOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>My Reviews & Ratings</div>
      </button>
      <Divider />
      <button
        className={styles.menuItems}
        onClick={() => hanleClick("/profile/address")}
      >
        <LocationOnOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>My Addresses</div>
      </button>
      <Divider />
      <button className={styles.menuItems} onClick={hanleClickLogout}>
        <PowerSettingsNewOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>Log Out</div>
      </button>
      <Divider />
    </div>
  );
};

export default ProfileMenu;
