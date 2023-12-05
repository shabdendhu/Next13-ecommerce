"use client";
import PageWrapper from "../PageWrapper";
import ProfileMenu from "@/components/sections/ProfileMenu";
import ProfileContent from "@/components/sections/ProfileContent";
import styles from "./profile.module.scss";
import MultipleProductsHomeSection from "../ProductsHomeSection";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("/profile/wishlist");
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  useEffect(() => {
    if (tab) {
      setActiveTab("/profile/" + tab);
    }
  }, [tab]);

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
