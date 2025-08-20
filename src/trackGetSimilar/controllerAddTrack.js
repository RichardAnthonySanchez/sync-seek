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
  fetchFromFilteredQueue,
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
      const filteredQueue = compareQueueToDB(queue);
      //console.log(filteredQueue);
      fetchFromFilteredQueue(filteredQueue);
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
