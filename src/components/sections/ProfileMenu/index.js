import React, { useEffect, useState } from "react";

import styles from "./profilehubmenu.module.scss";
import { Avatar, Divider, Skeleton } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import cx from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
const ProfileMenu = ({ activeTab, setActiveTab, userDetails }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [defaultAddress, setDefaultAddress] = useState("");

  const hanleClick = (url) => {
    if (window.innerWidth > 900) setActiveTab(url);
    else router.push(url);
  };
  const hanleClickLogout = () => {
    Logout();
  };
  const object1 = {
    a: "somestring",
    b: 42,
    c: false,
  };

  useEffect(() => {
    const { _id, ...address } = userDetails?.profile?.addresses.find(
      (e) => e._id == userDetails?.defaultAddress
    ) || { _id: "" };
    setDefaultAddress(Object.values(address).toString());
  }, [userDetails]);
  useEffect(() => {}, [defaultAddress]);
  return (
    <div className={styles.component}>
      <div className={styles.profileContainer}>
        <div className={styles.uderDetailContainer}>
          {!userDetails?.profile?.avatar ? (
            <Skeleton
              variant="circular"
              width={70}
              height={70}
              animation="wave"
              style={{ backgroundColor: "gray" }}
            />
          ) : (
            <Avatar
              alt="Remy Sharp"
              src={userDetails?.profile?.avatar}
              sx={{ width: 70, height: 70 }}
            />
          )}
          <div className={styles.userDetails}>
            {session?.user?.name ? (
              <p>{session?.user?.name}</p>
            ) : (
              <Skeleton variant="text" />
            )}
            <p>{session?.user?.email}</p>
            <p>{session?.user?.phone}</p>
          </div>
          <button onClick={() => hanleClick("/profile/editprofile")}>
            <CreateOutlinedIcon style={{ color: "#ffffff" }} />
          </button>
        </div>
        <div className={styles.addressContainer}>
          <LocationOnOutlinedIcon />
          <div className={styles.address}>{defaultAddress}</div>
          <button onClick={() => hanleClick("/profile/address")}>Change</button>
        </div>
      </div>
      <button
        className={cx(
          styles.menuItems,
          activeTab == "/profile/wishlist" && styles.selectedItem
        )}
        onClick={() => hanleClick("/profile/wishlist")}
      >
        <FavoriteBorderIcon className={styles.icon} />
        <div className={styles.lable}>My WishList</div>
      </button>
      <Divider />
      <button
        className={cx(
          styles.menuItems,
          activeTab == "/profile/order" && styles.selectedItem
        )}
        onClick={() => hanleClick("/profile/order")}
      >
        <UpdateOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>My Orders</div>
      </button>
      <Divider />
      <button
        className={cx(
          styles.menuItems,
          activeTab == "/profile/payment" && styles.selectedItem
        )}
        onClick={() => hanleClick("/profile/payment")}
      >
        <PaymentOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>My Payments</div>
      </button>
      <Divider />
      <button
        className={cx(
          styles.menuItems,
          activeTab == "/profile/review" && styles.selectedItem
        )}
        onClick={() => hanleClick("/profile/review")}
      >
        <ReviewsOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>My Reviews & Ratings</div>
      </button>
      <Divider />
      <button
        className={cx(
          styles.menuItems,
          activeTab == "/profile/address" && styles.selectedItem
        )}
        onClick={() => hanleClick("/profile/address")}
      >
        <LocationOnOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>My Addresses</div>
      </button>
      <Divider />
      <button
        className={styles.menuItems}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <PowerSettingsNewOutlinedIcon className={styles.icon} />
        <div className={styles.lable}>Log Out</div>
      </button>
      <Divider />
    </div>
  );
};

export default ProfileMenu;
