// Rode com: node testes.js

const { cifrar, decifrar, quebrarCifra, cifrarVigenere, decifrarVigenere } = require('./desafio');

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

console.log('\ncifrar');
teste('desloca letras simples', () => cifrar('abc', 1), 'bcd');
teste('dá a volta no alfabeto', () => cifrar('xyz', 3), 'abc');
teste('preserva maiúsculas, acentos e pontuação', () => cifrar('Olá, Mundo!', 3), 'Roá, Pxqgr!');
teste('deslocamento negativo', () => cifrar('abc', -1), 'zab');
teste('deslocamento maior que 26', () => cifrar('abc', 27), 'bcd');
teste('deslocamento 26 não muda nada', () => cifrar('JavaScript', 26), 'JavaScript');
teste('ROT13', () => cifrar('Javascript', 13), 'Wninfpevcg');
teste('números não mudam', () => cifrar('Aula 67', 5), 'Fzqf 67');

console.log('\ndecifrar');
teste('desfaz o cifrar', () => decifrar('Dwdtxh dr dpdqkhfhu', 3), 'Ataque ao amanhecer');
teste('ida e volta com deslocamento grande', () => decifrar(cifrar('Let, const e var', 100), 100), 'Let, const e var');

console.log('\nquebrarCifra');
const frase = 'Programar em JavaScript e muito divertido quando a gente entende o que esta fazendo';
teste('descobre o deslocamento 7', () => quebrarCifra(cifrar(frase, 7)).deslocamento, 7);
teste('retorna o texto original', () => quebrarCifra(cifrar(frase, 19)).texto, frase);
teste('funciona com texto curto', () => quebrarCifra(cifrar('o rato roeu a roupa do rei de roma', 11)).deslocamento, 11);

console.log('\nbônus: Vigenère');
teste('exemplo clássico', () => cifrarVigenere('ATTACKATDAWN', 'LEMON'), 'LXFOPVEFRNHR');
teste('preserva caixa e espaços não consomem a chave', () => cifrarVigenere('Attack at dawn', 'lemon'), 'Lxfopv ef rnhr');
teste('decifra', () => decifrarVigenere('LXFOPVEFRNHR', 'LEMON'), 'ATTACKATDAWN');

console.log(`\n${aprovados} aprovados, ${reprovados} reprovados\n`);
