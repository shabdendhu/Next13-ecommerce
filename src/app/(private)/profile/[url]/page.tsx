import React from "react";
import ProfileContent from "@/components/sections/ProfileContent";
import PageWrapper from "@/components/sections/PageWrapper";

const Detail = ({ params }: { params: { url: string } }) => {
  return (
    <PageWrapper>
      <ProfileContent activeTab={"/profile/" + params.url} />;
    </PageWrapper>
  );
};

export default Detail;
