const express = require("express");
const app = express();
app.use(express.json());

// init cookie parser
const cookieParser = require("cookie-parser");
const { COOKIE_SECRET } = require("./secrets");
app.use(cookieParser(COOKIE_SECRET));

// init cors
const cors = require("cors");
app.use(
  cors({
    origin: process.env.CORS_ALLOW || "https://binderbuddies-n5d9.onrender.com",
    credentials: true, // Allow cookies to be sent
  })
);

const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Mount the subrouter under the '/api/' route
const { apiRouter } = require("./api/index");
app.use("/api", apiRouter);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
