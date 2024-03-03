import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/connection";
import ProductSuggestion from "@/models/productSuggestionModel";
import Product from "@/models/productModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const suggestion = new ProductSuggestion(reqBody);
    const savedProductsuggestion = await suggestion.save();
    return NextResponse.json({
      data: savedProductsuggestion,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to limit 10 if not provided

    const products = await Product.findOne({}); // Populate the reviews
    const screenName = searchParams.get("screenName");
    const sequence = searchParams.get("sequence");

    const query = {};

    if (screenName) query.screenName = screenName;
    if (sequence) query.sequence = sequence;

    const totalCount = await ProductSuggestion.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const productSuggestions = await ProductSuggestion.find(query)
      .sort({ sequence: 1 })
      .populate({
        path: "productIds",
        model: "product",
      })
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit number of documents per page

    return NextResponse.json({
      data: productSuggestions,
      success: true,
      totalPages: totalPages,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
