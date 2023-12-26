# Project Description

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
