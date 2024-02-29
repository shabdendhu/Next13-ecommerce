// pages/api/orders/index.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import Basket from "@/models/basketModel";
import mongoose from "mongoose";
import User from "@/models/userModel";
connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { user, productIds } = reqBody;

    // Step 1: Retrieve the user's basket
    const userBasket = await Basket.findOne({ user: user }).populate(
      "items.product"
    );

    // Step 2: Validate if the user exists and has a basket
    if (!userBasket) {
      throw new Error("User basket not found.");
    }

    // Step 3: Retrieve the products from the productId array
    const products = await Product.find({ _id: { $in: productIds } });

    // Step 4: Check if each product exists and is available in the user's basket
    const orderedItems = [];
    let totalPrice = 0;
    products.forEach((product) => {
      const itemInBasket = userBasket.items.find((item) =>
        item.product._id.equals(product._id)
      );
      if (!itemInBasket || itemInBasket.quantity <= 0) {
        throw new Error(
          `Product with ID ${product._id} not found in the basket or quantity is zero.`
        );
      }
      orderedItems.push({
        product: product._id,
        quantity: itemInBasket.quantity,
        price: itemInBasket.price,
      });
      totalPrice += itemInBasket.price * itemInBasket.quantity;
    });

    // Step 6: Create an order object
    const order = new Order({
      user: user,
      products: orderedItems,
      totalAmount: totalPrice,
      status: "pending", // Assuming the default status is "pending"
    });

    // Step 7: Save the order to your database
    await order.save();

    // Step 8: Clear the user's basket
    // Step 8: Remove the ordered products from the user's basket
    userBasket.items = userBasket.items.filter((item) => {
      // Check if the item's product ID is not in the ordered product IDs
      return !productIds.includes(item.product._id.toString());
    });

    // Recalculate the total price of the remaining items in the basket
    userBasket.total = userBasket.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Save the updated basket
    await userBasket.save();

    return NextResponse.json({
      data: order,
      success: true,
      message: "Order placed successfully.",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function GET(req) {
//   try {
//     const searchParams = req.nextUrl.searchParams;
//     const userId = searchParams.get("user");

//     if (!userId) {
//       // Fetch all products if user is not available
//       const allOrders = await Order.find({}).populate({
//         path: "user",
//         select: "email",
//       });
//       return NextResponse.json({
//         data: allOrders,
//         success: true,
//       });
//     }

//     // Check if the user ID is valid
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return NextResponse.json(
//         { error: "Invalid user ID", success: false },
//         { status: 400 }
//       );
//     }

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found", success: false },
//         { status: 404 }
//       );
//     }

//     // Fetch orders for the given user
//     const orders = await Order.find({ user: userId }).populate(
//       "products.product"
//     );
//     return NextResponse.json({
//       data: orders,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user");
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to limit 10 if not provided

    if (!userId) {
      // Fetch all orders if user is not available
      const totalCount = await Order.countDocuments({});
      const totalPages = Math.ceil(totalCount / limit);

      const allOrders = await Order.find({})
        .populate({
          path: "user",
          select: "email",
        })
        .skip((page - 1) * limit) // Skip documents based on pagination
        .limit(limit); // Limit number of documents per page

      return NextResponse.json({
        data: allOrders,
        success: true,
        totalPages: totalPages,
        page,
        limit,
      });
    }

    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID", success: false },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    // Fetch orders for the given user with pagination
    const totalCount = await Order.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalCount / limit);
    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit number of documents per page

    return NextResponse.json({
      data: orders,
      success: true,
      totalPages: totalPages,
      page,
      limit,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  const reqBody = await req.json();
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found", success: false });
    } else {
      return NextResponse.json({ data: updatedOrder, success: true });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Error updating the order",
      success: false,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    if (!id) {
      return NextResponse.json({
        message: "Please provide order id",
        success: false,
      });
    }
    const deletedOrder = await Order.findByIdAndRemove(id);
    if (deletedOrder) {
      return NextResponse.json({
        message: "Order deleted successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Failed to delete order",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting order",
      success: false,
    });
  }
}
