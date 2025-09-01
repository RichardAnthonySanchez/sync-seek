import { interfaceFilteredQueue } from "./interfaceFilterPreFetch";

export function controllerViewQueue() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "view-queue") {
      await interfaceFilteredQueue.viewFilteredQueue();
    }
  });
}
