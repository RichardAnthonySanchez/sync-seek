import fetchTrackGetSimilar from "./fetchTrackGetSimilar";
import { storeSimilarTracksLocally } from "./storeSimilarTracks";

export async function interfaceTrackGetSimilar(artist, song) {
  console.log(
    "Your artist name is: " + artist + " and your song name is: " + song
  );
  const similarTracks = await fetchTrackGetSimilar(artist, song);
  return similarTracks;
}

export async function storeSimilarTracksList(artist, song, list) {
  await storeSimilarTracksLocally(artist, song, list);
}
