import artistQuery from "./getSimilarArtists/controllerArtistsQuery";
import viewButtonDeleteArtists from "./deleteArtists/viewButtonDeleteArtists";
import viewButtonSortArtists from "./sortSimilarArtists/viewButtonSortArtists";
import createTrackGetSimilarForm from "./trackGetSimilar/viewTrackGetSimilarForm";

function component() {
  createTrackGetSimilarForm();
  artistQuery();
  viewButtonDeleteArtists();
  viewButtonSortArtists();
}

document.body.appendChild(component());
