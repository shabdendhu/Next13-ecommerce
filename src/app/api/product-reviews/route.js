import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import ProductReview from "@/models/productReviewModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const productReview = new ProductReview(reqBody);
    const savedProductReview = await productReview.save();
    return NextResponse.json({
      data: savedProductReview,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req, res) {
  try {
    const productReviews = await ProductReview.find();
    return NextResponse.json({
      data: productReviews,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
