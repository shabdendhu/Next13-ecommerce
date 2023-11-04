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
// import SearchIcon from '@mui/icons-material/Search';

const Footer = () => {
  const scrollDirection = useScrollDirection();
  return (
    <div
      className={styles.footercontainer}
      style={{
        bottom: scrollDirection === "down" ? -60 : 0,
      }}
    >
      {/* <div className={styles.footerheading}>
        <div className={styles.logo}>logo</div>
        <div className={styles.mainheader}>
          <p className={styles.header}>SIGNUP FOR NEW SELLERS</p>
          <p className={styles.paragraph}>
            Want To Latest Updates ! Sign Up For Free
          </p>
        </div>
        <div className={styles.searchbar}>
          <input style={{ height: "32px" }} placeholder="Enter Your Email" />
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "6x 6px",
              height: "32px",
            }}
          >
            SUSCRIBE
          </button>
        </div>
      </div> */}
      <div className={styles.mobileFooter}>
        <div className={styles.footerMenu}>
          <HomeIcon className={styles.icon} />
          <span className={styles.text}>Home</span>
        </div>
        <div className={styles.footerMenu}>
          <CategoryIcon className={styles.icon} />
          <span className={styles.text}>Category</span>
        </div>
        <div className={styles.footerMenu}>
          <FavoriteIcon className={styles.icon} />
          <span className={styles.text}>WishList</span>
        </div>
        <div className={styles.footerMenu}>
          <ShoppingBasketIcon className={styles.icon} />
          <span className={styles.text}>Basket</span>
        </div>
        <div className={styles.footerMenu}>
          <PersonIcon className={styles.icon} />
          <span className={styles.text}>Profile</span>
        </div>
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
