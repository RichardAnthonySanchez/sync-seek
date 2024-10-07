const modelFilterTracks = (function () {
  return {
    getAlikeTracks: function (lists) {
      const trackCount = {};
      const matchingTracks = [];

      lists.map((list) =>
        list.similartracks.track.map((track) => {
          // we dont have a way of handling tracks if one doesnt have expected values
          // is there a way to skip a track if it is being problematic?
          const trackName = track.name;
          const artistName = track.artist.name;
          if (!trackCount[track.name]) {
            trackCount[trackName] = { count: 0, artist: artistName };
          }
          trackCount[trackName].count++;
        })
      );

      for (const trackName in trackCount) {
        if (trackCount[trackName].count > 1) {
          matchingTracks.push({
            track: trackName,
            artist: trackCount[trackName].artist,
          });
        }
      }

      console.log(
        "this is your list of matching tracks: " +
          JSON.stringify(matchingTracks)
      );
      // console.log the matchingTracks length. this way, when we recursively fetch for more tracks, we should see the list length increase. this may be useful for testing
      return matchingTracks; // can we feed all matching tracks back into the fetch request to extend the list indefinately?
    },
  };
})();

export default modelFilterTracks;
