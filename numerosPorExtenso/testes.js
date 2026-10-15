// Rode com: node testes.js

const { porExtenso, valorMonetarioPorExtenso } = require('./desafio');

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

console.log('\nporExtenso');
const casos = [
  [0, 'zero'],
  [7, 'sete'],
  [15, 'quinze'],
  [20, 'vinte'],
  [21, 'vinte e um'],
  [99, 'noventa e nove'],
  [100, 'cem'],
  [101, 'cento e um'],
  [110, 'cento e dez'],
  [345, 'trezentos e quarenta e cinco'],
  [500, 'quinhentos'],
  [999, 'novecentos e noventa e nove'],
  [1000, 'mil'],
  [1001, 'mil e um'],
  [1100, 'mil e cem'],
  [1101, 'mil cento e um'],
  [1234, 'mil duzentos e trinta e quatro'],
  [2025, 'dois mil e vinte e cinco'],
  [10500, 'dez mil e quinhentos'],
  [100000, 'cem mil'],
  [101000, 'cento e um mil'],
  [999999, 'novecentos e noventa e nove mil novecentos e noventa e nove'],
  [1000000, 'um milhão'],
  [2000000, 'dois milhões'],
  [1000001, 'um milhão e um'],
  [1001000, 'um milhão e mil'],
  [1200000, 'um milhão e duzentos mil'],
  [1200300, 'um milhão duzentos mil e trezentos'],
  [1234567, 'um milhão duzentos e trinta e quatro mil quinhentos e sessenta e sete'],
  [999999999, 'novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove'],
];
for (const [numero, esperado] of casos) {
  teste(String(numero), () => porExtenso(numero), esperado);
}
testeErro('decimal', () => porExtenso(1.5));
testeErro('string', () => porExtenso('12'));
testeErro('negativo', () => porExtenso(-1));
testeErro('acima do limite', () => porExtenso(1000000000));
testeErro('NaN', () => porExtenso(NaN));

console.log('\nvalorMonetarioPorExtenso');
teste('um centavo', () => valorMonetarioPorExtenso(0.01), 'um centavo');
teste('só centavos', () => valorMonetarioPorExtenso(0.5), 'cinquenta centavos');
teste('zero', () => valorMonetarioPorExtenso(0), 'zero reais');
teste('um real', () => valorMonetarioPorExtenso(1), 'um real');
teste('real e centavos', () => valorMonetarioPorExtenso(1.5), 'um real e cinquenta centavos');
teste('ponto flutuante: 0.1 + 0.2', () => valorMonetarioPorExtenso(0.1 + 0.2), 'trinta centavos');
teste('ponto flutuante: 1.15', () => valorMonetarioPorExtenso(1.15), 'um real e quinze centavos');
teste('milhar', () => valorMonetarioPorExtenso(1234.56), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos');
teste('"de" depois de milhão', () => valorMonetarioPorExtenso(1000000), 'um milhão de reais');
teste('"de" com centavos', () => valorMonetarioPorExtenso(3000000.01), 'três milhões de reais e um centavo');
teste('sem "de" quando não termina em milhão', () => valorMonetarioPorExtenso(2500000), 'dois milhões e quinhentos mil reais');
testeErro('negativo', () => valorMonetarioPorExtenso(-10));
testeErro('string', () => valorMonetarioPorExtenso('10'));

console.log(`\n${aprovados} aprovados, ${reprovados} reprovados\n`);
