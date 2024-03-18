// pages/api/banners/create.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Banner from "@/models/bannerModel";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    // console.log(reqBody);
    const banner = new Banner(reqBody);
    const savedBanner = await banner.save();

    return NextResponse.json({
      data: savedBanner,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating banner", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  try {
    const banners = await Banner.find();

    return NextResponse.json({
      data: banners,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error getting banners", success: false },
      { status: 500 }
    );
  }
}
