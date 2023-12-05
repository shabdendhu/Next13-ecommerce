// pages/api/users/setDefaultAddress.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import User from "@/models/userModel";

connect();

export async function POST(req) {
  try {
    const { userId, addressId } = await req.json();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    // Set the specified address as the default address
    user.defaultAddress = addressId;
    await user.save();

    return NextResponse.json({
      message: "Default address set successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error setting default address",
      success: false,
    });
  }
}
