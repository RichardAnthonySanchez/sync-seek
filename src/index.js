import createForm from "./viewQueryForm";
import artistQuery from "./controllerArtistsQuery";
import viewButtonDeleteArtists from "./viewButtonDeleteArtists";

function component() {
  createForm();
  artistQuery();
  viewButtonDeleteArtists();
}

document.body.appendChild(component());
