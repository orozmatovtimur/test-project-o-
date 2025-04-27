import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("/api")
export class AppController {
  @Get("/users")
  getUsers() {
    return [{ id: 1, name: "Ulbi.TV" }];
  }
  constructor(private readonly appService: AppService) {}
}
