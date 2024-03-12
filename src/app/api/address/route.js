// pages/api/users/addAddress.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import User from "@/models/userModel";

connect();

export async function POST(req) {
  try {
    const { userId, addressData } = await req.json();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    // Add the new address to the user's addresses
    user.profile.addresses.push(addressData);
    await User.findByIdAndUpdate(userId, user);

    return NextResponse.json({
      message: "Address added successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error adding address", success: false });
  }
}
