import { interfaceCreateQueryObject } from "./interfaceTrackQuery";

test("song and artist are both strings", () => {
  expect(interfaceCreateQueryObject("songName", "artistName")).toEqual({
    songName: "songName",
    artistName: "artistName",
  });
});

test("throws error when passed non-strings", () => {
  expect(() => interfaceCreateQueryObject(1, {})).toThrow();
});

test("throws error when strings are empty", () => {
  expect(() => interfaceCreateQueryObject("", "")).toThrow();
});

test("throws error when input exceeds 100 characters", () => {
  const longString = "a".repeat(101);

  expect(() => interfaceCreateQueryObject(longString, "artistName")).toThrow();
});
