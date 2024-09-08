import axios from "axios";

const apiKey = process.env.API_KEY;

async function fetchSimilarArtists(artist) {
  axios
    .get(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${apiKey}&format=json`
    )
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));

  //displayArtists(response);
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
