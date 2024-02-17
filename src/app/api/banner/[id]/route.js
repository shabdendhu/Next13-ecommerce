// pages/api/banners/update.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Banner from "@/models/bannerModel";

connect();

export async function PUT(req, { params }) {
  const { id } = params;

  const reqBody = await req.json();
  console.log(reqBody);
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(id, reqBody, {
      new: true,
    });

    if (!updatedBanner) {
      return NextResponse.json({ error: "Banner not found", success: false });
    }

    return NextResponse.json({
      data: updatedBanner,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating banner", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const deletedBanner = await Banner.findByIdAndRemove(id);

    if (!deletedBanner) {
      return NextResponse.json({ error: "Banner not found", success: false });
    }

    return NextResponse.json({
      message: "Banner deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting banner", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const banner = await Banner.findById(id);

    if (!banner) {
      return NextResponse.json({
        message: "Banner not found",
        success: false,
      });
    }

    return NextResponse.json({
      data: banner,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error getting banner by ID",
      success: false,
    });
  }
}
