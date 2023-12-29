// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/connection";
import Product from "@/models/productModel";

connect();

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const product = await Product.findById(id);
    return NextResponse.json({ data: product, success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Error finding the product",
      error,
      success: true,
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  const reqBody = await req.json();
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found", success: false });
    } else {
      return NextResponse.json({ data: updatedProduct, success: true });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error updating the product",
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
        message: "please provide product id",
        success: false,
      });
    const deletedProduct = await Product.findByIdAndRemove(id);
    if (deletedProduct)
      return NextResponse.json({
        message: "product deleted successfully",
        success: true,
      });
    else
      return NextResponse.json({
        message: "Failed to delete product",
        success: false,
      });
  } catch (error) {
    return NextResponse.json({
      message: error,
      success: false,
    });
  }
}
