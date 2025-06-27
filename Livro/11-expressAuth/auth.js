import passport from "passport";
import expressSession from "express-session";
import LocalStrategy from "passport-local";
import { createHash } from "crypto";
import { get } from "./user/model";
export default function (app) {
  /*serializeUser e deserializeUser serve para aceitar uma funcao que é usada para restaurar o
  dado do usuário para requests subsequentes */
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await get({ id });
    if (!user) {
      done("User not found");
    } else {
      done(null, user);
    }
  });
  /**middleware responsável por configurar a estratégia desejada */
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      /*converter a senha em um hash md5 */
      const hash = createHash("md5").update(password).digest("hex");
      const user = await get({ username, password: hash });
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    })
  );
  app.use(
    expressSession({
      secret: "top secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login.html" }),
    (request, response) => {
      response.redirect("/");
    }
  );
  app.get("/logout", (request, response) => {
    request.logout();
    response.redirect("/");
  });
}
