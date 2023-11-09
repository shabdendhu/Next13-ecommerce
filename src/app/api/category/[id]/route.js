// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/connection";
import Category from "@/models/categoryModel";

connect();

export async function PUT(req, { params }) {
  const { id } = params;

  const reqBody = await req.json();
  // const {token} = reqBody
  console.log(reqBody, id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found", success: false });
    } else {
      return NextResponse.json({ data: updatedCategory, success: true });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Error updating the Category",
      success: true,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    if (!id)
      return NextResponse.json({
        message: "please provide category id",
        success: false,
      });
    const deletedCategory = await Category.findByIdAndRemove(id);
    console.log(deletedCategory);
    if (deletedCategory)
      return NextResponse.json({
        message: "category deleted successfully",
        success: true,
      });
    else
      return NextResponse.json({
        message: "Failed to delete category",
        success: false,
      });
  } catch (error) {
    return NextResponse.json({
      message: "error to delete category",
      success: false,
    });
  }
}
