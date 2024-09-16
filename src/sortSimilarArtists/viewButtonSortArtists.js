export default function viewButtonSortArtists() {
  const button = document.createElement("button");
  button.id = "sort-artists";
  button.innerHTML = "sort artists";
  document.body.appendChild(button);
}
