const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const userNutritionAnalysis = async (userInput) => {
        // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // const prompt = "I want you to classify whatever text I give into categories with values of 1, 0, or -1, if the category is not referenced in the input set it to 0, if they want a high amount set it to 1, if they want a low amount or none set it to -1. Return in JSON format. Here are the categories: sugar, protein, carbs, cholesterol, fat, sodium, cholesterol. This is the text: " + userInput;
        // const result = await model.generateContent(prompt);
        // const response = await result.response;
        // const text = await response.text();
        // return text;
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "I want you to classify whatever text I give into categories with values of 1, 0, or -1, if the category is not referenced in the input set it to 0, if they want a high amount set it to 1, if they want a low amount or none set it to -1. Return in JSON format without any spaces unless its after a comma or a semicolon. There should be no text saying json and output as a single line string. Here are the categories: sugar, protein, carbs, cholesterol, fat, sodium, cholesterol. This is the text: " + userInput;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text;
}

return run();
}

export default userNutritionAnalysis;