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

describe("Testando a rota login (POST)", () => {
  it("O login deve possuir um e-mail e senha para se autenticar", async () => {
    const loginMock = {
      email: "filipe@f.com",
    };

    await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuário é obrigatório."');
  });
  it('O login deve validar se o usuário está cadastrado', async () => {
    const loginMock = {
      email: 'raphael.teste@teste.com.br',
      senha: '123456',
    };
    await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuário não cadastrado."');
  });
  it('O login deve validar email e senha incorreto', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '12345',
    };
    await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuário ou senha inválido."');
  });
  it('O login deve validar se está sendo retornado um accessToken', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '123456',
    };
    const resposta = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(201);
    expect(resposta.body.message).toBe('Usuário conectado');
    expect(resposta.body).toHaveProperty('accessToken');
  });
});
