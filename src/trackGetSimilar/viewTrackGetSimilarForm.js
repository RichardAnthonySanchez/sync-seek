export function createTrackGetSimilarForm() {
  const form = document.createElement("form");
  form.id = "track-get-similar-form";

  const songNameInput = document.createElement("input");
  songNameInput.type = "text";
  songNameInput.className = "song-name-input";
  songNameInput.placeholder = "Enter song name";

  const artistNameInput = document.createElement("input");
  artistNameInput.type = "text";
  artistNameInput.className = "artist-name-input";
  artistNameInput.placeholder = "Enter artist name";

  const button = document.createElement("button");
  button.id = "submit-track-get-similar-form";
  button.type = "submit";
  button.textContent = "Submit";

  form.appendChild(songNameInput);
  form.appendChild(artistNameInput);
  form.appendChild(button);

  document.body.appendChild(form);
}

export function createTrackInput() {
  const form = document.getElementById("track-get-similar-form");

  const songNameInput = document.createElement("input");
  songNameInput.type = "text";
  songNameInput.className = "song-name-input";
  songNameInput.placeholder = "Enter song name";

  const artistNameInput = document.createElement("input");
  artistNameInput.type = "text";
  artistNameInput.className = "artist-name-input";
  artistNameInput.placeholder = "Enter artist name";

  form.appendChild(songNameInput);
  form.appendChild(artistNameInput);
}
