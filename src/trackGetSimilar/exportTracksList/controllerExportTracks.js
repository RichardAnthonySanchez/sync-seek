import { exportToExcelInterface } from "./interfaceExportToExcel";

export function controllerExportTracks() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "export-tracks") {
      await exportToExcelInterface();
    }
  });
}
