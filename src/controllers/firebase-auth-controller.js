const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("../config/firebase");

const auth = getAuth();

class FirebaseAuthController {
  async registerUser(req, res) {
    const { email, password, displayName } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        // email: "Email is required",
        // password: "Password is required",
        error: "Email, password, and display name are required",
      });
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     sendEmailVerification(auth.currentUser)
    //       .then(() => {
    //         res.status(201).json({
    //           message: "Verification email sent! User created successfully!",
    //         });
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         res.status(500).json({ error: "Error sending email verification" });
    //       });
    //   })
    //   .catch((error) => {
    //     const errorMessage =
    //       error.message || "An error occurred while registering user";
    //     res.status(500).json({ error: errorMessage });
    //   });
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user profile with display name
      await updateProfile(userCredential.user, { displayName });

      // Send verification email
      await sendEmailVerification(userCredential.user);

      res.status(201).json({
        message: "Verification email sent! User created successfully!",
        userCredential: userCredential.user, // Include user details in response
      });
    } catch (error) {
      // Handle errors specific to user creation
      if (error.code === "auth/email-already-in-use") {
        return res.status(400).json({ error: "Email already in use" });
      } else if (error.code === "auth/weak-password") {
        return res
          .status(400)
          .json({ error: "Password should be at least 6 characters" });
      }

      console.error(error);
      res.status(500).json({ error: "Error registering user" });
    }
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const idToken = userCredential._tokenResponse.idToken;
        if (idToken) {
          res.cookie("access_token", idToken, {
            httpOnly: true,
          });
          res
            .status(200)
            .json({ message: "User logged in successfully", userCredential });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      })
      .catch((error) => {
        console.error(error);
        const errorMessage =
          error.message || "An error occurred while logging in";
        res.status(500).json({ error: errorMessage });
      });
  }

  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.clearCookie("access_token");
        res.status(200).json({ message: "User logged out successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

  resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        email: "Email is required",
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res
          .status(200)
          .json({ message: "Password reset email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
}

module.exports = new FirebaseAuthController();
