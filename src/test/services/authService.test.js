import { describe, jest } from "@jest/globals";
import AuthService from "../../services/authService.js";
import bcryptjs from "bcryptjs";
import Usuario from "../../models/usuario.js";

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
  it('A senha do usuário precisa ser criptografada quando for salva no banco de dados', async () => {
    const data = {
      nome: 'Filipe',
      email: 'ff@f',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);
    const senhaIguais = await bcryptjs.compare('senha123', resultado.content.senha);

    expect(senhaIguais).toStrictEqual(true);

    await Usuario.excluir(resultado.content.id);
  });
  it('Não pode ser cadastrado um usuário com e-mail duplicado', async () => {
    const usuarioMock = {
      nome: 'Raphael',
      email: 'teste@gmail.com',
      senha: '123456',
    };

    const usuarioSave = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSave).rejects.toThrowError('O email já está cadastrado!');
  });
  it('Ao cadastrar um usuário deve ser retornada uma mensagem informando que o usuário foi cadastrado', async () => {
    const data = {
        nome: 'Natalia',
        email: 'nn@n.com',
        senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.message).toEqual('usuário criado');

    await Usuario.excluir(resultado.content.id);
  });
  it('Ao cadastrar um usuário, validar o retorno das informações do usuário', async () => {
    const data = {
      nome: 'Natalia',
      email: 'nn@n.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.content).toMatchObject(data);

    await Usuario.excluir(resultado.content.id);
  });
});

//este é o padrão triple A
