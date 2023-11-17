import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/connection";
import ProductSuggestion from "@/models/productSuggestionModel";

connect();

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const suggestion = await ProductSuggestion.findById(id);
    console.log({ suggestion });
    return NextResponse.json({ data: suggestion, success: true });
  } catch (error) {
    return NextResponse.json({
      message: "error finding the product suggestions",
      error,
      success: true,
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  const reqBody = await req.json();
  console.log(reqBody, id);
  try {
    const updatedSuggestion = await ProductSuggestion.findByIdAndUpdate(
      id,
      reqBody,
      {
        new: true,
      }
    );
    console.log(updatedSuggestion);
    if (!updatedSuggestion) {
      return NextResponse.json({ error: "product not found", success: false });
    } else {
      return NextResponse.json({
        data: updatedSuggestion,
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "not updated the product",
      error,
      success: true,
    });
  }
}
