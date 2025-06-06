/*responsável por lidar com os dados e o view */
import { getAll } from "./model.js";
import { render } from "./view.js";
export async function listAction(request, response) {
  const data = await getAll();
  const body = render(data);
  response.send(body);
}
