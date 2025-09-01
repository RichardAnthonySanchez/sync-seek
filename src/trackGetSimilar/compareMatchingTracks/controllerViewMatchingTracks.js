import { interfaceGetLists } from "../filterSeedTracks/interfaceCompareTracks";
import { getAlikeTracksInterface } from "./interfaceGetAlikeTracks";

export function controllerViewMatchingTracks() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "view-matching-tracks") {
      let lists = await interfaceGetLists();
      let matchingTracks = await getAlikeTracksInterface(lists);
      console.log(matchingTracks);
    }
  });
}
