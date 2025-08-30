import {
  getAlikeTracksInterface,
  interfaceTrackGetSimilar,
} from "./interfaceTrackGetSimiliar";

import {
  getStoredSimilarTrackListsInterface,
  storeSimilarTracksList,
} from "./interfaceTracksLibraryDatabase";

import { getExistingSongsSet } from "./interfaceFilterPreFetch";

export async function extendSimilarTracksInterface() {
  let storedCount = 0; // Counter to track how many similar tracks have been stored. This will be deleted after not using local storage

  const dbObj = await getStoredSimilarTrackListsInterface();
  let lists = dbObj.similarTracksList;
  const alikeTracks = await getAlikeTracksInterface(lists);

  const allTracks = dbObj.allTracks;
  let existingSongsSet = getExistingSongsSet(allTracks);

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
    trackSet.add(key); // I dont think this is changing the existingSongSet as expected
  } else {
    console.warn(
      `skipping ${track.songName} because it already exists in the database`
    );
  }
}
