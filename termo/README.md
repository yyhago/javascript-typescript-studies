# Termo

Nível: júnior/pleno
Rodar: abra o `index.html` com o Live Server. Os testes aparecem no console.
Assuntos: DOM, eventos, `for`, arrays, objetos, `if/else`, `setTimeout`, strings

## Enunciado

Clone do Termo (Wordle em português). O jogador tem 6 tentativas para descobrir uma palavra de 5
letras. A cada tentativa, cada letra recebe uma cor:

- verde (`certa`): letra certa no lugar certo
- amarelo (`lugar`): a letra existe na palavra, mas em outra posição
- cinza (`errada`): a letra não existe na palavra (ou já foi contada)

O HTML e o CSS estão prontos. O trabalho é todo no `script.js`.

## Requisitos

- `avaliarPalpite(palpite, secreta)`: retorna um array com `'certa'`, `'lugar'` ou `'errada'` para
  cada letra. Recebe as palavras já normalizadas (sem acento).
  Letras repetidas precisam funcionar: com secreta `carta` e palpite `arara`, só um `a` e um `r`
  ficam amarelos, porque a secreta tem um `a` livre e um `r`.
- Sortear a palavra secreta de `PALAVRAS` com `Math.random`.
- Montar a grade 6x5 e o teclado virtual pelo JS (`createElement`), a partir de `TENTATIVAS`,
  `TAMANHO` e `LINHAS_TECLADO`.
- Capturar o teclado físico (`keydown` no `document`): letras, `Backspace` e `Enter`.
  Clicar no teclado virtual faz a mesma coisa.
- `Enter` com menos de 5 letras: mostrar "Palavra incompleta" em `#mensagem` e aplicar a classe
  `tremer` na linha, removendo com `setTimeout` depois de 500ms.
- Revelar as cores uma letra por vez, com 250ms entre elas (`setTimeout`). Bloquear digitação
  enquanto revela.
- Pintar as teclas do teclado virtual. Uma tecla nunca "piora": se já está `certa`, continua
  `certa`, mesmo que depois apareça como `lugar`.
- Fim de jogo: mostrar "Você acertou!" ou "A palavra era FORÇA" (com acento), e exibir o botão
  `#reiniciar`, que começa uma nova partida sem recarregar a página.

## Bônus

- Palavra do dia: em vez de sortear, use `Date` para escolher o índice, de forma que a palavra só
  mude à meia-noite.
- Aceitar só palpites que existem em `PALAVRAS`. Caso contrário, "Palavra não aceita".
- Ao acertar, mostrar a palavra com acento na grade (o jogador digitou `forca`, aparece `força`).

## Dicas

- Separe o estado do jogo (palavra secreta, linha atual, letras digitadas) num objeto. O DOM só
  reflete esse estado.
- Para letras repetidas, faça duas passadas: primeiro marque as `certa`, depois conte as letras que
  sobraram da secreta e use essa contagem para decidir os `lugar`.
- `event.key` traz a tecla pressionada: `'a'`, `'Enter'`, `'Backspace'`...
