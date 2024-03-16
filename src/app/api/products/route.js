// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel";
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

// export async function GET(req, res) {
//   try {
//     const searchParams = req.nextUrl.searchParams;
//     const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
//     const limit = parseInt(searchParams.get("limit")) || 10; // Default to limit 10 if not provided

//     const totalCount = await Product.countDocuments({});
//     const totalPages = Math.ceil(totalCount / limit);
//     const categories = Category();
//     const products = await Product.find({})
//       .populate("category_ids")
//       .skip((page - 1) * limit) // Skip documents based on pagination
//       .limit(limit); // Limit number of documents per page

//     return NextResponse.json({
//       data: products,
//       success: true,
//       totalPages: totalPages,
//       page,
//       limit,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to limit 10 if not provided
    const searchText = searchParams.get("searchText"); // Get the search text from query params

    let query = {};

    if (searchText) {
      query = {
        $or: [
          { name: { $regex: searchText, $options: "i" } }, // Case-insensitive search for product name
          { description: { $regex: searchText, $options: "i" } }, // Case-insensitive search for product description
          { tags: { $in: [searchText] } }, // Search for products with matching tags
        ],
      };
    }

    const totalCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    const categories = Category();
    const products = await Product.find(query)
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
