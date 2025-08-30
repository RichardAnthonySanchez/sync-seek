import {
  getStoredSimilarTrackListsInterface,
  storeSimilarTracksList,
} from "./tracksDatabase/interfaceTracksLibraryDatabase";
import fetchTrackGetSimilar from "./fetchTracks/fetchTrackGetSimilar";
import { fetchTrackInfo } from "./fetchTracks/fetchTrackGetSimilar";
import modelFilterTracks from "./modelFilterTracks";
//import { deleteMasterKeysLocally } from "./storeSimilarTracks";
import { createTrackInput } from "./viewTrackGetSimilarForm";
import exportToExcel from "./exportToExcel";

//to-do list
// organize module files into several sub-directories for readability

export async function fetchFromFilteredQueue(queue) {
  // create conditionals for an empty queue or unexpected variables
  queue.forEach(async (input) => {
    const song = input.songName;
    const artist = input.artistName;

    const trackInfo = await fetchTrackInfo(artist, song);
    console.log(trackInfo);
    const songName = trackInfo.track.name;
    const artistName = trackInfo.track.artist.name;
    const playCount = trackInfo.track.playcount;
    const trackUrl = trackInfo.track.url;
    const imageUrl = trackInfo.track.album.image[3]["#text"];
    const similarTracks = await interfaceTrackGetSimilar(artist, song);

    const trackInfoObject = {
      songName: songName,
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
  // put this in the views module
  createTrackInput();
}

export async function getAlikeTracksInterface(lists) {
  // this should be in the track matching module
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
  } finally {
    // clear the list data for future requests for getting alike tracks
    modelFilterTracks.clearMatchingTracks();
  }
}

/*
export function deleteMasterKeysInterface() {
  // i don't think this is used any more
  deleteMasterKeysLocally();
}
*/

export async function exportToExcelInterface() {
  // this can be in its own excel interface module
  const dbObj = await getStoredSimilarTrackListsInterface();
  let lists = dbObj.similarTracksList;
  const alikeTracks = await getAlikeTracksInterface(lists);
  //console.log(alikeTracks);
  exportToExcel(alikeTracks);
}
