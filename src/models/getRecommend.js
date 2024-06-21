async function getRecommend(userLatitude, userLongitude, destinationsData) {
  try {
    // Fetch geodesic distance calculation library (e.g., using geolib)
    const geolib = await import("geolib");

    // Calculate distances for each destination
    destinationsData.forEach((destination) => {
      destination.UserDistance =
        geolib.getDistance(
          { latitude: userLatitude, longitude: userLongitude },
          { latitude: destination.Latitude, longitude: destination.Longitude }
        ) / 1000; // Convert meters to kilometers
    });

    // Sort by distance (ascending) then reviews (descending)
    destinationsData.sort((a, b) => {
      if (a.UserDistance !== b.UserDistance) {
        return a.UserDistance - b.UserDistance; // Sort by distance
      } else {
        return b.Reviews - a.Reviews; // Sort by reviews (descending)
      }
    });

    // Get top 50 recommendations
    const topRecommendations = destinationsData
      .slice(0, 10)
      .map((destination) => ({
        "Kabupaten/Kota": destination["Kabupaten/Kota"],
        "Nama Wisata": destination["Nama Wisata"],
        "Jenis Wisata": destination["Jenis Wisata"],
        Reviews: destination.Reviews,
        Rating: destination.Rating,
        User_Distance: `${destination.UserDistance} km`,
      }));

    return topRecommendations;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
}

module.exports = { getRecommend };
