import createForm from "./viewQueryForm";
import artistQuery from "./controllerArtistsQuery";
import viewButtonDeleteArtists from "./viewButtonDeleteArtists";
import viewButtonSortArtists from "./viewButtonSortArtists";

function component() {
  createForm();
  artistQuery();
  viewButtonDeleteArtists();
  viewButtonSortArtists();
}

document.body.appendChild(component());
