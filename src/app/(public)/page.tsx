import Link from "next/link";
import React from "react";
import Banner from "@/components/sections/Banner";
import ProductsHomeSection from "@/components/sections/ProductsHomeSection";
import BestSeller from "@/components/sections/BestSeller";
import Footer from "@/components/sections/Footer";
import QuickCategory from "@/components/sections/QuickCategory";
import PageWrapper from "@/components/sections/PageWrapper";

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
        <ProductsHomeSection
          headerText="OFFERS"
          style={{
            // background: "rgb(180,173,58)",
            background:
              "linear-gradient(180deg, #fff00087 0%, rgba(255,235,0,0) 100%)",
          }}
        />
        <ProductsHomeSection
          style={{
            // background: "rgb(180,173,58)",
            background:
              "linear-gradient(180deg, #00ff306b 0%, rgba(255,235,0,0) 100%)",
          }}
          headerText="RECENTLY ADDED"
        />
        <ProductsHomeSection
          style={{
            // background: "rgb(180,173,58)",
            background:
              "linear-gradient(180deg, #fff00087 0%, rgba(255,235,0,0) 100%)",
          }}
          headerText="BEST SELLERS"
        />

        {/* <Footer/> */}
      </PageWrapper>
    </div>
  );
};

export default Home;
