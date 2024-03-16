import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Product from "@/models/productModel";

connect();

export async function POST(req) {
  try {
    const { categoryIds, page, limit } = await req.json(); // Extract page and limit from request body

    if (
      !categoryIds ||
      !Array.isArray(categoryIds) ||
      categoryIds.length === 0
    ) {
      return NextResponse.json({
        error: "Please provide valid category IDs",
        data: [],
        success: false,
      });
    }

    // Set default values for page and limit if not provided
    const currentPage = page || 1;
    const itemsPerPage = limit || 10;

    // Calculate skip value based on pagination
    const skip = (currentPage - 1) * itemsPerPage;

    // Search for products by category IDs with pagination
    const totalCount = await Product.countDocuments({
      category_ids: { $in: categoryIds },
    });
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const products = await Product.find({ category_ids: { $in: categoryIds } })
      .skip(skip)
      .limit(itemsPerPage);

    return NextResponse.json({
      data: products,
      success: true,
      totalPages: totalPages,
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error getting products by category IDs",
      error,
      success: false,
    });
  }
}

// import { NextResponse } from "next/server";
// import { connect } from "@/dbConfig/connection";
// import Product from "@/models/productModel";

// connect();

// export async function POST(req) {
//   try {
//     const { categoryIds, page, limit, filters } = await req.json(); // Extract page, limit, and filters from request body

//     if (
//       !categoryIds ||
//       !Array.isArray(categoryIds) ||
//       categoryIds.length === 0
//     ) {
//       return NextResponse.json({
//         error: "Please provide valid category IDs",
//         data: [],
//         success: false,
//       });
//     }

//     const currentPage = page || 1;
//     const itemsPerPage = limit || 10;
//     const skip = (currentPage - 1) * itemsPerPage;

//     let filterQuery = { category_ids: { $in: categoryIds } };

//     if (filters && Object.keys(filters).length > 0) {
//       if (filters.minPrice !== undefined) {
//         filterQuery.price = { $gte: filters.minPrice };
//       }
//       if (filters.maxPrice !== undefined) {
//         if (filterQuery.price) {
//           filterQuery.price.$lte = filters.maxPrice;
//         } else {
//           filterQuery.price = { $lte: filters.maxPrice };
//         }
//       }
//       if (filters.category) {
//         filterQuery.category_ids = { $in: filters.category };
//       }
//       if (filters.brand) {
//         filterQuery.brand = { $in: filters.brand };
//       }
//     }

//     const totalCount = await Product.countDocuments(filterQuery);
//     const totalPages = Math.ceil(totalCount / itemsPerPage);

//     const products = await Product.find(filterQuery)
//       .skip(skip)
//       .limit(itemsPerPage);

//     return NextResponse.json({
//       data: products,
//       success: true,
//       totalPages: totalPages,
//       currentPage: currentPage,
//       itemsPerPage: itemsPerPage,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       message: "Error getting products by category IDs",
//       error,
//       success: false,
//     });
//   }
// }
