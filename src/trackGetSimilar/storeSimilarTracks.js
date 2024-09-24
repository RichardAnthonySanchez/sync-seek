export function storeSimilarTracksLocally(song, artist, list) {
  localStorage.setItem(`${song}-${artist}`, JSON.stringify(list));
  console.log(`storing similar tracks to ${song} by ${artist}...`);
  // get similar tracks to see if they are in the local storage
  const similarTracks = localStorage.getItem(`${song}-${artist}`);

  if (similarTracks) {
    console.log("similar tracks were successfully saved to the local storage");
  } else {
    console.error("failed to save similar tracks");
  }

  // create a master key of our lists and check each key to see if it is already in the master key list
  let listOfKeys = JSON.parse(localStorage.getItem("masterKey")) || [];

  // store all non-duplicate the keys to the master key
  if (!listOfKeys.includes(`${song}-${artist}`)) {
    listOfKeys.push(`${song}-${artist}`);
    console.log(`successfully pushed, ${song} by ${artist}, to the master key`);
  } else {
    console.log("already had that song in the local storage");
  }
  console.log(" your list of master keys are: " + JSON.stringify(listOfKeys));
  // our keys have whitespace. we will probably want to change that later
  localStorage.removeItem("masterKey");
  localStorage.setItem("masterKey", JSON.stringify(listOfKeys));
}

export function getStoredSimilarTrackLists() {
  const listOfKeys = JSON.parse(localStorage.getItem("masterKey")) || [];

  const lists = listOfKeys.map((key) => JSON.parse(localStorage.getItem(key)));

  return lists;
}
