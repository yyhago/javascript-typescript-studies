// Rode com: node testes.js

const { planejarSaque, criarCaixa, planejarSaqueMinimo } = require('./desafio');

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

// Retorna o problema encontrado no saque, ou 'ok'
function conferirSaque(valor, estoque, notas) {
  if (typeof notas !== 'object' || notas === null) return 'não retornou um objeto';
  let total = 0;
  for (const nota in notas) {
    const quantidade = notas[nota];
    if (quantidade <= 0) return `nota ${nota} com quantidade ${quantidade}`;
    if (quantidade > (estoque[nota] || 0)) return `usou ${quantidade} notas de ${nota}, mas só tinha ${estoque[nota] || 0}`;
    total += Number(nota) * quantidade;
  }
  if (total !== valor) return `somou ${total}, esperava ${valor}`;
  return 'ok';
}

function contarNotas(notas) {
  let total = 0;
  for (const nota in notas) total += notas[nota];
  return total;
}

const farto = { 200: 10, 100: 10, 50: 10, 20: 10, 10: 10, 5: 10, 2: 10 };

console.log('\nplanejarSaque');
teste('saque simples', () => conferirSaque(300, farto, planejarSaque(300, farto)), 'ok');
teste('valor quebrado', () => conferirSaque(388, farto, planejarSaque(388, farto)), 'ok');
teste('guloso falharia: 60 com uma de 50 e três de 20', () => planejarSaque(60, { 50: 1, 20: 3 }), { 20: 3 });
teste('guloso falharia: 110', () => planejarSaque(110, { 100: 1, 50: 1, 20: 3 }), { 50: 1, 20: 3 });
teste('guloso falharia: 8 com notas de 5 e 2', () => planejarSaque(8, { 5: 1, 2: 4 }), { 2: 4 });
teste('valor ímpar usando nota de 5', () => conferirSaque(7, farto, planejarSaque(7, farto)), 'ok');
teste('estoque grande termina rápido', () => {
  const muitas = { 200: 50, 100: 50, 50: 50, 20: 50, 10: 50, 5: 50, 2: 50 };
  return conferirSaque(9998, muitas, planejarSaque(9998, muitas));
}, 'ok');
teste('não altera o estoque recebido', () => {
  const estoque = { 50: 1, 20: 3 };
  planejarSaque(60, estoque);
  return estoque;
}, { 50: 1, 20: 3 });
testeErro('impossível: 3', () => planejarSaque(3, farto));
testeErro('impossível: 1', () => planejarSaque(1, farto));
testeErro('estoque insuficiente', () => planejarSaque(1000, { 100: 5 }));
testeErro('zero', () => planejarSaque(0, farto));
testeErro('negativo', () => planejarSaque(-50, farto));
testeErro('decimal', () => planejarSaque(10.5, farto));
testeErro('string', () => planejarSaque('50', farto));

console.log('\ncriarCaixa');
teste('saldo inicial', () => criarCaixa({ 100: 2, 20: 5 }).saldo(), 300);
teste('sacar retorna as notas e desconta', () => {
  const caixa = criarCaixa({ 100: 2, 20: 5 });
  const notas = caixa.sacar(140);
  return [conferirSaque(140, { 100: 2, 20: 5 }, notas), caixa.saldo()];
}, ['ok', 160]);
teste('saque com erro não muda o estoque', () => {
  const caixa = criarCaixa({ 50: 1, 20: 1 });
  try { caixa.sacar(30); } catch (erro) { }
  return caixa.estoque();
}, { 50: 1, 20: 1 });
testeErro('saque com erro lança', () => criarCaixa({ 50: 1 }).sacar(30));
teste('alterar estoqueInicial depois não afeta o caixa', () => {
  const inicial = { 100: 1 };
  const caixa = criarCaixa(inicial);
  inicial[100] = 999;
  return caixa.saldo();
}, 100);
teste('alterar estoque() não afeta o caixa', () => {
  const caixa = criarCaixa({ 100: 1 });
  const copia = caixa.estoque();
  copia[100] = 999;
  return caixa.saldo();
}, 100);
teste('depositar', () => {
  const caixa = criarCaixa({ 100: 1 });
  caixa.depositar({ 50: 2, 2: 5 });
  return caixa.saldo();
}, 210);
testeErro('depositar nota inválida', () => criarCaixa({}).depositar({ 7: 1 }));
teste('histórico registra sucesso e falha', () => {
  const caixa = criarCaixa({ 100: 1 });
  caixa.depositar({ 20: 1 });
  caixa.sacar(100);
  try { caixa.sacar(100); } catch (erro) { }
  const resumo = [];
  for (const { tipo, valor, sucesso, data } of caixa.historico()) {
    resumo.push([tipo, valor, sucesso, data instanceof Date]);
  }
  return resumo;
}, [
  ['deposito', 20, true, true],
  ['saque', 100, true, true],
  ['saque', 100, false, true],
]);

console.log('\nbônus: planejarSaqueMinimo');
teste('prefere 20x3 a 50 + 2x5', () => planejarSaqueMinimo(60, { 50: 1, 20: 3, 2: 5 }), { 20: 3 });
teste('combinação válida com o mínimo de notas', () => {
  const estoque = { 100: 1, 50: 2, 20: 3, 10: 0, 5: 1, 2: 10 };
  const notas = planejarSaqueMinimo(175, estoque);
  return [conferirSaque(175, estoque, notas), contarNotas(notas)];
}, ['ok', 4]);

console.log(`\n${aprovados} aprovados, ${reprovados} reprovados\n`);
