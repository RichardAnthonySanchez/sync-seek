export function storeSimilarTracksLocally(song, artist, list) {
  localStorage.setItem(`${song}-${artist}`, JSON.stringify(list));
  console.log(`storing similar tracks to ${song} by ${artist}...`);

  const similarTracks = localStorage.getItem(`${song}-${artist}`);

  if (similarTracks) {
    console.log("similar tracks were successfully saved to the local storage");
  } else {
    console.error("failed to save similar tracks");
  }
}
