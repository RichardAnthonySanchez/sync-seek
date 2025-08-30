export default function ViewQueue() {
  const button = document.createElement("button");
  button.id = "view-queue";
  button.innerHTML = "view tracks in queue";
  document.body.appendChild(button);
}
