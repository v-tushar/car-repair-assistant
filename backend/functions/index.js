const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCM3JjrKz7-4-yx6w0byiq0fCNCr-NyffU");

exports.analyzeImageAndQuestion = functions.https.onRequest(async (req, res) => {
  try {
    const { userQuestion, imageUrl } = req.body;

    if (!userQuestion) {
      return res.status(400).send("Missing user question.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Build the input dynamically
    const inputParts = [
      {
        text: `The user says: '${userQuestion}'. Analyze and provide a step-by-step car repair guide.`,
      },
    ];

    if (imageUrl) {
      inputParts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageUrl, // Assume already base64
        },
      });
    }

    const result = await model.generateContent(inputParts);
    const response = await result.response;
    const guideText = response.text();

    return res.status(200).send({ guide: guideText });

  } catch (error) {
    logger.error("Error calling Gemini API:", error);
    return res.status(500).send("Server error: " + error.message);
  }
});
