const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secreteKey = "thisissecrekey";
const jwtAuthorization = require("../module/jwt_authorization");

router.get("/", (req, res) => {
  res.send("Akshay here");
});

router.post("/login", async (req, res) => {
  const user = {
    id: 1,
    username: "akshay",
    email: "akshay@gmail.com",
  };
  req.user = user;
  const result = await jwtAuthorization.signIn(req);
  console.log(result);
  res.cookie("jwt", result, { httpOnly: true, secure: false, maxAge: 3600000 });

  // jwt.sign({ user }, secreteKey, { expiresIn: "60s" }, (error, token) => {
  res.send(result);
  // });
});

router.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secreteKey, (err, authData) => {
    if (err) {
      res.send({ result: "Invalid token" });
    } else {
      res.json({
        message: "Profile accessed",
        authData: authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.auth;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split("=");
    req.token = bearer[1];
    next();
  } else {
    res.send({
      result: "Token is expired!",
    });
  }
}

router.get("/viewCookie", verifyToken, (req, res) => {
  jwt.verify(req.token, secreteKey, (err, authData) => {
    if (err) {
      res.send({ result: "Invalid token" });
    } else {
      res.json({
        message: "Inside view cookie",
      });
    }
  });
});
module.exports = router;
