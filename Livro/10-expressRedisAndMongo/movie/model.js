//DB com redis
// const redis = require("redis");
// const client = redis.creatClient();

// client.on("error", (error) => console.error(error));

// export function getAll() {
//   return Promise.resolve([]);
// }

// export async function get(id) {}
// export async function remove(id) {
//   return new Promise((resolve, reject) => {
//     client.del(id, (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
// }
// export function save(movie) {
//   return new Promise((resolve, reject) => {
//     if (!movie.id) {
//       movie.id = Date.now();
//     }
//     client.set(movie.id, JSON.stringify(movie), (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
// }

import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://vitorvpio60:10203050@cluster2.l3zmbxr.mongodb.net/"
);

const Movie = mongoose.model("movies", {
  id: Number,
  title: String,
  year: Number,
});
export function getAll() {
  return Movie.find({});
}
export function get(id) {
  return Movie.findOne({ id });
}
export async function remove(id) {
  const movie = await get(id);
  return movie.remove();
}
export async function save(movie) {
  if (!movie.id) {
    const newMovie = new Movie(movie);
    newMovie.id = Date.now();
    return newMovie.save();
  } else {
    const existingMovie = await get(parseInt(movie.id, 10));
    existingMovie.title = movie.title;
    existingMovie.year = movie.year;
    return existingMovie.save();
  }
}
