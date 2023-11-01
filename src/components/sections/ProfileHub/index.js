import React from "react";
import styles from "./profile.module.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import IosShareIcon from "@mui/icons-material/IosShare";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import InventoryIcon from '@mui/icons-material/Inventory';
const Profile = () => {
  return (
    <div className={styles.profilebgcontainer}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gridGap: "20px",
        }}
      >
        <div className={styles.leftcontainer}>
          <div className={styles.heading}>
            <AccountCircleRoundedIcon
              style={{ fontSize: "50px", color: "green", marginRight: "15px" }}
            />
            <span className={styles.headingText}>
              <p>Hello</p>
              <b style={{ fontSize: "25px" }}>swoyamprava</b>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid red",
              height: "100% ",
              backgroundColor: "white",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                border: "1px solid blue",
                width: "100%",
              }}
            >
              <InventoryIcon
                style={{
                  margin: "0px 10px",
                  fontSize: "25px", color: "green",
                }}
              />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  border: "1px solid red",
                  fontWeight: 600,
                  color:'#878787'
                }}
              >
                MY ORDERS
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className={styles.rightbgcontainer}>
          <div className={styles.rightcontainer}>
            <div>
              <h1>
                krishna
                <span>
                  <input style={{ border: "1px solid red" }} />
                </span>
              </h1>
            </div>
            <div>
              <h1>
                krishna
                <span>
                  <input style={{ border: "1px solid red" }} />
                </span>
              </h1>
            </div>
            <div>
              <h1>
                krishna
                <span>
                  <input style={{ border: "1px solid red" }} />
                </span>
              </h1>
            </div>
            <div>
              <h1>
                krishna
                <span>
                  <input style={{ border: "1px solid red" }} />
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
