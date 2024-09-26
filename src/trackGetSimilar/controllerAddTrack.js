import {
  interfaceTrackGetSimilar,
  storeSimilarTracksList,
  interfaceCreateTrackInput,
  getAlikeTracksInterface,
  deleteMasterKeysInterface,
} from "./interfaceTrackGetSimiliar";

function controllerAddTrack() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "submit-track-get-similar-form") {
      event.preventDefault();
      deleteMasterKeysInterface();
      const songInputs = document.querySelectorAll(".song-name-input");
      const artistInputs = document.querySelectorAll(".artist-name-input");

      // this for each section could be a separate method in a interface object
      songInputs.forEach(async (input, index) => {
        const songName = input.value;
        const artistName = artistInputs[index].value;
        const eachTracksList = await interfaceTrackGetSimilar(
          artistName,
          songName
        );
        await storeSimilarTracksList(artistName, songName, eachTracksList);
        await getAlikeTracksInterface();
      });
    } else if (event.target.id === "add-track") {
      interfaceCreateTrackInput();
    }
  });
}

export default controllerAddTrack;
