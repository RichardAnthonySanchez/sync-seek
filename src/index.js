import viewButtonDeleteArtists from "./deleteArtists/viewButtonDeleteArtists";
import viewButtonSortArtists from "./sortSimilarArtists/viewButtonSortArtists";
import createTrackGetSimilarForm from "./trackGetSimilar/viewTrackGetSimilarForm";
import controllerAddTrack from "./trackGetSimilar/controllerAddTrack";

function component() {
  createTrackGetSimilarForm();
  //artistQuery(); this is the get similar artists query
  controllerAddTrack();
  viewButtonDeleteArtists();
  viewButtonSortArtists();
}

document.body.appendChild(component());
