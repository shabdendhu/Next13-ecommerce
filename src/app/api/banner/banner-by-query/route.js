// pages/api/banners/getByTargetURL.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Banner from "@/models/bannerModel";

connect();

export async function POST(req) {
  const body = await req.json();

  try {
    const banners = await Banner.find({ targetURL: body.targetURL });

    if (!banners || banners.length === 0) {
      return NextResponse.json({
        message: "No banners found for the specified targetURL",
        success: false,
      });
    }

    return NextResponse.json({
      data: banners,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error getting banners by targetURL",
      success: false,
    });
  }
}
