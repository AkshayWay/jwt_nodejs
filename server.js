const http = require("http");
const express = require("express");
const app = express();
app.use(express.json());
const hostname = "localhost";
const port = 8500;

app.use("/", require("./controller"));

http.createServer(app).listen(port, function () {
  console.log(`Application is running on http://${hostname}:${port}`);
});
