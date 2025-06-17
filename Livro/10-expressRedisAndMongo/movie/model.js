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

import { MongoClient } from "mongodb";
let collection = null;

async function connect() {
  if (collection) {
    return collection;
  }
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  const db = client.db("moviedb");
  collection = db.collection("Movie");
  return collection;
}

export async function getAll() {}
export async function get(id) {}
export async function remove(id) {}
export function save(movie) {}
