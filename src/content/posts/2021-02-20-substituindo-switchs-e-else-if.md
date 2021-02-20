---
template: blog-post
title: Substituindo switch's e else-if
slug: nodejs/better-switch
date: 2021-02-20 13:06
description: |
  switch
  else
  if
  else-if
  better
featuredImage: /assets/switches.jpg
---
# Um substituto ao switch | if-else

O primeiro ponto deste tópico é: "Porque substituir o *switch* ?"
Em alguns momentos o *switch* pode soar estranho, principalmente se o seu código tiver uma abordagem de programação funcional; Outros já podem reclamar que vários *if's* podem ser demasiadamente verbosos.

Todavia o *switch* tem várias deficiências, algumas podem ser bem chatas:

* É um bloco
* Tem apenas um único escopo de bloco entre todos os casos
* Não traduz os casos para valores
* Ele não obriga um caso padrão

## O que soa tão errado no switch ser um bloco ?

Um bloco é um grupo de declarações, não expressões. Ele não pode retornar valores, assignado para variáveis e ser invocado por aí.
Você não pode fazer coisas como:

```js
return switch (value){
  // ...
}
```

Isso obriga que cada *case* garanta e implemente seu próprio retorno, assignamento e afins.

## O que significa ter: "apenas um único escopo de bloco entre todos os casos"?

Vamos imaginar que você tenha um código como:

```js
switch(action){
  case 'CREATE':
    const value = userData;
    const user = this.createUser(userData);
    return user;
  case 'SOFTDELETE':
    const value = userData;
    this.softDelete(userData);
    return {...userData, enabled: false}
}
```

O código anterior não irá funcionar, vide você só conseguir declarar *value* apenas uma vez durante todo o bloco (que é tudo dentro dos '{}', que estão associados ao *switch*).

É claro, você pode realizar uma modificação que permitiria tudo isso. Apenas declarar cada *case* como um bloco.

```js
switch(action){
  case 'CREATE': {
    const value = userData;
    const user = this.createUser(userData);
    return user;
  }
  case 'SOFTDELETE': {
    const value = userData;
    this.softDelete(userData);
    return {...userData, enabled: false}
  }
}
```

E bem, não é apenas horrível de se ver, como também verboso.

## *Case's* nem sempre serão valores

A semântica do *switch* não é um *map* entre os casos e valores.\
Ele simplesmente mapeia os casos para as suas declarações. E isso não é um problema, é totalmente normal; Todavia ele não encaixa bem em um código que é predominate declarativo, quando você você pensa em termos de mapear dois conjuntos de valores. \
\
Se você estiver escrevendo código declarativo, você tem de pensar em termos de:

```js
case one: value -> valueX
case two: value -> valueY
case three: value -> valueZ
```

Para fazermos isso com o *switch*, nós queremos que o switch transforme o valor para outro valor baseado no caso.\
Nós podemos fazer isso, simplesmente usando o *return* para cada caso e não é nenhum problema, todavia.. Isso resulta em verbosidade.

## Ele não obriga um caso padrão

Sem um caso padrão, nós ficamos sem a chance de fazermos nosso código mais robusto, garantindo que todos os casos são amparados, até mesmo para os casos mais remotos. Usualmente o *default* só irá aplicar um *throw* e é uma boa forme de garantir que não estamos perdendo nada.\
\
Se nos mantermos dentro do mundo declarativo, o *switch* necessita garantir que todos os casos da nossa função irão retorna um valor (inclusive os remotos).

## Utilizando o match

Para continuarmos vamos analisar o seguinte código e entender-lo.

```javascript
const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
});

const match = x => ({
  on: (pred, fn) -> (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
});
```

Antes de vermos como isso funciona, vamos ver uma implementação do mesmo:

```javascript
const budgetStatus = (arg) => match(arg)
  .on(x => x >= 0 && x < 500, () => 'almost broke')
  .on(x => x >= 500 && x <= 1000, () => 'has insurance')
  .on(x => x > 1000, () => 'has some money')
  .otherwise(x => 'no matches available')

console.log(budgetStatus(5000))
// Retorna: 'has some money'
```

A função *match* cria um contexto para o valor que nós passamos. Esse contexto nos permite mapear o valor dentro do contexto usando qualquer quantidade de funções, cada uma das quais com *guard function* que nos permite *'skipar'* a sub-rotina se uma condição não for satisfeita. Nós também temos o método *otherwise()* que irá capturar os valores que nenhum dos guardas permitiram invocar uma sub-rotina, para condições não satisfeitas.\
\
Quando um guarda confirma o valor, nós fazemos uma troca de contexto para o *matched* colocando o retorno do valor da função no mesmo. O novo contexto irá ignorar qualquer próximo *match* e retornar o valor.

Agora vamos entender como isso funciona.

```javascript
match(-80)
  // Aqui nos estamos dentro do contexto do match
  .on(x => x >= 0 && x < 500, () => 'almost broke')
    // Como -80 não satisfaz >= 0>, nós continuamos dentro do contexto
  .on(x => x >= 500 && x <= 1000, () => 'has insurance')
    // Como -80 não satisfaz >= 500, nós continuamos no contexto
  .on(x => x > 1000, () => 'has some money')
    // Como -80 não satisfaz > 1000, nós continuamos no contexto
  .otherwise(x => 'no matches available')
  /* Nós continuamos no contexto, então o otherwise será chamado e nós teremos o retorno do budget
  */
```

## O que isso resolve?

A função *match* resolve todos os problemas que tínhamos com o *switch* em um código declarativo.

* Ele atua como um mapeamento *case-sentive* entre entrada e saída de valores.
* Enforça o caso padrão, gerando um abrangência total.
* É uma expressão, então pode ser passado, assignada e por aí vai.
* Não tem uma sintaxe verbosa.
* Cada caso tem seu próprio escopo (porque é uma função).

Devido aos guardas da função serem funções e não simples valores, ele funciona como um `if-else if-else`, como uma cláusula do *else* obrigatório pelo *otherwise*.

Em resumo, agora temos uma abstração que engloba a funcionalidade do *switch* e *if-else if-else*. Isso é bem amigável para nosso código declarativo e tem uma sintaxe MUITO mais limpa.

Claro, isso não é um pre-texto para utilizar em qualquer lugar e fazer um aninhamento de *if-else*. É importante ressaltar, uma função só deve ter uma única responsabilidade.