export const indexedDBService = (function () {
  let db;
  let versionNumber = 3;

  return {
    intializeDB: function () {
      return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open("MusicTracksDB", versionNumber);

        openRequest.onupgradeneeded = function (event) {
          db = event.target.result;

          if (!db.objectStoreNames.contains("tracks")) {
            db.createObjectStore("tracks", { keyPath: "trackName" });
          }

          if (!db.objectStoreNames.contains("masterKeys")) {
            db.createObjectStore("masterKeys", { keyPath: "key" });
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
    saveMasterKeys: function (key) {
      const transaction = db.transaction("masterKeys", "readwrite");
      const store = transaction.objectStore("masterKeys");

      const request = store.add({ key: key });

      request.onsuccess = function () {
        console.log(`${key} successfully to the master key list.`);
      };

      request.onerror = function () {
        console.error("Database error saving key:", request.error);
      };
    },
    getAllSimilarTracksList: function () {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction("tracks", "readonly");
        const store = transaction.objectStore("tracks");
        const request = store.getAll();

        request.onsuccess = function (event) {
          const allTracks = event.target.result;
          if (allTracks.length > 0) {
            const similarTracksList = allTracks.map(
              (track) => track.similarTracks
            );
            resolve(similarTracksList);
          } else {
            resolve([]);
          }
        };

        request.onerror = function () {
          reject(request.error);
        };
      });
    },
  };
})();
