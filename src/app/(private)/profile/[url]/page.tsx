import React from "react";
import ProfileContent from "@/components/sections/ProfileContent";

const Detail = ({ params }: { params: { url: string } }) => {
  return <ProfileContent url={params.url} />;
};

export default Detail;
