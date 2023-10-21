import Link from "next/link";
import React from "react";
import Banner from "@/components/sections/Banner";
import ProductsHomeSection from "@/components/sections/ProductsHomeSection";

const Home = () => {
  return (
    <div
      style={{
        // height: "1000px",
        // border: "10px solid blue"
        background: "#ffffff",
      }}
    >
      <div
        style={{
          // border: "1px solid blue",
          maxWidth: "80%",
          margin: "auto",
          height: "100%",
        }}
      >
        <div
          style={{
            margin: "20px 0px",
            backgroundColor: "#10ff0054",
            padding: "10px 0px",
            borderRadius: 10,
          }}
        >
          <Banner />
        </div>
        <ProductsHomeSection />
        <ProductsHomeSection />
        <ProductsHomeSection />
        <ProductsHomeSection />
        <ProductsHomeSection />
        <ProductsHomeSection />
      </div>
    </div>
  );
};

export default Home;
