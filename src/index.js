import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const apiKey = process.env.API_KEY;
const environment = process.env.NODE_ENV;

console.log(`Server is running on port ${port}`);
console.log(`API Key: ${apiKey}`);
console.log(`Environment: ${environment}`);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "template.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
