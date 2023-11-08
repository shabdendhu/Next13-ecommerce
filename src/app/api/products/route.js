// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/connection";
import Product from "@/models/productModel";
connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const product = new Product(reqBody);
    const savedProduct = await product.save();
    return NextResponse.json({
      data: savedProduct,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req, res) {
  try {
    const product = await Product.find();
    return NextResponse.json({
      data: product,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
