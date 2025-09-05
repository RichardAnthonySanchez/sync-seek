export function interfaceCreateQueryObject(songName, artistName) {
  validateName(artistName, "Artist name");
  validateName(songName, "Song name");

  return { artistName, songName };
}

function isString(value) {
  return typeof value === "string";
}

function isWithinLength(value, min = 1, max = 100) {
  return value.length >= min && value.length <= max;
}

function validateName(value, fieldName = "Input") {
  if (!isString(value)) {
    throw new Error(`${fieldName} must be a string`);
  }
  if (!isWithinLength(value, 1, 100)) {
    throw new Error(`${fieldName} must be between 1 and 100 characters`);
  }
  return true;
}

let tracksQuery = [];

function isDuplicate(trackA, trackB) {
  return JSON.stringify(trackA) === JSON.stringify(trackB);
}

export function interfaceQueueTrackInQuery(queryObject) {
  //check dupes before pushing
  if (!tracksQuery.some((item) => isDuplicate(item, queryObject))) {
    // we are doing this deduping conditional in the prefetch later in the pipeline. this can be refactored
    // push each query to the queue
    tracksQuery.push(queryObject);
  }
}

export function getTracksQueue() {
  return tracksQuery;
}
