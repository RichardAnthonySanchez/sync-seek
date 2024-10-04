export const indexedDBService = (function () {
  let db;

  return {
    intializeDB: function () {
      return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open("MusicTracksDB", 1);

        openRequest.onupgradeneeded = function (event) {
          db = event.target.result;

          if (!db.objectStoreNames.contains("tracks")) {
            db.createObjectStore("tracks", { keyPath: "trackName" }); // we're getting an error. when we save data, we need to evaluate a key path. look this up
          }
        };

        openRequest.onsuccess = function (event) {
          db = event.target.result;
          console.log("Database opened successfully");
          resolve(db);
        };

        openRequest.onerror = function (event) {
          console.error("Error opening database:", event.target.errorCode);
          reject(event.target.errorCode);
        };
      });
    },
    saveSimilarTracksList: function (artist, song, list) {
      console.log("attempting to save similar songs to the database...");
      const transaction = db.transaction("tracks", "readwrite");
      const store = transaction.objectStore("tracks");
      const trackData = {
        trackName: song,
        artistName: artist,
        similarTracks: list,
      };

      const request = store.add(trackData);

      request.onsuccess = function () {
        console.log(
          `Track ${song} by ${artist} saved successfully to the database.`
        );
      };

      request.onerror = function () {
        console.error("Database error saving track:", request.error);
      };
    },
  };
})();
