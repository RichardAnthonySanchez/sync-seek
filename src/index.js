import createForm from "./getSimilarArtists/viewQueryForm";
import artistQuery from "./getSimilarArtists/controllerArtistsQuery";
import viewButtonDeleteArtists from "./deleteArtists/viewButtonDeleteArtists";
import viewButtonSortArtists from "./sortSimilarArtists/viewButtonSortArtists";

function component() {
  createForm();
  artistQuery();
  viewButtonDeleteArtists();
  viewButtonSortArtists();
}

document.body.appendChild(component());
