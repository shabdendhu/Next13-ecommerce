// pages/api/basket/addItem.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Basket from "@/models/basketModel";
import Product from "@/models/productModel";

connect();

export async function POST(req) {
  try {
    const { userId, productId, quantity } = await req.json();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found", success: false });
    }

    const basket = await Basket.findOne({ user: userId });
    if (!basket) {
      const newBasket = new Basket({
        user: userId,
        items: [{ product: productId, quantity, price: product.price }],
        total: product.price * quantity,
      });
      await newBasket.save();
      return NextResponse.json({
        data: newBasket,
        success: true,
      });
    }

    // If basket exists, check if the item is already in the basket
    const existingItemIndex = basket.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingItemIndex !== -1) {
      // If the item exists, update the quantity
      basket.items[existingItemIndex].quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the basket
      basket.items.push({ product: productId, quantity, price: product.price });
    }

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
      error: "Error adding item to the basket",
      success: false,
    });
  }
}

export async function GET(req) {
  try {
    const { userId } = req.query;

    const basket = await Basket.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!basket) {
      return NextResponse.json({ error: "Basket not found", success: false });
    }

    return NextResponse.json({
      data: basket,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error getting basket items",
      success: false,
    });
  }
}

export async function DELETE(req) {
  try {
    const { userId, itemId } = req.query;

    const basket = await Basket.findOne({ user: userId });

    if (!basket) {
      return NextResponse.json({ error: "Basket not found", success: false });
    }

    // Check if the item to remove exists in the basket
    const itemToRemove = basket.items.find((item) => item._id.equals(itemId));
    if (!itemToRemove) {
      return NextResponse.json({
        error: "Item not found in the basket",
        success: false,
      });
    }

    // Remove the item from the basket
    basket.items = basket.items.filter((item) => !item._id.equals(itemId));

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
