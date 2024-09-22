import _ from "lodash";

const modelFilterTracks = (function () {
  return {
    getAlikeTracks: function (lists) {
      const trackNamesList = lists.map((list) =>
        list.similartracks.track.map((track) => track.name)
      ); // this nested mapping is something i'm not used to. i'm going to have to practice this more

      // this filter probably will not work until we change what value we are comparing rather than the who data structure
      const alikeTracks = _.intersection(...trackNamesList);
      console.log("this is your list of matching tracks: " + alikeTracks);
      return alikeTracks;
    },
  };
})();

export default modelFilterTracks;
