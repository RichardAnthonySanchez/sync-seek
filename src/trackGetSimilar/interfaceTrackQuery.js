export function interfaceCreateQueryObject(songName, artistName) {
  return { songName, artistName };
}

let tracksQuery = [];

function isDuplicate(trackA, trackB) {
  return JSON.stringify(trackA) === JSON.stringify(trackB);
}

export function interfaceQueueTrackInQuery(queryObject) {
  //check dupes before pushing
  if (!tracksQuery.some((item) => isDuplicate(item, queryObject))) {
    // push each query to the queue
    tracksQuery.push(queryObject);
    // log the total queue arr after each push
    // comment this out during production
    console.log(
      `Here is the queue of tracks that are being submitted ${tracksQuery}`
    );
  }
}
