import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const apiKey = process.env.API_KEY;
const url = process.env.LASTFM_API_BASE;

const getSimilarArtists = async (artist) => {
  try {
    const params = {
      method: "artist.getsimilar",
      artist: artist,
      api_key: apiKey,
      format: "json",
    };
    const response = await axios.get(url, { params });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching similar artists:", error);
    throw new Error("Failed to fetch similar artists");
  }
};

export default getSimilarArtists;
