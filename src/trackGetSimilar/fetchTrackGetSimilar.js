import axios from "axios";
const apiKey = process.env.API_KEY;

export default async function fetchTrackGetSimilar(artist, song) {
  console.log("fetching for song: " + song + " ...");
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${song}&api_key=${apiKey}&format=json`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
