// Rode com: node testes.js

const { limparNumero, validarLuhn, identificarBandeira, mascarar, analisarCartao, gerarCartao } = require('./desafio');

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

console.log('\nlimparNumero');
teste('remove espaços e hífens', () => limparNumero('4111 1111-1111 1111'), '4111111111111111');
teste('número já limpo', () => limparNumero('378282246310005'), '378282246310005');
testeErro('letras', () => limparNumero('4111-abcd'));
testeErro('ponto', () => limparNumero('4111.1111.1111.1111'));
testeErro('não é string', () => limparNumero(4111111111111111));

console.log('\nvalidarLuhn');
teste('visa válido', () => validarLuhn('4111111111111111'), true);
teste('exemplo com dobros acima de 9', () => validarLuhn('4539148803436467'), true);
teste('amex válido (15 dígitos)', () => validarLuhn('378282246310005'), true);
teste('diners válido (14 dígitos)', () => validarLuhn('30569309025904'), true);
teste('último dígito errado', () => validarLuhn('4111111111111112'), false);
teste('dois dígitos trocados', () => validarLuhn('4111111111111121'), false);

console.log('\nidentificarBandeira');
teste('visa', () => identificarBandeira('4111111111111111'), 'visa');
teste('visa 13 dígitos', () => identificarBandeira('4222222222222'), 'visa');
teste('mastercard 5x', () => identificarBandeira('5555555555554444'), 'mastercard');
teste('mastercard 2x', () => identificarBandeira('2223003122003222'), 'mastercard');
teste('amex', () => identificarBandeira('378282246310005'), 'amex');
teste('diners', () => identificarBandeira('30569309025904'), 'diners');
teste('discover', () => identificarBandeira('6011111111111117'), 'discover');
teste('prefixo de visa com tamanho errado', () => identificarBandeira('41111111111111'), 'desconhecida');
teste('fora da faixa 2221-2720', () => identificarBandeira('2721000000000000'), 'desconhecida');

console.log('\nmascarar');
teste('16 dígitos', () => mascarar('4111111111111111'), '**** **** **** 1111');
teste('15 dígitos', () => mascarar('378282246310005'), '**** **** ***0 005');
teste('14 dígitos', () => mascarar('30569309025904'), '**** **** **59 04');

console.log('\nanalisarCartao');
teste('mastercard válido', () => analisarCartao('5555 5555 5555 4444'),
  { valido: true, bandeira: 'mastercard', mascarado: '**** **** **** 4444' });
teste('Luhn inválido', () => analisarCartao('4111 1111 1111 1112'), { valido: false, erro: 'Número inválido' });
teste('bandeira desconhecida', () => analisarCartao('6000 0000 0000 0007'), { valido: false, erro: 'Bandeira não suportada' });
teste('entrada suja não lança erro', () => analisarCartao('4111-abcd').valido, false);
teste('entrada suja retorna mensagem', () => typeof analisarCartao('4111-abcd').erro, 'string');

console.log('\nbônus: gerarCartao');
for (const bandeira of ['visa', 'mastercard', 'amex', 'diners', 'discover']) {
  teste(`gera ${bandeira} válido`, () => {
    const numero = gerarCartao(bandeira);
    return validarLuhn(numero) && identificarBandeira(numero) === bandeira;
  }, true);
}

console.log(`\n${aprovados} aprovados, ${reprovados} reprovados\n`);
