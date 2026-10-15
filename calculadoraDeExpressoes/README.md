# Calculadora de Expressões

Nível: sênior
Rodar: `node testes.js`
Assuntos: strings, `while`, arrays como pilha e fila, objetos, `switch`, `try/catch/throw`

## Enunciado

Avaliar expressões como `'2 + 3 * (4 - 1) ^ 2'` **sem `eval` e sem `Function`**. É o que linguagens,
planilhas e calculadoras fazem por baixo, em três etapas:

```
'3 + 4 * 2'
  tokenizar     ->  [3] [+] [4] [*] [2]
  paraPosfixa   ->  3 4 2 * +            (notação polonesa reversa)
  avaliar       ->  11
```

Na notação pós-fixa não existem parênteses nem precedência: lendo da esquerda para a direita,
número vai para uma pilha e operador tira dois números da pilha e coloca o resultado de volta.

## Requisitos

Em `desafio.js`. Operadores: `+ - * / % ^`, parênteses e números decimais com ponto.

- `tokenizar(expressao)`: retorna um array de tokens:
  - `{ tipo: 'numero', valor: 3.14 }` (valor como `number`)
  - `{ tipo: 'operador', valor: '+' }`
  - `{ tipo: 'parentese', valor: '(' }`

  Ignora espaços. Lança erro com a posição para caractere inválido (`'Caractere inválido "$" na posição 2'`)
  e para número malformado (`'1.2.3'`).
- `paraPosfixa(tokens)`: converte para pós-fixa com o algoritmo Shunting Yard (dicas).
  - Precedência: `^` maior que `* / %`, que é maior que `+ -`.
  - `^` é associativo à direita (`2 ^ 3 ^ 2` = `2 ^ 9`). Os outros, à esquerda (`7 - 2 - 1` = `4`).
  - Lança erro para parênteses desbalanceados.
- `avaliarPosfixa(tokens)`: calcula o resultado. Lança erro para divisão (ou `%`) por zero e para
  expressão mal formada (`'2 +'`, `'1 2'`, `''`).
- `calcular(expressao)`: junta as três etapas.

Parte 2: menos unário.

- `'-3 + 5'`, `'2 * -3'`, `'-(2 + 3)'`, `'--2'`.
- Um `-` é unário quando aparece no início, depois de outro operador ou depois de `(`.
  Em `paraPosfixa`, troque ele por `{ tipo: 'operador', valor: 'neg' }`, que tira um único número da pilha.
- Precedência do `neg`: abaixo de `^` e acima de `* /`. Assim `-2 ^ 2` é `-4`, como na matemática.

## Bônus

- Variáveis: `calcular('x * 2 + y', { x: 3, y: 1 })` retorna `7`. Variável sem valor lança erro.
- Um REPL simples no navegador: input + histórico das contas, mostrando a mensagem de erro quando houver.

## Dicas

Shunting Yard, com uma pilha de operadores e uma lista de saída:

```
para cada token:
  número       -> vai para a saída
  operador o1  -> enquanto o topo da pilha for um operador o2 e
                    (o2 tem precedência maior que o1, ou
                     tem a mesma precedência e o1 é associativo à esquerda):
                    tira o2 da pilha e põe na saída
                  empilha o1
  '('          -> empilha
  ')'          -> tira da pilha para a saída até achar '('. Descarta o '('.
                  Se a pilha acabar antes, os parênteses estão desbalanceados.
no fim: tira tudo da pilha para a saída (se sobrar '(', estão desbalanceados)
```

- O `neg` é prefixo: ao encontrá-lo, só empilhe, sem tirar nada da pilha.
- Um objeto `{ '+': 1, '-': 1, '*': 2, ... }` evita um monte de `if` para a precedência.
