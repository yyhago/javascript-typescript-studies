// Termo

const PALAVRAS = [
  'termo', 'carta', 'sabor', 'nível', 'pódio', 'fúria', 'mundo', 'festa', 'praia', 'livro',
  'banco', 'campo', 'regra', 'sorte', 'tempo', 'vento', 'chave', 'força', 'risco', 'piano',
  'vírus', 'sinal', 'nuvem', 'corpo', 'poema', 'honra', 'bravo', 'tigre', 'zebra', 'lápis',
  'cinco', 'plano', 'trigo', 'fruta', 'lince', 'mosca', 'verde', 'sábio', 'gênio', 'ídolo',
  'ímpar', 'fácil', 'jovem', 'ordem', 'lenda', 'pedra', 'ponte', 'prato', 'caixa', 'peixe',
  'noite', 'sonho', 'chuva', 'terra', 'folha', 'pulso', 'magia', 'idade', 'trevo', 'vapor',
  'cobra', 'louco', 'feliz', 'amigo',
];

const TENTATIVAS = 6;
const TAMANHO = 5;
const LINHAS_TECLADO = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

// Remove acentos e cedilha e deixa minúsculo: 'Força' -> 'forca'
function normalizar(palavra) {
  return palavra.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function avaliarPalpite(palpite, secreta) {
  // TODO: retorne um array como ['certa', 'lugar', 'errada', 'errada', 'certa']
}

// TODO: daqui pra baixo, o jogo (estado, grade, teclado, eventos)
