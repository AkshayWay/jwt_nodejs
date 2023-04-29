const jwt = require("jsonwebtoken");
const secreteKey = "thisissecrekey";

module.exports.signIn = async (req, res, next) => {
  let user = req.user;
  let result = "";
  try {
    await jwt.sign(
      { user },
      secreteKey,
      { expiresIn: "120s" },
      (error, token) => {
        console.log(token);
        result = token;
      }
    );
    return result;
  } catch (e) {
    console.log("Error", e);
    result = e;
    return result;
  }
  //return "Akshay way";
};
