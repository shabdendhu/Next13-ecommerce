"use client"
import React,{useState} from "react";
import styles from "./Productdetails.module.scss";
import StarIcon from "@mui/icons-material/Star";

const Productdetails = () => {

  const [showAllDetails,setShowAllDetails] = useState(false)
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
          <b style={{fontSize:'20px'}} >Mother's Recipe Mixed Pickle (Roi) Jar, 1000 g</b>
          <p style={{fontSize:'15px',fontWeight:'400',fontFamily:'auto',marginBottom:'10px'}}>by mother's recipy</p>
        </div>
        <div style={{marginBottom:'15px'}}>
          <StarIcon style={{color:'#eb910c'}} />
          <StarIcon style={{color:'#eb910c'}} />
          <StarIcon style={{color:'#eb910c'}} />
          <StarIcon style={{color:'#eb910c'}} />
          <StarIcon style={{color:'#eb910c'}} />
          <span><u>286 Rating & 30 Reviews</u></span>
        </div>
        <div>
            <del style={{color:'#16101087'}}>MRP:<span >₹223</span></del>
            <p style={{fontSize:'20px',fontWeight: '500'}}>Price: <span >₹195</span></p>
            <h2 style={{color:'#0f5d0f',fontWeight:'500'}}>You Save :<span>35% off</span></h2>
            <h3 style={{color:'rgb(22 16 16 / 74%)'}}>(inclusive all taxes)</h3>
        </div>
        <br/>
        <div className="productdetails" >
            <u style={{fontSize:'20px',fontWeight:400}}>Details</u>
            <div style={{display:'flex',color:'rgb(22 16 16 / 74%)'}}>
            <ul >
                <li>Brand:</li>
                <li>Modaal Name:</li>
                <li>Type:</li>
                {showAllDetails &&  
                <>
                <li>Base Ingrient:</li>
                <li>Quantity:</li>
                <li>Container Type:</li>
                <li>Tasty:</li>
                <li>Ingreent:</li>
                <li>Maximum Safe Life:</li>
                </>
                }
                
            </ul>
            <ul style={{marginLeft:'15px'}}>
                <li>Top's Brand</li>
                <li> NA</li>
                <li>Pickle</li>
                {showAllDetails &&
                <>
                <li>Mixed</li>
                <li>900g</li>
                <li>Plastic</li>
                <li>Spice</li>
                <li>Mixed Vegetables, lodised Salt, Mustard Oil, Fenugreek, Acidity Regulator, Aniseed, Red Chilli Powder, Lime Juice, Preservative, Spices & Condiments, Turmeric Powder.</li>
                <li>18 Months</li>
                </>
                }
            </ul>
            </div>
        </div>
        <u style={{cursor:'pointer'}} onClick={()=>{setShowAllDetails(!showAllDetails)}}>Show {showAllDetails ? "Less":"More.."}</u>
        
      </div>
    </div>
  );
};

export default Productdetails;
