import createForm from "./viewQueryForm";
import artistQuery from "./controllerArtistsQuery";

function component() {
  createForm();
  artistQuery();
}

document.body.appendChild(component());
