const similarArtistsLocal = (function () {
  return {
    storeArtist: function (artistData) {
      const artistNames = this.getArtistNames(artistData);
      localStorage.setItem("artistsKey", JSON.stringify(artistNames));
      console.log("storing similar artists...");
    },
    getArtistNames: function (data) {
      const artists = data.similarartists.artist;
      const artistNames = artists.map((artist) => artist.name);
      return artistNames;
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
