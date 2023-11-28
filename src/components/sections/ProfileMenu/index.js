import React from "react";

import styles from "./profilehubmenu.module.scss";
import { Avatar } from "@mui/material";

const ProfileMenu = () => {
  return (
    <div className={styles.component}>
      <div className={styles.profileContainer}>
        <div>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            // sx={{ width: 56, height: 56 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
