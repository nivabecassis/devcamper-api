const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env configs
dotenv.config({ path: "./config/config.env" });

// Connect to the db
connectDB();

// Get routes
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");

const app = express();

// JSON Body parser
app.use(express.json());

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("combined"));
}

app.use(fileUpload());

// Set express' static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/auth/users", users);

// Custom error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
);

// Handle unhandled promises and crash server
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close((err) => process.exit(1));
});
