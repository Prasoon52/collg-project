import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./configs/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(port, async () => {
  await connectDb();
  console.log(`Server running at http://localhost:${port}`);
});
