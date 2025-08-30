import {
  interfaceCreateTrackInput,
  deleteMasterKeysInterface,
  exportToExcelInterface,
  fetchFromFilteredQueue,
  getAlikeTracksInterface,
} from "./interfaceTrackGetSimiliar";

import {
  clearAllTracksInterface,
  interfaceViewTracksFromDatabase,
} from "./interfaceTracksLibraryDatabase";

import {
  extendSimilarTracksInterface,
  stopFetching,
} from "./interfaceListTrackHydration";

import {
  interfaceCreateQueryObject,
  interfaceQueueTrackInQuery,
  getTracksQueue,
} from "./queryAssembler/interfaceTrackQuery";

import {
  compareQueueToDB,
  interfaceFilteredQueue,
} from "./filterPreFetch/interfaceFilterPreFetch";

import { interfaceGetLists } from "./interfaceCompareTracks";

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
      interfaceFilteredQueue.clearFilteredQueue();
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
    } else if (event.target.id === "view-stop-fetching") {
      stopFetching();
    } else if (event.target.id === "submit-test-songs") {
      const songName = "matador";
      const artistName = "the buttertones";
      let trackQueryObject = interfaceCreateQueryObject(songName, artistName);
      interfaceQueueTrackInQuery(trackQueryObject);
      const songNameTwo = "think of you";
      const artistNameTwo = "bleached";
      let trackQueryObjectTwo = interfaceCreateQueryObject(
        songNameTwo,
        artistNameTwo
      );
      interfaceQueueTrackInQuery(trackQueryObjectTwo);
      let queue = getTracksQueue();
      const filteredQueue = await compareQueueToDB(queue);
      fetchFromFilteredQueue(filteredQueue);
      interfaceFilteredQueue.clearFilteredQueue();
    } else if (event.target.id === "view-matching-tracks") {
      let lists = await interfaceGetLists();
      console.log(lists);
      let matchingTracks = await getAlikeTracksInterface(lists);
      console.log(matchingTracks);
    }
  });
}

export default controllerAddTrack;
