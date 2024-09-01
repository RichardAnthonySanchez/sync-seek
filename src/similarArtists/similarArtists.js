import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const apiKey = process.env.API_KEY;
const url = process.env.LASTFM_API_BASE;

const getSimilarArtists = async (artist) => {
  console.log("artist name submitted is " + artist);
  console.log("url is " + url);
  const params = {
    method: "artist.getsimilar",
    artist: artist,
    api_key: apiKey,
    format: "json",
  };

  try {
    const response = await axios.get(url, { params });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching similar artists:", error);
  }
};

export default getSimilarArtists;
