import artistQuery from "./controllerArtistsQuery.js";
import fetchSimilarArtists from "./fetchSimilarArtists.js";

function interfaceArtistQuery() {
  const artist = artistQuery();
}

export default interfaceArtistQuery;
