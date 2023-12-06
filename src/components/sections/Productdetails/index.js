"use client";
import React, { useEffect, useState } from "react";
import styles from "./Productdetails.module.scss";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Magnifier from "@/components/base/Mgnifier";
import PageWrapper from "../PageWrapper";
import MultipleProductsHomeSection from "../ProductsHomeSection";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/helpers/api";
import { Rating } from "@mui/material";
import { useSession } from "next-auth/react";

const Productdetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [productDetails, setProductDetails] = useState({
    images: [],
    ratings: { average: 0 },
  });
  const [addedToCart, setAddedToCart] = useState(false);
  const [isInWishList, setIsInWishList] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const getProductById = async () => {
    console.log(id);
    const productRes = await apiGet("/api/products/" + id);
    setSelectedImage(productRes.data.images[0]);
    setProductDetails(productRes.data);
    console.log({ productRes });
  };
  const [showAllDetails, setShowAllDetails] = useState(false);
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!session) router.push("/login");
    const addRes = await apiPost("/api/basket", {
      userId: session.user.id,
      productId: productDetails._id,
      quantity: 1,
    });
    // tokenDecoded(session.accessToken);
    setAddedToCart(true);
  };
  const addToWishList = async (e) => {
    e.stopPropagation();
    setIsInWishList(!isInWishList);
    const addres = await apiPost("/api/wishlist", {
      user: session?.user?.id,
      product: productDetails?._id,
    });
    console.log({ addres });
  };
  useEffect(() => {
    getProductById();
  }, []);

  return (
    <PageWrapper>
      <div className={styles.productContainer}>
        <div className={styles.productdetailscontainer}>
          <div className={styles.productdetailsimg}>
            <div className={styles.imageContainer}>
              {productDetails.images.map((e, i) => (
                <img
                  onClick={() => setSelectedImage(e)}
                  key={i}
                  src={e}
                  alt="image"
                />
              ))}
            </div>
            <Magnifier
              className={styles.magnifier}
              imageSrc={selectedImage}
              magnifiedSrc={selectedImage}
            />
          </div>

          <div className={styles.productdetails}>
            <div>
              <b style={{ fontSize: "20px" }}>{productDetails.name}</b>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  fontFamily: "auto",
                  marginBottom: "10px",
                }}
              >
                {productDetails.brand}
              </p>
            </div>
            <div
              style={{
                marginBottom: "15px",
                alignItems: "center",
                display: "flex",
                gap: "10px",
              }}
            >
              <Rating
                name="read-only"
                precision={0.5}
                readOnly
                value={productDetails?.ratings?.average}
              />
              <span>
                <u>
                  {productDetails?.ratings?.count} Rating &{" "}
                  {productDetails?.reviews?.length} Reviews
                </u>
              </span>
            </div>
            <div>
              <del style={{ color: "#16101087" }}>
                MRP:
                <span>
                  ₹{" "}
                  {Math.round(
                    productDetails?.price / (1 - productDetails?.discount / 100)
                  )}
                </span>
              </del>
              <p style={{ fontSize: "20px", fontWeight: "500" }}>
                Price: <span>₹{productDetails?.price}</span>
              </p>
              <h2 style={{ color: "#0f5d0f", fontWeight: "500" }}>
                You Save :<span>{productDetails?.discount}% off</span>
              </h2>
              <h3 style={{ color: "rgb(22 16 16 / 74%)" }}>
                (inclusive all taxes)
              </h3>
            </div>
            <br />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: addedToCart ? "red" : "#306f37",
                  marginRight: "10px",
                  borderRadius: "3px",
                  padding: "5px 5px",
                  height: "55px",
                  width: "50%",
                  color: "#ffffff",
                  borderRadius: 10,
                }}
              >
                {addedToCart ? "ADDED TO CART" : " ADD TO BASKET"}
              </button>
              <button
                onClick={addToWishList}
                style={{
                  border: "2px solid black",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: "0px 12px",
                  cursor: "pointer",
                }}
              >
                <BookmarkBorderOutlinedIcon />
                <p>{isInWishList ? "Saved" : "Save For Later"}</p>
              </button>
            </div>
            <br />
            <div style={{ display: "flex", color: "rgb(22 16 16 / 74%)" }}>
              <LocalShippingIcon style={{ padding: "0px 3px" }} />
              <h>Standard: Get it in 1 day</h>
            </div>

            <div className="productdetails">
              <div style={{ fontSize: "20px", fontWeight: 400 }}>Details</div>
              <div style={{ display: "flex", color: "rgb(22 16 16 / 74%)" }}>
                <ul>
                  {productDetails?.attributes
                    ?.map((e) => e.name)
                    ?.map((i) => (
                      <li key={i}>{i}:</li>
                    ))}
                </ul>
                <ul style={{ marginLeft: "15px" }}>
                  {productDetails?.attributes
                    ?.map((e) => e.value)
                    ?.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <MultipleProductsHomeSection />
      </div>
    </PageWrapper>
  );
};

export default Productdetails;
