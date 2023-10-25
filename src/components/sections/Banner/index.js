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
        border: "1px solid red",
        minHeight: 300,
      }}
    >
      <img
        src={src}
        style={{
          height: 300,
        }}
      />
    </div>
  );
}

const Banner = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <div className={styles.component}>
      {/* <ArrowBackIosNewOutlinedIcon
        style={{ color: "#208b16", cursor: "pointer", fontSize: 35 }}
      /> */}
      <EnhancedSwipeableViews slideCount={10} slideRenderer={slideRenderer} />
      {/* <ArrowForwardIosOutlinedIcon
        style={{ color: "#208b16", cursor: "pointer", fontSize: 35 }}
      /> */}
    </div>
  );
};

export default Banner;
