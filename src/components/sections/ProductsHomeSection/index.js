"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductsHomeSection.module.scss";
import ProductCard from "../ProductCard";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import cx from "classnames";
import { apiGet } from "@/helpers/api";
import { useRouter, usePathname } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import { useSnackbar } from "@/hooks/useSnakBar";

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
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const pathname = usePathname();
  const getAllSections = async () => {
    try {
      setLoading(true);
      const sections = await apiGet(
        "/api/productsuggestion?screenName=" + pathname,
        {},
        openSnackbar
      );
      if (sections.success) setLoading(false);
      setSection(sections.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllSections();
  }, []);

  return (
    <div style={{ zIndex: -1, margin: "10px" }}>
      {loading &&
        Array(1)
          .fill(0)
          .map((e, i) => (
            <div
              key={i}
              style={{
                // background: "#0000001c",
                // height: "00px",
                width: "100%",
                maxWidth: "100vw",
                marginBottom: "20px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "10px",
                position: "relative",
                zIndex: "1",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                transform: "scale(1)",
                transformOrigin: "top left",
              }}
            >
              {Array(5)
                .fill("")
                .map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      key={i}
                      variant="rectangular"
                      width={150}
                      height={150}
                      style={{
                        margin: "10px",
                        borderRadius: "10px",
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width={150}
                      style={{ zIndex: -1 }}
                    />
                    <div
                      style={{
                        width: "150px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Skeleton
                          variant="text"
                          width={80}
                          style={{ zIndex: -1 }}
                        />
                        <Skeleton
                          variant="text"
                          width={80}
                          style={{ zIndex: -1 }}
                        />
                      </div>
                      <Skeleton
                        variant="rectangular"
                        width={80}
                        height={40}
                        style={{
                          marginLeft: "10px",
                          zIndex: -1,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          ))}
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
