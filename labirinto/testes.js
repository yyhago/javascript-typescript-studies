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

  // Grade sem paredes internas, só as bordas
  const gradeAberta = function (linhas, colunas) {
    const grade = [];
    for (let linha = 0; linha < linhas; linha++) {
      const nova = [];
      for (let coluna = 0; coluna < colunas; coluna++) {
        nova.push({
          paredes: {
            cima: linha === 0,
            direita: coluna === colunas - 1,
            baixo: linha === linhas - 1,
            esquerda: coluna === 0,
          },
        });
      }
      grade.push(nova);
    }
    return grade;
  };

  // Confere se a grade é um labirinto perfeito. Retorna 'ok' ou o problema encontrado.
  const conferirLabirinto = function (grade, linhas, colunas) {
    if (!Array.isArray(grade) || grade.length !== linhas) return 'quantidade de linhas errada';
    let passagens = 0;
    for (let linha = 0; linha < linhas; linha++) {
      if (grade[linha].length !== colunas) return `linha ${linha} com quantidade de colunas errada`;
      for (let coluna = 0; coluna < colunas; coluna++) {
        const { cima, direita, baixo, esquerda } = grade[linha][coluna].paredes;
        if (linha === 0 && !cima) return `borda de cima aberta em (${linha}, ${coluna})`;
        if (linha === linhas - 1 && !baixo) return `borda de baixo aberta em (${linha}, ${coluna})`;
        if (coluna === 0 && !esquerda) return `borda esquerda aberta em (${linha}, ${coluna})`;
        if (coluna === colunas - 1 && !direita) return `borda direita aberta em (${linha}, ${coluna})`;
        if (coluna < colunas - 1) {
          if (direita !== grade[linha][coluna + 1].paredes.esquerda) return `parede inconsistente entre (${linha}, ${coluna}) e a da direita`;
          if (!direita) passagens++;
        }
        if (linha < linhas - 1) {
          if (baixo !== grade[linha + 1][coluna].paredes.cima) return `parede inconsistente entre (${linha}, ${coluna}) e a de baixo`;
          if (!baixo) passagens++;
        }
      }
    }
    if (passagens !== linhas * colunas - 1) return `${passagens} passagens, esperava ${linhas * colunas - 1}`;

    // Com n - 1 passagens, basta todas as células serem alcançáveis para não haver ciclos
    const visitadas = [];
    for (let linha = 0; linha < linhas; linha++) {
      visitadas.push([]);
      for (let coluna = 0; coluna < colunas; coluna++) visitadas[linha].push(false);
    }
    const pilha = [[0, 0]];
    visitadas[0][0] = true;
    let alcancadas = 0;
    while (pilha.length > 0) {
      const [linha, coluna] = pilha.pop();
      alcancadas++;
      const { cima, direita, baixo, esquerda } = grade[linha][coluna].paredes;
      const vizinhas = [];
      if (!cima) vizinhas.push([linha - 1, coluna]);
      if (!direita) vizinhas.push([linha, coluna + 1]);
      if (!baixo) vizinhas.push([linha + 1, coluna]);
      if (!esquerda) vizinhas.push([linha, coluna - 1]);
      for (const [l, c] of vizinhas) {
        if (!visitadas[l][c]) {
          visitadas[l][c] = true;
          pilha.push([l, c]);
        }
      }
    }
    if (alcancadas !== linhas * colunas) return `só ${alcancadas} células alcançáveis`;
    return 'ok';
  };

  // Confere se o caminho vai de inicio a fim sem atravessar paredes
  const conferirCaminho = function (grade, caminho, inicio, fim) {
    if (!Array.isArray(caminho) || caminho.length === 0) return 'caminho vazio';
    if (!iguais(caminho[0], inicio)) return 'não começa no início';
    if (!iguais(caminho[caminho.length - 1], fim)) return 'não termina no fim';
    for (let i = 1; i < caminho.length; i++) {
      const [l1, c1] = caminho[i - 1];
      const [l2, c2] = caminho[i];
      const paredes = grade[l1][c1].paredes;
      let aberto = false;
      if (l2 === l1 - 1 && c2 === c1) aberto = !paredes.cima;
      else if (l2 === l1 + 1 && c2 === c1) aberto = !paredes.baixo;
      else if (l2 === l1 && c2 === c1 + 1) aberto = !paredes.direita;
      else if (l2 === l1 && c2 === c1 - 1) aberto = !paredes.esquerda;
      if (!aberto) return `passo inválido de (${l1}, ${c1}) para (${l2}, ${c2})`;
    }
    return 'ok';
  };

  console.log('Testes: Labirinto');

  teste('criarGrade', () => criarGrade(1, 2), [[
    { paredes: { cima: true, direita: true, baixo: true, esquerda: true } },
    { paredes: { cima: true, direita: true, baixo: true, esquerda: true } },
  ]]);

  teste('criarGrade não compartilha objetos', () => {
    const grade = criarGrade(2, 2);
    grade[0][0].paredes.direita = false;
    return [grade[0][1].paredes.direita, grade[1][0].paredes.direita];
  }, [true, true]);

  const tamanhos = [[1, 1], [1, 6], [6, 1], [5, 5], [12, 20], [30, 30]];
  for (const [linhas, colunas] of tamanhos) {
    teste(`gerarLabirinto ${linhas}x${colunas} é perfeito`, () => conferirLabirinto(gerarLabirinto(linhas, colunas).grade, linhas, colunas), 'ok');
  }

  teste('passos visita cada célula uma vez', () => {
    const { passos } = gerarLabirinto(8, 8);
    const vistas = {};
    for (const [linha, coluna] of passos) {
      const chave = `${linha},${coluna}`;
      if (vistas[chave]) return `repetiu ${chave}`;
      vistas[chave] = true;
    }
    return passos.length;
  }, 64);

  teste('labirintos diferentes a cada chamada', () => {
    const a = gerarLabirinto(10, 10).grade;
    const b = gerarLabirinto(10, 10).grade;
    return iguais(a, b);
  }, false);

  const aberta = gradeAberta(2, 2);
  aberta[0][0].paredes.direita = true;
  aberta[0][1].paredes.esquerda = true;
  teste('podeMover', () => [
    podeMover(aberta, 0, 0, 'direita'),
    podeMover(aberta, 0, 0, 'baixo'),
    podeMover(aberta, 0, 0, 'cima'),
    podeMover(aberta, 1, 1, 'esquerda'),
  ], [false, true, false, true]);

  teste('BFS acha o menor caminho', () => resolverBFS(gradeAberta(3, 3), [0, 0], [2, 2]).caminho.length, 5);

  teste('BFS contorna paredes', () => resolverBFS(aberta, [0, 0], [0, 1]).caminho, [[0, 0], [1, 0], [1, 1], [0, 1]]);

  teste('BFS com início igual ao fim', () => resolverBFS(gradeAberta(2, 2), [1, 1], [1, 1]).caminho, [[1, 1]]);

  teste('BFS explora a partir do início', () => resolverBFS(gradeAberta(3, 3), [1, 1], [2, 2]).explorados[0], [1, 1]);

  teste('BFS em labirinto gerado', () => {
    const { grade } = gerarLabirinto(15, 15);
    const { caminho } = resolverBFS(grade, [0, 0], [14, 14]);
    return conferirCaminho(grade, caminho, [0, 0], [14, 14]);
  }, 'ok');

  console.log(`${aprovados} aprovados, ${reprovados} reprovados`);
}
