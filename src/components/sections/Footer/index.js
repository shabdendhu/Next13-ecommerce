"use client";
import React from "react";
import styles from "./Footer.module.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import useScrollDirection from "@/hooks/useScrollDirection";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  Phone,
  Email,
  Info,
  Instagram,
  Facebook,
  YouTube,
} from "@mui/icons-material";
// import SearchIcon from '@mui/icons-material/Search';

const Footer = () => {
  const scrollDirection = useScrollDirection();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={styles.footercontainer}
      style={{
        bottom: scrollDirection === "down" ? -60 : 0,
      }}
    >
      <div className={styles.mobileFooter}>
        <button onClick={() => router.push("/")} className={styles.footerMenu}>
          {pathname == "/" ? (
            <HomeIcon
              className={styles.icon}
              style={{
                color: "#0e640efd",
              }}
            />
          ) : (
            <HomeOutlinedIcon className={styles.icon} />
          )}
          <span className={styles.text}>Home</span>
        </button>
        <button
          onClick={() => router.push("/category")}
          className={styles.footerMenu}
        >
          {pathname === "/category" ? (
            <CategoryIcon
              className={styles.icon}
              style={{
                color: "#0e640efd",
              }}
            />
          ) : (
            <CategoryOutlinedIcon className={styles.icon} />
          )}
          <span className={styles.text}>Category</span>
        </button>
        <button
          onClick={() => router.push("/profile/wishlist")}
          className={styles.footerMenu}
        >
          {pathname === "/profile/wishlist" ? (
            <FavoriteIcon
              className={styles.icon}
              style={{
                color: "#0e640efd",
              }}
            />
          ) : (
            <FavoriteBorderOutlinedIcon className={styles.icon} />
          )}
          <span className={styles.text}>WishList</span>
        </button>
        <button
          onClick={() => router.push("/basket")}
          className={styles.footerMenu}
        >
          {pathname === "/basket" ? (
            <ShoppingBasketIcon
              className={styles.icon}
              style={{
                color: "#0e640efd",
              }}
            />
          ) : (
            <ShoppingBasketOutlinedIcon className={styles.icon} />
          )}
          <span className={styles.text}>Basket</span>
        </button>
        <button
          onClick={() => router.push("/profile")}
          className={styles.footerMenu}
        >
          {pathname === "/profile" ? (
            <PersonIcon
              className={styles.icon}
              style={{
                color: "#0e640efd",
              }}
            />
          ) : (
            <PersonOutlineOutlinedIcon className={styles.icon} />
          )}
          <span className={styles.text}>Profile</span>
        </button>
      </div>

      <div className={styles.footerdetails}>
        <a
          style={{
            display: "flex",
            alignItems: "center",
          }}
          href="tel:+1234567890"
          aria-label="Call us"
        >
          <Phone fontSize="small" style={{ color: "blue" }} /> Call Us
        </a>
        <a
          style={{
            display: "flex",
            alignItems: "center",
          }}
          href="mailto:info@example.com"
          aria-label="Email us"
        >
          <Email fontSize="small" style={{ color: "red" }} /> Email
        </a>
        <a
          style={{
            display: "flex",
            alignItems: "center",
          }}
          href="/about"
          aria-label="Learn more about us"
        >
          <Info fontSize="small" /> About Us
        </a>
        <a
          style={{
            display: "flex",
            alignItems: "center",
          }}
          href="https://www.instagram.com/username"
          aria-label="Follow us on Instagram"
        >
          <Instagram fontSize="small" style={{ color: "#ff00a0" }} /> Instagram
        </a>
        <a
          style={{
            display: "flex",
            alignItems: "center",
          }}
          href="https://www.facebook.com/username"
          aria-label="Follow us on Facebook"
        >
          <Facebook fontSize="small" style={{ color: "blue" }} /> Facebook
        </a>
        <a
          style={{
            display: "flex",
            alignItems: "center",
          }}
          href="https://www.youtube.com/channel/channelID"
          aria-label="Subscribe to our Youtube channel"
        >
          <YouTube fontSize="small" style={{ color: "red" }} /> Youtube
        </a>
      </div>
    </div>
  );
};

export default Footer;
