import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { router as movieRouter } from "./movie/index.js";
import auth from "./auth.js";
import { ensureLoggedIn } from "connect-ensure-login";
const app = express();

app.set("view engine", "pug");

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + "/public"));

app.use(morgan("common", { immediate: true }));

app.use(express.urlencoded({ extended: false }));
auth(app);
app.use("/movie", ensureLoggedIn("/login.htlm"), movieRouter);

app.get("/", (request, response) => response.redirect("/movie"));

app.listen(8080, () => {
  console.log("Server is listening to http://localhost:8080");
});
