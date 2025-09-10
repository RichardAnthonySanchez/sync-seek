const ExcelJS = require("exceljs");

async function exportToExcel(data) {
  // orginal inputs will return undefined on their likeness. we ought to change this in the future.

  // 1. Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Tracks");

  // 2. Add column headers
  worksheet.columns = [
    { header: "Track Name", key: "trackname", width: 30 },
    { header: "Artist Name", key: "artistname", width: 30 },
    { header: "Likeness", key: "likenesscount", width: 15 },
    { header: "Playcount", key: "playcount", width: 15 },
    { header: "Track URL", key: "trackurl", width: 50 },
    { header: "Image URL", key: "imageurl", width: 50 },
  ];

  const container = document.createElement("ul"); // this makes a new one every time we exec this function. this is fine for development because we wont be using html here. this method is for excel data only
  container.innerHTML = "";

  // 3. Loop through trackData and add rows to the worksheet
  for (const similarTrack of data) {
    const trackName = similarTrack.songName;
    const artistName = similarTrack.artistName;
    const count = similarTrack.count;
    const playCount = similarTrack.playCount;
    const trackUrl = similarTrack.trackUrl;
    const imageUrl = similarTrack.imageUrl;

    worksheet.addRow({
      trackname: trackName,
      artistname: artistName,
      likenesscount: count || "N/A", // If likenessCount exists
      playcount: playCount || "N/A", // If playcount exists
      trackurl: trackUrl || "N/A",
      imageurl: imageUrl || "N/A", // You can use the largest image URL here
    });

    console.log(
      `Track: ${trackName}, Artist: ${artistName}, Alikeness Rank: ${count}` // not playcount anymore
    );

    const li = document.createElement("li");
    li.innerHTML = `Track: ${trackName}, Artist: ${artistName}, Alikeness Rank: ${count}, playcount: ${playCount}, track url: ${trackUrl}`;
    container.appendChild(li);
  }

  // 4. Convert the workbook to a Blob and save it
  try {
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "TrackData.xlsx";

    // Append the link to the DOM and simulate a click
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);

    console.log("Excel file successfully generated and downloaded");
  } catch (err) {
    console.error("Error writing Excel file:", err);
  }
}

export default exportToExcel;
