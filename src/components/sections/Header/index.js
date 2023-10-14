import React from "react";
import styles from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
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
        <button className={styles.loginButton}>Login</button>
      </div>
    </div>
  );
};

export default Header;
