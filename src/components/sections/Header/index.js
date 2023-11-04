"use client";
import React from "react";
import styles from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useRouter } from "next/navigation";
import CategoryMenu from "@/components/base/CategoryMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useScrollDirection from "@/hooks/useScrollDirection";
const Header = () => {
  const router = useRouter();
  const scrollDirection = useScrollDirection();

  const handleLogin = () => {
    console.log("eeeeeeeeeeee.....");
    router.push("/login");
  };
  const handleClickCategory = () => {
    router.push("/category");
  };
  const handleClickLogo = () => {
    router.push("/");
  };
  return (
    <div
      className={styles.component}
      style={{
        top: scrollDirection === "down" ? -80 : 0,
      }}
    >
      <div className={styles.headerContainer}>
        <div className={styles.content}>
          {/* visible above 900px */}
          <div className={styles.logoContainer} onClick={handleClickLogo}>
            LOGO
          </div>

          <div className={styles.searchBarContainer}>
            <input
              placeholder="Search Here...."
              className={styles.searchBbar}
            />
            <span className={styles.searchButton}>
              <SearchIcon className={styles.searchIcon} />
            </span>
          </div>

          <div onClick={handleLogin}></div>

          {/* visible above 900px */}
          <div className={styles.rightIcon}>
            <PersonIcon
              onClick={() => router.push("/login")}
              style={{
                fontSize: "44px",
                color: "#FFFFFF",
                cursor: "pointer",
                marginRight: 10,
              }}
            />
            <FavoriteIcon
              style={{
                fontSize: "44px",
                color: "#FFFFFF",
                cursor: "pointer",
                marginRight: 10,
              }}
              onClick={() => router.push("/rating&reviews")}
            />
            <ShoppingBasketIcon
              style={{ fontSize: "44px", color: "#FFFFFF", cursor: "pointer" }}
              onClick={() => router.push("/basket")}
            />
          </div>
        </div>
      </div>

      {/* visible above 900px */}
      <div className={styles.navBar}>
        <div className={styles.navContent}>
          <CategoryMenu
            icon={
              <div
                className={styles.navItem}
                // onClick={() => router.push("/category")}
              >
                Achara & Pampada
              </div>
            }
          />

          <div
            className={styles.navItem}
            onClick={() => router.push("/brands")}
          >
            Brand ( Filter)
          </div>
          <div
            className={styles.navItem}
            onClick={() => router.push("/offers")}
          >
            Offers
          </div>
          <div
            className={styles.navItem}
            onClick={() => router.push("/new-lunches")}
          >
            New Launch
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
