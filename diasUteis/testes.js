// Rode com: node testes.js

const {
  calcularPascoa,
  feriadosNacionais,
  ehDiaUtil,
  adicionarDiasUteis,
  diasUteisEntre,
  formatarData,
  emendas,
  proximoFeriado,
} = require('./desafio');

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

// Date -> 'AAAA-MM-DD' no horário local
function iso(data) {
  if (!(data instanceof Date)) return `não é Date: ${data}`;
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function dia(ano, mes, diaDoMes) {
  return new Date(ano, mes - 1, diaDoMes);
}

console.log('\ncalcularPascoa');
teste('2024', () => iso(calcularPascoa(2024)), '2024-03-31');
teste('2025', () => iso(calcularPascoa(2025)), '2025-04-20');
teste('2026', () => iso(calcularPascoa(2026)), '2026-04-05');
teste('2027', () => iso(calcularPascoa(2027)), '2027-03-28');
teste('2000', () => iso(calcularPascoa(2000)), '2000-04-23');
teste('2038 (data mais tarde possível)', () => iso(calcularPascoa(2038)), '2038-04-25');

console.log('\nferiadosNacionais');
teste('13 feriados em 2026', () => feriadosNacionais(2026).length, 13);
teste('datas de 2026', () => {
  const datas = [];
  for (const { data } of feriadosNacionais(2026)) datas.push(iso(data));
  return datas.sort();
}, [
  '2026-01-01', '2026-02-16', '2026-02-17', '2026-04-03', '2026-04-21', '2026-05-01', '2026-06-04',
  '2026-09-07', '2026-10-12', '2026-11-02', '2026-11-15', '2026-11-20', '2026-12-25',
]);
teste('todos têm nome', () => {
  for (const { nome } of feriadosNacionais(2026)) {
    if (typeof nome !== 'string' || nome.length === 0) return false;
  }
  return true;
}, true);

console.log('\nehDiaUtil');
teste('quinta comum', () => ehDiaUtil(dia(2026, 10, 15)), true);
teste('segunda depois da Páscoa', () => ehDiaUtil(dia(2026, 4, 6)), true);
teste('sábado', () => ehDiaUtil(dia(2026, 4, 4)), false);
teste('domingo', () => ehDiaUtil(dia(2026, 4, 5)), false);
teste('Sexta-feira Santa', () => ehDiaUtil(dia(2026, 4, 3)), false);
teste('Consciência Negra', () => ehDiaUtil(dia(2026, 11, 20)), false);
teste('Carnaval', () => ehDiaUtil(dia(2026, 2, 17)), false);
teste('Quarta-feira de Cinzas é dia útil', () => ehDiaUtil(dia(2026, 2, 18)), true);
teste('ignora o horário', () => ehDiaUtil(new Date(2026, 3, 3, 15, 30)), false);

console.log('\nadicionarDiasUteis');
teste('pula feriado e fim de semana', () => iso(adicionarDiasUteis(dia(2026, 4, 2), 1)), '2026-04-06');
teste('pula Tiradentes', () => iso(adicionarDiasUteis(dia(2026, 4, 17), 3)), '2026-04-23');
teste('Natal', () => iso(adicionarDiasUteis(dia(2026, 12, 24), 1)), '2026-12-28');
teste('vira o ano e usa os feriados do ano seguinte', () => iso(adicionarDiasUteis(dia(2026, 12, 31), 1)), '2027-01-04');
teste('30 dias úteis', () => iso(adicionarDiasUteis(dia(2026, 10, 15), 30)), '2026-11-30');
teste('zero dias', () => iso(adicionarDiasUteis(dia(2026, 10, 15), 0)), '2026-10-15');
teste('não altera a data recebida', () => {
  const data = dia(2026, 4, 2);
  adicionarDiasUteis(data, 5);
  return iso(data);
}, '2026-04-02');
teste('retorna outro objeto', () => {
  const data = dia(2026, 10, 15);
  return adicionarDiasUteis(data, 0) !== data;
}, true);
testeErro('quantidade negativa', () => adicionarDiasUteis(dia(2026, 1, 1), -1));
testeErro('quantidade decimal', () => adicionarDiasUteis(dia(2026, 1, 1), 1.5));

console.log('\ndiasUteisEntre');
teste('janeiro de 2026', () => diasUteisEntre(dia(2026, 1, 1), dia(2026, 1, 31)), 21);
teste('semana de Carnaval', () => diasUteisEntre(dia(2026, 2, 13), dia(2026, 2, 20)), 3);
teste('mesmo dia', () => diasUteisEntre(dia(2026, 5, 5), dia(2026, 5, 5)), 0);
teste('ano inteiro de 2026', () => diasUteisEntre(dia(2025, 12, 31), dia(2026, 12, 31)), 249);
testeErro('fim antes do início', () => diasUteisEntre(dia(2026, 5, 5), dia(2026, 5, 1)));

console.log('\nformatarData');
teste('sexta', () => formatarData(dia(2026, 4, 3)), 'sexta-feira, 3 de abril de 2026');
teste('quinta', () => formatarData(dia(2026, 1, 1)), 'quinta-feira, 1 de janeiro de 2026');
teste('domingo', () => formatarData(dia(2026, 3, 1)), 'domingo, 1 de março de 2026');
teste('sábado', () => formatarData(dia(2026, 10, 17)), 'sábado, 17 de outubro de 2026');

console.log('\nbônus: emendas');
teste('emendas de 2026', () => {
  const resultado = [];
  for (const { feriado, emenda } of emendas(2026)) resultado.push([iso(feriado), iso(emenda)]);
  return resultado.sort();
}, [
  ['2026-01-01', '2026-01-02'],
  ['2026-04-21', '2026-04-20'],
  ['2026-06-04', '2026-06-05'],
]);

console.log('\nbônus: proximoFeriado');
teste('próximo de 15/10/2026', () => iso(proximoFeriado(dia(2026, 10, 15)).data), '2026-11-02');
teste('vira o ano', () => iso(proximoFeriado(dia(2026, 12, 26)).data), '2027-01-01');

console.log(`\n${aprovados} aprovados, ${reprovados} reprovados\n`);
