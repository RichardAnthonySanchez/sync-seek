const ExcelJS = require("exceljs");

async function exportToExcel(data) {
  //console.log(JSON.stringify(await data));

  /*
  similartracks
    -track
        -name
        -playcount
        -artist
            -name
  */

  const container = document.createElement("ul");

  for (const similarTrack of data[0].similartracks.track) {
    const trackName = similarTrack.name;
    const artistName = similarTrack.artist.name;
    const playcount = similarTrack.playcount;

    console.log(
      `Track: ${trackName}, Artist: ${artistName}, Playcount: ${playcount}`
    );

    const li = document.createElement("li");
    li.innerHTML = `Track: ${trackName}, Artist: ${artistName}, Playcount: ${playcount}`;
    container.appendChild(li);
  }

  document.body.appendChild(container);
  console.log("song list is equal to: " + data.length);
}

export default exportToExcel;
