import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json({
      data: savedUser,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to limit 10 if not provided

    const totalCount = await User.countDocuments({});
    const totalPages = Math.ceil(totalCount / limit);

    const users = await User.find()
      .select("-password")
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit number of documents per page

    return NextResponse.json({
      data: users,
      success: true,
      totalPages: totalPages,
      page,
      limit,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
