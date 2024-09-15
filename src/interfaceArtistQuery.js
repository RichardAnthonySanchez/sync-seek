import fetchSimilarArtists from "./fetchSimilarArtists.js";
import deleteStoredArtsits from "./deleteStoredArtists.js";

export function interfaceArtistQuery(artistOne, artistTwo) {
  fetchSimilarArtists(artistOne);
  fetchSimilarArtists(artistTwo);
}

export function deleteStoredArtistsInterface(keyName) {
  deleteStoredArtsits(keyName);
}
