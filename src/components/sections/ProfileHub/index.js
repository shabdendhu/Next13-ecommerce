import React from "react";
import styles from "./profile.module.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

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
            <AccountCircleRoundedIcon style={{fontSize:'50px',color:'green',marginRight:'15px'}}/>
            <span>
              <p>Hello</p>
              <b style={{fontSize:'25px'}}>swoyamprava</b>
            </span>
          </div>
          <div style={{ border: "1px solid red", height: "100% " }}>
            <div>hfjhj</div>
            <div>hygghj</div>
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
