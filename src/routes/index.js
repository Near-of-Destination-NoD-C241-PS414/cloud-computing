const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/index.js");

const firebaseAuthController = require("../controllers/firebase-auth-controller.js");
const destinationController = require("../controllers/destination-controller.js");
// const PostsController = require("../controllers/posts-controller.js");

router.post("/api/register", firebaseAuthController.registerUser);
router.post("/api/login", firebaseAuthController.loginUser);
router.post("/api/logout", firebaseAuthController.logoutUser);
router.post("/api/reset-password", firebaseAuthController.resetPassword);

router.post("/search/nearby", destinationController.getDestinationByDistance);
router.post("/search/category", destinationController.getDestinationByCategory);
router.post("/search/review", destinationController.getDestinationByReview);

// Only authenticated users can access this route
// router.get("/api/posts", verifyToken, PostsController.getPosts);

module.exports = router;
