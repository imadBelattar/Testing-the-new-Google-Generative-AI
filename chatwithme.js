const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Access your API keys as environment variables
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path) {
  const fileExtension = path.split(".").pop().toLowerCase();
  const mimeType = fileExtension === "jpg" ? "image/jpeg" : "image/png";

  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}
async function generateContentFromImage(imagePath) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = "Describe or solve this, and explain. in Arabic"; // Change the prompt as needed

  const imageParts = [fileToGenerativePart(imagePath)];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  return text;
}

// Listen for incoming messages on the Telegram bot
telegramBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const yourChatId = process.env.YOUR_CHAT_ID;
  const myBrotherChatId = process.env.BROTHER_CHAT_ID;

  const messageType = msg.photo
    ? "Image"
    : msg.text
    ? `${msg.text}`
    : "Undefined";
  console.log(
    `From: ${msg.from.first_name} ${msg.from.last_name}, chatId: ${chatId}\nMessage: ${messageType}\n`,
  );

  // Check if the message is from your intended user or your brother
  if (chatId != yourChatId && chatId != myBrotherChatId) {
    telegramBot.sendMessage(
      chatId,
      "I'm sorry, but I'm not available for you.",
    );
    return;
  }

  // Check if the message contains a photo
  if (msg.photo) {
    const fileId = msg.photo[msg.photo.length - 1].file_id;

    // Get the file path for the image
    const filePath = await telegramBot.downloadFile(fileId, "img");

    // Send a loading message
    const loadingMessage = await telegramBot.sendMessage(
      chatId,
      "Processing your image...",
    );

    try {
      // Generate content from the image
      const generatedText = await generateContentFromImage(filePath);

      // Replace the loading message with the generated text
      await telegramBot.editMessageText(generatedText, {
        chat_id: chatId,
        message_id: loadingMessage.message_id,
      });
    } catch (error) {
      console.error("Error processing image:", error);
      // Handle the error and inform the user
      telegramBot.editMessageText(
        "Error processing your image. Please try again.",
        {
          chat_id: chatId,
          message_id: loadingMessage.message_id,
        },
      );
    }
  } else if (msg.text) {
    // Ask the user to send an image instead
    telegramBot.sendMessage(
      chatId,
      "Please send an image to describe or solve 🌟",
    );
  } else {
    // Log that the message is undefined (neither image nor text)
    console.log("Message: Undefined");

    // If the message does not contain a photo or text, prompt the user
    telegramBot.sendMessage(
      chatId,
      "Please send an image to describe or solve 🌟",
    );
  }
});
