import {
  interfaceCreateTrackInput,
  deleteMasterKeysInterface,
  exportToExcelInterface,
  fetchFromFilteredQueue,
} from "./interfaceTrackGetSimiliar";

import {
  extendSimilarTracksInterface,
  clearAllTracksInterface,
  interfaceViewTracksFromDatabase,
} from "./interfaceTracksLibraryDatabase";

import {
  interfaceCreateQueryObject,
  interfaceQueueTrackInQuery,
  getTracksQueue,
} from "./interfaceTrackQuery";

import {
  compareQueueToDB,
  interfaceFilteredQueue,
} from "./interfaceFilterPreFetch";

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
      const filteredQueue = await compareQueueToDB(queue);
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
    } else if (event.target.id === "view-tracks-in-database") {
      await interfaceViewTracksFromDatabase();
    } else if (event.target.id === "view-queue") {
      await interfaceFilteredQueue.viewFilteredQueue();
    }
  });
}

export default controllerAddTrack;
