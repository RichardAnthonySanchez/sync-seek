const similarArtistsLocal = (function () {
  return {
    storeArtist: function (artistData, artistKey) {
      const artistNames = this.getArtistNames(artistData);
      localStorage.setItem(artistKey, JSON.stringify(artistNames));
      console.log("storing similar artists...");
    },
    getArtistNames: function (data) {
      const artists = data.similarartists.artist;
      const artistNames = artists.map((artist) => artist.name);
      return artistNames;
    },
    getArtists: function (artistKey) {
      const localArtists = localStorage.getItem(artistKey);
      const parsedArtists = JSON.parse(localArtists);
      console.log("artists stored on local storage:" + localArtists.length);
      return { artistKey, parsedArtists };
    },
  };
})();

export default similarArtistsLocal;
