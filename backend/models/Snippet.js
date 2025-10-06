import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: String,
  content: String,
  shareId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Snippet", snippetSchema);
