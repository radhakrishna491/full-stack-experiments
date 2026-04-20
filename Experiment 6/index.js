const express = require("express");
const app = express();

app.use(express.json());

// ✅ Logging Middleware
const logger = (req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
};

// ✅ Authentication Middleware
const auth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token === "12345") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// ✅ Apply logger globally
app.use(logger);

// ✅ Public Route
app.get("/", (req, res) => {
  res.send("Public Route - No Auth Required");
});

// ✅ Protected Route
app.get("/secure", auth, (req, res) => {
  res.send("Protected Route - Access Granted");
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
