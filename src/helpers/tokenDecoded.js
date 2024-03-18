import jwt from "jsonwebtoken";

const decode = ({ secret, token }) => {
  // console.log("token");
  try {
    // console.log(
    //   jwt.verify(token, process.env.NEXTAUTH_SECRET, { algorithms: ["HS256"] })
    // );
  } catch (error) {
    console.log(error);
  }
  return jwt.verify(token, secret, { algorithms: ["HS256"] });
};

export default decode;
