// pages/api/products/search.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Product from "@/models/productModel";

connect();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({
        error: "Please provide a search query",
        success: false,
      });
    }

    const products = await Product.find(
      {
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search for product name
          { description: { $regex: query, $options: "i" } }, // Case-insensitive search for product description
          { tags: { $in: [query] } }, // Search for products with matching tags
        ],
      },
      { _id: 1, name: 1, images: 1 }
    );

    return NextResponse.json({
      data: products,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error searching for products",
      error,
      success: false,
    });
  }
}
