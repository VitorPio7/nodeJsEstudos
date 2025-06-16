import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
  @Get("/asdf") /*responsável pela requisição http */ getRootRoute() {
    return "hi there";
  }
  @Get("/bye")
  getByeThere() {
    return "bye there!";
  }
  sds;
}
