import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  sender: String,
  mode: { type: Boolean, default: true },
});

export const UsersModel = mongoose.model("users", UsersSchema);
