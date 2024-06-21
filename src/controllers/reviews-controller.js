const firebase = require("../config/firebase");
const { db } = require("../config/firebase");
const storeData = require("../models/storeData");
const axios = require("axios");
const { Firestore } = require("@google-cloud/firestore");

const addReview = async (req, res) => {
  console.log("Received request params:", req.params); // Check the params

  const userId = req.user.uid;
  const name = req.params.name;
  const { rating, comment } = req.body;

  try {
    const db = new Firestore();
    const querySnapshot = await db
      .collection("destinations")
      .where("Nama Wisata", "==", name)
      .get();

    let placeData;
    let placeId;

    if (!querySnapshot.empty) {
      // 2a. Place Exists: Get Place ID from Firestore
      placeData = querySnapshot.docs[0].data();

      placeId = placeData.place_id;
      if (!placeId) {
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
      }

      console.log("Place ID from Firestore:", placeId); // Log placeId obtained from Firestore
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
      console.log("Place ID from Google Places API:", placeId); // Log placeId obtained from API
    }

    console.log("Place ID before storing review:", placeId);
    // 2. Store Review Data
    const reviewData = {
      rating,
      comment,
      timestamp: new Date(),
    };

    await storeData(placeId, userId, { placeId, ...reviewData });
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
};

const getReviewsByName = async (req, res) => {
  const { name } = req.params;

  try {
    const db = new Firestore();
    const querySnapshot = await db
      .collection("destinations")
      .where("Nama Wisata", "==", name)
      .get();

    let placeId;

    if (!querySnapshot.empty) {
      const placeData = querySnapshot.docs[0].data();
      placeId = placeData.place_id;

      if (!placeId) {
        placeId = await fetchPlaceIdFromGoogle(name);
        if (!placeId) {
          return res.status(404).json({ error: "Tempat tidak ditemukan" });
        }
      }
    } else {
      placeId = await fetchPlaceIdFromGoogle(name);
      if (!placeId) {
        return res.status(404).json({ error: "Tempat tidak ditemukan" });
      }
    }

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
        timestamp: new Date(
          reviewData.timestamp._seconds * 1000 +
            reviewData.timestamp._nanoseconds / 1000000
        ), // Convert Firestore timestamp to Date
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
};

const fetchPlaceIdFromGoogle = async (name) => {
  try {
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
    return candidates.length > 0 ? candidates[0].place_id : null;
  } catch (error) {
    console.error("Error fetching place ID from Google:", error);
    return null;
  }
};

module.exports = { addReview, getReviewsByName };
