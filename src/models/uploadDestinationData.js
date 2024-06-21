const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = require("../firebaseService.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const destinations = JSON.parse(fs.readFileSync("NoD_clean.json", "utf-8"));

// Function to pad the numbers with leading zeros
const padNumber = (num, size) => {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
};

// Upload each destination to Firestore
const uploadData = async () => {
  const batchLimit = 500; // Firestore batch limit
  let batchCount = 0;
  const totalDestinations = destinations.length;
  const idPaddingLength = totalDestinations.toString().length;

  try {
    for (let i = 0; i < totalDestinations; i += batchLimit) {
      const batch = db.batch();
      const chunk = destinations.slice(i, i + batchLimit);
      chunk.forEach((destination, index) => {
        const paddedId = padNumber(i + index, idPaddingLength);
        const docRef = db
          .collection("destinations")
          .doc(`destination_${paddedId}`);
        batch.set(docRef, destination);
      });

      await batch.commit();
      batchCount++;
      console.log(`Batch ${batchCount} committed successfully.`);
    }
    console.log("All data successfully uploaded to Firestore!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

uploadData().catch(console.error);
