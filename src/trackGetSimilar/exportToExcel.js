const ExcelJS = require("exceljs");

async function exportToExcel(data) {
  // orginal inputs will return undefined on their likeness
  const container = document.createElement("ul");

  for (const similarTrack of data) {
    //console.log(JSON.stringify(similarTrack));
    const trackName = similarTrack.trackName;
    const artistName = similarTrack.artistName;
    const count = similarTrack.count;
    const playCount = similarTrack.playCount;
    const trackUrl = similarTrack.trackUrl;
    const imageUrl = similarTrack.imageUrl;
    // lets get the playcount as well

    console.log(
      `Track: ${trackName}, Artist: ${artistName}, Alikeness Rank: ${count}` // not playcount anymore
    );

    const li = document.createElement("li");
    li.innerHTML = `Track: ${trackName}, Artist: ${artistName}, Alikeness Rank: ${count}, playcount: ${playCount}, track url: ${trackUrl}`;
    container.appendChild(li);
  }

  document.body.appendChild(container);
  console.log("song list is equal to: " + data.length);
}

export default exportToExcel;
