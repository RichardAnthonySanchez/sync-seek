import fetchSimilarArtists from "./fetchSimilarArtists.js";

function interfaceArtistQuery(artist) {
  fetchSimilarArtists(artist);
}

export default interfaceArtistQuery;
