import {
  interfaceArtistQuery,
  deleteStoredArtistsInterface,
  getArtistLists,
} from "./interfaceArtistQuery";

function artistQuery() {
  const listOfKeyNames = [];
  document.addEventListener("click", async (event) => {
    if (event.target.id === "submit-form") {
      event.preventDefault();
      const artistOne = document.getElementById("input1").value;
      const artistTwo = document.getElementById("input2").value;
      listOfKeyNames.push(artistOne);
      listOfKeyNames.push(artistTwo);
      interfaceArtistQuery(artistOne, artistTwo);
    } else if (event.target.id === "delete-artists") {
      deleteStoredArtistsInterface(listOfKeyNames);
    } else if (event.target.id === "sort-artists") {
      getArtistLists(listOfKeyNames);
    }
  });
}

export default artistQuery;
