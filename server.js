const express = require("express");
const app = express();

// Middleware utilities
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cron = require("node-cron");

const path = require("path");

// Mongoose
const mongoose = require("mongoose");
const { databaseBackup } = require("./routes/backup");

// Config variables
require("dotenv").config();

//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(
  process.env.MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, db) => {
    if (err) console.log(err);
    else console.log("Database Connected...");
  }
);

// Getting data in json format
app.use(bodyParser.json());

// API SECURITY
app.use(mongoSanitize()); // Sanitize Data
app.use(helmet()); // Set security headers
app.use(xss()); // Prevent XSS(cross site scripting) attacks
app.use(hpp()); // Prevent hpp param pollution

// CORS
app.use(cors());

// Dev Middleware
app.use(morgan("dev"));

// Test route
app.get("/api", (req, res) => {
  res.json({
    message: "API running",
  });
});

// Mounting the routes
app.use("/api/shop/auth", require("./routes/shopAuth"));
app.use("/api/user/auth", require("./routes/userAuth"));
app.use("/api/shops", require("./routes/shop"));
app.use("/api/users", require("./routes/user"));
app.use("/api/items", require("./routes/item"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/order", require("./routes/order"));
app.use("/api/eway", require("./routes/eway"));
app.use("/api/util", require("./routes/extrautil"));
app.use("/api/certificate", require("./routes/certificate"));

// Serve Static Assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Cron job to make a backup of database everyday at 12:00 AM (Indian Standard Time -> As configured on the server)
// cron.schedule("0 0 * * *", () => {
cron.schedule("0 0 * * *", () => {
  console.log("check");
  databaseBackup();
});

// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
