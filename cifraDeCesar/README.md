# Cifra de César

Nível: júnior
Rodar: `node testes.js`
Assuntos: strings, `charCodeAt` / `String.fromCharCode`, `%`, `for`, funções, objetos

## Enunciado

Na Cifra de César cada letra é trocada pela letra N posições à frente no alfabeto.
Com deslocamento 3, `abc` vira `def` e `xyz` vira `abc`.

Implemente a cifra e um quebrador que descobre o deslocamento sozinho.

## Requisitos

Em `desafio.js`:

- `cifrar(texto, deslocamento)`
  - Desloca só letras `a-z` e `A-Z`. Espaços, números, pontuação e letras acentuadas não mudam.
  - Mantém maiúsculas e minúsculas.
  - Aceita deslocamento negativo e maior que 26.
- `decifrar(texto, deslocamento)`
  - Desfaz o `cifrar`, reaproveitando ele.
- `quebrarCifra(textoCifrado)`
  - Testa os 26 deslocamentos e retorna `{ deslocamento, texto }` do candidato com maior pontuação.
  - Pontuação: soma de `FREQUENCIA_PT[letra]` de cada letra do texto decifrado.

## Bônus

- `cifrarVigenere(texto, chave)` e `decifrarVigenere(texto, chave)`: cada letra usa o deslocamento
  da letra correspondente da chave (`a` = 0, `b` = 1...), que se repete. Caracteres que não são
  letras não consomem a chave.
  Exemplo: `cifrarVigenere('ATTACKATDAWN', 'LEMON')` retorna `'LXFOPVEFRNHR'`.

## Dicas

- `'a'.charCodeAt(0)` é 97 e `'A'.charCodeAt(0)` é 65. Converta a letra para uma posição de 0 a 25.
- `-1 % 26` é `-1` em JavaScript. `((n % 26) + 26) % 26` sempre dá um valor entre 0 e 25.
