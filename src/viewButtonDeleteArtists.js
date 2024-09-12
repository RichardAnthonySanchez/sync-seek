export default function viewButtonDeleteArtists() {
  const button = document.createElement("button");
  button.id = "delete-artists";
  button.innerHTML = "delete artists";
  document.body.appendChild(button);
}
