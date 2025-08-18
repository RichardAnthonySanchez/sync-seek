export function interfaceCreateQueryObject(songName, artistName) {
  return { songName, artistName };
}

let tracksQuery = [];

function isDuplicate(trackA, trackB) {
  // checking for dupes might be better later in the pipeline. what if the user creates multiple instances of queries by clicking submission again?
  return JSON.stringify(trackA) === JSON.stringify(trackB);
}

export function interfaceQueueTrackInQuery(queryObject) {
  //check dupes before pushing
  if (!tracksQuery.some((item) => isDuplicate(item, queryObject))) {
    // we are doing this deduping conditional in the prefetch later in the pipeline. this can be refactored
    // push each query to the queue
    tracksQuery.push(queryObject);
    // log the total queue arr after each push
    // comment this out during production
    console.log(
      `Here is the queue of tracks that are being submitted ${tracksQuery}`
    );
  }
}

export function getTracksQueue() {
  return tracksQuery;
}
