import { describe } from "@jest/globals";
import AuthService from "../../services/authService.js";

const authService = new AuthService();

describe("Testando a authService.cadastrarUsuario", () => {
  it("O usuário deve possuir um nome, email e senha", async () => {
    //arrange -> prepara o teste com os parâmetros
    const usuarioMock = {
      nome: "Rafael",
      email: "r@r.com",
    };
    //act -> aciona método que retornará as informações
    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);
    //assert -> faz a validação das informações retornadas
    await expect(usuarioSalvo).rejects.toThrowError(
      "A senha de usuário é obrigatória!"
    );
  });
});

//este é o padrão triple A
