# Campo Minado

Nível: pleno
Rodar: abra o `index.html` com o Live Server. Os testes aparecem no console.
Assuntos: arrays de arrays, objetos, `while` com pilha, `for` aninhado, `Math.random`, DOM, eventos, `setInterval`

## Enunciado

Campo Minado clássico. Clicar numa célula revela o que tem nela: uma mina (fim de jogo) ou o número
de minas vizinhas. Se o número for 0, todas as vizinhas são reveladas automaticamente, e isso se
espalha até chegar em células com número.

O HTML e o CSS estão prontos. O trabalho é todo no `script.js`.

## Modelo

Cada célula do tabuleiro é um objeto:

```js
{ mina: false, revelada: false, bandeira: false, vizinhas: 0 }
```

## Requisitos

Funções puras (testadas no console):

- `criarTabuleiro(linhas, colunas)`: matriz de células zeradas.
- `posicionarMinas(tabuleiro, quantidade, linhaSegura, colunaSegura)`: sorteia as minas fora da
  célula segura e das 8 vizinhas dela. Lança erro se não houver espaço.
- `calcularVizinhas(tabuleiro)`: preenche `vizinhas` de todas as células.
- `revelar(tabuleiro, linha, coluna)`: revela a célula e, se ela tiver 0 vizinhas, espalha.
  Retorna um array com as posições reveladas (`[[linha, coluna], ...]`), sem repetir.
  Células com bandeira ou já reveladas não são reveladas. Use `while` com uma pilha, sem recursão.
- `verificarVitoria(tabuleiro)`: `true` quando todas as células sem mina estão reveladas.

Interface:

- Nível pelo `#nivel`: fácil 9x9 com 10 minas, médio 16x16 com 40, difícil 16x30 com 99.
- As minas só são posicionadas no primeiro clique, para o jogador nunca perder logo de cara.
- Clique esquerdo revela. Clique direito (`contextmenu`, com `preventDefault`) alterna a bandeira.
- `#minas` mostra minas menos bandeiras. `#tempo` conta os segundos a partir do primeiro clique.
- Derrota: revelar todas as minas, marcar a clicada com `explodiu` e as bandeiras erradas com
  `bandeira-errada`. Parar o tempo e bloquear o tabuleiro.
- Vitória: mostrar a mensagem com o tempo em `#mensagem`.
- `#reiniciar` começa outra partida no nível selecionado.
- Use um único listener no `#tabuleiro` em vez de um por célula.

## Bônus

- Chording: clicar numa célula revelada cujo número é igual à quantidade de bandeiras ao redor
  revela todas as vizinhas sem bandeira.
- Guardar o melhor tempo de cada nível enquanto a página estiver aberta.

## Dicas

- Guarde a posição em atributos (`data-linha`, `data-coluna`) e leia com `event.target.dataset`.
- Para percorrer as 8 vizinhas, dois `for` de `-1` a `1`, pulando `(0, 0)` e posições fora do tabuleiro.
- Flood fill com pilha: comece com `[[linha, coluna]]`. Enquanto a pilha tiver itens, tire um com
  `pop`, revele, e se tiver 0 vizinhas, empilhe as vizinhas ainda não reveladas.
