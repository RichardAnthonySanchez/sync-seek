const modelFilterTracks = (function () {
  return {
    getAlikeTracks: function (lists) {
      const trackCount = {};
      const matchingTracks = [];

      lists.map((list) =>
        list.similartracks.track.map((track) => {
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

      console.log("this is your list of matching tracks: " + matchingTracks);
      return matchingTracks; // can we feed all matching tracks back into the fetch request to extend the list indefinately?
    },
  };
})();

export default modelFilterTracks;
