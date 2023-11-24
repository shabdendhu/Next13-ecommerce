"use client";
import React, { useState } from "react";
import styles from "./Banner.module.scss";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const imageurl = [
  "https://www.haldirams.com/media/wysiwyg/Sugar_Free_Web_1920x600px.jpg",
  "https://www.haldirams.com/media/wysiwyg/Web_Sweets_Banner_1.png",
  "https://www.haldirams.com/media/wysiwyg/Final_Loyatly_Program_Banner-Desk-new_1.jpg",
  "https://www.haldirams.com/media/wysiwyg/haldirams_navratri_banner.png",
  "https://www.haldirams.com/media/wysiwyg/HDFC-Banner_1_1_1_.jpg",
];
const Banner = () => {
  const [index, setIndex] = useState(0);
  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  return (
    <div className={styles.component}>
      <div
        className={styles.laftArrowContainer}
        onClick={() => {
          if (index != 0) handleChangeIndex(index - 1);
        }}
      >
        <ArrowBackIosNewOutlinedIcon
          style={{ color: "#208b16", fontSize: 35 }}
        />
      </div>
      <AutoPlaySwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        {imageurl.map((e, i) => (
          <img key={i} src={e} />
        ))}
      </AutoPlaySwipeableViews>
      <div
        onClick={() => {
          if (index != imageurl.length - 1) handleChangeIndex(index + 1);
        }}
        className={styles.rightArrowContainer}
      >
        <ArrowForwardIosOutlinedIcon
          style={{ color: "#208b16", fontSize: 35 }}
        />
      </div>
    </div>
  );
};

export default Banner;
