import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { nanoid } from "nanoid";
import Snippet from "./models/Snippet.js";

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017/snippetshare";

mongoose.connect(MONGO_URL).then(() => console.log("MongoDB connected"));

app.get("/api/snippets", async (req, res) => {
  const snippets = await Snippet.find().sort({ createdAt: -1 });
  res.json(snippets);
});

app.post("/api/snippets", async (req, res) => {
  const { title, content } = req.body;
  const snippet = new Snippet({ title, content, shareId: nanoid(8) });
  await snippet.save();
  res.json(snippet);
});

app.get("/api/snippets/:id", async (req, res) => {
  const snippet = await Snippet.findOne({ shareId: req.params.id });
  snippet ? res.json(snippet) : res.status(404).json({ error: "Not found" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
