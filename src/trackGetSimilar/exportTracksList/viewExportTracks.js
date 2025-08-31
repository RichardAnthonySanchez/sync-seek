export default function viewExportTracks() {
  const button = document.createElement("button");
  button.id = "export-tracks";
  button.innerHTML = "export list";
  document.body.appendChild(button);
}
