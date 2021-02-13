---
template: blog-post
title: "Descomplicando: Map() - Filter() - Reduce()"
slug: /nodejs/bigthree
date: 2021-02-13 01:24
description: map, reduce, filter
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