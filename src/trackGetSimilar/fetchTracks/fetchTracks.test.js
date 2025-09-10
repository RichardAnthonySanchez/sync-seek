import { validateTrackInfo } from "./interfaceFetchTracks";

test("has track name and artist name", () => {
  expect(
    validateTrackInfo({
      track: { name: "test", artist: { name: "test" } },
    })
  ).toBeTruthy();
});

test("returns false for functions", () => {
  expect(validateTrackInfo(Error)).toBeFalsy();
});
