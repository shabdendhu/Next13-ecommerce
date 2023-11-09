// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Caterory from "@/models/categoryModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    // const {token} = reqBody
    console.log(reqBody);

    const category = new Caterory(reqBody);
    const savedCategory = await category.save();
    return NextResponse.json({
      data: savedCategory,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req, res) {
  try {
    const category = await Caterory.find();
    return NextResponse.json({
      data: category,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
