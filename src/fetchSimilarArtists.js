import axios from "axios";
import similarArtistsLocal from "./storeSimilarArtistsLocal";

const apiKey = process.env.API_KEY;

async function fetchSimilarArtists(artist) {
  console.log("fetching for artist: " + artist + " ...");
  axios
    .get(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${apiKey}&format=json`
    )
    .then((response) => {
      const artist = response.data;
      console.log(artist);
      similarArtistsLocal.storeArtist(artist); // maybe don't couple this. try connecting it to an interface.
      similarArtistsLocal.getArtists();
    })
    .catch((error) => console.error(error));
}

function displayArtists(artists) {
  const artistList = document.getElementById("artist-list");
  artists.forEach((artist) => {
    const listItem = document.createElement("li");
    listItem.textContent = artist.title;
    artistList.appendChild(listItem);
  });
}

export default fetchSimilarArtists;
