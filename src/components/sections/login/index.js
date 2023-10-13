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
import Checkbox from '@mui/material/Checkbox';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { blue } from "@mui/material/colors";
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
          
          <br/>
          <div style={{justifycontain:'space-between'}}>
            <span>
            <Checkbox  />
           rememberme 
            </span>
           
            <span style={{fontSize:'12px',padding:'30px'}}>forgotpassword</span>
            
          </div>
          <div >
          <button 
          style={{backgroundColor:'#40744d',color:'white',border: '1px solid black', borderRadius: '15px',padding:'3px',width:'100%', }}
          >login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
