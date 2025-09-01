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

export function controllerSubmitTestSongs() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "submit-test-songs") {
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
    }
  });
}
