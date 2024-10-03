export const indexedDBService = (function () {
  let db;

  return {
    test: "test",
    intializeDB: function () {
      return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open("MusicTracksDB", 1);

        openRequest.onupgradeneeded = function (event) {
          db = event.target.result;

          if (!db.objectStoreNames.contains("tracks")) {
            db.createObjectStore("tracks", { keyPath: "trackName" });
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
  };
})();
