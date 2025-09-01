import viewButtonDeleteArtists from "./deleteArtists/viewButtonDeleteArtists";
import { createTrackGetSimilarForm } from "./trackGetSimilar/views/viewTrackGetSimilarForm";
import controllerAddTrack from "./trackGetSimilar/controllerAddTrack";
import { controllerExtendSimilarArtists } from "./trackGetSimilar/extendListHydration/controllerExtendSimilarArtists";
import { controllerDeleteArtists } from "./trackGetSimilar/tracksDatabase/controllerDeleteArtists";
import viewAddTrackButton from "./trackGetSimilar/views/viewAddTrackButton";
import ViewExtendSimilarTracksButton from "./trackGetSimilar/extendListHydration/viewExtendSimilarTracksButton";
import { initializeIndexedDB } from "./trackGetSimilar/tracksDatabase/interfaceTracksLibraryDatabase";
import ViewTracksInDatabase from "./trackGetSimilar/tracksDatabase/viewTracksInDatabase";
import ViewQueue from "./trackGetSimilar/queryAssembler/viewQueue";
import ViewSubmitTestSongs from "./trackGetSimilar/views/viewSubmitTestSongs";
import ViewMatchingTracks from "./trackGetSimilar/compareMatchingTracks/viewMatchingTracks";
import ViewStopFetching from "./trackGetSimilar/extendListHydration/viewStopFetching";
import viewExportTracks from "./trackGetSimilar/exportTracksList/viewExportTracks";
import { controllerExportTracks } from "./trackGetSimilar/exportTracksList/controllerExportTracks";
import { controllerViewTracksInDatabase } from "./trackGetSimilar/tracksDatabase/controllerViewTracksInDatabase";
import { controllerViewQueue } from "./trackGetSimilar/filterPreFetch/controllerViewQueue";
import { controllerStopFetching } from "./trackGetSimilar/extendListHydration/controllerStopFetching";

function component() {
  createTrackGetSimilarForm();
  //artistQuery(); this is the get similar artists query
  controllerAddTrack();
  viewAddTrackButton();
  viewButtonDeleteArtists();
  viewExportTracks();
  ViewExtendSimilarTracksButton();
  ViewTracksInDatabase();
  initializeIndexedDB();
  ViewQueue();
  ViewSubmitTestSongs();
  ViewMatchingTracks();
  ViewStopFetching();
  controllerExtendSimilarArtists();
  controllerDeleteArtists();
  controllerExportTracks();
  controllerViewTracksInDatabase();
  controllerViewQueue();
  controllerStopFetching();
}

document.body.appendChild(component());
