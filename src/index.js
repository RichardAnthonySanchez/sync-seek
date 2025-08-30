import viewButtonDeleteArtists from "./deleteArtists/viewButtonDeleteArtists";
import viewButtonSortArtists from "./sortSimilarArtists/viewButtonSortArtists";
import { createTrackGetSimilarForm } from "./trackGetSimilar/viewTrackGetSimilarForm";
import controllerAddTrack from "./trackGetSimilar/controllerAddTrack";
import viewAddTrackButton from "./trackGetSimilar/viewAddTrackButton";
import ViewExtendSimilarTracksButton from "./trackGetSimilar/viewExtendSimilarTracksButton";
import { initializeIndexedDB } from "./trackGetSimilar/tracksDatabase/interfaceTracksLibraryDatabase";
import ViewTracksInDatabase from "./trackGetSimilar/tracksDatabase/viewTracksInDatabase";
import ViewQueue from "./trackGetSimilar/viewQueue";
import ViewSubmitTestSongs from "./trackGetSimilar/viewSubmitTestSongs";
import ViewMatchingTracks from "./trackGetSimilar/viewMatchingTracks";
import ViewStopFetching from "./trackGetSimilar/viewStopFetching";

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
  ViewSubmitTestSongs();
  ViewMatchingTracks();
  ViewStopFetching();
}

document.body.appendChild(component());
