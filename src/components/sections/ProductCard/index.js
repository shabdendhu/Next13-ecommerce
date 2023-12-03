"use client";
import React, { useState } from "react";
import styles from "./ProductCard.module.scss";
import Productdetails from "@/components/sections/Productdetails";
import cx from "classnames";
import AddButton from "@/components/base/AddButton";
import { useRouter } from "next/navigation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
const dummydata = {
  ratings: {
    average: 4.5,
    count: 10,
  },
  dimensions: {
    length: 10,
    width: 5,
    height: 2,
  },
  shipping_info: {
    free_shipping: true,
    estimated_delivery: "2-3 business days",
  },
  _id: "655733b294651a3e957bb3ea",
  name: "Lembu Product",
  description: "This is a sample product description.",
  price: 29.99,
  category_ids: [],
  brand: "Sample Brand",
  stock_quantity: 100,
  images: [
    "https://www.tastycircle.com/wp-content/uploads/2020/08/Garlic-Pickle-Veluthulli-Achar-500x500.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ27k4rXyjQz2SMl-PNzcdJYEcsYUGyvP-CbCGfnMxnf4VxfdELB0W6N-g5kosBgX3biPE&usqp=CAU",
  ],
  attributes: [
    {
      name: "Color",
      value: "Red",
      _id: "655733b294651a3e957bb3eb",
    },
    {
      name: "Size",
      value: "Medium",
      _id: "655733b294651a3e957bb3ec",
    },
  ],
  reviews: [],
  sku: "SAMPLE_SKU",
  weight: 1.5,
  tags: ["tag1", "tag2"],
  availability: "In Stock",
  related_products: [],
  created_at: "2023-11-17T09:34:42.137Z",
  updated_at: "2023-11-17T09:34:42.137Z",
  __v: 0,
  discount: 10,
};
const ProductCard = ({
  data = dummydata,
  className,
  quantity = 0,
  addToWishList,
  ...props
}) => {
  const [productQuantity, setproductQuantity] = useState(quantity);
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/product-details/" + data._id);
  };
  console.log(data);
  return (
    <div
      onClick={handleRedirect}
      className={cx(styles.cardContainer, className)}
      {...props}
    >
      <div className={styles.discountLabel}>{data?.discount}% off</div>
      <div className={styles.wishIcon}>
        <FavoriteBorderIcon />
        {/* <FavoriteIcon /> */}
      </div>
      <div className={styles.cardimg}>
        <img src={data?.images?.length ? data?.images[0] : ""} />
      </div>

      <div className={styles.cardinfo}>
        <div className={styles.productName}>{data.name}</div>

        <div className={styles.details}>
          <div className={styles.priceInfo}>
            <del>{Math.round(data?.price / (1 - data?.discount / 100))}/kg</del>
            <span>{data.price}</span>
          </div>
          <div className={styles.price}>₹{data.price}</div>
        </div>

        <div className={styles.cardlower}>
          <div style={{ fontSize: "13px", fontWeight: "100px" }}>1kg</div>
          <AddButton
            productQuantity={productQuantity}
            setproductQuantity={setproductQuantity}
            product={data}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
