const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

// ANSI escape codes for styling
const bold = "\x1b[1m";
const yellow = "\x1b[33m";  // Updated to yellow
const reset = "\x1b[0m";

function applyStyling(text) {
  return `${bold}${yellow}${text}${reset}`;
}

async function run() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "what is the content of this picture";

  const imageParts = [
    fileToGenerativePart("img/Screenshot 2023-12-26 173606.png", "image/png"),
  ];

  // Insert 3 stars emoji before the "Running" message
  console.log("🌟🌟🌟 Running...................");

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  // Apply styles using ANSI escape codes
  const styledText = applyStyling(text);

  console.log(styledText);
}

run();
