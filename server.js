const express = require("express");
const colors = require("colors");

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const dotenv = require("dotenv");
const connectDB = require("./config/db");

// config env
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3000;

// connection to database
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet()); // secure my app by setting various HTTP response headers

// routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));

// start server
app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port.red}`.blue.italic.bold,
  );
});
