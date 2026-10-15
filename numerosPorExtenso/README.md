# Números por Extenso

Nível: pleno
Rodar: `node testes.js`
Assuntos: arrays, `Math.floor`, `%`, `if/else`, funções, `throw`, cuidados com ponto flutuante

## Enunciado

Cheques, boletos e contratos escrevem valores por extenso. Implemente a conversão de números
inteiros e de valores em reais.

## Requisitos

Em `desafio.js`:

- `porExtenso(numero)`: inteiros de `0` a `999999999`.
  - Lança erro se não for `number`, se não for inteiro ou se estiver fora do intervalo.
- `valorMonetarioPorExtenso(valor)`: valor em reais com até 2 casas decimais.
  - Lança erro nos mesmos casos (negativo, fora do intervalo, não número).

## Regras do português

- `100` é `cem`, mas `101` é `cento e um`.
- Dentro de um grupo de 3 dígitos, centena, dezena e unidade são ligadas por `e`:
  `345` = `trezentos e quarenta e cinco`.
- `1000` é `mil`, não `um mil`. Mas `1000000` é `um milhão`, e `2000000` é `dois milhões`.
- Entre grupos (milhões, milhares, centenas), o `e` só aparece antes do **último grupo não zero**,
  e só se esse grupo for menor que 100 ou múltiplo de 100. Nos outros casos, os grupos ficam lado a lado.

  | Número  | Extenso                                     |
  |---------|---------------------------------------------|
  | 1001    | mil e um                                    |
  | 1100    | mil e cem                                   |
  | 1234    | mil duzentos e trinta e quatro              |
  | 1200000 | um milhão e duzentos mil                    |
  | 1200300 | um milhão duzentos mil e trezentos          |

- Moeda: `1` é `um real`, os outros valores (inclusive `0`) são `reais`. Mesma regra para
  `centavo` e `centavos`.
- Quando a parte inteira termina em `milhão` ou `milhões`, entra `de`: `um milhão de reais`,
  mas `dois milhões e quinhentos mil reais`.
- Sem parte inteira, só centavos: `0.5` é `cinquenta centavos`. Sem centavos, só reais.

## Bônus

- Aceitar números negativos: `-15` é `menos quinze`.
- Aceitar bilhões.
- `valorMonetarioPorExtenso` aceitando string no formato brasileiro: `'1.234,56'`.

## Dicas

- Resolva primeiro um grupo de 3 dígitos (`0` a `999`). Depois o número inteiro é só uma
  combinação de grupos: `Math.floor(n / 1000000)`, `Math.floor(n / 1000) % 1000` e `n % 1000`.
- `0.1 + 0.2` não é `0.3` em JavaScript. Para pegar os centavos, trabalhe com
  `Math.round(valor * 100)`.
