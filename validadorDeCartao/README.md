# Validador de Cartão de Crédito

Nível: júnior
Rodar: `node testes.js`
Assuntos: strings, conversão de tipos, `for`, `switch`, operadores lógicos, `try/catch/throw`, objetos

## Enunciado

Antes de enviar um cartão para o gateway de pagamento, o checkout valida o número com o
algoritmo de Luhn, que pega erros de digitação. Implemente esse módulo.

Algoritmo de Luhn:

1. Da direita para a esquerda, dobre um dígito sim, um não, começando pelo segundo.
2. Se o dobro passar de 9, subtraia 9.
3. Some todos os dígitos. Se a soma for divisível por 10, o número é válido.

## Requisitos

Em `desafio.js`:

- `limparNumero(entrada)`
  - Remove espaços e hífens: `'4111 1111-1111 1111'` retorna `'4111111111111111'`.
  - Lança erro se a entrada não for string ou se sobrar algum caractere que não seja dígito.
  - Sem regex: percorra os caracteres.
- `validarLuhn(numero)`: retorna `true` ou `false`.
- `identificarBandeira(numero)`: use `switch` e/ou `if`.

  | Bandeira     | Começa com                      | Dígitos      |
  |--------------|---------------------------------|--------------|
  | `visa`       | `4`                             | 13, 16 ou 19 |
  | `mastercard` | `51` a `55`, ou `2221` a `2720` | 16           |
  | `amex`       | `34` ou `37`                    | 15           |
  | `diners`     | `36`, `38`, ou `300` a `305`    | 14           |
  | `discover`   | `6011` ou `65`                  | 16           |

  Qualquer outro caso retorna `'desconhecida'`.
- `mascarar(numero)`: esconde tudo menos os 4 últimos dígitos, em grupos de 4 a partir da esquerda.
  `'4111111111111111'` retorna `'**** **** **** 1111'`.
- `analisarCartao(entrada)`: junta tudo e nunca lança erro.

  ```js
  analisarCartao('5555 5555 5555 4444');
  // { valido: true, bandeira: 'mastercard', mascarado: '**** **** **** 4444' }

  analisarCartao('4111 1111 1111 1112');
  // { valido: false, erro: 'Número inválido' }

  analisarCartao('6000 0000 0000 0007');   // passa no Luhn, mas bandeira desconhecida
  // { valido: false, erro: 'Bandeira não suportada' }

  analisarCartao('4111-abcd');
  // { valido: false, erro: <mensagem lançada pelo limparNumero> }
  ```

## Bônus

- `gerarCartao(bandeira)`: gera com `Math.random` um número que passa no Luhn e é reconhecido como
  aquela bandeira. O último dígito precisa ser calculado.

## Dicas

- `'7' - 0` e `Number('7')` dão `7`. `'7' + 0` dá `'70'`.
- Para a faixa `2221` a `2720`, use `Number(numero.slice(0, 4))` e compare com `>=` e `<=`.
