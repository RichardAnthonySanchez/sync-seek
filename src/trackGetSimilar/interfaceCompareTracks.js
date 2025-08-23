import { interfaceGetAllFromDatabase } from "./interfaceTracksLibraryDatabase";

export async function interfaceGetLists() {
  // take tracks from library
  const allTracks = await interfaceGetAllFromDatabase();
  // Is seedTrack true?
  let lists = [];
  allTracks.forEach((element) => {
    if (element.seedTrack == true) {
      //add that track's similarTracks value to an array
      lists.push(element.similarTracks);
    } else return;
    // return filtered track's similarArtists lists
    console.log(lists);
    return lists;
  });
}
