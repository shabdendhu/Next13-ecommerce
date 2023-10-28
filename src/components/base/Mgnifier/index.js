"use client";
import React, { useState } from "react";

const Magnifier = ({ imageUrl }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (isZoomed) {
      // Calculate the position of the magnifier
      const zoomer = document.getElementById("zoomer");
      const image = document.getElementById("product-image");
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const widthRatio = image.width / zoomer.offsetWidth;
      const heightRatio = image.height / zoomer.offsetHeight;

      // Set the background position of the zoomed image
      const xPos = -(x * widthRatio);
      const yPos = -(y * heightRatio);
      zoomer.style.backgroundPosition = `${xPos}px ${yPos}px`;
    }
  };

  return (
    <div
      className="magnifier-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className={`zoomer ${isZoomed ? "zoomed" : ""}`} id="zoomer" />
      <img
        src={imageUrl}
        alt="Product"
        className="product-image"
        id="product-image"
      />
    </div>
  );
};

export default Magnifier;
