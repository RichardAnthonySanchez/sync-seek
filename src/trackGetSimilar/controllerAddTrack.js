function controllerAddTrack() {
  document.addEventListener("click", async (event) => {
    if (event.target.id === "submit-track-get-similar-form") {
      event.preventDefault();
      const songInputs = document.querySelectorAll(".song-name-input");
      const artistInputs = document.querySelectorAll(".artist-name-input");

      songInputs.forEach((input, index) => {
        const songName = input.value;
        const artistName = artistInputs[index].value;
        console.log(
          "Your artist name is: " +
            artistName +
            " and your song name is: " +
            songName
        );
      });
    }
  });
}

export default controllerAddTrack;
