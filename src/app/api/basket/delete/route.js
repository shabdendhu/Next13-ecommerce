// pages/api/basket/addItem.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Basket from "@/models/basketModel";
import Product from "@/models/productModel";

connect();

export async function POST(req) {
  try {
    const { userId, itemId } = await req.json();

    const basket = await Basket.findOne({ user: userId });

    if (!basket) {
      return NextResponse.json({ error: "Basket not found", success: false });
    }

    // Check if the item to remove exists in the basket
    const itemToRemove = basket.items.find((item) =>
      item.product._id.equals(itemId)
    );
    if (!itemToRemove) {
      return NextResponse.json({
        error: "Item not found in the basket",
        success: false,
      });
    }

    // Remove the item from the basket
    basket.items = basket.items.filter(
      (item) => !item.product._id.equals(itemId)
    );

    // Update the total price
    basket.total = basket.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save the updated basket
    await basket.save();

    return NextResponse.json({
      data: basket,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error removing item from the basket",
      success: false,
    });
  }
}
