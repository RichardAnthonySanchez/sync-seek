import { createTrackInput } from "./views/viewTrackGetSimilarForm";

function controllerAddTrack() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "add-track") {
      createTrackInput();
    }
  });
}

export default controllerAddTrack;
