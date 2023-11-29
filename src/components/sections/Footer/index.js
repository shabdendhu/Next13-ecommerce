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
// import SearchIcon from '@mui/icons-material/Search';

const Footer = () => {
  const scrollDirection = useScrollDirection();
  const router = useRouter();
  const pathname = usePathname();
  console.log({ pathname });
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
          onClick={() => router.push("/mywishlist")}
          className={styles.footerMenu}
        >
          {pathname === "/mywishlist" ? (
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
        <div style={{ marginRight: "30px", marginLeft: "40px" }}>
          <ul>
            <h1>QUICK LINKS</h1>
            <li>About Us</li>
            <li>Our Process</li>
            <li>CSR Activities</li>
            <li>Recipes</li>
            <li>Offices</li>
            <li>Retail Store & Restaurants</li>
          </ul>
        </div>
        <div style={{ marginRight: "80px" }}>
          <ul>
            <h1>OUR SERVICES</h1>
            <li>Bulk Order</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>

          <ul>
            <h1>VIDEOS</h1>
            <li>Brand Videos</li>
            <li>Recipe Vedios</li>
          </ul>
        </div>
        <div style={{ marginRight: "80px" }}>
          <ul>
            <h1>OUR POLICES</h1>
            <li>Cancellation &Refund</li>
            <li>Shipping</li>
            <li>Payments</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div style={{ marginRight: "80px" }}>
          <ul>
            <h1>REACH US</h1>
            <h2 style={{ fontWeight: "500" }}>
              EMAIL:
              <span> tripathy@gmail.com</span>
            </h2>
            <h2 style={{ fontWeight: "500" }}>
              CALL:
              <span> +91 712-2779451</span>
            </h2>
            <h2 style={{ fontWeight: "500" }}>
              Customer Care Timming:
              <span> 10:00AM To 6:00PM </span>
            </h2>
          </ul>
          <ul>
            <h1>PAYMENT SECURED BY</h1>
            <img
              src="https://www.haldirams.com/media/wysiwyg/Footer_Image_new_desk.jpg"
              alt=""
            />
          </ul>
        </div>
        <div>
          <ul>
            <h1>FOLLOW US</h1>
            <div>
              <FacebookIcon style={{ color: "blue" }} />
              <span>FACEBOOK</span>
            </div>

            <div>
              <TwitterIcon style={{ color: "blue" }} />
              <span>TWITTER</span>
            </div>
            <div>
              <InstagramIcon style={{ color: "red" }} />
              <span>INSTAGRAM</span>
            </div>
            <div>
              <YouTubeIcon style={{ color: "red" }} />
              <span>YOUTUBE</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
