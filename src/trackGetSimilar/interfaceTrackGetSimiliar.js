import { forEach } from "lodash";
import fetchTrackGetSimilar from "./fetchTrackGetSimilar";
import modelFilterTracks from "./modelFilterTracks";
import {
  storeSimilarTracksLocally,
  getStoredSimilarTrackLists,
  deleteMasterKeysLocally,
} from "./storeSimilarTracks";
import { createTrackInput } from "./viewTrackGetSimilarForm";
import { indexedDBService } from "./serviceIndexedDB";
import exportToExcel from "./exportToExcel";

//to-do list
//create an attribute for user submitted tracks vs fetched tracks
//create a query hopper that empties upon submission
// modify so we can't submit the same tracks multiple times
// console log what is in the hopper upon submission and log the length after fetch
//modify max fetches to 500 while testing
//verify we are actually returning similar tracks

export async function checkForDupes(songList, artistList) {
  const libraryTracks = await getAllSimilarTrackObjectsInterface();

  console.log(JSON.stringify(songList));
}

export async function interfaceTrackGetSimilar(artist, song) {
  console.log(
    "Your artist name is: " + artist + " and your song name is: " + song
  );
  const similarTracks = await fetchTrackGetSimilar(artist, song);
  return similarTracks;
}

export async function storeSimilarTracksList(artist, song, list) {
  //await storeSimilarTracksLocally(artist, song, list);
  indexedDBService.saveSimilarTracksList(artist, song, list);
}

export function interfaceCreateTrackInput() {
  createTrackInput();
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

export async function getAlikeTracksInterface() {
  const lists = await getStoredSimilarTrackListsInterface();
  const alikeTracks = modelFilterTracks.getAlikeTracks(lists);
  console.log(`${alikeTracks.length} a like tracks found`);
  return alikeTracks;
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
      await storeSimilarTracksList(track.artist, track.track, newList);
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

export function deleteMasterKeysInterface() {
  deleteMasterKeysLocally();
}

export async function extendSimilarTracksInterface() {
  // BUG: infinite loop somewhere in here
  let storedCount = 0; // Counter to track how many similar tracks have been stored. This will be deleted after not using local storage

  const alikeTracks = await getAlikeTracksInterface();

  for (const track of alikeTracks) {
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
      storeSimilarTracksList(track.artist, track.track, fetchedEachTracksList); // might add a count param to this. so we can add it as a prop to each item in the track objectStore
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

export function initializeIndexedDB() {
  indexedDBService.intializeDB();
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

export async function exportToExcelInterface() {
  const data = await getAllSimilarTrackObjectsInterface();
  exportToExcel(data);
}
