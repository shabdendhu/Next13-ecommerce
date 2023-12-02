"use client";
import PageWrapper from "../PageWrapper";
import ProfileMenu from "@/components/sections/ProfileMenu";
import ProfileContent from "@/components/sections/ProfileContent";
import styles from "./profile.module.scss";
import MultipleProductsHomeSection from "../ProductsHomeSection";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("/profile/order");
  return (
    <PageWrapper classNames={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <ProfileMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.content}>
          <ProfileContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      <MultipleProductsHomeSection />
    </PageWrapper>
  );
};

export default Profile;
