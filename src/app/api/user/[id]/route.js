// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/connection";
import User from "@/models/userModel";

connect();

export async function GET(req, { params }) {
  const { id } = params;
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

export async function PUT(req, { params }) {
  const { id } = params;

  const reqBody = await req.json();
  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    // Update the user's profile, including email and username
    user.profile = { ...user.profile, ...reqBody.profile };
    user.email = reqBody.email || user.email;
    user.username = reqBody.username || user.username;

    await user.save();

    return NextResponse.json({
      user,
      message: "Profile updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error updating profile",
      success: false,
    });
  }
}
