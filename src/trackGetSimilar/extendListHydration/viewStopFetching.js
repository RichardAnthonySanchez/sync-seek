export default function ViewStopFetching() {
  const button = document.createElement("button");
  button.id = "view-stop-fetching";
  button.innerHTML = "stop fetching tracks";
  document.body.appendChild(button);
}
