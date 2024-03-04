import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import style from "./Newpassword.module.scss";

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
const Newpassword = () => {
  const router = useRouter();

  const handleSubmit = () => {
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

export default Newpassword;
