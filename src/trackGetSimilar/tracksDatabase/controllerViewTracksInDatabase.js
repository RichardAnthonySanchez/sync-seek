import { interfaceViewTracksFromDatabase } from "./interfaceTracksLibraryDatabase";

export function controllerViewTracksInDatabase() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "view-tracks-in-database") {
      await interfaceViewTracksFromDatabase();
    }
  });
}
