import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div
      style={{
        height: "1000px",
        border: "10px solid blue",
      }}
    >
      <Link href={"/login"}>loin</Link> Home
    </div>
  );
};

export default Home;
