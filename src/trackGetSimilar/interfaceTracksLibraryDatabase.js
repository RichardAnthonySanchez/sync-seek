import {
  getAlikeTracksInterface,
  interfaceTrackGetSimilar,
} from "./interfaceTrackGetSimiliar";
import { indexedDBService } from "./serviceIndexedDB";

import fetchTrackGetSimilar from "./fetchTrackGetSimilar";

export async function interfaceViewTracksFromDatabase() {
  const allTracks = await interfaceGetAllFromDatabase();
  console.log(allTracks);
}

export async function getStoredSimilarTrackListsInterface() {
  const { similarTracksList } =
    await indexedDBService.getAllSimilarTracksList();
  return similarTracksList;
}

export async function getAllSimilarTrackObjectsInterface() {
  const { allTracks } = await indexedDBService.getAllSimilarTracksList();
  return allTracks;
}
export async function storeTracksFromList(list) {
  //this only triggers from the list thats input. this doesn't update props to resulting bigger list
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

      // Fetch a new list of similar tracks for each track
      let newList = await fetchTrackGetSimilar(track.artist, track.track);

      // Store the new track and list
      await storeSimilarTracksList(track);
    } catch (error) {
      console.error("Error processing track:", track, error);
    }

    // Update track count in the indexedDB
    await indexedDBService.updateProperty(
      // can we send more than the track count here. example, urls, images, plays etc
      // BUG: we are getting warnings for not having having tracks in db or doesnt have matching track and artist values. why? most dont have track name dupes. what else could be the problem?
      track.artist,
      track.track,
      {
        count: track.count,
        playCount: track.playCount,
        trackUrl: track.trackUrl,
        imageUrl: track.imageUrl,
      }
    );
  }
}

export async function extendSimilarTracksInterface() {
  // BUG: infinite loop somewhere in here
  let storedCount = 0; // Counter to track how many similar tracks have been stored. This will be deleted after not using local storage

  const alikeTracks = await getAlikeTracksInterface();

  for (const track of alikeTracks) {
    // this is likely what's taking so long. This is fetching a long list of tracks. One that is often continuing to find new tracks.
    if (storedCount >= 200) {
      // this isn't 200 fetches as expected. this is 200 inputs into the repeat fetch request.
      console.log(`Reached storage limit of  ${storedCount} tracks.`);
      break;
    }

    try {
      const fetchedEachTracksList = await interfaceTrackGetSimilar(
        track.artist,
        track.track
      );

      // Store each list and increment the stored count. stored count will be removed when we are no longer using local storage
      storeSimilarTracksList(track); // might add a count param to this. so we can add it as a prop to each item in the track objectStore
      storedCount++;
    } catch (error) {
      console.error("Error fetching or storing track:", track, error);
    }
  }

  // Filter the lists to return only tracks that have a match
  const list = await getAlikeTracksInterface();

  for (const track of list) {
    await indexedDBService.updateProperty(track.artist, track.track, {
      count: track.count,
      playCount: track.playCount,
      trackUrl: track.trackUrl,
      imageUrl: track.imageUrl,
    });
  }
}

export async function storeSimilarTracksList(trackObj) {
  //await storeSimilarTracksLocally(artist, song, list);
  indexedDBService.saveSimilarTracksList(trackObj);
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
  const masterKey = indexedDBService.getMasterKeys(); // run console logs to see if this is executing
  return masterKey;
  // this will be used instead of the get all track method.
  // each item in the masterkey objectStore will be a query to find data in the tracks objectStore
}

export function clearAllTracksInterface() {
  indexedDBService.clearAllTracks();
}
