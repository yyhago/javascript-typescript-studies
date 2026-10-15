# Labirinto

Nível: sênior
Rodar: abra o `index.html` com o Live Server. Os testes aparecem no console.
Assuntos: arrays de arrays, objetos, `while` com pilha e fila, `Math.random`, DOM, eventos de teclado, `setInterval`

## Enunciado

Gerar um labirinto aleatório, deixar o jogador percorrer com o teclado e resolver automaticamente,
animando tanto a geração quanto a busca pela saída.

O labirinto é "perfeito": existe exatamente um caminho entre quaisquer duas células, sem ciclos e
sem áreas isoladas.

O HTML e o CSS estão prontos. O trabalho é todo no `script.js`.

## Modelo

Cada célula guarda suas 4 paredes:

```js
{ paredes: { cima: true, direita: true, baixo: true, esquerda: true } }
```

Remover a parede entre duas células significa mudar as duas: a `direita` de uma e a `esquerda` da outra.

## Requisitos

Funções puras (testadas no console):

- `criarGrade(linhas, colunas)`: todas as células com as 4 paredes.
- `gerarLabirinto(linhas, colunas)`: retorna `{ grade, passos }`.
  - Algoritmo: busca em profundidade aleatória com pilha (dicas).
  - `passos` é a ordem em que as células foram visitadas pela primeira vez (`[[linha, coluna], ...]`),
    usada para animar.
- `podeMover(grade, linha, coluna, direcao)`: `true` se não há parede na direção
  (`'cima'`, `'direita'`, `'baixo'` ou `'esquerda'`) e o destino está dentro da grade.
- `resolverBFS(grade, inicio, fim)`: busca em largura. Retorna `{ caminho, explorados }`:
  - `caminho`: posições de `inicio` até `fim`, inclusive.
  - `explorados`: posições na ordem em que saíram da fila, para animar.

Interface:

- `#tamanho` escolhe o tamanho e `#gerar` cria um novo labirinto.
- Animar a geração com `setInterval`, revelando as células na ordem de `passos`.
- Jogador começa em `(0, 0)`, saída em `(linhas - 1, colunas - 1)`. Move com as setas ou WASD,
  respeitando as paredes. Bloquear o movimento durante animações.
- Mostrar `#movimentos` e, ao chegar na saída, a mensagem em `#mensagem`.
- `#resolver` anima a BFS a partir da posição atual do jogador: primeiro os `explorados`, depois o `caminho`.

## Bônus

- `resolverDFS` e um contador mostrando quantas células cada algoritmo explorou.
- Modo neblina: só as células a até 2 passos do jogador ficam visíveis.
- Rastro: marcar as células por onde o jogador já passou.

## Dicas

- Geração com pilha:

  ```
  marca (0, 0) como visitada e empilha
  enquanto a pilha não estiver vazia:
    atual = topo da pilha
    vizinhas = vizinhas de atual ainda não visitadas
    se não houver nenhuma: desempilha (volta atrás)
    senão: sorteia uma, remove a parede entre as duas, marca como visitada e empilha
  ```

- BFS usa fila (`push` + `shift`). Para montar o caminho, guarde de onde veio cada célula
  (`anterior[linha][coluna] = [linhaDeOrigem, colunaDeOrigem]`) e volte a partir do `fim`.
- Um objeto com o deslocamento de cada direção simplifica o código:
  `{ cima: [-1, 0, 'baixo'], direita: [0, 1, 'esquerda'], ... }` (a terceira posição é a parede oposta).
