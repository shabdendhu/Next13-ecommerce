"use client";
import React, { useState } from "react";
import styles from "./Magnifier.module.scss";
import cx from "classnames";

const Magnifier = ({ imageSrc, magnifiedSrc, className }) => {
  const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsMagnifierVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMagnifierVisible(false);
  };

  const handleMouseMove = (e) => {
    const magnifier = document.querySelector(`.${styles.magnifier}`);
    if (!magnifier) return;
    const image = document.querySelector(`.${styles.magnifierImage}`);
    const { left, top, width, height } = image.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const ratioX = image.width / width;
    const ratioY = image.height / height;

    magnifier.style.backgroundPosition = `-${x * ratioX}px -${y * ratioY}px`;
  };

  return (
    <div
      className={cx(styles.magnifierContainer, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img className={styles.magnifierImage} src={imageSrc} alt="Image" />
      {isMagnifierVisible & (window.innerWidth > 900) && (
        <div
          className={styles.magnifier}
          style={{
            width: 300,
            height: 300,
            borderRadius: 10,
            backgroundImage: `url(${magnifiedSrc})`,
          }}
        />
      )}
    </div>
  );
};

export default Magnifier;
