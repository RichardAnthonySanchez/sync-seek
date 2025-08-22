import {
  getStoredSimilarTrackListsInterface,
  getAllSimilarTrackObjectsInterface,
  storeTracksFromList,
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
// create a button for what's in the database already
// create a one-time fetch to return all data from the API
// create a stop fetching button
// create a toggle between songs in the db and one for which tracks a similar
// create a button to show what's in the hopper/query queue
//create an attribute for user submitted tracks vs fetched tracks
// console log what is in the hopper upon submission and log the length after fetch
//modify max fetches to 500 while testing
//verify we are actually returning similar tracks

export async function fetchFromFilteredQueue(queue) {
  // create conditionals for an empty queue or unexpected variables
  queue.forEach(async (input) => {
    const songName = input.songName;
    const artistName = input.artistName;

    const trackInfo = await fetchTrackInfo(artistName, songName);
    console.log(trackInfo);
    const trackName = trackInfo.track.name;
    const artistNameApi = trackInfo.track.artist.name;
    const playCount = trackInfo.track.playcount;
    const trackUrl = trackInfo.track.url;
    const imageUrl = trackInfo.track.album.image[3]["#text"];

    const trackInfoObject = {
      songName: trackName,
      artistName: artistNameApi,
      playcount: playCount,
      url: trackUrl,
      image: imageUrl,
    };
    console.log(trackInfoObject); //write some logic to save individual tracks to the database

    /*
    const eachTracksList = await interfaceTrackGetSimilar(artistName, songName);

    await storeSimilarTracksList(artistName, songName, eachTracksList); // we should store the entire object from last fm not just these values
    await saveMasterKeysFromDBInterface(songName);
    const alikeTracks = await getAlikeTracksInterface();
    await storeTracksFromList(alikeTracks);
    */
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

export async function getAlikeTracksInterface() {
  const lists = await getStoredSimilarTrackListsInterface();
  const alikeTracks = modelFilterTracks.getAlikeTracks(lists);
  console.log(`${alikeTracks.length} a like tracks found`);
  return alikeTracks;
}

export function deleteMasterKeysInterface() {
  deleteMasterKeysLocally();
}

export async function exportToExcelInterface() {
  const data = await getAllSimilarTrackObjectsInterface();
  exportToExcel(data);
}
