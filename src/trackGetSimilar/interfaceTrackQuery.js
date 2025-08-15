export function interfaceCreateQueryObject(songName, artistName) {
  return { songName, artistName };
}

let tracksQuery = [];
export function interfaceQueueTrackInQuery(queryObject) {
  // put each track object in the query
  tracksQuery.push(queryObject);
}

// lets check for duplicates in the query before we proceed.
