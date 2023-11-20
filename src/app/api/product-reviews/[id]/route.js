import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import ProductReview from "@/models/productReview";

connect();

export async function PUT(req, { params }) {
  const { id } = params;
  const reqBody = await req.json();
  try {
    const updatedProductReview = await ProductReview.findByIdAndUpdate(
      id,
      reqBody,
      {
        new: true,
      }
    );
    if (!updatedProductReview) {
      return NextResponse.json({
        error: "Product review not found",
        success: false,
      });
    } else {
      return NextResponse.json({ data: updatedProductReview, success: true });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Error updating the product review",
      success: false,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    if (!id)
      return NextResponse.json({
        message: "Please provide product review id",
        success: false,
      });
    const deletedProductReview = await ProductReview.findByIdAndRemove(id);
    if (deletedProductReview)
      return NextResponse.json({
        message: "Product review deleted successfully",
        success: true,
      });
    else
      return NextResponse.json({
        message: "Failed to delete product review",
        success: false,
      });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting product review",
      success: false,
    });
  }
}
