import React from "react";
import styles from "./Banner.module.scss";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Banner = () => {
  return <div className={styles.component}>
    
    <ArrowBackIosNewOutlinedIcon/>
    
    <img  src="https://img.crofarm.com/images/promotions/f6ceff3a1f04.png" alt=""/>
    <img  src="https://img.crofarm.com/images/promotions/f6ceff3a1f04.png" alt=""/>
    <img  src="https://img.crofarm.com/images/promotions/f6ceff3a1f04.png" alt=""/>
    <img  src="https://img.crofarm.com/images/promotions/f6ceff3a1f04.png" alt=""/>
    
    <ArrowForwardIosOutlinedIcon/>
    </div>;
};
 
export default Banner;
