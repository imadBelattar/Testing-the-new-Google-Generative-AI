const { GoogleGenerativeAI } = require("@google/generative-ai");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

// Function to handle image messages
async function handleImageMessage(chatId, photos) {
  const fileId = photos[photos.length - 1].file_id;

  // Get the file stream
  const fileStream = await telegramBot.getFileStream(fileId);

  // Send a loading message
  const loadingMessage = await telegramBot.sendMessage(
    chatId,
    "Processing your image...",
  );

  try {
    // Generate content from the image data
    const generatedText = await generateContentFromImageStream(fileStream);

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
}

// Function to generate content from image stream
async function generateContentFromImageStream(fileStream) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = "Describe or solve this, and explain."; // Change the prompt as needed

  const imagePart = {
    inlineData: {
      data: await streamToBase64(fileStream),
      mimeType: "image/jpeg", // Update the mimeType if needed
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const text = response.text();

  return text;
}

// Helper function to convert a stream to base64
function streamToBase64(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
    stream.on("error", reject);
  });
}

// Function to generate content from image buffer
async function generateContentFromImageBuffer(fileData) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = "Describe or solve this, and explain. in Arabic"; // Change the prompt as needed

  const imagePart = {
    inlineData: {
      data: fileData.content.toString("base64"),
      mimeType: fileData.mimeType,
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const text = response.text();

  return text;
}

// Listen for incoming messages on the Telegram bot
telegramBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const yourChatId = process.env.YOUR_CHAT_ID;
  const myBrotherChatId = process.env.BROTHER_CHAT_ID;

  // Log user details and message type
  logUserAndMessageType(msg);

  // Check if the message is from your intended user or your brother
  if (chatId != yourChatId && chatId != myBrotherChatId) {
    telegramBot.sendMessage(
      chatId,
      "I'm sorry, but I'm not available for you.",
    );
    return;
  }

  // Check message type and delegate to the appropriate handler
  if (msg.photo) {
    await handleImageMessage(chatId, msg.photo);
  } else if (msg.text) {
    handleTextMessage(chatId, msg.text);
  } else {
    handleUndefinedMessage(chatId);
  }
});

// Function to log user details and message type
function logUserAndMessageType(msg) {
  const chatId = msg.chat.id;
  const userFullName = `${msg.from.first_name} ${msg.from.last_name}`;
  const messageType = msg.photo ? "Image" : msg.text ? "Text" : "Undefined";
  console.log(
    `From: ${userFullName}, chatId: ${chatId}, MessageType: ${messageType}`,
  );
}

// Function to handle text messages
function handleTextMessage(chatId, text) {
  // Log the text message
  console.log(`Message: Text - "${text}"`);

  // Ask the user to send an image instead
  telegramBot.sendMessage(
    chatId,
    "Please send an image to describe or solve 🌟",
  );
}

// Function to handle undefined messages
function handleUndefinedMessage(chatId) {
  // Log that the message is undefined (neither image nor text)
  console.log("Message: Undefined");

  // If the message does not contain a photo or text, prompt the user
  telegramBot.sendMessage(
    chatId,
    "Please send an image to describe or solve 🌟",
  );
}
