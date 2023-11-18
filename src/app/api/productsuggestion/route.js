import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/connection";
import ProductSuggestion from "@/models/productSuggestionModel";
import mongoose from "mongoose";

connect();
const MONGODB_URI = process.env.MONGODB_URI;
var db1 = mongoose.createConnection(MONGODB_URI);

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

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const screenName = searchParams.get("screenName");
    const sequence = searchParams.get("sequence");

    const query = {};

    if (screenName) query.screenName = screenName;
    if (sequence) query.sequence = sequence;
    const productSuggestions = await ProductSuggestion.find(query).populate({
      path: "productIds",
      model: "product",
    });
    return NextResponse.json({ data: productSuggestions, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
