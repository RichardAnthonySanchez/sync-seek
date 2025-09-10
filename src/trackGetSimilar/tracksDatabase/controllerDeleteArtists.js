import { clearAllTracksInterface } from "./interfaceTracksLibraryDatabase";

export function controllerDeleteArtists() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "delete-artists") {
      clearAllTracksInterface();
    }
  });
}
