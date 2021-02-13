---
template: blog-post
title: "Descomplicando: Map() - Filter() - Reduce()"
slug: /nodejs/bigthree
date: 2021-02-13 01:24
description: map, reduce, filter
featuredImage: /assets/blog-logo.png
---
# Descomplicando;

### O que é:

Estas funções fazem parte das "grandes três (big three)" operações de lista.\
A Big Three é composta por: *map()*, *reduce()* e *filter();*

Ter o conhecimento destas três funções é um passo importante como desenvolvedor, para ser capaz de escrever um código limpo, funcional e claro.. Com um código limpo, seu código se torna mais expressivo, tal qual facilita a escrita dos testes.\
\

### Map():

Essa função, proporciona a capacidade de transformarmos uma **lista** -> **lista** utilizando um *transformer*.\
Como desenvolvedores, sempre nos pegamos com a necessidade de pegar um array e transformar os dados do mesmo.

\
O map tem esta exata função, ele é definido dentro de `Array.prototype`, então você pode chama-lo.

Um exemplo simples, é ter um array de números e retornar um novo array com a potência 2 no qual: 

*`oldArray[index] -> (newArray[index])²`*

Como isso poderia ser feito ?

Seguindo o exemplo anterior, vamos fazer um código prático:

```typescript
const oldArray: Array<number> = [2, 3, 4, 5, 6];

const newArray = oldArray.map(value => (value * value))
// newArray = [4, 9, 16, 25, 36]
```

Como podem ver, é bem mais legível que utilizar um *for()* e *oldArray.length.*

Para um exemplo mais *"complexo"* e de cenário mais próximo do mundo real:

Vamos imaginar que você possui um grupo de *membros* e as seus cargos.
E você precisa buscar pelo mesmo e retornar um objeto no qual possua os dois elementos transpilados.

```typescript
interface IMembers {
  name: string;
  phone: string;
  email: string;
  rank: number;
}

interface IRanks {
  [key: number]: IEmployee;
}

interface IEmployee {
  role: string;
  payment: number
}
const ranks: IRanks = {
  1: {role: "Owner", payment: 150000},
  2: {role: "Tech Lead", payment: 20000},
  3: {role: "Programmer", payment: 8000},
}

const members: IMembers[] = [
  {
    name: 'Cosmo 1',
    phone: '(DD) 00000000',
    email: 'email@email.com',
    rank: 1
  },
  {
    name: 'Cosmo 2',
    phone: '(DD) 22222222',
    email: 'email2@email.com',
    rank: 2
  },
  {
    name: 'Cosmo 3',
    phone: '(DD) 3333333',
    email: 'email3@email.com',
    rank: 3
  }
]

const transformedMembers = members.map(member => {
  let getRank = ranks[member.rank]
  
  return { ...member, ...getRank}
})

/*
O retorno seria: 
[
  {
    "name": "Cosmo 1",
    "phone": "(DD) 00000000",
    "email": "email@email.com",
    "rank": 1,
    "role": "Owner",
    "payment": 150000
  },
  {
    "name": "Cosmo 2",
    "phone": "(DD) 22222222",
    "email": "email2@email.com",
    "rank": 2,
    "role": "Tech Lead",
    "payment": 20000
  },
  {
    "name": "Cosmo 3",
    "phone": "(DD) 3333333",
    "email": "email3@email.com",
    "rank": 3,
    "role": "Programmer",
    "payment": 8000
  }
 ] 

*/
```

Como vocês podem ver, é um simples código com dependência e composição.\
Vide que o cargo depende fortemente do membro, caso o membro seja destruído, o cargo também é nulificado.

Existem alguma diferenças entre o *for()* e o *map()*, vamos litar algumas delas:

* Utilizando o *map()*, você não precisa gerenciar o estado do *for()*.
* Com o *map()*, você consegue operar o elemento diretamente, diferente de manipular dentro de um *index* do array
* Você não precisa criar um novo array vazio e fazer um *.push()* dentro do mesmo. O *map()* retorna todos os dados de uma vez só, então podemos apenas assignar para uma variável.
* Você precisa incluir um return no seu *statement*. Caso contrário, você vai obter um novo array com apenas `undefined`

``

### Filter():

Nosso próximo caso é o filter().\
E ele é exatamente o que o próprio método diz, filtra elementos que não desejamos de um array.

Um simples exemplo é obter os números pares de um array.

```typescript
const values: number[] = [2, 3, 4, 5, 6, 7, 8];

const even = values.filter(value => ((value % 2) == 0))
// retorna: [2, 4, 6, 8] 
```

* Evitamos de mutar um array dentro de um forEach() ou for()
* Assignamos o resultado diretamente dentro de uma nova variável, ao invés de aplicar um .push() em array definido em algum trecho do nosso código.

Um adendo de aplicar o filter(), é que sempre necessitamos de utilizar uma condicional para que retorne um booleano (true ou false). Do contrário o javascript irá tentar aplicar sua regra de coerção.

Em resumo, irá ocorrer um bug, que provavelmente irá tirar sua sanidade; O erro que o mesmo produz é silencioso, vide o javascript forçar a **regra de coerção**. Em tese é aplicado um **type casting** (transforma any -> boolean), logo não existe erro semântico, apenas sintático. Não retorno mensagem alguma de aviso ao desenvolvedor.

### Reduce():

O reduce() pega todos os elementos de um array e reduz o mesmo para um único valor.

Como o: map e o filter, o reduce também está definido dentro do Array.prototype então estará disponível em qualquer array. \
\
Você irá passar um callbackFunction como primeiro argumento e como segundo argumento, irá passar um inicializador. O inicializador é o valor inicial para combinar os seus elementos

O reduce() te passa 4 argumentos: `currentValue, accumulator, currentIndex, theArrayItSelf`

Vamos para um exemplo prático:

```typescript
const numbers: number[] = [2, 4, 6, 8, 11];

const total = numbers.reduce(((acc, curr) => (acc + curr)), 0)
// retorna: 31
```

Como isso funciona por trás dos panos ?

| Interação | Accumulator | Current | Total |
| --------- | ----------- | ------- | ----- |
| 1         | 0           | 2       | 2     |
| 2         | 2           | 4       | 6     |
| 3         | 6           | 6       | 12    |
| 4         | 12          | 8       | 20    |
| 5         | 20          | 11      | 31    |

Adendos: 

* Lembre-se de retornar um valor
* Lembra-se de definir um valor inicial
* E jamais espere um array, quando o reduce te trás apenas um valor único

## Unificando funções:

Bem, nós vimos o *map()*, *filter()* e *reduce()*.
Podemos fazer uma função utilizando os 3? Claro que sim!

Vamos para um cenário real.

\- Regra de negócio:

* Obter escala de segunda, terça e quinta
* Converter horas de trabalho para horas (ao invés de minutos)
* Obter funcionários que trabalham apenas 4 horas ou menos
* Somar essas horas
* Multiplicar o resultado pela hora de trabalho
* Imprimir o resultado com 'R$'

```javascript
const monday = [
  { 'name'     : 'Roberto', 'duration' : 240 },
  { 'name'     : 'Lucas', 'duration' : 120 }
];

const tuesday = [
  { 'name': 'Marcelo', 'duration' : 360 },
  { 'name': 'Luiz', 'duration' : 80 },
  { 'name': 'João', 'duration'  : 600}
];

const thursday = [
  { 'name': 'Robervaldo', 'duration' : 240 },
  { 'name': 'Antônio', 'duration' : 540 },
  { 'name': 'Lúcio', 'duration'  : 280 }
];

const days = [monday, tuesday, tuesday];


const result = days
  .reduce((acc, curr) => acc.concat(curr)) // Transformar nosso array bi-dimensional em uma lista
  .map(day => day.duration / 60) // Obtem a duração e converte para horas
  .filter((duration) => duration >= 4) // Filtra os trabalhadores que trabalham 4 horas ou mais
  .map((duration) => duration * 12) // Multiplica as horas pelo valor da hora de trabalho
  .reduce((acc, curr) => (+acc) + (+curr)) // Combina a somatória em um valor único
  .toFixed(2) // Define precisão de duas casas decimais

console.log(`R$ ${result}`) // Retorna: R$ 432.00
```

## Finalização

Com isto, vimos as três funções *map()*, *filter()* e *reduce()*.\
Agora é praticar e criar maturidade na utilização das mesmas.