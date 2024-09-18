import { describe } from "@jest/globals";
import AluguelLivroService from "../../services/aluguelLivroService.js";

const aluguelLivroService = new AluguelLivroService();

describe("Testando aluguelLivroService", () => {
  it("Retornar a data de devolução do livro validando a quantidade de dias alugados", async () => {
    const dataAlugado = new Date("2023-12-31");
    const numeroDiasAlugado = 5;
    const dataDevolucaoMock = new Date("2024-01-05");

    const dataDevolucao = await aluguelLivroService.calcularDataDevolucao(
      dataAlugado,
      numeroDiasAlugado
    );
    expect(dataDevolucao).toStrictEqual(dataDevolucaoMock);
  });
});
