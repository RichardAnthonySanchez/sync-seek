import fetchSimilarArtists from "./fetchSimilarArtists.js";
import deleteStoredArtsits from "./deleteStoredArtists.js";

export function interfaceArtistQuery(artist) {
  fetchSimilarArtists(artist);
}

export function deleteStoredArtistsInterface(keyName) {
  deleteStoredArtsits(keyName);
}
