const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
  try {
    return tf.loadGraphModel(process.env.MODEL_URL);
  } catch (error) {
    console.error("Error loading model:", error);
    throw error; // Propagate the error to handle it elsewhere
  }
}

module.exports = loadModel;
