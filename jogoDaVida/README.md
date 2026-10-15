# Jogo da Vida

Nível: pleno
Rodar: abra o `index.html` com o Live Server. Os testes aparecem no console.
Assuntos: arrays de arrays, `for` aninhado, `%`, valores por referência, DOM, eventos, `setInterval`

## Enunciado

O Jogo da Vida de Conway é uma grade de células vivas ou mortas. A cada geração, todas as células
mudam ao mesmo tempo, seguindo 4 regras baseadas nos 8 vizinhos:

1. Viva com menos de 2 vizinhos vivos morre (solidão).
2. Viva com 2 ou 3 vizinhos vivos continua viva.
3. Viva com mais de 3 vizinhos vivos morre (superpopulação).
4. Morta com exatamente 3 vizinhos vivos nasce.

A grade é toroidal: quem sai pela direita volta pela esquerda, quem sai por cima volta por baixo.

O HTML e o CSS estão prontos. O trabalho é todo no `script.js`.

## Requisitos

Funções puras (testadas no console):

- `criarGrade(linhas, colunas)`: matriz preenchida com `false`.
- `contarVizinhos(grade, linha, coluna)`: quantidade de vizinhos vivos, considerando as bordas toroidais.
- `proximaGeracao(grade)`: retorna uma **nova** grade. A grade recebida não pode ser alterada.

Interface:

- Criar as células no DOM uma única vez. A cada geração, só trocar a classe `viva`.
- Clicar numa célula alterna viva/morta.
- `#iniciar`: inicia e pausa a simulação (`setInterval`). O texto do botão alterna entre
  "Iniciar" e "Pausar".
- `#proxima`: avança uma geração.
- `#aleatorio`: cada célula tem 30% de chance de nascer viva.
- `#limpar`: mata todas as células e zera o contador.
- `#velocidade`: intervalo em ms. Mudar com a simulação rodando deve ter efeito imediato.
- Mostrar a geração atual em `#geracao` e o total de células vivas em `#populacao`.
- Pausar automaticamente quando a população chegar a zero.

## Bônus

- Detectar quando a grade estabilizou (ficou igual à geração anterior) ou entrou num ciclo de
  período 2 (igual a duas gerações atrás). Pausar e mostrar a mensagem em `#status`.
- Pintar arrastando o mouse (`mousedown`, `mouseover`, `mouseup`).
- Botão para inserir um glider no centro. Células vivas do glider, relativas ao topo esquerdo:
  `[0,1] [1,2] [2,0] [2,1] [2,2]`.

## Dicas

- Se você alterar a grade enquanto calcula a próxima, as células seguintes vão contar vizinhos
  errados. Por isso a próxima geração precisa ser uma grade nova.
- `const copia = grade` não copia nada: as duas variáveis apontam para o mesmo array.
- Vizinho à esquerda da coluna 0: `(coluna - 1 + colunas) % colunas`.
- Guarde as células do DOM numa matriz igual à grade (`celulas[linha][coluna]`), assim não
  precisa buscar no DOM a cada geração.
