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

  // ['.#.', '...'] -> [[false, true, false], [false, false, false]]
  const deTexto = function (linhas) {
    const grade = [];
    for (const linha of linhas) {
      const nova = [];
      for (const caractere of linha) nova.push(caractere === '#');
      grade.push(nova);
    }
    return grade;
  };

  const paraTexto = function (grade) {
    const linhas = [];
    for (const linha of grade) {
      let texto = '';
      for (const viva of linha) texto += viva ? '#' : '.';
      linhas.push(texto);
    }
    return linhas;
  };

  console.log('Testes: Jogo da Vida');

  teste('criarGrade', () => criarGrade(2, 3), [[false, false, false], [false, false, false]]);

  teste('criarGrade não compartilha linhas', () => {
    const grade = criarGrade(2, 2);
    grade[0][0] = true;
    return grade[1][0];
  }, false);

  const cheia = deTexto(['###', '###', '###']);
  teste('centro cercado tem 8 vizinhos', () => contarVizinhos(cheia, 1, 1), 8);

  const cruz = deTexto([
    '.....',
    '..#..',
    '.###.',
    '..#..',
    '.....',
  ]);
  teste('não conta a si mesma', () => contarVizinhos(cruz, 2, 2), 4);
  teste('canto vazio', () => contarVizinhos(cruz, 0, 0), 0);

  const bordas = deTexto([
    '#...#',
    '.....',
    '.....',
    '.....',
    '#...#',
  ]);
  teste('borda toroidal: os 4 cantos são vizinhos', () => contarVizinhos(bordas, 0, 0), 3);
  teste('borda toroidal: célula do meio da borda', () => contarVizinhos(bordas, 0, 2), 0);

  const blinker = deTexto([
    '.....',
    '.....',
    '.###.',
    '.....',
    '.....',
  ]);
  teste('blinker gira', () => paraTexto(proximaGeracao(blinker)), [
    '.....',
    '..#..',
    '..#..',
    '..#..',
    '.....',
  ]);
  teste('blinker volta depois de 2 gerações', () => paraTexto(proximaGeracao(proximaGeracao(blinker))), paraTexto(blinker));

  const bloco = deTexto([
    '....',
    '.##.',
    '.##.',
    '....',
  ]);
  teste('bloco não muda', () => paraTexto(proximaGeracao(bloco)), paraTexto(bloco));

  teste('nasce com 3 vizinhos', () => paraTexto(proximaGeracao(deTexto([
    '.....',
    '.#.#.',
    '.....',
    '..#..',
    '.....',
  ]))), [
    '.....',
    '.....',
    '..#..',
    '.....',
    '.....',
  ]);

  teste('não altera a grade recebida', () => {
    const original = deTexto(['.....', '.....', '.###.', '.....', '.....']);
    proximaGeracao(original);
    return paraTexto(original);
  }, ['.....', '.....', '.###.', '.....', '.....']);

  teste('retorna outro array', () => {
    const original = deTexto(['....', '.##.', '.##.', '....']);
    return proximaGeracao(original) !== original;
  }, true);

  console.log(`${aprovados} aprovados, ${reprovados} reprovados`);
}
