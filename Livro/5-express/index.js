import express from "express";
import { listAction } from "./movie/controller.js";
import morgan from "morgan";
const app = express();

/*middleware responsável registrar as entradas */
app.use(morgan("common", { immediate: true }));
app.use("/movie", listAction);

app.get("/", (request, response) => response.redirect("/movie"));

app.listen(8080, () => {
  console.log("Movie database accessible at http://localhost:8080");
});
sdsd;
