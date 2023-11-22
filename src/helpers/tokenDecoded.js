import jwt from "jsonwebtoken";
const tokenDecoded = (token) => {
  let user = {};
  const tokenData = jwt.decode(token, process.env.JWT_SECRET, {
    algorithms: ["HS256"],
  });
  console.log(tokenData);
  return user;
};
export default tokenDecoded;
