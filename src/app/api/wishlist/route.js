import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import WishList from "@/models/myWishListModel";
import Product from "@/models/productModel";

connect();

// export async function POST(request) {
//   try {
//     const reqBody = await request.json();
//     console.log(reqBody);
//     const wishList = new WishList(reqBody);
//     const savedMyWishList = await wishList.save();
//     return NextResponse.json({
//       data: savedMyWishList,
//       success: true,
//     });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { user, product } = reqBody;

    // Check if the user and product are provided
    if (!user || !product) {
      return NextResponse.json({
        error: "User and product information are required",
        success: false,
      });
    }

    // Check if the product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return NextResponse.json({
        error: "Product not found",
        success: false,
      });
    }

    // Check if the wishlist for the user already exists
    let myWishList = await WishList.findOne({ user });

    // If wishlist doesn't exist, create a new one
    if (!myWishList) {
      myWishList = new WishList({ user, products: [] });
    }

    // Check if the product is already in the wishlist
    const productIndex = myWishList.products.findIndex(
      (wishlistProduct) => wishlistProduct.product.toString() === product
    );

    if (productIndex !== -1) {
      // If the product is already in the wishlist, remove it
      myWishList.products.splice(productIndex, 1);
    } else {
      // If the product is not in the wishlist, add it
      myWishList.products.push({ product });
    }

    // Save the updated wishlist
    const savedMyWishList = await myWishList.save();

    return NextResponse.json({
      data: savedMyWishList,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating wishlist" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user");
    const products = await Product.findOne({});
    const myWishList = await WishList.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!myWishList) {
      return NextResponse.json({
        error: "wishlist not found",
        success: false,
      });
    }

    return NextResponse.json({
      data: myWishList,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error getting wishlist items",
      success: false,
    });
  }
}
