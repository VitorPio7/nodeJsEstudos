/*responsável por lidar com dados, ele encapsula todos eles */
let data = [
  { id: 1, title: "Iron Man", year: "2008" },
  { id: 2, title: "Thor", year: "2001" },
  { id: 3, title: "Captain America", year: "2011" },
];
function getNextId() {
  return Math.max(...data.map((movie) => movie.id)) + 1;
}
function insert(movie) {
  movie.id = getNextId();
  data.push(movie);
}
function update(movie) {
  movie.id = parseInt(movie.id, 10);
  const index = data.findIndex((item) => item.id === movie.id);
  data[index] = movie;
}
/*requisitar todos os dados */
export function getAll() {
  return Promise.resolve(data);
}
/*remover um dado baseado na id*/
export function remove(id) {
  data = data.filter((movie) => movie.id != id);
  return Promise.resolve();
}
/*pegar um dado baseado na id */
export function get(id) {
  return Promise.resolve(data.find((movie) => movie.id === id));
}
export function save(movie) {
  if (movie.id === "") {
    insert(movie);
  } else {
    update(movie);
  }
  return Promise.resolve();
}
