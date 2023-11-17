import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/connection";
import ProductSuggestion from "@/models/productSuggestionModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
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
export async function GET(req, res) {
  try {
    const productSuggestion = await ProductSuggestion.find();
    return NextResponse.json({
      data: productSuggestion,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
