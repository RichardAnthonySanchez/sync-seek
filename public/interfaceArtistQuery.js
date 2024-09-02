//import artistQuery from "./controllerArtistQuery";
import fetchSimilarArtists from "./fetchSimilarArtists.js";
//import getSimilarArtists from "../src/similarArtists/similarArtists";

function interfaceArtistQuery() {
  const artist = artistQuery;
  console.log("artist is " + artist);
  //getSimilarArtists(artist);
}

fetchSimilarArtists();
