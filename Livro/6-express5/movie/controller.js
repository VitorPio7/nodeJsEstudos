/*responsável por lidar com os dados e o view */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getAll, remove, get, save } from "./model.js";
import { render as form } from "./form.js";
export async function listAction(request, response) {
  const movies = await getAll();
  response.render(`${dirname(fileURLToPath(import.meta.url))}/views/list`, {
    movies,
  });
}

export async function removeAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id);
  response.redirect(request.baseUrl);
}

export async function formAction(request, response) {
  let movie = { id: "", title: "", year: "" };
  if (request.params.id) {
    movie = await get(parseInt(request.params.id, 10));
  }
  const body = form(movie);
  response.send(body);
}

export async function saveAction(request, response) {
  const movie = {
    id: request.body.id,
    title: request.body.title,
    year: request.body.year,
  };
  await save(movie);
  response.redirect(request.baseUrl);
}
