// export default function calculateTotalPriceAndDiscount(basketData) {
//   let totalItemPrice = 0;
//   let totalDiscountPrice = 0;
//   // Loop through each item in the basket
//   basketData.items.forEach((item) => {
//     // Calculate the total price for one item
//     totalItemPrice += item.product.price * item.quantity;

//     // Calculate the discounted price for one item
//     const discountedPrice =
//       item.product.price - (item.product.price * item.product.discount) / 100;
//     totalDiscountPrice += discountedPrice * item.quantity;
//   });

//   // Return the calculated values
//   return {
//     totalItemPrice: totalItemPrice.toFixed(2),
//     totalDiscountPrice: totalDiscountPrice.toFixed(2),
//   };
// }
export default function calculateTotalPriceAndDiscount(
  basketData = [],
  selectedProductIds = []
) {
  let totalItemPrice = 0;
  let totalDiscountPrice = 0;
  let totalDeliveryPrice = 0;
  // Filter basket items based on selected product IDs if provided
  const filteredItems =
    selectedProductIds.length > 0
      ? basketData.filter((item) =>
          selectedProductIds.includes(item.product._id)
        )
      : [];
  console.log({ filteredItems, basketData, selectedProductIds });
  // Loop through each selected item
  filteredItems.forEach((item) => {
    // Calculate the total price for one item
    totalItemPrice += item.product.price * item.quantity;

    // Calculate the discounted price for one item
    const discountedPrice =
      item.product.price - (item.product.price * item.product.discount) / 100;
    totalDiscountPrice += discountedPrice * item.quantity;
    totalDeliveryPrice += item?.product?.shipping_cost;
  });

  // Return the calculated values
  return {
    totalItemPrice: totalItemPrice.toFixed(2),
    totalDiscountPrice: totalDiscountPrice.toFixed(2),
    totalDeliveryPrice: totalDeliveryPrice.toFixed(2),
  };
}
