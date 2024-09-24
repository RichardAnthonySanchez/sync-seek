const modelFilterTracks = (function () {
  return {
    getAlikeTracks: function (lists) {
      const trackCount = {};
      const matchingTracks = [];

      lists.map((list) =>
        list.similartracks.track.map((track) => {
          if (!trackCount[track.name]) {
            trackCount[track.name] = 0;
          }
          trackCount[track.name]++;
        })
      );

      for (const track in trackCount) {
        if (trackCount[track] > 1) {
          matchingTracks.push(track);
        }
      }

      console.log("this is your list of matching tracks: " + matchingTracks);
      return matchingTracks; // can we feed all matching tracks back into the fetch request to extend the list indefinately?
    },
  };
})();

export default modelFilterTracks;
