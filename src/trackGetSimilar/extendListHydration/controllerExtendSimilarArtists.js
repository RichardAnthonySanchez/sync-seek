import { extendSimilarTracksInterface } from "./interfaceListHydration";

export function controllerExtendSimilarArtists() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "extend-similar-tracks") {
      extendSimilarTracksInterface();
    }
  });
}
