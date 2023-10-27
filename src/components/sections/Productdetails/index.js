import React from "react";
import styles from "./Productdetails.module.scss";
import StarIcon from "@mui/icons-material/Star";

const Productdetails = () => {
  return (
    <div className={styles.productdetailscontainer}>
      <div className={styles.productdetailsimg}>
        <img
          src="https://m.media-amazon.com/images/I/81W7r1x6GYL.jpg"
          alt=""
          srcset=""
        />
      </div>

      <div className={styles.productdetails}>
        <div>
          <h1 style={{fontSize:'25px',fontWeight:'500'}}>Mother's Recipe Mixed Pickle (Roi) Jar, 1000 g</h1>
          <p style={{fontSize:'10px'}}>by mother's recipi</p>
        </div>
        <div>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <span>286 Rating & 30 Reviews</span>
        </div>
        <div>
            <p>$195</p>
            <span>$223</span>
            <span>35% off</span>
        </div>
        <div className="productdetails" >
            <h1 styles={{fontWeight:'500'}}>Details</h1>
            <div style={{display:'flex'}}>
            <ul>
                <li>Brand</li>
                <li>Modaal Name</li>
                <li>Type</li>
                <li>Base Ingrient</li>
                <li>Quantity</li>
                <li>Container Type</li>
                <li>Tasty</li>
                <li>Ingreent</li>
                <li>Maximum Safe Life</li>
            </ul>
            <ul>
                <li>Top's Brand</li>
                <li> NA</li>
                <li>Pickle</li>
                <li>Mixed</li>
                <li>900g</li>
                <li>Plastic</li>
                <li>Spice</li>
                <li>Mixed Vegetables, lodised Salt, Mustard Oil, Fenugreek, Acidity Regulator, Aniseed, Red Chilli Powder, Lime Juice, Preservative, Spices & Condiments, Turmeric Powder.</li>
                <li>18 Months</li>
            </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
