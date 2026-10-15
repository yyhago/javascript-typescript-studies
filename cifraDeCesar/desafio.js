// Cifra de César
// Rode os testes com: node testes.js

// Frequência aproximada (%) de cada letra em textos em português.
const FREQUENCIA_PT = {
  a: 14.63, b: 1.04, c: 3.88, d: 4.99, e: 12.57, f: 1.02, g: 1.3,
  h: 1.28, i: 6.18, j: 0.4, k: 0.02, l: 2.78, m: 4.74, n: 5.05,
  o: 10.73, p: 2.52, q: 1.2, r: 6.53, s: 7.81, t: 4.34, u: 4.63,
  v: 1.67, w: 0.01, x: 0.21, y: 0.01, z: 0.47,
};

function cifrar(texto, deslocamento) {
  // TODO
}

function decifrar(texto, deslocamento) {
  // TODO
}

function quebrarCifra(textoCifrado) {
  // TODO: retorne { deslocamento, texto }
}

// ---------- Bônus ----------

function cifrarVigenere(texto, chave) {
  // TODO
}

function decifrarVigenere(texto, chave) {
  // TODO
}

module.exports = { cifrar, decifrar, quebrarCifra, cifrarVigenere, decifrarVigenere };
