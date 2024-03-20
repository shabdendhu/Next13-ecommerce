"use client";
import CategoryMenu from "@/components/base/CategoryMenu";
import CustomizedInputBase from "@/components/sections/SearchBar";
import { apiGet, apiPost } from "@/helpers/api";
import useScrollDirection from "@/hooks/useScrollDirection";
import { useSnackbar } from "@/hooks/useSnakBar";
import { openOtpModal } from "@/redux/auth/auth";
import { loadUsersBasket } from "@/redux/basket/addUpdateBasket";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickCategory from "../QuickCategory";
import styles from "./Header.module.scss";
const Header = () => {
  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const pathname = usePathname();
  const basketCount = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const scrollDirection = useScrollDirection();
  const { data: session } = useSession();
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
    const searchRes = await apiPost(
      "/api/products/search",
      {
        query: searchText,
      },
      openSnackbar
    );
    setSearchProducts(searchRes.data);
  };
  const getAllCategory = async () => {
    const categoryRes = await apiGet("/api/category", {}, openSnackbar);
    setCategory(categoryRes?.data);
  };
  useEffect(() => {
    if (searchText) handleSearchProduct();
  }, [searchText]);

  useEffect(() => {
    getAllCategory();
  }, []);
  const getBasketByUser = async () => {
    const basketRes = await apiGet(
      "/api/basket?user=" + session?.user?.id,
      {},
      openSnackbar
    );
    // setBasketData(basketRes.data);
    if (!basketRes?.data?.items?.length) return;
    dispatch(loadUsersBasket(basketRes.data));
  };
  const handleClikMenuItem = (path) => {
    if (!session) return dispatch(openOtpModal());
    router.push(path);
  };
  useEffect(() => {
    if (session) getBasketByUser();
  }, [session]);
  return (
    <>
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
              <img src="/logo.png" alt="logo" />
            </div>

            <div className={styles.searchBarContainer}>
              {/* <input
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
                  <div
                    key={e._id}
                    onClick={() => handleSelectSearchItem(e._id)}
                  >
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
              </div> */}
              <CustomizedInputBase />
            </div>

            <div onClick={handleLogin}></div>

            {/* visible above 900px */}
            <div className={styles.rightIcon}>
              {session?.user?.role === "admin" ? (
                <AdminPanelSettingsIcon
                  className={styles.adminIcon}
                  onClick={() => handleClikMenuItem("/admin-dashboard")}
                  style={{
                    fontSize: "44px",
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <></>
              )}
              {/* {console.log(session)} */}
              {session?.user.avatar ? (
                <Avatar
                  onClick={() => handleClikMenuItem("/profile")}
                  src={session?.user?.avatar || ""}
                  alt="image"
                  style={{
                    height: "40px",
                    width: "40px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <PersonOutlineOutlinedIcon
                  className={styles.personIcon}
                  onClick={() => handleClikMenuItem("/profile")}
                />
              )}
              <FavoriteBorderOutlinedIcon
                className={styles.faboriteIcon}
                onClick={() => handleClikMenuItem("/profile?tab=wishlist")}
              />
              <IconButton
                onClick={() => handleClikMenuItem("/basket")}
                aria-label="cart"
              >
                <Badge
                  badgeContent={basketCount?.items?.length}
                  color="secondary"
                >
                  <ShoppingCartOutlinedIcon
                    className={styles.shoppingCartIcon}
                  />
                </Badge>
              </IconButton>
            </div>
          </div>
        </div>

        {/* visible above 900px */}
        <div className={styles.navBar}>
          <div className={styles.navContent}>
            {!category.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {Array(5)
                  .fill("")
                  .map((e, i) => (
                    <Skeleton key={i} variant="text" width={80} height={30} />
                  ))}
              </div>
            ) : (
              <></>
            )}
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
      {pathname != "/category" ? <QuickCategory category={category} /> : <></>}
    </>
  );
};

export default Header;
