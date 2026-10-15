// Testes das funções puras. O resultado aparece no console do navegador (F12).
// O bloco { } mantém as variáveis daqui fora do escopo global.

{
  let aprovados = 0;
  let reprovados = 0;

  const iguais = function (a, b) {
    if (a === b) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const chavesA = Object.keys(a);
    if (chavesA.length !== Object.keys(b).length) return false;
    for (const chave of chavesA) {
      if (!iguais(a[chave], b[chave])) return false;
    }
    return true;
  };

  const teste = function (descricao, executar, esperado) {
    try {
      const obtido = executar();
      if (iguais(obtido, esperado)) {
        aprovados++;
        console.log(`[OK]    ${descricao}`);
      } else {
        reprovados++;
        console.log(`[FALHA] ${descricao}\n        esperado: ${JSON.stringify(esperado)}\n        obtido:   ${JSON.stringify(obtido)}`);
      }
    } catch (erro) {
      reprovados++;
      console.log(`[ERRO]  ${descricao}: ${erro.message}`);
    }
  };

  const testeErro = function (descricao, executar) {
    try {
      executar();
      reprovados++;
      console.log(`[FALHA] ${descricao}: esperava um erro`);
    } catch (erro) {
      aprovados++;
      console.log(`[OK]    ${descricao} (${erro.message})`);
    }
  };

  // '*' é mina, qualquer outro caractere é célula vazia
  const deTexto = function (linhas) {
    const tabuleiro = [];
    for (const linha of linhas) {
      const nova = [];
      for (const caractere of linha) {
        nova.push({ mina: caractere === '*', revelada: false, bandeira: false, vizinhas: 0 });
      }
      tabuleiro.push(nova);
    }
    return tabuleiro;
  };

  // Mostra '*' para mina e o número de vizinhas para o resto
  const vizinhasEmTexto = function (tabuleiro) {
    const linhas = [];
    for (const linha of tabuleiro) {
      let texto = '';
      for (const celula of linha) texto += celula.mina ? '*' : celula.vizinhas;
      linhas.push(texto);
    }
    return linhas;
  };

  // Mostra o número das reveladas e '#' para as fechadas
  const visaoDoJogador = function (tabuleiro) {
    const linhas = [];
    for (const linha of tabuleiro) {
      let texto = '';
      for (const celula of linha) texto += celula.revelada ? celula.vizinhas : '#';
      linhas.push(texto);
    }
    return linhas;
  };

  const mapa = ['..*..', '.....', '.....', '....*'];
  const novoTabuleiro = function () {
    const tabuleiro = deTexto(mapa);
    calcularVizinhas(tabuleiro);
    return tabuleiro;
  };

  console.log('Testes: Campo Minado');

  teste('criarTabuleiro', () => criarTabuleiro(1, 2), [
    [
      { mina: false, revelada: false, bandeira: false, vizinhas: 0 },
      { mina: false, revelada: false, bandeira: false, vizinhas: 0 },
    ],
  ]);

  teste('criarTabuleiro não compartilha objetos', () => {
    const tabuleiro = criarTabuleiro(2, 2);
    tabuleiro[0][0].mina = true;
    return [tabuleiro[0][1].mina, tabuleiro[1][0].mina];
  }, [false, false]);

  teste('calcularVizinhas', () => vizinhasEmTexto(novoTabuleiro()), ['01*10', '01110', '00011', '0001*']);

  teste('calcularVizinhas com 8 minas em volta', () => {
    const tabuleiro = deTexto(['***', '*.*', '***']);
    calcularVizinhas(tabuleiro);
    return tabuleiro[1][1].vizinhas;
  }, 8);

  teste('revelar um número abre só ele', () => revelar(novoTabuleiro(), 0, 1), [[0, 1]]);

  teste('revelar um zero espalha até os números', () => {
    const tabuleiro = novoTabuleiro();
    const reveladas = revelar(tabuleiro, 0, 0);
    return [reveladas.length, visaoDoJogador(tabuleiro)];
  }, [14, ['01###', '0111#', '0001#', '0001#']]);

  teste('espalha só pela região conectada', () => {
    const tabuleiro = novoTabuleiro();
    const reveladas = revelar(tabuleiro, 0, 4);
    return [reveladas.length, visaoDoJogador(tabuleiro)];
  }, [6, ['###10', '###10', '###11', '#####']]);

  teste('não revela célula com bandeira', () => {
    const tabuleiro = novoTabuleiro();
    tabuleiro[0][0].bandeira = true;
    return [revelar(tabuleiro, 0, 0), tabuleiro[0][0].revelada];
  }, [[], false]);

  teste('flood fill não passa por bandeira', () => {
    const tabuleiro = novoTabuleiro();
    tabuleiro[3][0].bandeira = true;
    revelar(tabuleiro, 0, 0);
    return tabuleiro[3][0].revelada;
  }, false);

  teste('não revela de novo célula já revelada', () => {
    const tabuleiro = novoTabuleiro();
    revelar(tabuleiro, 0, 0);
    return revelar(tabuleiro, 0, 0);
  }, []);

  teste('revelar uma mina retorna a posição dela', () => revelar(novoTabuleiro(), 0, 2), [[0, 2]]);

  teste('verificarVitoria', () => {
    const tabuleiro = novoTabuleiro();
    const antes = verificarVitoria(tabuleiro);
    revelar(tabuleiro, 0, 0);
    revelar(tabuleiro, 0, 4);
    return [antes, verificarVitoria(tabuleiro)];
  }, [false, true]);

  teste('posicionarMinas respeita quantidade e área segura (50 rodadas)', () => {
    for (let rodada = 0; rodada < 50; rodada++) {
      const tabuleiro = criarTabuleiro(9, 9);
      posicionarMinas(tabuleiro, 10, 4, 4);
      let total = 0;
      for (let linha = 0; linha < 9; linha++) {
        for (let coluna = 0; coluna < 9; coluna++) {
          if (!tabuleiro[linha][coluna].mina) continue;
          total++;
          if (Math.abs(linha - 4) <= 1 && Math.abs(coluna - 4) <= 1) return `mina na área segura (${linha}, ${coluna})`;
        }
      }
      if (total !== 10) return `${total} minas`;
    }
    return 'ok';
  }, 'ok');

  testeErro('posicionarMinas sem espaço', () => posicionarMinas(criarTabuleiro(3, 3), 1, 1, 1));

  console.log(`${aprovados} aprovados, ${reprovados} reprovados`);
}
