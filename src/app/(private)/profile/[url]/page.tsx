import React from "react";
import ProfileContent from "@/components/sections/ProfileContent";
import PageWrapper from "@/components/sections/PageWrapper";
import MultipleProductsHomeSection from "@/components/sections/ProductsHomeSection";

const Detail = ({ params }: { params: { url: string } }) => {
  return (
    <PageWrapper>
      <ProfileContent activeTab={"/profile/" + params.url} />;
      <MultipleProductsHomeSection />
    </PageWrapper>
  );
};

export default Detail;
