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
    updateProperty: function (artistName, trackName, updatedProps) {
      // Open a transaction on the "tracks" object store with readwrite access
      const transaction = db.transaction("tracks", "readwrite");
      const store = transaction.objectStore("tracks");

      // Retrieve the track by trackName
      const request = store.get(trackName);

      request.onsuccess = function (event) {
        const track = event.target.result;

        // Validate that the track exists and the artistName matches
        if (track && track.artistName === artistName) {
          // Loop through the updatedProps object and update each property
          for (const [propName, newValue] of Object.entries(updatedProps)) {
            track[propName] = newValue; // Set or update the property
          }

          // Use put() to update the object in the object store
          store.put(track);

          console.log(
            `Track properties updated for "${trackName}" by ${artistName}: ${JSON.stringify(
              updatedProps
            )}`
          );
        } else {
          console.warn(
            `Track "${trackName}" by ${artistName} not found or artist does not match.`
          );
        }
      };

      request.onerror = function (event) {
        console.error("Failed to retrieve track:", event);
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
    getAllFromDatabase: function () {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction("tracks", "readonly");
        const store = transaction.objectStore("tracks");
        const request = store.getAll();

        request.onsuccess = function (event) {
          const allTracks = event.target.result;
          resolve(allTracks);
          return allTracks;
        };
        request.onerror = function () {
          reject(request.error);
        };
      });
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
            resolve({ similarTracksList, allTracks });
          } else {
            resolve({ similarTracksList: [], allTracks: [] });
          }
        };

        request.onerror = function () {
          reject(request.error);
        };
      });
    } /*
    getSimilarTracksFromMasterKey: function () {
      const masterKey = this.getMasterKeys();
      console.log("the masterkey format is");
      console.log(`the master key is ${JSON.stringify(masterKey)}`); //returning an empty obj. why?
      
      // loop through each key value and make a get request to the DB
      return new Promise((resolve, reject) => {
        const transaction = db.transaction("tracks", "readonly");
        const store = transaction.objectStore("tracks");
        let request;
        for (track in masterKey) {
          request = store.get(key);

          request.onsuccess = function () {
            console.log(`succeeded in finding ${key} in the master key`);
          };

          request.onerror = function () {
            console.error("could not find key using the master key");
          };
        }
      });
    },*/,
    getMasterKeys: function () {
      return new Promise((resolve, reject) => {
        // im unfamiliar with this pattern. lets figure this out
        const transaction = db.transaction("masterKeys", "readonly");
        const store = transaction.objectStore("masterKeys");
        const request = store.getAll();

        request.onsuccess = function () {
          const allKeys = request.result; // Get the result from the request
          resolve(allKeys); // Resolve the promise with the result
        };

        request.onerror = function () {
          reject(request.error);
        };
      });
    },
    clearAllTracks: function () {
      const transaction = db.transaction("tracks", "readwrite");
      const store = transaction.objectStore("tracks");

      const request = store.clear();

      request.onsuccess = function () {
        console.log("all tracks have been successfully deleted");
      };

      request.onerror = function () {
        console.error("error occured while deleting tracks:", request.error);
      };
    },
  };
})();
