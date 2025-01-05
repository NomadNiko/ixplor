const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const logger = require('./utils/logger');
const cors = require("cors");
require("dotenv").config();
const path = require('path');

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
// CORS configuration
app.use(cors({
  origin: ['https://ixplor.app', 'https://www.ixplor.app', 'https://ixplor-app.onrender.com'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length)
    const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
    res.redirect(301, safepath + query)
  } else {
    next()
  }
})

// Handle directory index files
app.use((req, res, next) => {
  if (req.path.match(/\/$/)) {
    const indexFile = path.join(req.path, 'index.html');
    res.sendFile(indexFile, { root: './public' }, err => {
      if (err) {
        next();
      }
    });
  } else {
    next();
  }
});

// Handle .html and .php extensions
app.use((req, res, next) => {
  if (req.path.match(/\.(html|php)$/)) {
    const cleanPath = req.path.replace(/\.(html|php)$/, '');
    res.redirect(301, cleanPath);
  } else {
    next();
  }
});


// Routes
app.use(userRoutes);
app.use(uploadRoutes);
app.get('*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Add after routes
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  res.status(500).json({ message: 'Internal server error' });
});