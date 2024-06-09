// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "YOUR_API_KEY";
    const fs = require('fs');
    const promptValue = fs.readFileSync('prompting.txt', 'utf8');
  console.log('Prompt value:', promptValue);
  
  async function runChat() {


    const genAI = new GoogleGenerativeAI("AIzaSyBAtqKWn8ft7NyH5j6JUaZWw5Is2M5-sv4");
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
    const result = await chat.sendMessage(promptValue);
    const response = result.response.text();
    fs.writeFile('messages.txt', response, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Text written to file');
    });
  }
  
  runChat();