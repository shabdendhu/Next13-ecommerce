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

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    if (!id)
      return NextResponse.json({
        message: "please provide suggestion id",
        success: false,
      });
    const deletedSuggestion = await ProductSuggestion.findByIdAndRemove(id);
    console.log(deletedSuggestion);
    if (deletedSuggestion)
      return NextResponse.json({
        message: "suggestion deleted successfully",
        success: true,
      });
    else
      return NextResponse.json({
        message: "Failed to delete suggestion",
        success: false,
      });
  } catch (error) {
    return NextResponse.json({
      message: "error to delete suggestion",
      success: false,
    });
  }
}
