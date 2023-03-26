const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secreteKey = "thisissecrekey";

router.get("/", (req, res) => {
  //   console.log("Akshay here");
  res.send("Akshay here");
});

router.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "akshay",
    email: "akshay@gmail.com",
  };

  jwt.sign({ user }, secreteKey, { expiresIn: "60s" }, (error, token) => {
    res.send(token);
  });
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
  //res.send("Inside profile api!");
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

module.exports = router;
