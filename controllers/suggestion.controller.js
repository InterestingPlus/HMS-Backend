const axios = require("axios");

function formateSuggestions(content) {
  // Match everything inside the array brackets []
  const arrayContentMatch = content.match(/\[\s*([\s\S]*?)\s*\];/);

  if (!arrayContentMatch) {
    throw new Error("Array content not found in the input.");
  }

  const arrayContent = arrayContentMatch[1];

  // Match all objects inside the array
  const objectMatches = arrayContent.match(/\{\s*[\s\S]*?\s*\}/g);

  if (!objectMatches) {
    return [];
  }

  // Parse each object and convert it into JavaScript objects
  return objectMatches.map((objectString) => {
    // Replace newlines and extra spaces for cleaner parsing
    const cleanedObjectString = objectString.replace(/\n\s*/g, " ").trim();

    // Use Function constructor to parse the object safely
    return Function('"use strict"; return (' + cleanedObjectString + ")")();
  });
}

module.exports.dietSuggestions = async (req, res) => {
  try {
    const data = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `give me the formatted javascript array that contains some diet/health suggestions, where each element contains the diet suggestion to the diabetes patient with simple English Words. 
                
                the output as array with 'suggestion' property to object in each element.`,
              },
            ],
          },
        ],
      }
    );

    if (data) {
      const row_input = data.data.candidates[0].content.parts[0].text;

      const formatted_output = formateSuggestions(row_input);

      console.log("Gemini Responce", formatted_output);

      res.status(200).json({
        message: "We are Successfull on Generating the Suggestions.",
        data: formatted_output,
      });
    } else {
      console.log("Gemini Responce", data);
    }
  } catch (err) {
    console.log("Gemini Responce", err);
    res.status(500).json({
      message: "We are Fixing the Issue! Try Again Later...",
    });
  }
};
