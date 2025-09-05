import { storeSimilarTracksList } from "../tracksDatabase/interfaceTracksLibraryDatabase";
import fetchTrackGetSimilar from "./fetchTrackGetSimilar";
import { fetchTrackInfo } from "./fetchTrackGetSimilar";

export async function fetchFromFilteredQueue(queue) {
  // create conditionals for an empty queue or unexpected variables
  queue.forEach(async (input) => {
    const song = input.songName;
    const artist = input.artistName;

    const trackInfo = await fetchTrackInfo(artist, song); // this wont work if last fm cant find the track. set edge case here
    console.log(trackInfo);
    if (validateTrackInfo(trackInfo)) {
      const trackInfoObject = await trackInfoToSchema(trackInfo);
      console.log(trackInfoObject);
      await storeSimilarTracksList(trackInfoObject);
    }
  });
}

async function trackInfoToSchema(trackInfo) {
  const songName = trackInfo.track.name;
  const artistName = trackInfo.track.artist.name;
  const playCount = trackInfo.track.playcount;
  const trackUrl = trackInfo.track.url;
  const imageUrl = trackInfo.track.album.image[3]["#text"];
  const similarTracks = await interfaceTrackGetSimilar(artistName, songName);

  const trackInfoObject = {
    songName: songName,
    artistName: artistName,
    playcount: playCount,
    url: trackUrl,
    image: imageUrl,
    similarTracks: similarTracks.similartracks.track,
    seedTrack: true,
  };
  return trackInfoObject;
}

export function validateTrackInfo(info) {
  if (!isObject(info)) {
    throw new Error(`api isn't returning an object`, info);
  }
  if (!info.track.name) {
    throw new Error(`api can't find the track name`);
  }
  if (!info.track.artist.name) {
    throw new Error(`api can't find the track name`);
  }
  return true;
}

function isObject(obj) {
  return typeof obj === "object";
}

export async function interfaceTrackGetSimilar(artist, song) {
  console.log(
    "Your artist name is: " + artist + " and your song name is: " + song
  );
  const similarTracks = await fetchTrackGetSimilar(artist, song);
  console.log(similarTracks);
  return similarTracks;
}
