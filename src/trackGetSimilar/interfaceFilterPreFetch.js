import { interfaceGetAllFromDatabase } from "./interfaceTrackGetSimiliar";

export async function compareQueueToDB(queue) {
  let filteredQueue = [];
  let normalizedQueue = normalizeQueueData(queue);
  let deduplicatedQueue = deduplicateQueue(normalizedQueue);
  console.log(deduplicatedQueue);

  const allTracks = await interfaceGetAllFromDatabase();
  console.log(allTracks);
  let existingSongsSet = getExistingSongsSet(allTracks); // Make a look up table for the tracks in the database. We will need to await the DB after testing.
  for (const q of deduplicatedQueue) {
    // Check query tracks against tracks already in the database
    console.log(JSON.stringify(q));
    const key = `${q.songName}`;
    // we can change the key here to a ${q.songName}|${q.artistName} pattern. Helps with tracks with the same name;
    if (!existingSongsSet.has(key)) {
      console.log("Adding", key);
      filteredQueue.push({ artistName: q.artistName, songName: q.songName });
    } else {
      console.log(`skipping ${key} because it already exists`);
    }
  }

  //console.log(filteredQueue);
  return filteredQueue;
}

function getExistingSongsSet(db) {
  // hash table for fast loop up
  // filter database on song or (song|title)
  const existingSongs = new Set(db.map((song) => normalizeString(song.track)));
  //  we can use a key pattern like ${song.track}|${song.artist} after testing with just the track name
  return existingSongs;
}
/*
const fakeDB = [
  // get our real DB and delete this.
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
*/

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
