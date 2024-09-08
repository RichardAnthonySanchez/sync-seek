import interfaceArtistQuery from "./interfaceArtistQuery";

function artistQuery() {
  document.addEventListener("click", async (event) => {
    let artist;
    if (event.target.id === "submit-form") {
      event.preventDefault();
      artist = document.getElementById("input").value;
      interfaceArtistQuery(artist);
    }
    return artist;
  });
}

export default artistQuery;
