import Link from "next/link";
import React from "react";
import Banner from "@/components/sections/Banner";
import ProductsHomeSection from "@/components/sections/ProductsHomeSection";
import BestSeller from "@/components/sections/BestSeller";
import Footer from "@/components/sections/Footer";

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
            // backgroundColor: "#10ff0054",
            padding: "10px 0px",
            borderRadius: 10,
          }}
        >
          <Banner />
        </div>

        <BestSeller />
        <ProductsHomeSection
          headerText="OFFERS"
          style={{ backgroundColor: "#fcff8a" }}
        />
        <ProductsHomeSection headerText="RECENTLY ADDED" />
        <ProductsHomeSection
          style={{ backgroundColor: "#fcff8a" }}
          headerText="BEST SELLERS"
        />

        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default Home;
