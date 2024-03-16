"use client";
import { apiGet, apiPost } from "@/helpers/api";
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import styles from "./Productdetails.module.scss";
import Image from "next/image";
import AddButton from "@/components/base/AddButton";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  deleteItemFromBasket,
  removeFromBasket,
} from "@/redux/basket/addUpdateBasket";
import MultipleProductsHomeSection from "../ProductsHomeSection";
import { useSnackbar } from "@/hooks/useSnakBar";

const Productdetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [productDetails, setProductDetails] = useState({
    images: [],
    ratings: { average: 0 },
  });
  const [productQuantity, setproductQuantity] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isInWishList, setIsInWishList] = useState(false);
  const { openSnackbar } = useSnackbar();
  const [selectedImage, setSelectedImage] = useState("");
  const getProductById = async () => {
    const productRes = await apiGet("/api/products/" + id, {}, openSnackbar);
    setSelectedImage(productRes.data.images[0]);
    setProductDetails(productRes.data);
  };
  const [showAllDetails, setShowAllDetails] = useState(false);
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!session) router.push("/login");
    const addRes = await apiPost(
      "/api/basket",
      {
        userId: session.user.id,
        productId: productDetails._id,
        quantity: 1,
      },
      openSnackbar
    );
    // tokenDecoded(session.accessToken);
    setAddedToCart(true);
  };
  const addToWishList = async (e) => {
    e.stopPropagation();
    setIsInWishList(!isInWishList);
    const addres = await apiPost(
      "/api/wishlist",
      {
        user: session?.user?.id,
        product: productDetails?._id,
      },
      openSnackbar
    );
  };
  useEffect(() => {
    getProductById();
  }, []);
  const handleAddToBasket = () => {
    dispatch(addToBasket({ product: productDetails, quantity: 1 })); // Assuming data contains the product information
  };

  const handleRemoveFromBasket = () => {
    dispatch(removeFromBasket(productDetails._id));
  };
  const deleteFromBasket = () => {
    dispatch(deleteItemFromBasket(productDetails._id));
  };
  return (
    <PageWrapper>
      {productDetails._id ? (
        <div className={styles.productContainer}>
          <div className={styles.productImages}>
            <div className={styles.imageLists}>
              {productDetails?.images.map((e) => (
                <Image
                  onClick={() => setSelectedImage(e)}
                  key={e}
                  height={100}
                  alt="image"
                  width={100}
                  src={e}
                  style={{
                    aspectRatio: 1,
                  }}
                />
              ))}
            </div>
            <div className={styles.fullSizeImage}>
              <Image
                src={selectedImage}
                alt="image"
                height={1000}
                width={1000}
                style={{
                  height: "100%",
                  width: "100%",
                  maxHeight: 513,
                  maxWidth: 513,
                  aspectRatio: 1,
                }}
              />
            </div>
          </div>
          <div className={styles.productDescriptions}>
            <a href={productDetails?.brandUrl} className={styles.brand}>
              {productDetails?.brand}
            </a>
            <br />
            <p className={styles.productName}>
              {productDetails?.brand} {productDetails?.name},{" "}
              {productDetails?.weight} {productDetails?.unit || "Kg"}
            </p>
            <p className={styles.mrp}>
              Mrp: <del>₹{productDetails?.price}</del>
            </p>
            <div className={styles.priceContainer}>
              <p className={styles.price}>Price: ₹{productDetails?.price} </p>{" "}
              <p className={styles.priceValue}>
                (₹{productDetails?.price}/{productDetails?.unit || "Kg"})
              </p>
            </div>
            <p className={styles.offer}>
              You save <b>{productDetails?.discount}%</b> OFF
            </p>
            <p>(inclusive of all taxes) </p>
            <div className={styles.actionSection}>
              <AddButton
                disableAddButton={false}
                productQuantity={productQuantity}
                setproductQuantity={setproductQuantity}
                product={productDetails}
                onAdd={handleAddToBasket}
                deleteFromBasket={deleteFromBasket}
                onRemove={handleRemoveFromBasket}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <MultipleProductsHomeSection />
    </PageWrapper>
  );
};

export default Productdetails;

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        margin: "10px",
      }}
    >
      <div className={styles.removeFromMobile}>
        {Array(3)
          .fill("")
          .map((e, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              style={{
                borderRadius: "10px",
                aspectRatio: 1,
                margin: "10px",
                width: "100px",
                height: "100px",
              }}
            />
          ))}
      </div>
      <Skeleton
        variant="rectangular"
        height={300}
        width={300}
        style={{
          // margin: "auto",
          flex: 1,
          borderRadius: "10px",
        }}
      />
      <div>
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
      </div>
    </div>
  );
};
