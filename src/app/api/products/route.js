// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/connection";
import Product from "@/models/productModel";
connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const product = new Product(reqBody);
    const savedProduct = await product.save();
    return NextResponse.json({
      data: savedProduct,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to limit 10 if not provided

    const totalCount = await Product.countDocuments({});
    const totalPages = Math.ceil(totalCount / limit);

    const products = await Product.find({})
      .populate("category_ids")
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit number of documents per page

    return NextResponse.json({
      data: products,
      success: true,
      totalPages: totalPages,
      page,
      limit,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
