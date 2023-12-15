"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useRouter } from "next/navigation";
import CategoryMenu from "@/components/base/CategoryMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useScrollDirection from "@/hooks/useScrollDirection";
import { apiGet, apiPost } from "@/helpers/api";
import { Divider } from "@mui/material";
const Header = () => {
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const handleLogin = () => {
    router.push("/login");
  };
  const handleClickCategory = () => {
    router.push("/category");
  };
  const handleClickLogo = () => {
    router.push("/");
  };
  const handleSelectSearchItem = async (id) => {
    setSearchProducts([]);

    setSearchText("");
    router.push("/product-details/" + id);
  };
  const handleSearchProduct = async () => {
    const searchRes = await apiPost("/api/products/search", {
      query: searchText,
    });
    setSearchProducts(searchRes.data);
    console.log({ searchRes });
  };
  const getAllCategory = async () => {
    const categoryRes = await apiGet("/api/category");
    setCategory(categoryRes?.data);
    console.log({ categoryRes });
  };
  useEffect(() => {
    if (searchText) handleSearchProduct();
  }, [searchText]);

  useEffect(() => {
    getAllCategory();
  }, []);
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Here...."
              className={styles.searchBbar}
            />
            <span className={styles.searchButton}>
              <SearchIcon className={styles.searchIcon} />
            </span>
            <div className={styles.searchListContainer}>
              {searchProducts?.map((e) => (
                <div key={e._id} onClick={() => handleSelectSearchItem(e._id)}>
                  <div className={styles.searchList}>
                    <img
                      className={styles.productImage}
                      src={e?.images[0] || ""}
                    />
                    <div>{e?.name}</div>
                  </div>
                  <Divider />
                </div>
              ))}
            </div>
          </div>

          <div onClick={handleLogin}></div>

          {/* visible above 900px */}
          <div className={styles.rightIcon}>
            <PersonIcon
              onClick={() => router.push("/profile")}
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
              onClick={() => router.push("/profile?tab=wishlist")}
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
          {category.map((category) => (
            <CategoryMenu
              key={category._id}
              category={category}
              icon={<div className={styles.navItem}>{category.name}</div>}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
