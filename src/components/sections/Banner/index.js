"use client";
import { apiPost } from "@/helpers/api";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Skeleton from "@mui/material/Skeleton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import styles from "./Banner.module.scss";
import Image from "next/image";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const imageurl = [
  "https://www.haldirams.com/media/wysiwyg/Sugar_Free_Web_1920x600px.jpg",
  "https://www.haldirams.com/media/wysiwyg/Web_Sweets_Banner_1.png",
  "https://www.haldirams.com/media/wysiwyg/Final_Loyatly_Program_Banner-Desk-new_1.jpg",
  "https://www.haldirams.com/media/wysiwyg/haldirams_navratri_banner.png",
  "https://www.haldirams.com/media/wysiwyg/HDFC-Banner_1_1_1_.jpg",
];

const Banner = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const getBanners = async () => {
    setLoading(true);
    const bannersRes = await apiPost("/api/banner/banner-by-query", {
      targetURL: pathname,
    });
    setBanners(bannersRes?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className={styles.loading} />
      ) : (
        <div className={styles.component}>
          <div
            className={styles.laftArrowContainer}
            onClick={() => {
              if (index !== 0) handleChangeIndex(index - 1);
            }}
          >
            <ArrowBackIosNewOutlinedIcon
              style={{ color: "#208b16", fontSize: 35 }}
            />
          </div>
          <AutoPlaySwipeableViews
            index={index}
            onChangeIndex={handleChangeIndex}
          >
            {banners?.map((e, i) => (
              <a href={e?.pathURL} key={i}>
                <Image
                  width={1917}
                  height={600}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  src={e.imageUrl}
                />
              </a>
            ))}
          </AutoPlaySwipeableViews>
          <div
            onClick={() => {
              if (index !== banners.length - 1) handleChangeIndex(index + 1);
            }}
            className={styles.rightArrowContainer}
          >
            <ArrowForwardIosOutlinedIcon
              style={{ color: "#208b16", fontSize: 35 }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
