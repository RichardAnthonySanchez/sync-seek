import axios from "axios";
const apiKey = process.env.API_KEY;

export default async function fetchTrackGetSimilar(artist, song) {
  console.log("fetching for song: " + song + " ...");
  axios
    .get(
      `https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${song}&api_key=${apiKey}&format=json`
    )
    .then((response) => {
      const data = response.data;
      console.log(data);
      console.log(JSON.stringify(data));
      // return the data
      // where do we save the lists?
    })
    .catch((error) => console.error(error));
}
