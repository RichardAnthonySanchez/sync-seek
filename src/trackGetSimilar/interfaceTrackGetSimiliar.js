import {
  getStoredSimilarTrackListsInterface,
  getAllSimilarTrackObjectsInterface,
  storeSimilarTracksList,
  saveMasterKeysFromDBInterface,
} from "./interfaceTracksLibraryDatabase";
import fetchTrackGetSimilar from "./fetchTrackGetSimilar";
import { fetchTrackInfo } from "./fetchTrackGetSimilar";
import modelFilterTracks from "./modelFilterTracks";
import { deleteMasterKeysLocally } from "./storeSimilarTracks";
import { createTrackInput } from "./viewTrackGetSimilarForm";
import exportToExcel from "./exportToExcel";

//to-do list
// tests
// verify we are actually returning similar tracks

// refactor the extendslist method to be more concise
// create a stop fetching button (fetching from list)
// potential bug: tracks that were previously in the database get saved to some variables? we're getting matching tracks when there is nothing in the database? refreshing fixes this
// bug: we currently dont support characters (&, #) in songs and artist names

export async function fetchFromFilteredQueue(queue) {
  // create conditionals for an empty queue or unexpected variables
  queue.forEach(async (input) => {
    const song = input.songName;
    const artist = input.artistName;

    const trackInfo = await fetchTrackInfo(artist, song);
    console.log(trackInfo);
    const trackName = trackInfo.track.name;
    const artistName = trackInfo.track.artist.name;
    const playCount = trackInfo.track.playcount;
    const trackUrl = trackInfo.track.url;
    const imageUrl = trackInfo.track.album.image[3]["#text"];
    const similarTracks = await interfaceTrackGetSimilar(artist, song);

    const trackInfoObject = {
      songName: trackName,
      artistName: artistName,
      playcount: playCount,
      url: trackUrl,
      image: imageUrl,
      similarTracks: similarTracks.similartracks.track,
      seedTrack: true,
    };
    console.log(trackInfoObject); //write some logic to save individual tracks to the database
    await storeSimilarTracksList(trackInfoObject);
  });
}

export async function interfaceTrackGetSimilar(artist, song) {
  console.log(
    "Your artist name is: " + artist + " and your song name is: " + song
  );
  const similarTracks = await fetchTrackGetSimilar(artist, song);
  console.log(similarTracks);
  return similarTracks;
}

export function interfaceCreateTrackInput() {
  createTrackInput();
}

export async function getAlikeTracksInterface(lists) {
  try {
    if (lists && Array.isArray(lists) && lists.length > 0) {
      const alikeTracks = modelFilterTracks.getAlikeTracks(lists);
      console.log(`${alikeTracks.length} a like tracks found`);
      return alikeTracks;
    } else {
      throw new Error(
        "Invalid input: lists must be an array with at least one element"
      );
    }
  } catch (error) {
    console.error(error.message);
  }
}

export function deleteMasterKeysInterface() {
  deleteMasterKeysLocally();
}

export async function exportToExcelInterface() {
  const dbObj = await getStoredSimilarTrackListsInterface();
  let lists = dbObj.similarTracksList;
  const alikeTracks = await getAlikeTracksInterface(lists);
  //console.log(alikeTracks);
  exportToExcel(alikeTracks);
}
