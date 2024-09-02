import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import getSimilarArtists from "./similarArtists/similarArtists.js";

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
app.use(cors()); // Enable CORS for all routes

app.get("/", async (req, res) => {
  const artist = "Coldplay"; // Example artist, or you could use a query parameter
  try {
    const data = await getSimilarArtists(artist);
    console.log("Data to be sent:", data); // Log the data being sent

    if (!data) {
      res.status(204).send(); // No Content if data is empty
    } else {
      res.json(data); // Send the data as JSON
    }
  } catch (error) {
    console.error("Error fetching similar artists:", error);
    res.status(500).json({ error: "Error fetching similar artists" });
  }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "template.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
