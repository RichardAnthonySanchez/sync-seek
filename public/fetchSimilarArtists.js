import axios from "axios";

async function fetchSimilarArtists(artist) {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));

  displayArtists(response);
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
