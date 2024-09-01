import express from "express";
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

app.get("/", async (req, res) => {
  const artist = "Coldplay"; // Example artist, or you could use a query parameter
  try {
    const data = await getSimilarArtists(artist);
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Similar Artists</title>
        </head>
        <body>
          <h1>Similar Artists for ${artist}</h1>
          <ul>
            ${data.similarartists.artist
              .map((a) => `<li>${a.name}</li>`)
              .join("")}
          </ul>
          <script src="index.js" type="module"></script>
        </body>
        </html>
      `);
  } catch (error) {
    res.status(500).send("Error fetching similar artists");
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
