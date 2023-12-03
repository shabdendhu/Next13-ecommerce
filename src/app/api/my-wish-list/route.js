import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import WishList from "@/models/myWishListModel";
import Product from "@/models/productModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const wishList = new WishList(reqBody);
    const savedMyWishList = await wishList.save();
    return NextResponse.json({
      data: savedMyWishList,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user");
    const products = await Product.findOne({});
    const myWishList = await WishList.findOne({ user: userId });

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
