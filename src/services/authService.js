import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import Usuario from "../models/usuario.js";
import constants from "../config/constants.js";

class AuthService {
  async login(data) {
    try {
      if (!data.email) {
        throw new Error("O email do usuário é obrigatório.");
      }

      if (!data.senha) {
        throw new Error("A senha de usuário é obrigatório.");
      }

      const usuario = await Usuario.pegarPeloEmail(data.email);

      if (!usuario) {
        throw new Error("Usuário não cadastrado.");
      }

      const senhaIguais = await bcryptjs.compare(data.senha, usuario.senha);

      if (!senhaIguais) {
        throw new Error("Usuário ou senha inválido.");
      }

      const accessToken = jsonwebtoken.sign(
        {
          id: usuario.id,
          email: usuario.email,
        },
        constants.jsonSecret,
        {
          expiresIn: 86400,
        }
      );

      return { message: "Usuário conectado", accessToken };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async cadastrarUsuario(data) {
      try {
        if (!data.nome) {
          throw new Error('O nome de usuário é obrigatório!');
        }
        if (!data.email) {
          throw new Error('O email de usuário é obrigatório!');
        }
        if (!data.senha) {
          throw new Error('A senha de usuário é obrigatória!');
        }
        const usuarioCadastrado = await Usuario.pegarPeloEmail(data.email);
        if (usuarioCadastrado) {
          throw new Error('O email já está cadastrado!');
        }
        data.senha = await bcryptjs.hash(data.senha, 8);
        const usuario = new Usuario(data);
        const resposta = await usuario.salvar(usuario);
        return { message: 'usuário criado', content: resposta };
      } catch (err) {
        throw new Error(err.message);
      }
  }
}

export default AuthService;
