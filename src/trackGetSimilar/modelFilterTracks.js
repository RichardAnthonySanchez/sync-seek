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
      ); // this nested mapping is something i'm not used to. i'm going to have to practice this more

      for (const track in trackCount) {
        if (trackCount[track] > 1) {
          matchingTracks.push(track);
        }
      }

      console.log("this is your list of matching tracks: " + matchingTracks);
      return matchingTracks;
    },
  };
})();

export default modelFilterTracks;
