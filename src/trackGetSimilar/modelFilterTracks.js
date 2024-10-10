const modelFilterTracks = (function () {
  return {
    getAlikeTracks: function (lists) {
      const trackCount = {};
      const matchingTracks = [];

      lists.map((list) => {
        // Safeguard: Check if 'track' exists and is an array before mapping over it
        if (
          !list.similartracks ||
          !list.similartracks.track ||
          !Array.isArray(list.similartracks.track)
        ) {
          console.warn(
            "Skipping list due to missing or invalid 'track' data:",
            list
          );
          return; // Skip to the next list if 'track' is missing or not an array
        }

        list.similartracks.track.map((track) => {
          // Ensure the track object contains both 'name' and 'artist.name'
          if (!track.name || !track.artist || !track.artist.name) {
            console.warn(
              "Skipping track due to missing name or artist:",
              track
            );
            return; // Skip to the next track if required fields are missing
          }

          const trackName = track.name;
          const artistName = track.artist.name;
          const playCount = track.playcount;
          const trackUrl = track.url;
          const imageUrl = track.image[4]["#text"];

          // Initialize track count and artist if it's the first time we see this track
          if (!trackCount[trackName]) {
            trackCount[trackName] = {
              count: 0,
              artist: artistName,
              playCount: playCount,
              trackUrl: trackUrl,
              imageUrl: imageUrl,
            };
          }

          // Increment the track count
          trackCount[trackName].count++;
        });
      });

      // Collect tracks that appear more than once in the matching tracks array
      for (const trackName in trackCount) {
        if (trackCount[trackName].count > 1) {
          matchingTracks.push({
            track: trackName,
            artist: trackCount[trackName].artist,
            count: trackCount[trackName].count,
            playCount: trackCount[trackName].playCount,
            trackUrl: trackCount[trackName].trackUrl,
            imageUrl: trackCount[trackName].imageUrl,
          });
        }
      }

      console.log(
        "This is your list of matching tracks: " +
          JSON.stringify(matchingTracks, null, 2)
      );
      return matchingTracks;
    },
  };
})();

export default modelFilterTracks;
