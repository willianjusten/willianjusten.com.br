---
layout: post
date: '2019-02-08 03:37:19'
image: /assets/img/captain-hook.jpg
title: Habemus React Hooks
description: >-
  Uma das features mais interessantes do React foi finalmente lançada, o famoso
  Hooks! Por que é tão legal assim?
introduction: >-
  Uma das features mais interessantes do React foi finalmente lançada, o famoso
  Hooks! Por que é tão legal assim?
twitter_text: >-
  Uma das features mais interessantes do React foi finalmente lançada, o famoso
  Hooks! Por que é tão legal assim?
main-class: js
color: '#D6BA32'
tags:
  - react
  - js
  - hooks
---
## Introdução

Faaaala pessoal! A ideia era ter escrito esse post bem no dia do [release dos hooks](https://github.com/facebook/react/blob/master/CHANGELOG.md#1680-february-6-2019), mas acabou que tive uns imprevistos, mas antes tarde do que nunca né? 

Esse post vai beber basicamente da fonte [da documentação do React](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html), vou tentar condensar alguns detalhes e fazer outros comentários, se você já leu tudo lá e já entendeu, talvez o post seja repetitivo, mas não vai embora ainda não, veja que belo gatinho.

![Gatinho fofinho olhando com cara de pidão](/assets/img/cute-kitten.jpg)

Bom, enquanto escrevo esse post, vou ouvindo a trilha sonora de um jogo incrível chamado [Gris](https://www.youtube.com/watch?v=XxM1SX35-GU), é composta basicamente por pianos, ótima para concentrar e para quem curte jogos, aconselho demais a dar uma olhada.

## O que é? Onde vive? O que come?

Assim como quando algo novo lança, vários devem estar se perguntando para que servem os tais hooks? Qual o ganho nisso? Vou ter que aprender tudo de novo?

Enfim, são váaarias dúvidas e aí eu separei essa parte inicial para responder algumas delas. Se você quiser ver ainda mais perguntas/respostas, o pessoal do React fez [um excelente FAQ](https://reactjs.org/docs/hooks-faq.html).

### O que são React Hooks?

Numa versão bem resumida:

> Hooks permitem que você utilize `states` e outros métodos de `states` sem precisar criar uma classe. Você também pode criar seus próprios Hooks e compartilhar a lógica entre mais componentes.

Ou seja, aqueles métodos como `componentDidMount` e `componentDidUpdate` que as vezes se tornavam complexos em componentes maiores, agora poderão ser simplificados na nova lógica dos hooks, além de poderem ser compartilhados agora.

### Por que criaram isso?

O Dan Abramov fez uma palestra no ano passado explicando todos os conceitos e motivações para criar essa nova estrutura, eu acho que vale super a pena assistir:

<iframe width="560" height="315" src="https://www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Uma outra fonte que eu acho super legal é esse Tweet abaixo:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">How migration of a class to hooks look like and how much code it saves &amp; simplifies. <a href="https://twitter.com/hashtag/React?src=hash&amp;ref_src=twsrc%5Etfw">#React</a> <a href="https://t.co/E72sNfi4ZX">pic.twitter.com/E72sNfi4ZX</a></p>&mdash; Andreas Kull (@akullpp) <a href="https://twitter.com/akullpp/status/1093192074038513664?ref_src=twsrc%5Etfw">February 6, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Se você perceber, o código não ficou muito menor, mas as responsabilidades ficaram mais organizadas em seus devidos blocos, o que já facilita DEMAIS na escrita e leitura do código.

Existem outros vários motivos, mas vou pontuar os principais aqui:

### É difícil de reutilizar lógica de estados entre componentes

A forma mais comum de compartilharmos comportamentos/funcionamentos entre componentes era através dos HOC's (Higher-order components) e das render props.

O grande problema desses padrões é que você precisa modificar boa parte do código do componente para que o mesmo se adapte ao funcionamento compartilhado, aumentando sua verbosidade e perdendo boa parte do isolamento de responsabilidade, ou seja, você acaba perdendo qual parte do código faz o que.

### Classes ainda confundem pessoas e máquinas

Quando eu escrevi o post [Fundamentos JavaScript antes de aprender React](https://willianjusten.com.br/fundamentos-javascript-antes-de-aprender-react/), um dos primeiros conceitos que abordei lá, foi exatamente o uso de classes. 

A equipe do React notou que o uso de classes ainda é uma grande barreira para aprender React. Você precisa entender como o Javascript funciona, que é bem diferente da maioria das linguagens orientadas a objeto. Você precisa lembrar de fazer o `bind` dos eventos e também entender qual é o `this` para cada contexto, o que pode ser simples para uns, mas ainda muito complicado para muitos.

Adicionalmente, o React é uma biblioteca que já está no mercado há aproximadamente 5 anos, mas eles querem que ela continue relevante por mais e mais anos. Para isso, eles já estão se preocupando com outras otimizações e eles notaram que o uso de classes pode permitir o uso de certas patterns que prejudicariam essa otimização, como uma não tão boa minificação e outros detalhes mais baixo nível.

Para resolver esses problemas, os Hooks permitem que você utilize todas as features do React mas sem a necessidade de utilizar classes. Os componentes React sempre foram mais ligados a funções e os hooks vem para tornar isso ainda mais comum.

### Preciso aprender tudo de novo? 

A resposta curta e grossa é **não**. Os Hooks são totalmente opcionais e você pode criar componentes novos utilizando essa nova estrutura e utilizar lado a lado com componentes antigos, tudo vai funcionar sem problemas. Mas se você não quiser ou não tiver tempo de ler sobre hooks, não há problema nenhum, você pode continuar a vida como está.

Hooks não adicionam nada novo nos conceitos de React. Eles somente adicionam uma forma mais direta de mexer na API do react, como: `props`, `state`, `context`, `refs`, e `lifecycle`.

Eles inclusive encorajam que você não saia reescrevendo tudo do zero, mas que vá [gradualmente adotando os hooks](https://reactjs.org/docs/hooks-intro.html#gradual-adoption-strategy).

## Antes e Depois dos hooks

Acho que a melhor maneira de mostrar o funcionamento dos hooks é mostrar um antes/depois. Vai ficar mais fácil de entender assim, depois disso explico cada um dos detalhes.

Segue abaixo um componente class based:

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

Como você pode reparar, nós temos um `this.state` no `constructor` para definir o estado inicial e temos depois um `this.setState` dentro do botão para fazer a mudança do estado. Algumas pessoas inclusive criariam um método separado para fazer essa mudança do estado.

Agora segue abaixo, o mesmo código, porém feito com hooks:

```jsx
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
``` 

Basicamente, a grande diferença é esse tal de `useState`, que é importado diretamente do pacote do `react` e depois usado para atribuir valor num array, usando o [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring). 

