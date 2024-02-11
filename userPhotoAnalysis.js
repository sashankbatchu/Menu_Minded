import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const userPhotoAnalysis = async () => {
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
async function fileToGenerativePart(path, mimeType) {
      let imageBinaryData = await FileSystem.readAsStringAsync(path, { encoding: FileSystem.EncodingType.Base64 });
      //console.log(imageBinaryData);
      return {
        inlineData: {
          data: await FileSystem.readAsStringAsync(path, { encoding: FileSystem.EncodingType.Base64 }),
          mimeType
        },
      };
    }


let sectionsStr = [];

let jsonArray = [];
let jsonObj;

async function run(input, isSectionFinder) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = input;
  

  
  const imageParts = await fileToGenerativePart("file:///var/mobile/Containers/Data/Application/F00B28C0-0B00-4C99-8046-2DA60B9CF584/Documents/ExponentExperienceData/@anonymous/MenuApp-bcf1cea5-69f0-4ead-b62a-8a064b69f6b6/photo.png", "image/png");
  
  //console.log(imageParts);
    // fileToGenerativePart("file:///var/mobile/Containers/Data/Application/F00B28C0-0B00-4C99-8046-2DA60B9CF584/Documents/ExponentExperienceData/@anonymous/MenuApp-bcf1cea5-69f0-4ead-b62a-8a064b69f6b6/photo.jpg", "image/jpeg"),
    // fileToGenerativePart("image2.jpeg", "image/jpeg"),


  const result = await model.generateContent([prompt, imageParts]);
  const response = await result.response;


  if (isSectionFinder) {
    let text1 = await response.text()
    // console.log(text1)
    let sectionsStr = text1.split(" ")
    sectionsStr.shift();
    // console.log(sectionsStr);
    return sectionsStr;
  } else {
  try {
    let text2 = await response.text();
    //text2 = text2.substring(9,text2.length-3);
    return text2;
    // console.log(index + " " + section);
    // obj = JSON.parse(text2);
    // console.log("Heyy");
    // console.log(obj);
    // console.log(jsonArray);
    // return obj;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.log("Received text:", text2);
  }
}
}
// run("Return a list of ONLY section names in the menu separated by a \" \" if the name of the section is multiple words add an underscore in between them. Make all the text lowercase.", true)
//   .then(sectionsStr => { // Receive the returned value here
//     console.log(sectionsStr); // Now it should be filled
//     sectionsStr.forEach((section, index) =>  {
//       run("Generate a JSON file that would compile when run through JSON.parse for the section: " + section + " with the following structure:\n\n{\n  \"MenuSubsection\": {\n    \"MenuItem1\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add only important ingredients that have dietary relevance\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 1\",\n        \"fat\": \"Fat content of item 1\",\n        \"carbs\": \"Carbohydrate content of item 1\",\n        \"sugar\": \"Sugar content of item 1\",\n        \"cholesterol\": \"Cholesterol content of item 1\"\n      }\n    },\n    \"MenuItem2\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add more ingredients as necessary\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 2\",\n        \"fat\": \"Fat content of item 2\",\n        \"carbs\": \"Carbohydrate content of item 2\",\n        \"sugar\": \"Sugar content of item 2\",\n        \"cholesterol\": \"Cholesterol content of item 2\"\n      }\n    },\n    \"MenuItem3\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add more ingredients as necessary\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 3\",\n        \"fat\": \"Fat content of item 3\",\n        \"carbs\": \"Carbohydrate content of item 3\",\n        \"sugar\": \"Sugar content of item 3\",\n        \"cholesterol\": \"Cholesterol content of item 3\"\n      }\n    }\n    // Add more items as needed\n  }\n} Fill placeholder values like MenuSubsection with the section name, all data after each thing in nutritional_values should be filled with what would be expected for that dish measured in grams and expressed as floats. Also remove any comments, remember to put commas or } after property values as necessary and if it exceeds the character limit close the JSON file as needed.", false).then(text2 => {
//         jsonText2 = JSON.parse(String(text2));
//         //console.log(jsonText2);
//         jsonArray.push(jsonText2);
//       });
//     });
//     return jsonArray;
//   });

// run("Return a list of ONLY section names in the menu separated by a \" \" if the name of the section is multiple words add an underscore in between them. Make all the text lowercase.", true)
//   .then(sectionsStr => { // Receive the returned value here
//     console.log(sectionsStr); // Now it should be filled
//     sectionsStr.forEach((section) =>  {
//       run("Generate a JSON file that would compile when run through JSON.parse for the section: " + section + " with the following structure:\n\n{\n  \"MenuSubsection\": {\n    \"MenuItem1\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add only important ingredients that have dietary relevance\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 1\",\n        \"fat\": \"Fat content of item 1\",\n        \"carbs\": \"Carbohydrate content of item 1\",\n        \"sugar\": \"Sugar content of item 1\",\n        \"cholesterol\": \"Cholesterol content of item 1\"\n      }\n    },\n    \"MenuItem2\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add more ingredients as necessary\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 2\",\n        \"fat\": \"Fat content of item 2\",\n        \"carbs\": \"Carbohydrate content of item 2\",\n        \"sugar\": \"Sugar content of item 2\",\n        \"cholesterol\": \"Cholesterol content of item 2\"\n      }\n    },\n    \"MenuItem3\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add more ingredients as necessary\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 3\",\n        \"fat\": \"Fat content of item 3\",\n        \"carbs\": \"Carbohydrate content of item 3\",\n        \"sugar\": \"Sugar content of item 3\",\n        \"cholesterol\": \"Cholesterol content of item 3\"\n      }\n    }\n    // Add more items as needed\n  }\n} Fill placeholder values like MenuSubsection with the section name, all data after each thing in nutritional_values should be filled with what would be expected for that dish measured in grams and expressed as floats. Also remove any comments, remember to put commas or } after property values as necessary and if it exceeds the character limit close the JSON file as needed.", false).then(text2 => {
//         let jsonText2 = JSON.parse(String(text2));
//         // console.log(jsonText2);
//         jsonArray.push(jsonText2);
//         console.log(jsonArray)
//       });
//     });
//     console.log(jsonArray);
//   });
// }

// return run("Return a list of ONLY section names in the menu separated by a \" \" if the name of the section is multiple words add an underscore in between them. Make all the text lowercase.", true)
// .then(sectionsStr => {
//   const promises = sectionsStr.map(section => {
//     run("Generate a JSON file that would compile when run through JSON.parse for the section: " + section + " with the following structure:\n\n{\n  \"MenuSubsection\": {\n    \"MenuItem1\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add only important ingredients that have dietary relevance\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 1\",\n        \"fat\": \"Fat content of item 1\",\n        \"carbs\": \"Carbohydrate content of item 1\",\n        \"sugar\": \"Sugar content of item 1\",\n        \"cholesterol\": \"Cholesterol content of item 1\"\n      }\n    },\n    \"MenuItem2\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add more ingredients as necessary\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 2\",\n        \"fat\": \"Fat content of item 2\",\n        \"carbs\": \"Carbohydrate content of item 2\",\n        \"sugar\": \"Sugar content of item 2\",\n        \"cholesterol\": \"Cholesterol content of item 2\"\n      }\n    },\n    \"MenuItem3\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add more ingredients as necessary\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 3\",\n        \"fat\": \"Fat content of item 3\",\n        \"carbs\": \"Carbohydrate content of item 3\",\n        \"sugar\": \"Sugar content of item 3\",\n        \"cholesterol\": \"Cholesterol content of item 3\"\n      }\n    }\n    // Add more items as needed\n  }\n} Fill placeholder values like MenuSubsection with the section name, all data after each thing in nutritional_values should be filled with what would be expected for that dish measured in grams and expressed as floats. Also remove any comments, remember to put commas or } after property values as necessary and if it exceeds the character limit close the JSON file as needed.", false)
//     .then(text2 => JSON.parse(String(text2)));
//   });

//   // Wait for all promises to resolve
//   return Promise.all(promises);
// })
// .then(jsonArray => {
//   console.log(jsonArray); // Output the final array of JSON objects
//   return jsonArray; // Return the final array
// })
// .catch(error => {
//   console.error("Error:", error);
// });


return run("Return a list of ONLY section names in the menu separated by a \" \" if the name of the section is multiple words add an underscore in between them. Make all the text lowercase.", true)
  .then(sectionsStr => { // Receive the returned value here
    // console.log(sectionsStr); // Now it should be filled
    const promises = sectionsStr.map((section) => {
      return run("Generate a JSON file that would compile when run through JSON.parse for the section: " + section + " with the following structure:\n\n{\n  \"MenuSubsection\": {\n    \"MenuItem1\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add only important ingredients that have dietary relevance\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 1\",\n        \"fat\": \"Fat content of item 1\",\n        \"carbs\": \"Carbohydrate content of item 1\",\n        \"sugar\": \"Sugar content of item 1\",\n        \"cholesterol\": \"Cholesterol content of item 1\"\n      }\n    },\n    \"MenuItem2\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add more ingredients as necessary\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 2\",\n        \"fat\": \"Fat content of item 2\",\n        \"carbs\": \"Carbohydrate content of item 2\",\n        \"sugar\": \"Sugar content of item 2\",\n        \"cholesterol\": \"Cholesterol content of item 2\"\n      }\n    },\n    \"MenuItem3\": {\n      \"ingredients\": \"Ingredient1, Ingredient2, Ingredient3\", //add more ingredients as necessary\n      \"nutritional_values\": {\n        \"protein\": \"Calories of item 3\",\n        \"fat\": \"Fat content of item 3\",\n        \"carbs\": \"Carbohydrate content of item 3\",\n        \"sugar\": \"Sugar content of item 3\",\n        \"cholesterol\": \"Cholesterol content of item 3\"\n      }\n    }\n    // Add more items as needed\n  }\n} Fill placeholder values like MenuSubsection with the section name, all data after each thing in nutritional_values should be filled with what would be expected for that dish measured in grams and expressed as floats. Also remove any comments, remember to put commas or } after property values as necessary and if it exceeds the character limit close the JSON file as needed.", false)
        .then(text2 => {
          let jsonText2 = JSON.parse(String(text2));
          return jsonText2;
        });
    });

    // Wait for all promises to resolve
    return Promise.all(promises);
  })
  .then(jsonArray => {
    // console.log(jsonArray); // Output the final array of JSON objects
    return jsonArray;
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

// console.log(str);
// console.log(sectionsStr);
// let jsonArray = new Array[sectionsStr.length];
export default userPhotoAnalysis;


