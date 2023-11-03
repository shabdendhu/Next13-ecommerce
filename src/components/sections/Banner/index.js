"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Banner.module.scss";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import SwipeableViews from "react-swipeable-views";
import {
  autoPlay,
  virtualize,
  bindKeyboard,
} from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
const EnhancedSwipeableViews = bindKeyboard(
  autoPlay(virtualize(SwipeableViews))
);
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const srcx = {
  slide:
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/34fcbf942d20fe6b.jpg?q=20",
  slide1:
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/f7120be1e8d98812.jpg?q=20",
  slide2:
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/6e0a9c81fc82ce85.png?q=20",
  slide3:
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/34fcbf942d20fe6b.jpg?q=20",
};

function slideRenderer(params) {
  const { index, key } = params;
  let src;

  switch (mod(index, 3)) {
    case 0:
      src = srcx.slide1;
      break;

    case 1:
      src = srcx.slide2;
      break;

    case 2:
      src = srcx.slide3;
      break;

    default:
      break;
  }

  return (
    <div
      key={key}
      style={{
        // border: "1px solid red",
        height: "50vh",
      }}
    >
      <img
        src={src}
        style={{
          height: "50vh",
        }}
      />
    </div>
  );
}
const imageurl = [
  "https://www.haldirams.com/media/wysiwyg/Sugar_Free_Web_1920x600px.jpg",
  "https://www.haldirams.com/media/wysiwyg/Web_Sweets_Banner_1.png",
  "https://www.haldirams.com/media/wysiwyg/Final_Loyatly_Program_Banner-Desk-new_1.jpg",
  "https://www.haldirams.com/media/wysiwyg/haldirams_navratri_banner.png",
  "https://www.haldirams.com/media/wysiwyg/HDFC-Banner_1_1_1_.jpg",
];
const Banner = () => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const handleChangeIndex = (index) => {
    console.log({ index });
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
