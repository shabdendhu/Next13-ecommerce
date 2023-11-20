"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Banner from "@/components/sections/Banner";
import BestSeller from "@/components/sections/BestSeller";
import Footer from "@/components/sections/Footer";
import QuickCategory from "@/components/sections/QuickCategory";
import PageWrapper from "@/components/sections/PageWrapper";
import axios from "axios";
import { apiGet } from "@/helpers/api";
import MultipleProductsHomeSection from "@/components/sections/ProductsHomeSection";

const Home = () => {
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
        <MultipleProductsHomeSection />
        {/* <Footer/> */}
      </PageWrapper>
    </div>
  );
};

export default Home;
