export default function ViewSubmitTestSongs() {
  const button = document.createElement("button");
  button.id = "submit-test-songs";
  button.innerHTML = "submit test songs";
  document.body.appendChild(button);
}
