import artistQuery from "./controllerArtistQuery.js";
import fetchSimilarArtists from "./fetchSimilarArtists.js";

function interfaceArtistQuery() {
  const artist = artistQuery();
  fetchSimilarArtists(artist);
}

interfaceArtistQuery();
