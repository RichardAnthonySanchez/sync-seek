import {
  interfaceArtistQuery,
  deleteStoredArtistsInterface,
} from "./interfaceArtistQuery";

function artistQuery() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "submit-form") {
      event.preventDefault();
      const artistOne = document.getElementById("input1").value;
      const artistTwo = document.getElementById("input2").value;
      interfaceArtistQuery(artistOne, artistTwo);
    } else if (event.target.id === "delete-artists") {
      deleteStoredArtistsInterface("artistsKey");
    }
  });
}

export default artistQuery;
