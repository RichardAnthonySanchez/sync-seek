import {
  getAlikeTracksInterface,
  interfaceTrackGetSimilar,
} from "./interfaceTrackGetSimiliar";

import {
  getStoredSimilarTrackListsInterface,
  storeSimilarTracksList,
} from "./interfaceTracksLibraryDatabase";

import { getExistingSongsSet } from "./interfaceFilterPreFetch";

let stopRequested = false;

export async function extendSimilarTracksInterface() {
  stopRequested = false;
  let storedCount = 0; // Counter to track how many similar tracks have been stored. This will be deleted after not using local storage

  const dbObj = await getStoredSimilarTrackListsInterface();
  let lists = dbObj.similarTracksList;
  const alikeTracks = await getAlikeTracksInterface(lists);

  const allTracks = dbObj.allTracks;
  let existingSongsSet = getExistingSongsSet(allTracks);

  for (let track of alikeTracks) {
    if (stopRequested) {
      console.log("Stopping fetch loop by request.");
      break;
    }

    if (storedCount >= 50) {
      console.log(`Reached storage limit of ${storedCount} tracks.`);
      break;
    }

    try {
      const similarTracks = await getList(track.artistName, track.songName);

      track = transformToSchema(track, similarTracks);
      storeUniqueTracks(track, existingSongsSet);

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

export function stopFetching() {
  stopRequested = true;
}
