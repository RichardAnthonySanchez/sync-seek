import { stopFetching } from "./interfaceListHydration";

export function controllerStopFetching() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "view-stop-fetching") {
      stopFetching();
    }
  });
}
