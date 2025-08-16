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
  checkForDupes,
} from "./interfaceTrackGetSimiliar";

import {
  interfaceCreateQueryObject,
  interfaceQueueTrackInQuery,
  getTracksQueue,
} from "./interfaceTrackQuery";

import { compareQueueToDB } from "./interfaceFilterPreFetch";

function controllerAddTrack() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "submit-track-get-similar-form") {
      event.preventDefault();
      deleteMasterKeysInterface();
      const songInputs = document.querySelectorAll(".song-name-input");
      const artistInputs = document.querySelectorAll(".artist-name-input");

      // track query queue checks for dupes against the library
      //await checkForDupes(songInputs, artistInputs);
      // if no dupes, fetch

      // store user input (tracks submitted by user)
      songInputs.forEach(async (input, index) => {
        const songName = input.value;
        const artistName = artistInputs[index].value;
        // store in track query queue
        let trackQueryObject = interfaceCreateQueryObject(songName, artistName);
        interfaceQueueTrackInQuery(trackQueryObject);
      });

      let queue = getTracksQueue();
      // send the entire queue of tracks to the dedupe filter before fetching more tracks
      compareQueueToDB(queue);

      /*
      // old coupled conditional for fetching data for each song submission and proccessing it
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
      */
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
