import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import User from "@/models/userModel";

connect();

export async function GET(req, { params }) {
  const { userId } = params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    const addresses = user.profile.addresses;

    return NextResponse.json({
      data: addresses,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error getting addresses",
      success: false,
    });
  }
}
