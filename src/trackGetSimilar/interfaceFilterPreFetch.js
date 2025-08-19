export function compareQueueToDB(queue) {
  let normalizedQueue = normalizeQueueData(queue);
  let deduplicatedQueue = deduplicateQueue(normalizedQueue);
  console.log(deduplicatedQueue);
  let existingSongsSet = getExistingSongsSet(fakeDB); // Make a look up table for the tracks in the database
  for (const q of deduplicatedQueue) {
    // Check query tracks against tracks already in the database
    console.log(JSON.stringify(q));
    const key = `${q.songName}|${q.artistName}`;
    if (!existingSongsSet.has(key)) {
      console.log("Adding", key);
      // to do:
      // fetch the track using the q object
      // do we have to add the newly fetched song to the set?
    } else {
      console.log(`skipping ${key} because it already exists`);
    }
  }
}
// to do:
//check for matches in the database compared to tracks in the queue
// if there are matches, create a new queue with only the unique tracks
// start fetching the unique tracks to the last fm api

function getExistingSongsSet(db) {
  // hash table for fast loop up
  // filter database on (song|title)
  const existingSongs = new Set(
    db.map((song) => `${song.track}|${song.artist}`)
  );
  return existingSongs;
}
const fakeDB = [
  {
    track: "Rip Van Winkle",
    artist: "Shannon and the Clams",
    count: 2,
    playCount: 99002,
    trackUrl:
      "https://www.last.fm/music/Shannon+and+the+Clams/_/Rip+Van+Winkle",
    imageUrl:
      "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
  },
  {
    track: "Slow Walkin",
    artist: "The Babies",
    count: 2,
    playCount: 111775,
    trackUrl: "https://www.last.fm/music/The+Babies/_/Slow+Walkin",
    imageUrl:
      "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
  },
  {
    track: "Ready To Go",
    artist: "Jaded Juice Riders",
    count: 2,
    playCount: 205060,
    trackUrl: "https://www.last.fm/music/Jaded+Juice+Riders/_/Ready+To+Go",
    imageUrl:
      "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
  },
];

function isDuplicate(trackA, trackB) {
  return JSON.stringify(trackA) === JSON.stringify(trackB);
}

function deduplicateQueue(queue) {
  let dedupedQueries = [];
  //check dupes before pushing
  for (const track of queue) {
    if (!dedupedQueries.some((item) => isDuplicate(item, track))) {
      dedupedQueries.push(track);
    }
  }
  return dedupedQueries;
}

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
