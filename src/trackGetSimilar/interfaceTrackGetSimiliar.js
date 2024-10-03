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

export async function interfaceTrackGetSimilar(artist, song) {
  console.log(
    "Your artist name is: " + artist + " and your song name is: " + song
  );
  const similarTracks = await fetchTrackGetSimilar(artist, song);
  return similarTracks;
}

export async function storeSimilarTracksList(artist, song, list) {
  await storeSimilarTracksLocally(artist, song, list);
}

export function interfaceCreateTrackInput() {
  createTrackInput();
}

export function getStoredSimilarTrackListsInterface() {
  const lists = getStoredSimilarTrackLists();
  return lists;
}

export function getAlikeTracksInterface() {
  const lists = getStoredSimilarTrackListsInterface();
  const alikeTracks = modelFilterTracks.getAlikeTracks(lists);
  return alikeTracks;
}

export function deleteMasterKeysInterface() {
  deleteMasterKeysLocally();
}

export async function extendSimilarTracksInterface() {
  let storedCount = 0; // Counter to track how many similar tracks have been stored. This will be deleted after not using local storage

  const alikeTracks = getAlikeTracksInterface();

  for (const track of alikeTracks) {
    // forEach method doens't work with promises (async/await functions)
    // Stop storing if we've already reached 50 similar tracks. This will be delted when we aren't using local storage
    if (storedCount >= 40) {
      // local storage has limits, so we prevent holding over 45 lists at a time
      console.log("Reached storage limit of 40 tracks.");
      break;
    }

    try {
      const fetchedEachTracksList = await interfaceTrackGetSimilar(
        track.artist,
        track.track
      );

      // Store each list and increment the stored count. stored count will be removed when we are no longer using local storage
      storeSimilarTracksList(track.artist, track.track, fetchedEachTracksList);
      storedCount++;
    } catch (error) {
      console.error("Error fetching or storing track:", track, error);
    }
  }

  // Filter the lists to return only tracks that have a match
  getAlikeTracksInterface();
}

export function initializeIndexedDB() {
  indexedDBService.intializeDB();
}
