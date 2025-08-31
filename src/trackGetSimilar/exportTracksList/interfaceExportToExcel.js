import { getAlikeTracksInterface } from "../compareMatchingTracks/interfaceGetAlikeTracks";
import exportToExcel from "./exportToExcel";
import { getStoredSimilarTrackListsInterface } from "../tracksDatabase/interfaceTracksLibraryDatabase";

export async function exportToExcelInterface() {
  // this can be in its own excel interface module
  const dbObj = await getStoredSimilarTrackListsInterface();
  let lists = dbObj.similarTracksList;
  const alikeTracks = await getAlikeTracksInterface(lists);
  //console.log(alikeTracks);
  exportToExcel(alikeTracks);
}
