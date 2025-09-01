import {
  interfaceCreateQueryObject,
  interfaceQueueTrackInQuery,
  getTracksQueue,
} from "../queryAssembler/interfaceTrackQuery";

import {
  interfaceFilteredQueue,
  compareQueueToDB,
} from "../filterPreFetch/interfaceFilterPreFetch";

import { fetchFromFilteredQueue } from "./interfaceFetchTracks";

export function controllerTrackGetSimilarForm() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "submit-track-get-similar-form") {
      event.preventDefault();
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
      fetchFromFilteredQueue(filteredQueue);
      interfaceFilteredQueue.clearFilteredQueue();
    }
  });
}
