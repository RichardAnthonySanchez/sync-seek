import {
  interfaceArtistQuery,
  deleteStoredArtistsInterface,
} from "./interfaceArtistQuery";

function artistQuery() {
  document.addEventListener("click", async (event) => {
    let artist;
    if (event.target.id === "submit-form") {
      event.preventDefault();
      artist = document.getElementById("input").value;
      interfaceArtistQuery(artist);
    } else if (event.target.id === "delete-artists") {
      event.preventDefault();
      deleteStoredArtistsInterface("artistsKey");
    }
    return artist;
  });
}

export default artistQuery;
