import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Banner from "@/models/bannerModel";

connect();

export async function PUT(req, { params }) {
  const { id } = params;

  const reqBody = await req.json();

  console.log(reqBody, id);
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!updatedBanner) {
      return NextResponse.json({ error: "banner not found", success: false });
    } else {
      return NextResponse.json({ data: updatedBanner, success: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error,
      success: true,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    if (!id)
      return NextResponse.json({
        message: "please provide category id",
        success: false,
      });
    const deletedBanner = await Banner.findByIdAndRemove(id);
    console.log(deletedBanner);
    if (deletedBanner)
      return NextResponse.json({
        message: "banner deleted successfully",
        success: true,
      });
    else
      return NextResponse.json({
        message: "failed to delete banner",
        success: false,
      });
  } catch (error) {
    return NextResponse.json({
      message: "error to delete banner",
      success: false,
    });
  }
}
