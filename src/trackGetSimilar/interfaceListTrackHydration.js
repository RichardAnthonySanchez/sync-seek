import {
  getAlikeTracksInterface,
  interfaceTrackGetSimilar,
} from "./interfaceTrackGetSimiliar";

import {
  getStoredSimilarTrackListsInterface,
  storeSimilarTracksList,
} from "./interfaceTracksLibraryDatabase";

export async function extendSimilarTracksInterface() {
  let storedCount = 0; // Counter to track how many similar tracks have been stored. This will be deleted after not using local storage

  const dbObj = await getStoredSimilarTrackListsInterface();
  let lists = dbObj.similarTracksList;
  const alikeTracks = await getAlikeTracksInterface(lists);

  const allTracks = dbObj.allTracks;
  let existingSongsSet = getExistingSongsSet(allTracks); // do we need to update the set every time we store a new track?

  for (let track of alikeTracks) {
    // don't fetch more than 50 songs
    if (storedCount >= 50) {
      console.log(`Reached storage limit of  ${storedCount} tracks.`);
      break;
    }

    try {
      // fetch the similar artist list from the tracks that have matches and update our track object with that property
      const similarTracks = await getList(track.artistName, track.songName);

      // Turn the fetched track into the schema for our database
      track = transformToSchema(track, similarTracks);
      // Store each track with that list
      storeUniqueTracks(track, existingSongsSet);
      // increment the stored count (incase we have a storage limit)
      storedCount++;
    } catch (error) {
      console.error("Error fetching or storing track:", track, error);
    }
  }
}

async function getList(artistName, songName) {
  const nestedSimilarList = await interfaceTrackGetSimilar(
    artistName,
    songName
  );

  return nestedSimilarList.similartracks.track;
}

function transformToSchema(track, similarTracks) {
  return {
    songName: track.songName,
    artistName: track.artistName,
    playCount: track.playCount,
    trackUrl: track.trackUrl,
    imageUrl: track.imageUrl,
    similarTracks: similarTracks,
    seedTrack: true,
  };
}

function storeUniqueTracks(track, trackSet) {
  // use the track value to compare with the set of tracks already in the database
  const key = `${track.songName}`;
  if (!trackSet.has(key)) {
    console.log("Adding", track);
    // storing logic
    storeSimilarTracksList(track);
    // update the existingSongSet after storing
  } else {
    console.warn(
      `skipping ${track.songName} because it already exists in the database`
    );
  }
}

function getExistingSongsSet(db) {
  // hash table for fast loop up
  // filter database on song or (song|title)
  const existingSongs = new Set(
    db.map((song) => normalizeString(song.trackName))
  );
  //  we can use a key pattern like ${song.track}|${song.artist} after testing with just the track name
  return existingSongs;
}

function normalizeString(str) {
  return str
    .normalize("NFD") // split accents from letters
    .replace(/\p{Diacritic}/gu, "") // remove accents
    .toLowerCase()
    .trim();
}
