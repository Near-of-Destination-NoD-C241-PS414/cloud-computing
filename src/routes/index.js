const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/index.js");

const firebaseAuthController = require("../controllers/firebase-auth-controller.js");
const destinationController = require("../controllers/destination-controller.js");
const reviewsController = require("../controllers/reviews-controller.js");

//for authentication
router.post("/api/register", firebaseAuthController.registerUser);
router.post("/api/login", firebaseAuthController.loginUser);
router.post("/api/logout", firebaseAuthController.logoutUser);
router.post("/api/reset-password", firebaseAuthController.resetPassword);

//to get places recommendation
router.post("/search/nearby", destinationController.getDestinationByDistance);
router.post("/search/category", destinationController.getDestinationByCategory);
router.post("/search/review", destinationController.getDestinationByReview);

//to get places details
router.get("/search/details/:name", destinationController.getDetailsByName);

//for user submitted review
router.post("/reviews/:placeId", verifyToken, reviewsController.addReview);
router.get(
  "/reviews/:placeId",
  // verifyToken,
  reviewsController.getReviewsByPlaceId
);

module.exports = router;
