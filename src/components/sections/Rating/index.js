"use client";
import React from "react";
import styles from "./Rating.module.scss";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { Divider } from "@mui/material";
// import Typography from '@mui/material/Typography';

const Ratting = () => {
  const [value, setValue] = React.useState(2);
  return (
    <div className={styles.ratingBgContainer}>
      <div className={styles.rightContainer}>
        <div className={styles.heading}>REVIEWS</div>
        <div className={styles.subHeading}>
          <div className={styles.totalReviews}>
            <h1 style={{ fontSize: "15px", fontWeight: "600" }}>
              Total Reviews
            </h1>
            <b style={{ fontSize: "25px" }}>10.0 k</b>
            <p style={{ color: "#898282" }}>this is reviews</p>
          </div>
          <div className={styles.averageRating}>
            <h1>Average Rating</h1>
            <div style={{ display: "flex" }}>
              <p>4.0 k</p>
              <Rating name="read-only" value={value} readOnly />
            </div>
            <p>this is average rating</p>
          </div>
          <div>image</div>
        </div>
        <Divider />
        <div className={styles.customerReviewBgContainer}>
          {Array(10)
            .fill("")
            .map((e, i) => (
              <div key={i}>
                <div className={styles.customerReviewContainer}>
                  <div className={styles.customerDetails}>
                    <div className={styles.customerImg}>
                      <img
                        src="https://img.freepik.com/free-photo/closeup-smiling-young-beautiful-indian-woman_1262-2261.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1698883200&semt=ais"
                        alt="aaaaaa"
                      />
                    </div>
                    <div className={styles.customerAddress}>
                      <b>swoyamprava tripathy</b>
                      <h>hgftyjkkk</h>
                      <h1>hhiikjmmkk</h1>
                    </div>
                  </div>
                  <div className={styles.customerReviews}>
                    <div style={{ display: "flex" }}>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      <div>10.11.2023</div>
                    </div>
                    <div>
                      India, officially the Republic of India, is a country in
                      South Asia. It is the seventh-largest country by area; the
                      most populous country as of June 2023; and from the time
                      of its independence in 1947, the world most populous
                      democracy.
                    </div>
                    <div style={{ dispay: "flex" }}>
                      <Button
                        variant="contained"
                        style={{
                          border: "1px solid #b7adad",
                          color: "black",
                          marginRight: "50px",
                        }}
                      >
                        Edit Message
                      </Button>
                      <Button
                        variant="contained"
                        style={{ border: "1px solid #b7adad", color: "black" }}
                      >
                        Delete Message
                      </Button>
                    </div>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Ratting;
