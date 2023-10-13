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
import Checkbox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleSubmit = (e) => {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
  };

  const handleredirectToLogin = () => {
    console.log("====================================");

    console.log("====================================");
    router.push("/signup");
  };
  return (
    <div className={style.container}>
      {/* <Home /> */}
      <div className={style.logoHeader}>-:ACHARA:-</div>

      <div className={style.bluryBackground}>
        <div className={style.loginbackground}>
          <h1 className={style.header}>Welcom Back</h1>
          <p className={style.subheader}>Login To Your Account</p>
          <form onSubmit={handleSubmit} className={style.form}>
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
              <input placeholder="Password" />
              <span>
                <VisibilityOffIcon
                  style={{
                    color: "#0d4b0d",
                  }}
                />
              </span>
            </div>

            <div className={style.forgotPassword}>Forgot Password?</div>

            <div>
              <button type="submit" className={style.loginButton}>
                Login
              </button>
              <div className={style.footerInstruction}>
                Dont have an account?{" "}
                <b onClick={handleredirectToLogin}>Sign up</b>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
