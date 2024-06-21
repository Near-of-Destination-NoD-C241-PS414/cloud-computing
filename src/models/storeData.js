const { Firestore } = require("@google-cloud/firestore");

async function storeData(placeId, userId, reviewData) {
  const db = new Firestore();

  const placeRef = db.collection("reviews").doc(placeId);
  const userReviewRef = placeRef.collection("userReviews").doc(userId);

  // Using set with { merge: true } to allow updating existing reviews
  await userReviewRef.set(reviewData, { merge: true });
}

module.exports = storeData;
