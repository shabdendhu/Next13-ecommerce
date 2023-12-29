"use client";
import React, { useEffect, useState } from "react";
import ProfileContent from "@/components/sections/ProfileContent";
import PageWrapper from "@/components/sections/PageWrapper";
import MultipleProductsHomeSection from "@/components/sections/ProductsHomeSection";
import { apiGet } from "@/helpers/api";
import { useSession } from "next-auth/react";

const Detail = ({ params }: { params: { url: string } }) => {
  const [userDetails, setUserDetails] = useState({});
  const { data: session }: any = useSession();

  const getUserDetails = async () => {
    const user = await apiGet("/api/user/" + session?.user?.id);
    setUserDetails(user?.data);
  };
  useEffect(() => {
    if (session) getUserDetails();
  }, [session]);
  return (
    <PageWrapper>
      <ProfileContent
        userDetails={userDetails}
        reloadUserDetails={getUserDetails}
        activeTab={"/profile/" + params.url}
      />
      ;
      <MultipleProductsHomeSection />
    </PageWrapper>
  );
};

export default Detail;
