"use client";
import PageWrapper from "../PageWrapper";
import ProfileMenu from "@/components/sections/ProfileMenu";
import ProfileContent from "@/components/sections/ProfileContent";
import styles from "./profile.module.scss";
import MultipleProductsHomeSection from "../ProductsHomeSection";

const Profile = () => {
  return (
    <PageWrapper classNames={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <ProfileMenu />
        <div className={styles.content}>
          <ProfileContent />
        </div>
      </div>
      <MultipleProductsHomeSection />
    </PageWrapper>
  );
};

export default Profile;
