import { getAlikeTracksInterface } from "./interfaceGetAlikeTracks";

test("return only matching tracks", async () => {
  const result = await getAlikeTracksInterface([
    [
      {
        name: "Everlong",
        artist: { name: "Foo Fighters" },
        playcount: 150,
        url: "https://example.com/everlong",
        image: [
          { "#text": "small.jpg" },
          { "#text": "medium.jpg" },
          { "#text": "large.jpg" },
          { "#text": "extralarge.jpg" },
          { "#text": "https://example.com/images/everlong.jpg" }, // index 4
        ],
      },

      {
        name: "Clocks",
        artist: { name: "Coldplay" },
        playcount: 200,
        url: "https://example.com/clocks",
        image: [
          { "#text": "small.jpg" },
          { "#text": "medium.jpg" },
          { "#text": "large.jpg" },
          { "#text": "extralarge.jpg" },
          { "#text": "https://example.com/images/clocks.jpg" }, // index 4
        ],
      },
    ],
    [
      {
        name: "Everlong",
        artist: { name: "Foo Fighters" },
        playcount: 150,
        url: "https://example.com/everlong",
        image: [
          { "#text": "small.jpg" },
          { "#text": "medium.jpg" },
          { "#text": "large.jpg" },
          { "#text": "extralarge.jpg" },
          { "#text": "https://example.com/images/everlong.jpg" }, // index 4
        ],
      },
    ],
  ]);
  expect(result).toEqual([
    {
      songName: "Everlong",
      artistName: "Foo Fighters",
      count: 2,
      playCount: 150,
      trackUrl: "https://example.com/everlong",
      imageUrl: "https://example.com/images/everlong.jpg",
    },
  ]);
});

test("returns undefined for empty array", async () => {
  const result = await getAlikeTracksInterface([]);
  expect(result).toBeUndefined();
});

test("returns undefined for non-array input (string)", async () => {
  const result = await getAlikeTracksInterface("not-an-array");
  expect(result).toBeUndefined();
});

test("returns undefined for null input", async () => {
  const result = await getAlikeTracksInterface(null);
  expect(result).toBeUndefined();
});

test("always runs finally block", async () => {
  await expect(getAlikeTracksInterface(undefined)).resolves.not.toThrow;
});
