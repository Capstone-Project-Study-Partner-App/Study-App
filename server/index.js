const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// app.use(express.json());

//init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

//init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init cookie parser
const { COOKIE_SECRET } = require("./secrets");
const cookieParser = require("cookie-parser");
app.use(cookieParser(COOKIE_SECRET));

// init cors
const cors = require('cors');
app.use(cors());

const client = require('./db/client');
client.connect();

// const cors = require("cors");
// app.use(
//   cors({
//     origin: process.env.CORS_ALLOW || "http://localhost:5173",
//     credentials: true, // Allow cookies to be sent
//   })
// );


app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Router: /api
app.use("/api", require("./api/index"));

// Mount the subrouter under the '/api/' route
// const { apiRouter } = require("./api/index");
// app.use("/api", apiRouter);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
