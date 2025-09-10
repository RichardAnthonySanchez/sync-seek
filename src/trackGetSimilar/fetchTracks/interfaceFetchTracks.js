import { storeSimilarTracksList } from "../tracksDatabase/interfaceTracksLibraryDatabase";
import fetchTrackGetSimilar from "./fetchTrackGetSimilar";
import { fetchTrackInfo } from "./fetchTrackGetSimilar";

export async function fetchFromFilteredQueue(queue) {
  // create conditionals for an empty queue or unexpected variables
  queue.forEach(async (input) => {
    const song = input.songName;
    const artist = input.artistName;

    let trackInfo = null;

    try {
      trackInfo = await fetchTrackInfo(artist, song);
      if (!validateTrackInfo(trackInfo)) {
        throw new Error("Error fetching track info", trackInfo);
      } else {
        const trackInfoObject = await trackInfoToSchema(trackInfo);
        await storeSimilarTracksList(trackInfoObject);
      }
    } catch (error) {
      console.error("DEBUG:", error);
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
  try {
    if (!isObject(info)) {
      console.error("DEBUG: api isn't returning an object", info);
      return false;
    }
    if (!info.track?.name) {
      console.error("DEBUG: api can't find the track name");
      return false;
    }
    if (!info.track?.artist?.name) {
      console.error("DEBUG: api can't find the artist name");
      return false;
    }
    return true;
  } catch (error) {
    console.error("DEBUG (validation error):", error);
    return false;
  }
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
