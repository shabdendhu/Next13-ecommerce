import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import style from "./Signup.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiPost } from "@/helpers/api";
import { signIn } from "next-auth/react";
import { useSnackbar } from "@/hooks/useSnakBar";

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
const Signup = () => {
  const { openSnackbar } = useSnackbar();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUpRes = await apiPost(
        "/api/user/",
        {
          username: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        },
        openSnackbar
      );
      if (signUpRes?.success) {
        router.push("/login");
      }
    } catch (error) {
      toast.error("Someting went wrong");
    }
  };
  const handleredirectToLogin = () => {
    router.push("/login");
  };
  const handleChangeFiled = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleClickGoogleLogin = (e) => {
    e.preventDefault();
    signIn("google").then((e) => console.log(e));
  };
  return (
    <div className={style.container}>
      {/* <Home /> */}
      <div className={style.logoHeader}>-:ACHARA:-</div>
      <div className={style.bluryBackground}>
        <div className={style.loginbackground}>
          <h1 className={style.header}>Register</h1>
          <p className={style.subheader}>Create your new account</p>
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.inputContainer}>
              <span>
                <PersonIcon
                  style={{
                    color: "#0d4b0d",
                  }}
                />
              </span>
              <input
                name="name"
                value={userInfo.name}
                onChange={handleChangeFiled}
                placeholder="Full Name"
              />
            </div>
            <br />
            <div className={style.inputContainer}>
              <span>
                <EmailIcon
                  style={{
                    color: "#0d4b0d",
                  }}
                />
              </span>
              <input
                name="email"
                value={userInfo.email}
                type="email"
                onChange={handleChangeFiled}
                placeholder="Email"
              />
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
              <input
                name="password"
                // type="password"
                value={userInfo.email}
                onChange={handleChangeFiled}
                placeholder="Password"
              />
              <span>
                <VisibilityOffIcon
                  style={{
                    color: "#0d4b0d",
                  }}
                />
              </span>
            </div>
            <button
              className={style.googleButton}
              onClick={handleClickGoogleLogin}
            >
              <img src="https://static.vecteezy.com/system/resources/thumbnails/011/598/471/small/google-logo-icon-illustration-free-vector.jpg" />
              <h1>LOGIN WITH GOOGLE</h1>
            </button>
            <div className={style.forgotPassword}>Forgot Password?</div>

            <button type="submit" className={style.loginButton}>
              Signup
            </button>
            <div className={style.footerInstruction}>
              Already have an account?{" "}
              <b onClick={handleredirectToLogin}>Log In</b>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
