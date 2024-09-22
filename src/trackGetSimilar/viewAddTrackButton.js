export default function viewAddTrackButton() {
  const button = document.createElement("button");
  button.id = "add-track";
  button.innerHTML = "add track";
  document.body.appendChild(button);
}
