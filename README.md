# Project Description Part 1:

## Overview

This project leverages Google's Generative AI through the gemini-pro-vision model. The main script, `GGAI.js`, utilizes Node.js to interact with the AI, posing questions and receiving intelligent responses. The project includes the necessary Node.js package files (`package.json` and `package-lock.json`).

## Directory Structure

- **GGAI.js:**
  The main script that orchestrates the interaction with Google's Generative AI. It includes functionality for generating content based on multimodal inputs.

- **package.json and package-lock.json:**
  These files define the Node.js project configuration, dependencies, and scripts. They ensure a consistent development environment for contributors.

## How to Use

1. **Setup:**
   - Make sure you have Node.js installed on your machine.

2. **Install Dependencies:**
   - Run `npm install` to install the required Node.js packages.

3. **API Key Setup:**
   - Obtain an API key from Google Generative AI.
   - Set the API key as an environment variable named `GENERATIVE_AI_API_KEY` in a `.env` file.

4. **Run the Script:**
   - Execute `node GGAI.js` to run the project.

# Part 2:
# SendImage (Telegram bot for interacting with the AI)

## Description

### Overview

This approach uses Google's Generative AI through the gemini-pro-vision model. The script, `sendImage.js`, utilizes Node.js to interact with the AI, accepting only images, not text questions. The project includes the necessary Node.js package files (`package.json` and `package-lock.json`) as described before.

## Configuration

1. **Adjust the `.env` file:**
   - **Telegram Bot Token:**
     - Create a Telegram bot using the [BotFather](https://core.telegram.org/bots#botfather).
     - Set the bot token as an environment variable named `TELEGRAM_BOT_TOKEN` in the `.env` file we mentioned earlier.
   - **Your Chat ID and Brother's (I'm only allowing my little brother @Othmane to leverage the bot 😂) Chat ID in Telegram:**
     - Add your chat IDs as Telegram users to ensure only authorized users can access the bot.

   Example `.env` file:
   ```env
   GENERATIVE_AI_API_KEY=*********************
   TELEGRAM_BOT_TOKEN=*********************
   YOUR_CHAT_ID=**********
   BROTHER_CHAT_ID=************
2. **Run the Script:**
   - In the terminal, run the command:
     ```bash
     node sendImage.js
     ```
   - The bot will start listening for incoming image messages on Telegram.

3. **Interact with the Bot:**
   - Open your Telegram app.
   - Send an image message to the bot.
   - The bot will process the image using Google's Generative AI and respond with the generated content.

**Note:** The bot is designed to accept only image messages, not text questions.

Well done, **Enjoy!** 😇
