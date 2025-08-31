import { storeSimilarTracksList } from "./tracksDatabase/interfaceTracksLibraryDatabase";
import fetchTrackGetSimilar from "./fetchTracks/fetchTrackGetSimilar";
import { fetchTrackInfo } from "./fetchTracks/fetchTrackGetSimilar";

export async function fetchFromFilteredQueue(queue) {
  // create conditionals for an empty queue or unexpected variables
  queue.forEach(async (input) => {
    const song = input.songName;
    const artist = input.artistName;

    const trackInfo = await fetchTrackInfo(artist, song);
    console.log(trackInfo);
    const songName = trackInfo.track.name;
    const artistName = trackInfo.track.artist.name;
    const playCount = trackInfo.track.playcount;
    const trackUrl = trackInfo.track.url;
    const imageUrl = trackInfo.track.album.image[3]["#text"];
    const similarTracks = await interfaceTrackGetSimilar(artist, song);

    const trackInfoObject = {
      songName: songName,
      artistName: artistName,
      playcount: playCount,
      url: trackUrl,
      image: imageUrl,
      similarTracks: similarTracks.similartracks.track,
      seedTrack: true,
    };
    console.log(trackInfoObject); //write some logic to save individual tracks to the database
    await storeSimilarTracksList(trackInfoObject);
  });
}

export async function interfaceTrackGetSimilar(artist, song) {
  console.log(
    "Your artist name is: " + artist + " and your song name is: " + song
  );
  const similarTracks = await fetchTrackGetSimilar(artist, song);
  console.log(similarTracks);
  return similarTracks;
}
