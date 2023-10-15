import Link from "next/link";
import React from "react";
import Banner from "@/components/sections/Banner";
const Home = () => {
  return (
    <div
      style={{
        height: "1000px",
        // border: "10px solid blue"
        background: "gray",
      }}
    >
      <div
        style={{
          border: "1px solid blue",
          maxWidth: "80%",
          margin:'auto',
          height:'100%'
        }}
      >
        <Banner />
      </div>
    </div>
  );
};

export default Home;
