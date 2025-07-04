import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { router as movieRouter } from "./movie/index.js";

const app = express();
app.set("view engine", "pug");

app.use(express.static(dirname(fileURLToPath(import.meta.url))));

/*morgan é responsável por dizer os logs do sistema */
app.use(morgan("common", { immediate: true }));

/*converte o URL formdata em um objeto JavaScript  e faz disponivel via req.body */
app.use(express.urlencoded({ extended: false }));

app.use("/movie", movieRouter);

app.get("/", (request, response) => response.redirect("/movie"));

app.listen(8080, () => {
  console.log("Server is listening to http://localhost:8080");
});
