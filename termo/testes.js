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

  console.log('Testes: avaliarPalpite');

  teste('todas as palavras têm 5 letras', () => {
    const erradas = [];
    for (const palavra of PALAVRAS) {
      if (normalizar(palavra).length !== TAMANHO) erradas.push(palavra);
    }
    return erradas;
  }, []);

  teste('acerto total', () => avaliarPalpite('termo', 'termo'),
    ['certa', 'certa', 'certa', 'certa', 'certa']);
  teste('nenhuma letra', () => avaliarPalpite('nuvem', 'carta'),
    ['errada', 'errada', 'errada', 'errada', 'errada']);
  teste('lugar e certa misturados', () => avaliarPalpite('lapis', 'sabio'),
    ['errada', 'certa', 'errada', 'certa', 'lugar']);
  teste('repetidas: só conta o que sobrou na secreta', () => avaliarPalpite('arara', 'carta'),
    ['lugar', 'lugar', 'errada', 'errada', 'certa']);
  teste('repetida certa não vira lugar', () => avaliarPalpite('terra', 'termo'),
    ['certa', 'certa', 'certa', 'errada', 'errada']);
  teste('repetida com uma certa e as outras erradas', () => avaliarPalpite('ossos', 'sabor'),
    ['errada', 'lugar', 'errada', 'certa', 'errada']);
  teste('mesma letra certa duas vezes', () => avaliarPalpite('louco', 'corpo'),
    ['errada', 'certa', 'errada', 'lugar', 'certa']);
  teste('palpite com letra repetida 5 vezes', () => avaliarPalpite('aaaaa', 'carta'),
    ['errada', 'certa', 'errada', 'errada', 'certa']);
  teste('acentos são ignorados depois de normalizar', () => avaliarPalpite(normalizar('NÍVEL'), normalizar('nivel')),
    ['certa', 'certa', 'certa', 'certa', 'certa']);

  console.log(`${aprovados} aprovados, ${reprovados} reprovados`);
}
