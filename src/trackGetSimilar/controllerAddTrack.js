import {
  interfaceTrackGetSimilar,
  storeSimilarTracksList,
  interfaceCreateTrackInput,
  getAlikeTracksInterface,
  deleteMasterKeysInterface,
  extendSimilarTracksInterface,
  saveMasterKeysFromDBInterface,
  clearAllTracksInterface,
  exportToExcelInterface,
  storeTracksFromList,
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
        await saveMasterKeysFromDBInterface(songName);
        const alikeTracks = await getAlikeTracksInterface(); // this triggers for each track sent by the form. perhaps we can put this somewhere else, so it only triggers the cohort
        await storeTracksFromList(alikeTracks);
      });
    } else if (event.target.id === "add-track") {
      interfaceCreateTrackInput();
    } else if (event.target.id === "extend-similar-tracks") {
      extendSimilarTracksInterface();
    } else if (event.target.id === "delete-artists") {
      clearAllTracksInterface();
    } else if (event.target.id === "export-tracks") {
      await exportToExcelInterface();
    }
  });
}

export default controllerAddTrack;
