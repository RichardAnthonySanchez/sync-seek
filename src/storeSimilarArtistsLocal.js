const similarArtistsLocal = (function () {
  let artists = [];
  return {
    storeArtist: function (artistData) {
      artists.push(artistData);
      localStorage.setItem("artistsKey", JSON.stringify(artists));
      console.log("storing similar artists...");
    },
    getArtists: function () {
      const localArtists = localStorage.getItem("artistsKey");
      const parsedArtists = JSON.parse(localArtists);
      console.log("artists stored on local storage:" + localArtists.length);
      return parsedArtists;
    },
  };
})();

export default similarArtistsLocal;
