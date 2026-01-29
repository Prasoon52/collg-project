import ChatMessage from "../models/ChatMessage.js";
import { v4 as uuid } from "uuid";
import { askGroq } from "../utils/groq.js";

export const chatWithTutor = async (req, res) => {
  try {
    const { session_id, message } = req.body;

    if (!session_id || !message) {
      return res
        .status(400)
        .json({ error: "session_id and message are required" });
    }

    await ChatMessage.create({
      id: uuid(),
      session_id,
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    const history = await ChatMessage.find(
      { session_id },
      { _id: 0, role: 1, content: 1 },
    )
      .sort({ timestamp: 1 })
      .limit(10);

    const aiResponse = await askGroq(history);
    // console.log(aiResponse);

    await ChatMessage.create({
      id: uuid(),
      session_id,
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    });

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("ChatWithTutor Error:", error);
    res.status(500).json({
      error: "AI Tutor is currently unavailable. Please try again later.",
    });
  }
};

/**
 * GET /api/chat/:session_id
 */
export const getChatHistory = async (req, res) => {
  try {
    const { session_id } = req.params;

    if (!session_id) {
      return res.status(400).json({ error: "session_id is required" });
    }

    const messages = await ChatMessage.find({ session_id }, { _id: 0 }).sort({
      timestamp: 1,
    });

    res.json(messages);
  } catch (error) {
    console.error("GetChatHistory Error:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};
