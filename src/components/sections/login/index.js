import React from "react";
import style from "./Login.module.scss";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Home = () => {
  return (
    <div className={style.contentContainer}>
      <div className={style.instractionContainer}>
        <p>The best app for pickle </p>
      </div>
      <div className={style.buttonContainer}>
        <div className={style.loginCard}>Sign In</div>
        <div className={style.createAccount}>Create an account</div>
      </div>
    </div>
  );
};
const Login = () => {
  return (
    <div className={style.container}>
      {/* <Home /> */}

      <div className={style.loginbackground}>
        <h1 className={style.header}>Welcom Back</h1>
        <p className={style.subheader}>Login To Your Account</p>
        <form className={style.form}>
          <div className={style.inputContainer}>
            <span>
              <PersonIcon
                style={{
                  color: "#0d4b0d",
                }}
              />
            </span>
            <input placeholder="Full Name" />
          </div>
          <br />
          <div className={style.inputContainer}>
            <span>
              <LockIcon
                style={{
                  color: "#0d4b0d",
                }}
              />
            </span>
            <input placeholder="Full Name" />
            <span>
              <VisibilityOffIcon
                style={{
                  color: "#0d4b0d",
                }}
              />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
