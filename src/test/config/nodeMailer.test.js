import { describe, expect } from "@jest/globals";
import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const verificaConexao = () =>
  new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        reject(error);
      } else {
        resolve(success);
      }
    });
  });

describe("Testando disparo de email", () => {
  it("O sistema deve validar se a conexão com o sistema de disparo de email", async () => {
    const estaConectado = true;
    const validaConexao = await verificaConexao();
    expect(validaConexao).toStrictEqual(estaConectado);
  });
  it('O sistema deve enviar um email', async () => {
    const dadosEmailMock = {
      from: '"Fred Foo" <foo@example.com>',
      to: 'teste@teste.com',
      subject: 'Aluguel de Livro',
      text: 'Olá, Raphael, você alugou o livro Harry Potter e o Cálice de Fogo por 5 dias.',
    };
    const info = await transporter.sendMail(dadosEmailMock);
    expect(info.accepted[0]).toBe(dadosEmailMock.to);
  });
});
