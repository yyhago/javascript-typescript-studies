# Caixa Eletrônico

Nível: pleno
Rodar: `node testes.js`
Assuntos: objetos, valores por referência, `for in` / `for of`, funções (recursão), `try/catch/throw`, `Date`

## Enunciado

Um caixa eletrônico tem uma quantidade limitada de cada nota. Ao sacar, ele precisa montar o valor
com as notas que tem. O algoritmo guloso (sempre a maior nota possível) falha:

```
Estoque: uma nota de 50 e três de 20. Saque: 60.
Guloso: pega 50, sobram 10, não tem nota de 10. Erro.
Correto: 20 + 20 + 20.
```

Notas válidas: `200, 100, 50, 20, 10, 5, 2`.

Formato do estoque e do retorno: objeto `{ nota: quantidade }`, ex.: `{ 50: 1, 20: 3 }`.

## Requisitos

Em `desafio.js`:

- `planejarSaque(valor, estoque)`
  - Retorna as notas usadas, ex.: `{ 20: 3 }`. Não inclui notas com quantidade zero.
  - Tenta as notas maiores primeiro e volta atrás quando o caminho não fecha (backtracking).
  - Lança erro se o valor não for inteiro positivo, ou se não for possível montar o valor.
  - Não altera o objeto `estoque` recebido.
- `criarCaixa(estoqueInicial)`: retorna um objeto com os métodos:
  - `sacar(valor)`: usa `planejarSaque`, desconta do estoque e retorna as notas. Se falhar, lança o
    erro e o estoque não muda.
  - `depositar(notas)`: soma as notas ao estoque. Lança erro se tiver nota inválida.
  - `saldo()`: total em reais disponível.
  - `estoque()`: uma cópia do estoque atual. Alterar a cópia não pode afetar o caixa.
  - `historico()`: lista de operações `{ tipo, valor, sucesso, data }`, onde `tipo` é `'saque'` ou
    `'deposito'` e `data` é um `Date`. Saques com erro também entram, com `sucesso: false`.
  - Alterar o `estoqueInicial` depois de criar o caixa não pode afetar o caixa.

## Bônus

- `planejarSaqueMinimo(valor, estoque)`: retorna a combinação com o **menor número de notas**.
  Nem sempre é a primeira que o backtracking encontra: com `{ 50: 1, 20: 3, 2: 5 }` e saque de 60,
  `50 + 2x5` (6 notas) aparece antes de `20x3` (3 notas).

## Dicas

- `for in` em objeto com chaves numéricas percorre em ordem crescente e as chaves são strings
  (`'2'`, `'5'`...). Use o array de notas para controlar a ordem.
- Uma função recursiva `tentar(indiceDaNota, restante)` resolve o backtracking: para a nota atual,
  teste da maior quantidade possível até zero e chame a função para a próxima nota.
- `const copia = estoque` não copia. Monte um objeto novo com `for in`.
