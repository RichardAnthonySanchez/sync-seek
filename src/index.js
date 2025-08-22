import viewButtonDeleteArtists from "./deleteArtists/viewButtonDeleteArtists";
import viewButtonSortArtists from "./sortSimilarArtists/viewButtonSortArtists";
import { createTrackGetSimilarForm } from "./trackGetSimilar/viewTrackGetSimilarForm";
import controllerAddTrack from "./trackGetSimilar/controllerAddTrack";
import viewAddTrackButton from "./trackGetSimilar/viewAddTrackButton";
import ViewExtendSimilarTracksButton from "./trackGetSimilar/viewExtendSimilarTracksButton";
import { initializeIndexedDB } from "./trackGetSimilar/interfaceTracksLibraryDatabase";
import ViewTracksInDatabase from "./trackGetSimilar/viewTracksInDatabase";
import ViewQueue from "./trackGetSimilar/viewQueue";

function component() {
  createTrackGetSimilarForm();
  //artistQuery(); this is the get similar artists query
  controllerAddTrack();
  viewAddTrackButton();
  viewButtonDeleteArtists();
  viewButtonSortArtists();
  ViewExtendSimilarTracksButton();
  ViewTracksInDatabase();
  initializeIndexedDB();
  ViewQueue();
}

document.body.appendChild(component());
