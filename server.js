const express = require('express');
const colors = require('colors');

const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
const connectDB = require('./config/db');

// config env
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 5000;

// connection to database
connectDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use("/api/v1/", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoute"));

// start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port.red}`.blue.italic.bold);
});
