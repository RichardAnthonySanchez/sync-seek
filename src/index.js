import interfaceArtistQuery from "./interfaceArtistQuery";
import createForm from "./viewQueryForm";

function component() {
  createForm();
  // promt the user with the query
  interfaceArtistQuery();
}

document.body.appendChild(component());
