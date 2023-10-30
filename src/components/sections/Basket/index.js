import React from "react";
import styles from "./Basket.module.scss";
import AddButton from "@/components/base/AddButton";
import ProductCard from "../ProductCard";

const BasketProduct = () => {
 

  return (
    <div className={styles.basketcontainer}>
      <div className={styles.basketheading}>
        MY CART ELEMENT(items 1)
        <span className={styles.basketIcon}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5738/5738076.png"
            alt=""
          />
        </span>
      </div>

      {/* <div className={styles.basketproduct}>
        <h2
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "19px",
            fontSize: "28px",
            fontWeight: "400",
            cursor: "pointer",
          }}
        >
          x
        </h2>
        
        <div className={styles.basketitems}>
          <div className={styles.basketimg}>
            <img
              src="https://m.media-amazon.com/images/I/81W7r1x6GYL.jpg"
              alt=""
              srcset=""
            />
          </div>
          <div>
            <div>
              <h3> Mother&apos;s Recipe Mixed Pickle (Roi) Jar, 1000 g</h3>
              <h1>₹21</h1>
            </div>

            <div>
           <AddButton/>
            </div>

            <div>
              <h1>total price:₹233</h1>
            </div>
          </div>
        </div>
      </div> */}

<div className={styles.cartItems}>
{Array(20).fill('').map((e,i)=>(
  <ProductCard/>
))}
</div>
      <div className={styles.pricedetails}>
        <h1 >Price Details</h1>
        <div className={styles.pricedistribution}>
        <ul >
          <li style={{marginBottom:'10px'}}>Price(1 item)</li>
          <li style={{marginBottom:'10px'}}>Discount Price</li>
          <li style={{marginBottom:'10px'}}>Delivery Charges</li>
          <li style={{marginBottom:'10px',fontWeight:'500',fontSize:"20px"}}>Total Amount </li>
        </ul>

        <ul >
          <li style={{marginBottom:'10px'}} >380</li>
          <li style={{marginBottom:'10px',color:"blue"}} >-181</li>
          <li style={{marginBottom:'10px'}} >40</li>
          <li style={{marginBottom:'10px',fontWeight:'500',fontSize:"20px"}} >199</li>
        </ul>

        </div>

      </div>
      <br/>

      <button style={{ backgroundColor: "blue",width:'20%',height:'45px',color:'white',borderRadius:'7px',fontSize:'19px' }}>place order</button>
      </div>
   
  );
};

export default BasketProduct;
