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
      transformToSchema(track, similarTracks);
      // Store each track with that list
      track = storeSimilarTracksList(track);
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
