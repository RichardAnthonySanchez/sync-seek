import {
  interfaceArtistQuery,
  deleteStoredArtistsInterface,
} from "./interfaceArtistQuery";

function artistQuery() {
  document.addEventListener("click", async (event) => {
    let artist;
    if (event.target.id === "submit-form") {
      event.preventDefault();
      artistOne = document.getElementById("input1").value;
      artistTwo = document.getElementById("input2").value;
      interfaceArtistQuery(artistOne, artistTwo);
    } else if (event.target.id === "delete-artists") {
      deleteStoredArtistsInterface("artistsKey");
    }
    return artist;
  });
}

export default artistQuery;
