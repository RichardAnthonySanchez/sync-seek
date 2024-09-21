import fetchTrackGetSimilar from "./fetchTrackGetSimilar";

export default function interfaceTrackGetSimilar(artist, song) {
  console.log(
    "Your artist name is: " + artist + " and your song name is: " + song
  );
  fetchTrackGetSimilar(artist, song);
}
