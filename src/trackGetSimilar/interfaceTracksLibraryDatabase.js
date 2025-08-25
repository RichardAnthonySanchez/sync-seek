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
  const similarTracksList = await indexedDBService.getAllSimilarTracksList();
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
    // might be an infinite loop.
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
        playCount: track.playCount,
        trackUrl: track.trackUrl,
        imageUrl: track.imageUrl,
      }
    );
  }
}

export async function extendSimilarTracksInterface() {
  let storedCount = 0; // Counter to track how many similar tracks have been stored. This will be deleted after not using local storage

  const dbObj = await getStoredSimilarTrackListsInterface();
  let lists = dbObj.similarTracksList;

  const alikeTracks = await getAlikeTracksInterface(lists);

  for (let track of alikeTracks) {
    if (storedCount >= 200) {
      console.log(`Reached storage limit of  ${storedCount} tracks.`);
      break;
    }

    try {
      // fetch the similar artist list from the tracks that have matches and update our track object with that property
      const nestedSimilarList = await interfaceTrackGetSimilar(
        track.artist,
        track.track
      );

      const similarTracks = nestedSimilarList.similartracks.track;
      track = {
        songName: track.track,
        artistName: track.artist,
        playCount: track.playCount,
        url: track.trackUrl,
        image: track.imageUrl,
        similarTracks: similarTracks,
        seedTrack: true,
      };

      console.log(track);

      // Store each track with that list
      storeSimilarTracksList(track);
      // increment the stored count (incase we have a storage limit)
      storedCount++;
    } catch (error) {
      console.error("Error fetching or storing track:", track, error);
    }
  }

  // Get the second iteration of matching tracks. (We have new songs that will be processed by the getAlikeTracks component)
  await getAlikeTracksInterface();

  const matchingTracks = await getAlikeTracksInterface();

  for (const track of matchingTracks) {
    await indexedDBService.updateProperty(track.artist, track.track, {
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
