---
template: blog-post
title: "JS: Rest e Spread Operators"
slug: /nodejs/rest-spread
date: 2021-02-13 12:28
description: |-
  js
  ts
  node
  nodejs
  spread
  rest
featuredImage: /assets/rest-spread-logo.jpeg
---

# Introdução:

A versão ES(ES2015) do Javascript trouxe vários elementos úteis para arrays.

Um dos quais foram os operadores **spread** e **rest**.

Pode ser complicado ter apenas uma sintaxe para representar dois casos de uso diferentes. 

Vamos tentar remover essa confusão e aprender a utilizar os mesmos.

##### RESUMÃO:

* **spread:** espalha os elementos
* **rest:** compacta os elementos

## Spread Operator:

O **spread** descompacta os elementos iteráveis em elementos individuais.

### Arrays

O spread neste caso vai espalhar os elementos de um array em argumentos separados.

```javascript
const numberArray = [1, 2, 3, 4];

console.log(...numberArray);
// Retorna: 1 2 3 4

/*
  Em contrapartida, caso não utilizassemos o spread, o resultado seria:
  [1, 2, 3, 4]
*/

```

O mesmo pode ser útil em situações que você tem uma função que espera uma lista e tudo que você possui é uma função.



```javascript
const array = [12, 5, 3, 9, 22, 7];

Math.max(...array);
// 22
```

E se eu quiser copiar os dados de um array ? É mais fácil ainda.



```javascript
const initialArray = [1, 2, 3];
const sameArray = [...initialArray];

console.log(sameArray);
// Retorna: [1, 2, 3]
```

Essa é uma ótima forma de clonar arrays. O melhor é que se você alterar qualquer um dos quais, eles não provocam efeito colateral um no outro.

Também podemos utilizar para compor arrays.

```javascript
const arrayA = ['Pizza', 'Strawberry', 'Lemon'];
const arrayB = ['Milk', ...arrayA, 'Water'];
console.log(arrayB);
// Retorna: ['Milk', 'Pizza', 'Strawberry', 'Lemon', 'Water'];
```

É importante ressaltar, o spread não é apenas para arrays. Você também pode utilizar para qualquer item iterável, uma string, por exemplo.

```javascript
const myString = 'Coffe';
console.log([...myString]);
// Retorno: ['C', 'o', 'f', 'f', 'e'];
```



### Objetos

O **spread** operator (...) com objetos é utilizado para criar cópias de objetos já existente com novos ou valores atualizados ou uma cópia com mais propriedades.\
Vamos ver um exemplo de como utilizar com objetos.

Aqui nós usamos o spread no objetor 'team'. Todas os pares de chave-valor(key-value ou k-v) são copiados em clonedTeam.

```javascript
const team = {
  project: 'CMS',
  size: 8
};

const clonedTeam = { ...team };
// Retorna: { project: 'CMS', size: 8 }
```

A sintaxe do spread também é uma mão na roda para juntar as propriedades e métodos de um objeto para outro.

```javascript
const firstParam = { lat: -34 }
const secondParam = { long: 3 }

const location = {...firstParam, ...secondParam }
// Retorna: { lat: -34, long: 3 }
```



**NOTA:** É importante ressaltar que o **spread** apenas faz uma cópia superficial. Array de grandes profundidades ou objetos não serão copiados propriamente. Os dados de maior profundidade ainda estarão linkados com o original.



# Rest Operator:

Como vimos anteriormente o spread descompacta os elementos de um iterável para elementos individuais, já o operador **rest** faz o contrário, ele coleta todos os elementos para um array.

No Javascript é possível chamar uma função com qualquer número de argumentos.

Nós podemos utilizar o **rest operator** quando não sabemos quantos argumentos serão passados.

Vamos para um exemplo prático:

```
const sum = (...args) => args.reduce((acc, curr) => (acc + curr), 0)

sum(23, 7) // -> 30
sum(7, 16, 2, 1) // -> 26
```

Como pode ver, passamos um argumento utilizando o rest: ...args\
Logo podemos passar N elementos como argumento. Por ser um array, podemos utilizar o reducer de imediato para fazer o processo de soma, tornando o código mais legível.

Vamos para um outro exemplo:

```javascript
const company = (owner, ...workers) => {
  console.log(`Owner: ${owner}`);

  const printWorkers = (worker) => console.log(`Worker: ${worker}`)
  workers.forEach(printWorkers)
}

company('Roberto', 'Lucas', 'João', 'Juvenal', 'Zé');
/* 
  -> Owner: Roberto
  -> Worker: Lucas
  -> Worker: João
  -> Worker: Juvenal
  -> Worker: Zé
 */
```

Como vimos pegamos o primeiro usuário como dono da empresa e todos os que vem por depois, serão seus funcionários.



Nós também podemos utilizar o **rest** em conjunto com a desestruturação, que é algo amplamente utilizado.

```javascript
const member = {
  name: 'Roberval',
  age: 28,
  workingFor: 'Facebook'
}

const { name, ...rest } = member;
console.log(name); // -> Roberval
console.log(rest) //  -> { age: 28, workingFor: 'Facebook' }
```

**NOTA:** O parâmetros do **rest** precisam ser passados como último argumento. Isso é devido ele coletar todos os argumentos restantes para um array.



## Conclusão

* **Operador Rest** coleta todos os elementos restante em um array
* **Operador Spread** espalha os elementos de um array/objeto para elementos individuais.
* Apenas o último parâmetro pode ser um **operador rest**.
* A sintaxe do **spread** só faz a cópia de 1 nível de profundidade