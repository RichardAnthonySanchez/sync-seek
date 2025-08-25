const modelFilterTracks = (function () {
  const trackCount = {};
  const matchingTracks = [];

  return {
    getAlikeTracks: function (lists) {
      lists.map((list) => {
        // Safeguard: Check if 'track' exists and is an array before mapping over it
        if (!Array.isArray(list)) {
          console.warn(
            "Skipping list due to missing or invalid 'track' data:",
            list
          );
        } else {
          list.map((track) => {
            // Increment the track's count each time it is processed
            this.countTracks(track);
          });
        }
      });

      // Collect tracks that appear more than once in the count tracks array and push them to the matching tracks
      this.collectMatchingTracks();

      console.log(
        "This is your list of matching tracks: " +
          JSON.stringify(matchingTracks, null, 2)
      );
      return matchingTracks;
    },

    collectMatchingTracks: function () {
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
    },

    countTracks: function (track) {
      // Ensure the track object contains both 'name' and 'artist.name'
      if (!track.name || !track.artist || !track.artist.name) {
        console.warn("Skipping track due to missing name or artist:", track);
        return; // Skip to the next track if required fields are missing
      }

      const trackName = track.name;
      const artistName = track.artist.name;
      const playCount = track.playcount;
      const trackUrl = track.url;
      const imageUrl = track.image[4]["#text"];

      // Initialize track count
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
    },
  };
})();

export default modelFilterTracks;
