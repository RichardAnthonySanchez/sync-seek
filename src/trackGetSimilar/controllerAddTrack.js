import { createTrackInput } from "./views/viewTrackGetSimilarForm";

//todo:
// prepare for edge cases
// set up testing

function controllerAddTrack() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "add-track") {
      createTrackInput();
    }
  });
}

export default controllerAddTrack;
