import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/connection";
import ProductSuggestion from "@/models/productSuggestionModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const savedProductsuggestion = await ProductSuggestion.save();
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
    const productSuggestions = await ProductSuggestion.find(query).populate(
      "productIds"
    );
    return NextResponse.json({ data: productSuggestions, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
