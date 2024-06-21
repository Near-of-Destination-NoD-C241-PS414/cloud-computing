const express = require("express");
require("dotenv").config();
const router = require("./routes");
const loadModel = require("../src/models/loadModel");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3001;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const MODEL_URL = process.env.MODEL_URL;

// middleware
app.use(express.json());

app.use(cookieParser());

(async () => {
  try {
    const model = await loadModel();
    console.log("Model berhasil dimuat");
  } catch (error) {
    console.error("Terjadi kesalahan saat memuat model:", error);
    process.exit(1); // stop server when failed to load model
  }
})();

app.get("/", (req, res) => {
  res.send("Web Server is running!"); // Directly send plain text response
});

// loading router
app.use(router);

// starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
