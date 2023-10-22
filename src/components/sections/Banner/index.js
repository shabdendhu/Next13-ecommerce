"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Banner.module.scss";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const Banner = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <div className={styles.component}>
      <ArrowBackIosNewOutlinedIcon
        style={{ color: "#208b16", cursor: "pointer", fontSize: 35 }}
      />
      <div
        className={styles.bannerContainer}
        // style={{ border: "1px solid red" }}
      >
        <img
          src="https://img.crofarm.com/images/promotions/f6ceff3a1f04.png"
          alt=""
        />
        <img
          src="https://img.crofarm.com/images/promotions/f6ceff3a1f04.png"
          alt=""
        />
        <img
          src="https://img.crofarm.com/images/promotions/f6ceff3a1f04.png"
          alt=""
        />
        <img
          src="https://img.crofarm.com/images/promotions/f6ceff3a1f04.png"
          alt=""
        />
      </div>
      <ArrowForwardIosOutlinedIcon
        style={{ color: "#208b16", cursor: "pointer", fontSize: 35 }}
      />
    </div>
  );
};

export default Banner;
