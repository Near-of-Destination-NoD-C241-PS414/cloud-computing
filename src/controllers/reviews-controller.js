const firebase = require("../config/firebase");
const { db } = require("../config/firebase");
const storeData = require("../models/storeData");

async function addReview(req, res) {
  const userId = req.user.uid;
  const { placeId } = req.params;
  const { rating, comment } = req.body;

  try {
    const reviewData = {
      rating,
      comment,
      timestamp: new Date(),
    };

    // Use the storeData function
    await storeData(placeId, userId, reviewData);

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
}

// async function getReviewsByPlaceId(req, res) {
//   const { placeId } = req.params;

//   try {
//     const placeReviewsRef = db
//       .collection("reviews")
//       .doc(placeId)
//       .collection("userReviews");
//     const snapshot = await placeReviewsRef.get();

//     const reviews = [];

//     snapshot.forEach((doc) => {
//       const reviewData = doc.data();
//       reviews.push({
//         userId: doc.id, // Include the user ID (document ID) in the review data
//         ...reviewData,
//       });
//     });

//     res.json(reviews);
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }

async function getReviewsByPlaceId(req, res) {
  const { placeId } = req.params;

  try {
    const placeReviewsRef = db
      .collection("reviews")
      .doc(placeId)
      .collection("userReviews");
    const snapshot = await placeReviewsRef.get();

    const reviewsWithUids = [];
    const uidsToFetch = [];
    snapshot.forEach((doc) => {
      const reviewData = doc.data();
      const uid = doc.id;
      reviewsWithUids.push({
        uid,
        ...reviewData,
      });
      uidsToFetch.push(uid);
    });

    // Get unique user IDs
    const uniqueUids = [...new Set(uidsToFetch)];

    // Batch get user data based on UIDs
    const userPromises = uniqueUids.map(async (uid) => {
      try {
        const userRecord = await firebase.admin.auth().getUser(uid);
        return userRecord.toJSON();
      } catch (error) {
        // If a user is not found, return null
        if (error.code === "auth/user-not-found") {
          console.warn("User not found:", uid);
          return null;
        } else {
          throw error;
        }
      }
    });

    const userDataArray = await Promise.all(userPromises);
    const userData = userDataArray.reduce((acc, userRecord) => {
      if (userRecord) {
        acc[userRecord.uid] = userRecord;
      }
      return acc;
    }, {});

    // Combine reviews with email addresses
    const reviewsWithEmail = reviewsWithUids.map((review) => ({
      ...review,
      email: userData[review.uid]?.email || null, // Add email if found, otherwise null
      displayName: userData[review.uid]?.displayName || null, // Add display name (if available)
    }));

    res.json(reviewsWithEmail);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { addReview, getReviewsByPlaceId };
