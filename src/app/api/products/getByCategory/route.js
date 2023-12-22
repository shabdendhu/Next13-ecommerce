// pages/api/products/byCategory.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Product from "@/models/productModel";

connect();

export async function POST(req) {
  try {
    const { categoryIds } = await req.json();

    if (
      !categoryIds ||
      !Array.isArray(categoryIds) ||
      categoryIds.length === 0
    ) {
      return NextResponse.json({
        error: "Please provide valid category IDs",
        data: [],
        success: false,
      });
    }

    // Search for products by category IDs
    const products = await Product.find({
      category_ids: { $in: categoryIds },
    });

    return NextResponse.json({
      data: products,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error getting products by category IDs",
      error,
      success: false,
    });
  }
}
