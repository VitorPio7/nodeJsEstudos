import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { router as movieRouter } from "./movie/index.js";
import { engine } from "express-handlebars";

const app = express();

/*Configuração do handlebars */
app.engine(
  "handlebars",
  engine({
    helpers: {
      uc: (data) =>
        data.toUpperCase() /*serve para passar os dados fornecidos para uppercase */,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", [`${dirname(fileURLToPath(import.meta.url))}/movie/views`]);

app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

app.use(morgan("common", { immediate: true }));

app.use(express.urlencoded({ extended: false }));

app.use("/movie", movieRouter);

app.get("/", (request, response) => response.redirect("/movie"));

/*spdy é um protocolo que o http/2  herdou */
app.listen(8080, () => {
  console.log("Server is listening to https://localhost:8080");
});
