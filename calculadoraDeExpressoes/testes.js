// Rode com: node testes.js

const { tokenizar, paraPosfixa, avaliarPosfixa, calcular } = require('./desafio');

let aprovados = 0;
let reprovados = 0;

function iguais(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const chavesA = Object.keys(a);
  if (chavesA.length !== Object.keys(b).length) return false;
  for (const chave of chavesA) {
    if (!iguais(a[chave], b[chave])) return false;
  }
  return true;
}

function teste(descricao, executar, esperado) {
  try {
    const obtido = executar();
    if (iguais(obtido, esperado)) {
      aprovados++;
      console.log(`[OK]    ${descricao}`);
    } else {
      reprovados++;
      console.log(`[FALHA] ${descricao}`);
      console.log(`        esperado: ${JSON.stringify(esperado)}`);
      console.log(`        obtido:   ${JSON.stringify(obtido)}`);
    }
  } catch (erro) {
    reprovados++;
    console.log(`[ERRO]  ${descricao}: ${erro.message}`);
  }
}

function testeErro(descricao, executar) {
  try {
    executar();
    reprovados++;
    console.log(`[FALHA] ${descricao}: esperava um erro`);
  } catch (erro) {
    aprovados++;
    console.log(`[OK]    ${descricao} (${erro.message})`);
  }
}

// [{ valor: 3 }, { valor: 4 }, { valor: '+' }] -> '3 4 +'
function emTexto(tokens) {
  let texto = '';
  for (const token of tokens) texto += (texto ? ' ' : '') + token.valor;
  return texto;
}

console.log('\ntokenizar');
teste('tokens completos', () => tokenizar('3.14*(2+1)'), [
  { tipo: 'numero', valor: 3.14 },
  { tipo: 'operador', valor: '*' },
  { tipo: 'parentese', valor: '(' },
  { tipo: 'numero', valor: 2 },
  { tipo: 'operador', valor: '+' },
  { tipo: 'numero', valor: 1 },
  { tipo: 'parentese', valor: ')' },
]);
teste('números com vários dígitos e espaços', () => emTexto(tokenizar('  120 -  45 ')), '120 - 45');
teste('todos os operadores', () => emTexto(tokenizar('1+2-3*4/5%6^7')), '1 + 2 - 3 * 4 / 5 % 6 ^ 7');
testeErro('caractere inválido', () => tokenizar('2 $ 3'));
testeErro('número com dois pontos', () => tokenizar('1.2.3 + 1'));

console.log('\nparaPosfixa');
teste('precedência', () => emTexto(paraPosfixa(tokenizar('3 + 4 * 2'))), '3 4 2 * +');
teste('parênteses', () => emTexto(paraPosfixa(tokenizar('(3 + 4) * 2'))), '3 4 + 2 *');
teste('associatividade à esquerda', () => emTexto(paraPosfixa(tokenizar('7 - 2 - 1'))), '7 2 - 1 -');
teste('associatividade à direita', () => emTexto(paraPosfixa(tokenizar('2 ^ 3 ^ 2'))), '2 3 2 ^ ^');
teste('exemplo completo', () => emTexto(paraPosfixa(tokenizar('3 + 4 * 2 / (1 - 5) ^ 2 ^ 3'))), '3 4 2 * 1 5 - 2 3 ^ ^ / +');
testeErro('parêntese sem fechar', () => paraPosfixa(tokenizar('(1 + 2')));
testeErro('parêntese sem abrir', () => paraPosfixa(tokenizar('1 + 2)')));

console.log('\navaliarPosfixa');
teste('soma', () => avaliarPosfixa(paraPosfixa(tokenizar('1 + 2'))), 3);
teste('ordem dos operandos na subtração', () => avaliarPosfixa(paraPosfixa(tokenizar('10 - 4'))), 6);
teste('ordem dos operandos na divisão', () => avaliarPosfixa(paraPosfixa(tokenizar('10 / 4'))), 2.5);

console.log('\ncalcular');
const casos = [
  ['2 + 3 * 4', 14],
  ['(2 + 3) * 4', 20],
  ['10 / 4', 2.5],
  ['10 % 3', 1],
  ['2 ^ 10', 1024],
  ['2 ^ 3 ^ 2', 512],
  ['7 - 2 - 1', 4],
  ['100 / 10 / 2', 5],
  ['3.5 * 2', 7],
  ['((1 + 2) * (3 + 4)) / 7', 3],
  ['3 + 4 * 2 / (1 - 5) ^ 2 ^ 3', 3.0001220703125],
  ['  42  ', 42],
];
for (const [expressao, esperado] of casos) {
  teste(expressao, () => calcular(expressao), esperado);
}
testeErro('vazio', () => calcular(''));
testeErro('só espaços', () => calcular('   '));
testeErro('operador sem operando', () => calcular('2 +'));
testeErro('dois números seguidos', () => calcular('1 2'));
testeErro('parênteses vazios', () => calcular('()'));
testeErro('divisão por zero', () => calcular('5 / (3 - 3)'));
testeErro('resto por zero', () => calcular('5 % 0'));

console.log('\nparte 2: menos unário');
const unarios = [
  ['-3 + 5', 2],
  ['2 * -3', -6],
  ['-(2 + 3)', -5],
  ['--2', 2],
  ['2 - -2', 4],
  ['-2 ^ 2', -4],
  ['2 ^ -1', 0.5],
  ['(-2) ^ 2', 4],
  ['-2 * 3', -6],
];
for (const [expressao, esperado] of unarios) {
  teste(expressao, () => calcular(expressao), esperado);
}
teste('neg na pós-fixa', () => emTexto(paraPosfixa(tokenizar('-2 ^ 2'))), '2 2 ^ neg');

console.log('\nbônus: variáveis');
teste('x * 2 + y', () => calcular('x * 2 + y', { x: 3, y: 1 }), 7);
teste('nome com mais de uma letra', () => calcular('preco * qtd', { preco: 2.5, qtd: 4 }), 10);
testeErro('variável sem valor', () => calcular('x + 1', {}));

console.log(`\n${aprovados} aprovados, ${reprovados} reprovados\n`);
