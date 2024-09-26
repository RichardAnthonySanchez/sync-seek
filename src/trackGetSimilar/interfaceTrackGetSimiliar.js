import fetchTrackGetSimilar from "./fetchTrackGetSimilar";
import modelFilterTracks from "./modelFilterTracks";
import {
  storeSimilarTracksLocally,
  getStoredSimilarTrackLists,
  deleteMasterKeysLocally,
} from "./storeSimilarTracks";
import { createTrackInput } from "./viewTrackGetSimilarForm";

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
