// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Category from "@/models/categoryModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    // const {token} = reqBody

    const category = new Category(reqBody);
    const savedCategory = await category.save();
    return NextResponse.json({
      data: savedCategory,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to limit 10 if not provided

    const totalCount = await Category.countDocuments({});
    const totalPages = Math.ceil(totalCount / limit);

    const categories = await Category.find()
      .populate("subcategories")
      .populate("parent_category")
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit number of documents per page

    return NextResponse.json({
      data: categories,
      success: true,
      totalPages: totalPages,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
