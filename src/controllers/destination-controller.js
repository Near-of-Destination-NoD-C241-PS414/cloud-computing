const { fetchDestinationsData } = require("../models/dataFetcher");
const { getRecommend } = require("../models/getRecommend");
const { getRecommendByCategory } = require("../models/getRecommendByCategory");
const axios = require("axios");
const { Firestore } = require("@google-cloud/firestore");

const getDestinationByDistance = async (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({
      error: "Invalid latitude or longitude (must be numbers)",
    });
  }

  try {
    // 3. Fetch Destinations Data
    const destinationsData = await fetchDestinationsData(process.env.DATA_URL);

    // 4. Get Recommendations
    const recommendation = await getRecommend(
      latitude,
      longitude,
      destinationsData
    );

    // 5. Sort by Reviews
    // recommendation.sort((a, b) => b.reviews - a.reviews);

    // 6. Send Response
    res.json(recommendation);
  } catch (error) {
    console.error("Error processing recommendation:", error);
    res.status(500).json({ error: "Failed to process recommendation" });
  }
};

const getDestinationByCategory = async (req, res) => {
  const { latitude, longitude, category } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }
  if (!category) {
    return res.status(400).json({ error: "Missing category" });
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({
      error: "Invalid latitude or longitude (must be numbers)",
    });
  }
  if (
    category !== "Air" &&
    category !== "Bukit" &&
    category !== "Monumen" &&
    category !== "Religi" &&
    category !== "Taman"
  ) {
    return res.status(400).json({
      error: "Category not found or invalid",
    });
  }

  try {
    // Fetch Destinations Data
    const destinationsData = await fetchDestinationsData(process.env.DATA_URL);

    // Get Recommendations
    const recommendation = await getRecommendByCategory(
      latitude,
      longitude,
      destinationsData
    );

    // Sort by specified category
    recommendation.sort((a, b) => b[category] - a[category]);

    // Filter results by the selected category
    const filteredRecommendation = recommendation.filter(
      (place) => place["Jenis Wisata"] === category
    );

    // Send Response
    res.json(filteredRecommendation);
  } catch (error) {
    console.error("Error processing recommendation:", error);
    res.status(500).json({ error: "Failed to process recommendation" });
  }
};

const getDestinationByReview = async (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({
      error: "Invalid latitude or longitude (must be numbers)",
    });
  }

  try {
    // Fetch Destinations Data
    const destinationsData = await fetchDestinationsData(process.env.DATA_URL);

    // Get Recommendations
    const recommendation = await getRecommend(
      latitude,
      longitude,
      destinationsData
    );

    // Sort by Reviews
    const filteredByReview = recommendation.sort(
      (a, b) => b.Reviews - a.Reviews
    );

    const top10ByReviews = filteredByReview.slice(0, 10);

    // Send Response
    res.json(top10ByReviews);
  } catch (error) {
    console.error("Error processing recommendation:", error);
    res.status(500).json({ error: "Failed to process recommendation" });
  }
};

const getDetailsByName = async (req, res) => {
  const name = req.params.name;
  const db = new Firestore();

  try {
    // Query Firestore

    const querySnapshot = await db
      .collection("destinations")
      .where("Nama Wisata", "==", name)
      .get();

    let placeData;
    let isNewData = false; // sign the data is new or not
    let placeId;

    if (!querySnapshot.empty) {
      // If data exists in Firestore, extract and return it
      placeData = querySnapshot.docs[0].data();
      const existingDocRef = querySnapshot.docs[0].ref;

      // Fetch from Google Places API if not found in Firestore
      const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        {
          params: {
            input: name,
            inputtype: "textquery",
            key: API_KEY,
          },
        }
      );

      //Fetch from Google Places API if not found in Firestore

      const candidates = response.data.candidates;
      const placeId = candidates.length > 0 ? candidates[0].place_id : null;
      if (!placeId) {
        res.status(404).json({ error: "Tempat tidak ditemukan" });
        return;
      }

      const detailsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            fields: "types,reviews,photos",
            language: "id",
            key: API_KEY,
          },
        }
      );
      const { types, reviews, photos } = detailsResponse.data.result;

      const updatedData = {
        ...placeData,
        place_id: placeId,
        types,
        reviews,
        photos,
      };

      await existingDocRef.set(updatedData, { merge: true });
      placeData = updatedData;
    } else {
      // Fetch from Google Places API if not found in Firestore
      const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        {
          params: {
            input: name,
            inputtype: "textquery",
            key: API_KEY,
          },
        }
      );

      const candidates = response.data.candidates;
      placeId = candidates.length > 0 ? candidates[0].place_id : null;
      if (!placeId) {
        res.status(404).json({ error: "Tempat tidak ditemukan" });
        return;
      }

      const detailsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            fields: "types,reviews,photos",
            language: "id",
            key: API_KEY,
          },
        }
      );
      const { types, reviews, photos } = detailsResponse.data.result;

      // Data to be added to Firestore
      placeData = {
        "Nama Wisata": name,
        place_id: placeId,
        types,
        reviews,
        photos,
      };

      // Save data to Firestore with placeId as document ID
      await db.collection("destinations").doc(placeId).set(placeData);
      isNewData = true; // Menandakan bahwa data baru dimasukkan ke Firestore
    }
    return res
      .status(200)
      .send({ status: "Berhasil", data: { placeData, isNewData } });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Gagal", msg: error });
  }
};

module.exports = {
  getDestinationByDistance,
  getDestinationByCategory,
  getDestinationByReview,
  getDetailsByName,
};
