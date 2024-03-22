import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";
import styles from "./Footer.module.scss";
import MobileFooter from "./MobileFooter";
import { connect } from "@/dbConfig/connection";
import Category from "@/models/categoryModel";
const Footer = async () => {
  let category;
  let error;

  await connect();

  try {
    category = await Category.find({}, { _id: 1, name: 1 }).limit(10).lean();
  } catch (err) {
    error = err;
  }
  return (
    <>
      <MobileFooter />
      <div className={styles.footerdetails}>
        <div
          style={{
            flex: 2,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Acharpapad.in
          </div>
          <p
            style={{
              width: "80%",
            }}
          >
            Discover the essence of Odisha's culinary heritage at AcharPapad.in,
            your premier online destination for the finest sweets, handcrafted
            papads, aromatic spices, and regional delights. From the iconic
            flavors of rasagulla and chhena poda to the irresistible crunch of
            our hand-made papads, each product embodies the rich traditions and
            flavors of Odia cuisine. Let our carefully curated selection
            transport you to the vibrant streets and bustling markets of Odisha,
            where every bite tells a story of culture and tradition. With just a
            few clicks, indulge in the authentic taste of Odisha and elevate
            your culinary experience with AcharPapad.in.
          </p>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Categories
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            {category.map((e) => (
              <Link
                href={"/category?id=" + e._id}
                style={{ textTransform: "capitalize" }}
              >
                {e.name}
              </Link>
            ))}
            <p>Others</p>
          </div>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Links
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Contact Us</Link>
            <Link href={"/"}>Privacy Policy</Link>
            <Link href={"/"}>Terms of Use</Link>
            <Link href={"/"}>Help</Link>
            <Link href={"/"}>Refund Policy</Link>
            <Link href={"/"}>Privacy Policy</Link>
            <Link href={"/"}>Terms of Use</Link>
            <Link href={"/"}>Help</Link>
            <Link href={"/"}>FAQ</Link>
          </div>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Contact Us
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <InstagramIcon />
            <TwitterIcon />
            <FacebookIcon />
            <YouTubeIcon />
            <CallIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
