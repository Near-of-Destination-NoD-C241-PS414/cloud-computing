// const tf = require("@tensorflow/tfjs-node");
const express = require("express");
require("dotenv").config();
const router = require("./routes");
const loadModel = require("../src/models/loadModel");

const app = express();
const PORT = process.env.PORT || 3001;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const MODEL_URL = process.env.MODEL_URL;

// Pengaturan middleware
app.use(express.json());
// app.use(cors());

(async () => {
  try {
    const model = await loadModel();
    console.log("Model berhasil dimuat");
  } catch (error) {
    console.error("Terjadi kesalahan saat memuat model:", error);
    // Tambahkan penanganan error yang sesuai, misalnya menghentikan server
    process.exit(1); // Hentikan server jika model gagal dimuat
  }
})();

// Memuat router
app.use(router);

// Memulai server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
