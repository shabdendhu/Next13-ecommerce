"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductsHomeSection.module.scss";
import ProductCard from "../ProductCard";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import cx from "classnames";
import { apiGet } from "@/helpers/api";
import { useRouter, usePathname } from "next/navigation";

export const ProductsHomeSection = ({
  headerText = "HEADER",
  products = [],
  ...props
}) => {
  const scrollContainerRef = useRef(null);
  const handleScroll = (direction) => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      if (direction === "left") {
        scrollContainer.scrollLeft -= 200; // Adjust the scroll amount as needed
      } else if (direction === "right") {
        scrollContainer.scrollLeft += 200; // Adjust the scroll amount as needed
      }
    }
  };
  return (
    <div className={styles.component} {...props}>
      <div className={styles.header}>{headerText}</div>
      <div className={styles.content}>
        <ArrowBackIosNewOutlinedIcon
          onClick={() => handleScroll("left")}
          className={styles.arrowLeft}
        />
        <div className={styles.cardContainer} ref={scrollContainerRef}>
          {products.map((e, i) => (
            <ProductCard
              key={i}
              data={e}
              className={cx(styles.scrollItem)}
              style={{
                backgroundColor: "#FFFFFF",
              }}
            />
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon
          onClick={() => handleScroll("right")}
          className={styles.arrowRight}
        />
      </div>
    </div>
  );
};

const MultipleProductsHomeSection = () => {
  const [sections, setSection] = useState([]);
  const pathname = usePathname();
  const getAllSections = async () => {
    try {
      const sections = await apiGet(
        "/api/productsuggestion?screenName=" + pathname
      );
      setSection(sections.data);
      console.log(sections.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllSections();
    console.log(pathname);
  }, []);

  return (
    <div>
      {sections.map((e, i) => (
        <ProductsHomeSection
          key={e?._id}
          products={e?.productIds || []}
          headerText={e?.name}
          style={{
            // background: "rgb(180,173,58)",
            background:
              i % 2 == 0
                ? "linear-gradient(180deg, #fff00087 0%, rgba(255,235,0,0) 100%)"
                : "linear-gradient(180deg, #00ff306b 0%, rgba(255,235,0,0) 100%)",
          }}
        />
      ))}
    </div>
  );
};
export default MultipleProductsHomeSection;
