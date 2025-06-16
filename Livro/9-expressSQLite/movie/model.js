// import sqlite from "sqlite3";

// const db = new sqlite.Database("../movie.db");

// export async function getAll() {
//   return new Promise((resolve, reject) => {
//     const query = "SELECT * FROM Movies";
//     db.all(query, (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }
// function insert(movie) {
//   return new Promise((resolve, reject) => {
//     const query = "INSERT INTO Movies (title, year) VALUES (?, ?)";
//     db.run(query, [movie.title, movie.year], (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }
// function update(movie) {
//   return new Promise((resolve, reject) => {
//     const query = "UPDATE Movies SET title = ?, year = ? WHERE id = ?";
//     db.run(query, [movie.title, movie.year, movie.id], (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }
// export async function get(id) {
//   return new Promise((resolve, reject) => {
//     const query = "SELECT * FROM Movies WHERE id = ?";
//     db.get(query, [id], (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }
// export async function save(movie) {
//   if (!movie.id) {
//     return insert(movie);
//   } else {
//     return update(movie);
//   }
// }
// export async function remove(id) {
//   return new Promise((resolve, reject) => {
//     const query = "DELETE FROM Movies WHERE id = ?";
//     db.run(query, [id], (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }

/* esse sequelize serve para deixar o MySql com cara de JS, ele é um molde para configurar as entradas para o banco*/
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite" /*tipo do DB */,
  storage: "../movie.db" /*localização do DB */,
});

const Movies = sequelize.define(
  "Movies" /*definicao do nome da tabela */,
  {
    title: { type: Sequelize.STRING },
    year: {
      type: Sequelize.INTEGER,
    },
  } /*Configuração da tabela com os tipos de entrada */,
  {
    timestamps: false /*diz para não adicionar as duas colunas extras como createdAt e updatedAt que registram a data e hora da criacao ou atualização */,
  }
);
await sequelize.sync();

export function getAll() {
  return Movies.findAll();
}

export function get(id) {
  return Movies.findByPk(id);
}
export function remove(id) {
  return Movies.destroy({ where: { id } }); /*funcao que remove o DB */
}
export function save(movie) {
  return Movies.upsert(movie);
}
