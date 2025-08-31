import viewButtonDeleteArtists from "./deleteArtists/viewButtonDeleteArtists";
import { createTrackGetSimilarForm } from "./trackGetSimilar/viewTrackGetSimilarForm";
import controllerAddTrack from "./trackGetSimilar/controllerAddTrack";
import viewAddTrackButton from "./trackGetSimilar/viewAddTrackButton";
import ViewExtendSimilarTracksButton from "./trackGetSimilar/extendListHydration/viewExtendSimilarTracksButton";
import { initializeIndexedDB } from "./trackGetSimilar/tracksDatabase/interfaceTracksLibraryDatabase";
import ViewTracksInDatabase from "./trackGetSimilar/tracksDatabase/viewTracksInDatabase";
import ViewQueue from "./trackGetSimilar/queryAssembler/viewQueue";
import ViewSubmitTestSongs from "./trackGetSimilar/viewSubmitTestSongs";
import ViewMatchingTracks from "./trackGetSimilar/compareMatchingTracks/viewMatchingTracks";
import ViewStopFetching from "./trackGetSimilar/extendListHydration/viewStopFetching";
import viewExportTracks from "./trackGetSimilar/exportTracksList/viewExportTracks";

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
}

document.body.appendChild(component());
