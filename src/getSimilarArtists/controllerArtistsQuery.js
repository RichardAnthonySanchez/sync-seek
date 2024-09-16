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
      const artistOne = document.getElementById("input1").value; // a more scalable way to recieve user input is by making each element's selector generic, then using a querySelectorAll method to return an array of user inputs. then we can just create these elements dynmaically.
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
