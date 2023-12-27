const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Access your API keys as environment variables
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path) {
  const fileExtension = path.split('.').pop().toLowerCase();
  const mimeType = fileExtension === 'jpg' ? 'image/jpeg' : 'image/png';

  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}
async function generateContentFromImage(imagePath) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = "solve this, briefly!";  // Change the prompt as needed

  const imageParts = [fileToGenerativePart(imagePath)];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  return text;
}

// Listen for incoming messages on the Telegram bot
telegramBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.table(chat)
  if(chatId != 1631515390){
    telegramBot.sendMessage(chatId, "🖕🖕🖕 ser t9awed hhhh .");
    return;
  }
  // Check if the message contains a photo
  if (msg.photo) {
    const fileId = msg.photo[msg.photo.length - 1].file_id;

    // Get the file path for the image
    const filePath = await telegramBot.downloadFile(fileId, "img");

    // Generate content from the image
    const generatedText = await generateContentFromImage(filePath);

    // Send the generated text back to the user
    telegramBot.sendMessage(chatId, generatedText);
  } else {
    // If the message does not contain a photo, prompt the user
    telegramBot.sendMessage(chatId, "Please send an image with problem to solve 🌟🌟🌟.");
  }
});
