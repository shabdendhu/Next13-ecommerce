import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import User from "@/models/userModel";

connect();

export async function PUT(req, { params }) {
  const { userId, addressId } = params;

  const reqBody = await req.json();
  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    const addressIndex = user.profile.addresses.findIndex((address) =>
      address._id.equals(addressId)
    );
    // console.log({ userId, addressId });
    if (addressIndex === -1) {
      return NextResponse.json({
        message: "Address not found",
        success: false,
      });
    }

    // Update the address

    user.profile.addresses[addressIndex] = {
      ...user.profile.addresses[addressIndex],
      ...reqBody,
      _id: addressId,
    };
    await User.findByIdAndUpdate(userId, user);

    return NextResponse.json({
      message: "Address updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error updating address",
      success: false,
    });
  }
}

export async function DELETE(req, { params }) {
  const { userId, addressId } = params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    user.profile.addresses = user.profile.addresses.filter(
      (address) => JSON.stringify(address._id) != `"${addressId}"`
    );

    await User.findByIdAndUpdate(userId, user);

    return NextResponse.json({
      message: "Address deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error deleting address",
      success: false,
    });
  }
}
