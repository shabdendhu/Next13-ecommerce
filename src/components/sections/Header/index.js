"use client";
import React from "react";
import styles from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogin = () => {
    console.log("eeeeeeeeeeee.....");
    router.push("/login");
  };

  return (
    <div className={styles.component}>
      <div className={styles.headerContainer}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>LOGO</div>
          <div className={styles.searchBarContainer}>
            <input
              placeholder="Search Products Here...."
              className={styles.searchBbar}
            />
            <span className={styles.searchButton}>
              <SearchIcon className={styles.searchIcon} />
            </span>
          </div>
          <div onclick={handleLogin}>
            <PersonIcon
              style={{ fontSize: "44px", color: "#3be114", cursor: "pointer" }}
            />
          </div>
          <ShoppingBasketIcon
            style={{ fontSize: "44px", color: "#3be114", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className={styles.navBar}>
        <div className={styles.navContent}>
          <div className={styles.navItem}>Category 1</div>
          <div className={styles.navItem}>Category 2</div>
          <div className={styles.navItem}>Category 3</div>
          <div className={styles.navItem}>Category 4</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
