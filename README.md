# Project Description Part 1 :

## Overview

This project leverages Google's Generative AI through the gemini-pro-vision model. The main script, `GGAI.js`, utilizes Node.js to interact with the AI, posing questions and receiving intelligent responses. The project includes an `img` folder for image files, and the necessary Node.js package files (`package.json` and `package-lock.json`).

## Directory Structure

- **img:**  
  This folder contains image files used for testing and interacting with the generative AI.

- **GGAI.js:**  
  The main script that orchestrates the interaction with Google's Generative AI. It includes functionality for generating content based on multimodal inputs.

- **package.json and package-lock.json:**  
  These files define the Node.js project configuration, dependencies, and scripts. They ensure consistent development environments for contributors.

## How to Use

1. **Setup:**
   - Make sure you have Node.js installed on your machine.

2. **Install Dependencies:**
   - Run `npm install` to install the required Node.js packages.

3. **API Key Setup:**
   - Obtain an API key from Google Generative AI.
   - Set the API key as an environment variable named `API_KEY` in a `.env` file.

4. **Run the Script:**
   - Execute `node GGAI.js` to run the project.


# Part 2 :
# ChatWithMe (Telegram bot interacting with the AI)

## Description

### Overview

The second approach leverages Google's Generative AI through the gemini-pro-vision model. The script, `chatwithme.js`, utilizes Node.js to interact with the AI, posing questions and receiving intelligent responses. There is the same `img` folder for image files, and the necessary Node.js package files (`package.json` and `package-lock.json`) as described before.

## Configuration

1. **Adjust the `.env` file:**
   - **Telegram Bot Token:**
     - Create a Telegram bot using the [BotFather](https://core.telegram.org/bots#botfather).
     - Set the bot token as an environment variable named `TELEGRAM_BOT_TOKEN` in the `.env` file we mentioned earlier.
   - **you chatID in telegram
     - Add you chat id as a telegram user to ensure no one is accessing the bot.  

   Example `.env` file:
   ```env
   TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
   YOUR_CHAT_ID=your_chat_id

## How to run

it's simple, just run node chatwithme.js
well done, **Enjoy !!** 😇 

