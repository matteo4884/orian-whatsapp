import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
  dynamic: String,
  role: String,
});

export const AgentModel = mongoose.model("agents", AgentSchema);
