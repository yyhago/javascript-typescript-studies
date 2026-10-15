// Campo Minado

const NIVEIS = {
  facil: { linhas: 9, colunas: 9, minas: 10 },
  medio: { linhas: 16, colunas: 16, minas: 40 },
  dificil: { linhas: 16, colunas: 30, minas: 99 },
};

function criarTabuleiro(linhas, colunas) {
  // TODO
}

function posicionarMinas(tabuleiro, quantidade, linhaSegura, colunaSegura) {
  // TODO
}

function calcularVizinhas(tabuleiro) {
  // TODO
}

function revelar(tabuleiro, linha, coluna) {
  // TODO: retorne as posições reveladas, ex.: [[0, 0], [0, 1]]
}

function verificarVitoria(tabuleiro) {
  // TODO
}

// TODO: daqui pra baixo, a interface
// Dica: tabuleiro.style.gridTemplateColumns = `repeat(${colunas}, 28px)`;
