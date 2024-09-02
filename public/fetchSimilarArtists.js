async function fetchSimilarArtists() {
  try {
    const response = await fetch("http://localhost:3000/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text(); // Get the raw response text
    console.log("Raw response body:", text); // Log the raw response

    const data = JSON.parse(text); // Parse the JSON
    console.log(data); // Display the data in the console or use it in your UI
    displayArtists(data.similarartists.artist); // Assuming 'similarartists' is the key in your data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function displayArtists(artists) {
  const artistList = document.getElementById("artist-list");
  artists.forEach((artist) => {
    const listItem = document.createElement("li");
    listItem.textContent = artist.name;
    artistList.appendChild(listItem);
  });
}

export default fetchSimilarArtists;
