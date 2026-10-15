# Dias Úteis

Nível: pleno/sênior
Rodar: `node testes.js`
Assuntos: objeto `Date`, `switch`, `while`, `for`, objetos, arrays, valores por referência, `throw`

## Enunciado

Prazos de boleto, entregas e processos contam em dias úteis: sem sábado, domingo e feriado.
Parte dos feriados nacionais muda de data todo ano, porque depende da Páscoa.
Implemente uma pequena biblioteca de datas para isso.

Feriados considerados neste desafio:

| Data              | Nome                     |
|-------------------|--------------------------|
| 01/01             | Confraternização Universal |
| Páscoa - 48 dias  | Carnaval (segunda)       |
| Páscoa - 47 dias  | Carnaval (terça)         |
| Páscoa - 2 dias   | Sexta-feira Santa        |
| 21/04             | Tiradentes               |
| 01/05             | Dia do Trabalho          |
| Páscoa + 60 dias  | Corpus Christi           |
| 07/09             | Independência            |
| 12/10             | Nossa Senhora Aparecida  |
| 02/11             | Finados                  |
| 15/11             | Proclamação da República |
| 20/11             | Consciência Negra        |
| 25/12             | Natal                    |

## Requisitos

Em `desafio.js`:

- `calcularPascoa(ano)`: retorna o `Date` do domingo de Páscoa. Fórmula nas dicas.
- `feriadosNacionais(ano)`: array de `{ data, nome }` com os 13 feriados do ano.
- `ehDiaUtil(data)`: `false` para sábado, domingo e feriado. O horário da data não importa.
- `adicionarDiasUteis(data, quantidade)`: retorna um novo `Date`, `quantidade` dias úteis depois de `data`.
  Não altera a data recebida. `quantidade` precisa ser inteiro maior ou igual a zero.
- `diasUteisEntre(inicio, fim)`: quantos dias úteis existem depois de `inicio` até `fim`
  (exclui o dia inicial, inclui o final). Lança erro se `fim` for antes de `inicio`.
- `formatarData(data)`: `'sexta-feira, 3 de abril de 2026'`. Use `switch` para o dia da semana e o mês.

## Bônus

- `emendas(ano)`: feriados que caem na terça ou na quinta e criam um "feriadão". Retorna
  `{ nome, feriado, emenda }`, onde `emenda` é a segunda ou sexta entre o feriado e o fim de semana.
  Só conta se a emenda for dia útil.
- `proximoFeriado(data)`: o próximo feriado a partir de `data`, mesmo que seja no ano seguinte.

## Dicas

- `new Date('2026-04-03')` é meia-noite em UTC, que no Brasil ainda é dia 2. Use
  `new Date(2026, 3, 3)`. O mês começa em 0.
- `Date` é objeto: `const outra = data` não copia. Use `new Date(data.getTime())`.
- `new Date(2026, 3, 5 + 60)` funciona: o `Date` ajusta o mês sozinho.
- Para comparar só o dia, compare `getFullYear()`, `getMonth()` e `getDate()`.
- Fórmula da Páscoa (Meeus/Jones/Butcher), com divisão inteira (`Math.floor`):

  ```
  a = ano % 19
  b = ano / 100            c = ano % 100
  d = b / 4                e = b % 4
  f = (b + 8) / 25
  g = (b - f + 1) / 3
  h = (19a + b - d - g + 15) % 30
  i = c / 4                k = c % 4
  l = (32 + 2e + 2i - h - k) % 7
  m = (a + 11h + 22l) / 451
  mes = (h + l - 7m + 114) / 31            (3 = março, 4 = abril)
  dia = ((h + l - 7m + 114) % 31) + 1
  ```
