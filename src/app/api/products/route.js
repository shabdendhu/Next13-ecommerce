// pages/api/products/create.js
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/connection";
import Product from "@/models/productModel";
connect();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    // const {token} = reqBody
    console.log(reqBody);

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
// export async function POST(req, res) {
//   console.log("lllllllllllllllllllllllllllllll");
// await connect();
// try {
//   const reqBody = await req.json();
//   // const { username, email, password } = reqBody;
//   console.log(reqBody, ".....................");
//   // const product = new Product(req.body);
//   // const savedProduct = await product.save();
//   // res.status(201).json(savedProduct);
// } catch (error) {
//   res.status(400).json({ error: "Error creating the product" });
// }
// }

// export async function GET(req, res) {
//   const { id } = req?.query;
//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       res.status(404).json({ error: "Product not found" });
//     } else {
//       res.status(200).json(product);
//     }
//   } catch (error) {
//     res.status(400).json({ error: "Error retrieving the product" });
//   }
// }

// export async function PUT(req, res) {
//   const { id } = req.query;
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     if (!updatedProduct) {
//       res.status(404).json({ error: "Product not found" });
//     } else {
//       res.status(200).json(updatedProduct);
//     }
//   } catch (error) {
//     res.status(400).json({ error: "Error updating the product" });
//   }
// }

// export async function DELETE(req, res) {
//   const { id } = req.query;

//   try {
//     const deletedProduct = await Product.findByIdAndRemove(id);
//     if (!deletedProduct) {
//       res.status(404).json({ error: "Product not found" });
//     } else {
//       res.status(204).end();
//     }
//   } catch (error) {
//     res.status(400).json({ error: "Error deleting the product" });
//   }
// }
