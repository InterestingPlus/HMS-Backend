const axios = require("axios");
const Doctor = require("../models/doctor.model");

function formatSuggestions(content) {
  try {
    // Step 1: Locate the first opening '[' and the last closing ']'
    const startIndex = content.indexOf("[");
    const endIndex = content.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      throw new Error("Array content not found in the input.");
    }

    // Step 2: Extract the content between '[' and ']'
    const arrayContent = content.substring(startIndex, endIndex + 1);

    // Step 3: Parse the extracted content as JSON
    const parsedArray = JSON.parse(arrayContent);

    // Ensure it's an array and contains objects with 'suggestion' keys
    if (
      Array.isArray(parsedArray) &&
      parsedArray.every((item) => "suggestion" in item)
    ) {
      return parsedArray;
    }

    throw new Error("Parsed content is not in the expected format.");
  } catch (error) {
    console.error("Failed to format suggestions:", error.message);
    return [];
  }
}

module.exports.dietSuggestions = async (req, res) => {
  try {
    const { doctorId, reason } = req.body;

    const { specialization, name } = await Doctor.findOne({ _id: doctorId });

    const data = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `give me the formatted javascript array that contains some diet/health/medicine suggestions for patient with Reason : '${reason}', where each element contains the diet suggestion to the patient with simple English Words as you are the Doctor Specialized with ${specialization}, named '${name}'.
                
                the output as array with 'suggestion' property to object in each element.`,
              },
            ],
          },
        ],
      }
    );

    if (data) {
      const row_input = data.data.candidates[0].content.parts[0].text;

      console.log("Gemini Row", row_input);

      const formatted_output = formatSuggestions(row_input);

      // console.log("Gemini Responce", formatted_output);

      res.status(200).json({
        message: "We are Successfull on Generating the Suggestions.",
        data: formatted_output,
      });
    } else {
      console.log("Gemini API Currently under Issue!");
    }
  } catch (err) {
    console.log("Gemini API Currently under Issue!");
    res.status(500).json({
      message: "We are Fixing the Issue! Try Again Later...",
    });
  }
};
