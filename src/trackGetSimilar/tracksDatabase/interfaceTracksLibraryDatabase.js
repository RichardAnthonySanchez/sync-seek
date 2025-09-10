import { indexedDBService } from "./serviceIndexedDB";

export async function interfaceViewTracksFromDatabase() {
  const allTracks = await interfaceGetAllFromDatabase();
  console.log(allTracks);
}

export async function getStoredSimilarTrackListsInterface() {
  const similarTracksList = await indexedDBService.getAllSimilarTracksList();
  return similarTracksList;
}

export async function getAllSimilarTrackObjectsInterface() {
  const { allTracks } = await indexedDBService.getAllSimilarTracksList();
  return allTracks;
}
export async function storeTracksFromList(list) {
  // I don't think we're using this method anymore
  // Ensure that the input `list` is an array before proceeding
  if (!Array.isArray(list)) {
    console.error("Expected an array, but received:", list);
    return; // Exit the function if `list` is not an array
  }

  const alikeTracks = list;

  for (const track of alikeTracks) {
    try {
      // Ensure track has the necessary properties (artist, track) before proceeding
      if (!track.artist || !track.track) {
        console.warn("Track data is incomplete, skipping:", track);
        continue; // Skip to the next track if required data is missing
      }

      // Store the new track and list
      await storeSimilarTracksList(track);
    } catch (error) {
      console.error("Error processing track:", track, error);
    }
  }
}

export async function storeSimilarTracksList(trackObj) {
  try {
    // if you're trying to save a track that doesn't have the min spec, get outta hea!
    if (!trackObj || !trackObj.songName || !trackObj.artistName) {
      console.warn("Track data is not what is expected", trackObj);
    }
    indexedDBService.saveSimilarTracksList(trackObj);
  } catch (error) {
    console.error("Error processing track:", trackObj, error);
  }
}

export function initializeIndexedDB() {
  indexedDBService.intializeDB();
}

export async function interfaceGetAllFromDatabase() {
  const allTracks = await indexedDBService.getAllFromDatabase();
  return allTracks;
}

export function saveMasterKeysFromDBInterface(trackName) {
  // this only saves the track name as a key. later we will want to make this a track name and an artist name
  indexedDBService.saveMasterKeys(trackName);
}

export function getMasterKeysFromDBInterface() {
  // I don't think we're using this anymore
  const masterKey = indexedDBService.getMasterKeys(); // run console logs to see if this is executing
  return masterKey;
  // this will be used instead of the get all track method.
  // each item in the masterkey objectStore will be a query to find data in the tracks objectStore
}

export function clearAllTracksInterface() {
  indexedDBService.clearAllTracks();
}
