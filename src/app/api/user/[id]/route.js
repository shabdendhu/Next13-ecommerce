// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/connection";
import User from "@/models/userModel";

connect();

export async function GET(req, { params }) {
  const { id } = params;
  console.log(id);
  try {
    const user = await User.findById(id).select("-password"); // Populate the default address
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }
    return NextResponse.json({
      data: user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error getting user details",
      success: false,
    });
  }
}
