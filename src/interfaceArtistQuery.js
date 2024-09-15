import fetchSimilarArtists from "./fetchSimilarArtists.js";
import deleteStoredArtsits from "./deleteStoredArtists.js";
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

export function artistsIntersectionInterface(listOne, listTwo) {
  const artistIntersection = _.intersection(listOne, listTwo);
  console.log(artistIntersection);
  return artistIntersection;
}
