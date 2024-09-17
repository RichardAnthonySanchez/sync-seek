import fetchSimilarArtists from "./fetchSimilarArtists.js";
import deleteStoredArtsits from "../deleteArtists/deleteStoredArtists.js";
import similarArtistsLocal from "./storeSimilarArtistsLocal.js";
import _ from "lodash";

export function interfaceArtistQuery(artistOne, artistTwo) {
  fetchSimilarArtists(artistOne);
  fetchSimilarArtists(artistTwo);
}

export function deleteStoredArtistsInterface(keyNames) {
  console.log("checking storage for the following artists: " + keyNames);
  for (let i = 0; i < keyNames.length; i++) {
    deleteStoredArtsits(keyNames[i]);
    console.log("deleting the following artist: " + keyNames[i]);
  }
}

export function getArtistLists(keyNames) {
  let listOne;
  let listTwo;

  for (let i = 0; i < keyNames.length; i++) {
    const res = similarArtistsLocal.getArtists(keyNames[i]);
    const artistName = res.artistKey;
    const artistsList = res.parsedArtists;

    if (!listOne) {
      listOne = artistsList;
    } else {
      listTwo = artistsList;
    }
  }
  artistsIntersectionInterface(listOne, listTwo);
}

export function artistsIntersectionInterface(listOne, listTwo) {
  const artistIntersection = _.intersection(listOne, listTwo);
  console.log("this is your list of matching artists: " + artistIntersection);
  return artistIntersection;
}
