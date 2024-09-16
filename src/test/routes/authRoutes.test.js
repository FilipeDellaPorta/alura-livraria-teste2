import request from "supertest";
import { afterEach, beforeEach, describe } from "@jest/globals";
import app from "../../app.js";

let servidor;
beforeEach(() => {
  const porta = 3000;
  servidor = app.listen(porta);
});

afterEach(() => {
  servidor.close();
});
