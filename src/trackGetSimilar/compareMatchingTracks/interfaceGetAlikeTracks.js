import modelFilterTracks from "./modelFilterTracks";

export async function getAlikeTracksInterface(lists) {
  try {
    if (lists && Array.isArray(lists) && lists.length > 0) {
      const alikeTracks = modelFilterTracks.getAlikeTracks(lists);
      console.log(`${alikeTracks.length} a like tracks found`);
      return alikeTracks;
    } else {
      throw new Error(
        "Invalid input: lists must be an array with at least one element"
      );
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    // clear the list data for future requests for getting alike tracks
    modelFilterTracks.clearMatchingTracks();
  }
}
