import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import User from "@/models/userModel";

connect();

export async function GET(req, res) {
  try {
    const user = await User.find();
    return NextResponse.json({
      data: user,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
