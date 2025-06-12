import spdy from "spdy";
import { readFileSync } from "fs";
import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { router as movieRouter } from "./movie/index.js";

const app = express();
app.set("view engine", "pug"); /*implementacao do pug */
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
app.use(morgan("common", { immediate: false }));
app.use(express.urlencoded({ extended: false }));

app.use("/movie", movieRouter);
app.get("/", (request, response) => response.redirect("/movie"));

const options = {
  key: readFileSync("./cert/localhost.key"),
  cert: readFileSync("./cert/localhost.crt"),
};

/*spdy é um protocolo que o http/2  herdou */
spdy.createServer(options, app).listen(8080, () => {
  console.log("Server is listening to https://localhost:8080");
});
