"use client";
import Banner from "@/components/sections/Banner";
import PageWrapper from "@/components/sections/PageWrapper";
import MultipleProductsHomeSection from "@/components/sections/ProductsHomeSection";
import styles from "./Home.module.scss";
const Home = () => {
  return (
    <div className={styles.component}>
      <PageWrapper>
        <div
          style={{
            margin: "20px 0px",
            borderRadius: 10,
          }}
        >
          <Banner />
        </div>
        <MultipleProductsHomeSection />
      </PageWrapper>
    </div>
  );
};

export default Home;
