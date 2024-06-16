const { fetchDestinationsData } = require("../models/dataFetcher");
const { getRecommend } = require("../models/getRecommend");
const { getRecommendByCategory } = require("../models/getRecommendByCategory");

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
    // 3. Fetch Destinations Data
    const destinationsData = await fetchDestinationsData(process.env.DATA_URL);

    // 4. Get Recommendations
    const recommendation = await getRecommendByCategory(
      latitude,
      longitude,
      destinationsData
    );

    // 5. Sort by specified category
    recommendation.sort((a, b) => b[category] - a[category]);

    // 6. Filter results by the selected category
    const filteredRecommendation = recommendation.filter(
      (place) => place["Jenis Wisata"] === category
    );

    // 6. Send Response
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
    // 3. Fetch Destinations Data
    const destinationsData = await fetchDestinationsData(process.env.DATA_URL);

    // 4. Get Recommendations
    const recommendation = await getRecommend(
      latitude,
      longitude,
      destinationsData
    );

    // 5. Sort by Reviews
    const filteredByReview = recommendation.sort(
      (a, b) => b.Reviews - a.Reviews
    );

    const top10ByReviews = filteredByReview.slice(0, 10);

    // 6. Send Response
    res.json(top10ByReviews);
  } catch (error) {
    console.error("Error processing recommendation:", error);
    res.status(500).json({ error: "Failed to process recommendation" });
  }
};

module.exports = {
  getDestinationByDistance,
  getDestinationByCategory,
  getDestinationByReview,
};
