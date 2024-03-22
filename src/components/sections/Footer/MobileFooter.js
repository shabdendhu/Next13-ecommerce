"use client";
import useScrollDirection from "@/hooks/useScrollDirection";
import CategoryIcon from "@mui/icons-material/Category";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Footer.module.scss";

const MobileFooter = () => {
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
    </div>
  );
};

export default MobileFooter;
