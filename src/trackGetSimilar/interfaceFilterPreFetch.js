export function compareQueueToDB(queue) {
  // normalize strings before comparison
  let normalizedQueue = normalizeQueueData(queue);
  console.log(normalizedQueue); // can get duplicates after multiple submissions
  // filter based on key (song|title)
}

//check for matches in the database compared to tracks in the queue
// if there are matches, create a new queue with only the unique tracks
// start fetching the unique tracks to the last fm api

function normalizeQueueData(queue) {
  let normalizedQueue = queue.map((item) => {
    let normalizedSongName = normalizeString(item.songName);
    let normalizedArtistName = normalizeString(item.artistName);
    return {
      songName: normalizedSongName,
      artistName: normalizedArtistName,
    };
  });
  return normalizedQueue;
}

function normalizeString(str) {
  return str
    .normalize("NFD") // split accents from letters
    .replace(/\p{Diacritic}/gu, "") // remove accents
    .toLowerCase()
    .trim();
}
