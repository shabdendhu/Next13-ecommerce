import React from "react";
import TrackOrder from "@/components/sections/TrackOrder";
const Track = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return <TrackOrder params={params} query={searchParams} />;
};

export default Track;
