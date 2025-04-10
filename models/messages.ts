import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
  usersId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  role: String, // 'user' o 'assistant'
  content: String,
  timestamp: { type: Date, default: Date.now },
});

export const MessagesModel = mongoose.model("messages", MessagesSchema);
