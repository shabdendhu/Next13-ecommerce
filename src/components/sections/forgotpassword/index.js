import React, { useState } from "react";
import style from "./forgotp.module.scss";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import LockIcon from "@mui/icons-material/Lock";
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
const Forgotpassword = () => {
  const [isOtp, setIsOtp] = useState(false);

  const toggleOtp = () => {
    setIsOtp(!isOtp);
  };

  const router = useRouter();

  const handleSubmit = () => {
    console.log("====================================");
    router.push("/login");
    toggleOtp();
  };
  return (
    <div className={style.container}>
      <div className={style.logoHeader}>-:ACHARA:-</div>

      <div className={style.bluryBackground}>
        <div className={style.loginbackground}>
          <h1 className={style.header}>Forgot Password</h1>
          <p className={style.subheader}>Create New Password</p>

          <form className={style.form} onSubmit={handleSubmit}>
            {!isOtp ? (
              <div className={style.inputContainer}>
                <span>
                  <EmailIcon
                    style={{
                      color: "#0d4b0d",
                    }}
                  />
                </span>
                <input placeholder="email" />
              </div>
            ) : (
              <div className={style.inputContainer}>
                <span>
                  <PasswordIcon
                    style={{
                      color: "#0d4b0d",
                    }}
                  />
                </span>
                <input type="number" placeholder="OTP" />
              </div>
            )}

            <div>
              <button type="submit" className={style.loginButton}>
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
