import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/connection";
import Banner from "@/models/bannerModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const banner = new Banner(reqBody);
    const savedBanner = await banner.save();
    return NextResponse.json({
      data: savedBanner,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { satus: 500 });
  }
}

export async function GET(req) {
  try {
    const banners = await Banner.find();
    return NextResponse.json({
      data: banners,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
