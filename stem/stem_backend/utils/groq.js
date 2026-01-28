import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export const askGroq = async (input) => {
  const systemMessage = {
    role: "system",
    content:
      "You are a friendly AI tutor helping elementary school students (ages 6-12) learn STEM subjects. Explain concepts in simple, engaging ways with examples. Be encouraging and patient. Use analogies and real-world examples that kids can relate to.",
  };

  const messages = Array.isArray(input)
    ? [systemMessage, ...input]
    : [systemMessage, { role: "user", content: input }];

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.3,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to generate AI response");
  }
};
