/*responsável por lidar com dados, ele encapsula todos eles */
const data = [
  { id: 1, title: "Iron Man", year: "2008" },
  { id: 2, title: "Thor", year: "2001" },
  { id: 3, title: "Captain America", year: "2011" },
];

export function getAll() {
  return Promise.resolve(data);
}
