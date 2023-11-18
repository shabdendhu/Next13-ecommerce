"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Banner from "@/components/sections/Banner";
import ProductsHomeSection from "@/components/sections/ProductsHomeSection";
import BestSeller from "@/components/sections/BestSeller";
import Footer from "@/components/sections/Footer";
import QuickCategory from "@/components/sections/QuickCategory";
import PageWrapper from "@/components/sections/PageWrapper";
import axios from "axios";
import { apiGet } from "@/helpers/api";

const Home = () => {
  const [sections, setSection] = useState([]);
  const getAllSections = async () => {
    try {
      const sections = await apiGet("/api/productsuggestion?screenName=/");
      setSection(sections.data);
      console.log(sections.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllSections();
  }, []);

  return (
    <div
      style={{
        // height: "1000px",
        // border: "10px solid blue"
        background: "#ffffff",
      }}
    >
      <PageWrapper>
        <QuickCategory />
        <div
          style={{
            margin: "20px 0px",
            // backgroundColor: "#10ff0054",
            // padding: "10px 0px",
            borderRadius: 10,
            // border: "1px solid red",
          }}
        >
          <Banner />
        </div>

        <BestSeller />
        {sections.map((e: any, i) => (
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

        {/* <Footer/> */}
      </PageWrapper>
    </div>
  );
};

export default Home;
