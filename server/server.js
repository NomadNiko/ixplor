const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

// Updated MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB connected");
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log("Server is active");
  });
})
.catch((err) => {
  console.error("DB connection error:", err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Routes
app.use(userRoutes);
app.use(uploadRoutes);