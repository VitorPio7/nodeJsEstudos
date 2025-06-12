import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import { router as movieRouter } from "./movie/index.js";

const app = express();
/*esse middleware diz que existe um arquivo estático */
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
/*middleware responsável registrar as entradas */
/*esse acessLogsStream vai servir para escrever um novo arquivo baseado nos logs do Morgan */
const accessLogStream = createWriteStream("access.log", { flags: "a" });
/*middleware é responsável por receber dados JSON*/
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan("common", {
    immediate: true,
    stream: accessLogStream,
  })
);

app.use("/movie", movieRouter);

app.get("/", (request, response) => response.redirect("/movie"));

app.listen(8080, () => {
  console.log("Movie database accessible at http://localhost:8080");
});
