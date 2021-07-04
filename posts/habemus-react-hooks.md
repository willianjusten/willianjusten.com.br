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

- [Introdução](#introdução)
- [O que é? Onde vive? O que come?](#o-que-é-onde-vive-o-que-come)
  - [O que são React Hooks?](#o-que-sao-react-hooks)
  - [Por que criaram isso?](#por-que-criaram-isso)
    - [Classes ainda confundem pessoas e máquinas](#classes-ainda-confundem-pessoas-e-máquinas)
  - [Preciso aprender tudo de novo?](#preciso-aprender-tudo-de-novo)
- [Hooks e seus funcionamentos](#hooks-e-seus-funcionamentos)
  - [Usando o Hook de estados (useState)](#usando-o-hook-de-estados-usestate)
    - [Declarando a variável de estado](#declarando-a-variavel-de-estado)
    - [Lendo a variável de estado](#lendo-a-variável-de-estado)
    - [Atualizando a variável de estado](#atualizando-a-variável-de-estado)
  - [Usando o Hook de efeitos (useEffect)](#usando-o-hook-de-efeitos-useeffect)
    - [Efeitos com Cleanup](#efeitos-com-cleanup)
  - [Regras para os Hooks](#regras-para-os-hooks)
    - [Somente chame os Hooks no Top Level](#somente-chame-os-hooks-no-top-level)
    - [Somente chame os Hooks em funções React](#somente-chame-os-hooks-em-funções-react)
    - [Explicação](#explicação)
  - [Criando seus próprios Hooks](#criando-seus-próprios-hooks)
    - [Extraindo um Hook customizado](#extraindo-um-hook-customizado)
    - [Usando um hook customizado](#usando-um-hook-customizado)
- [Links interessantes](#links-interessantes)
- [Conclusão](#conclusão)

## Introdução

Faaaala pessoal! A ideia era ter escrito esse post bem no dia do [release dos hooks](https://github.com/facebook/react/blob/master/CHANGELOG.md#1680-february-6-2019), mas acabou que tive uns imprevistos, mas antes tarde do que nunca né?

Esse post vai beber basicamente da fonte [da documentação do React](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html), vou tentar condensar alguns detalhes e fazer outros comentários, se você já leu tudo lá e já entendeu, talvez o post seja repetitivo, mas não vá embora ainda não, veja que belo gatinho.

![Gatinho fofinho olhando com cara de pidão](/assets/img/cute-kitten.jpg)

Bom, enquanto escrevo esse post, vou ouvindo a trilha sonora de um jogo incrível chamado [Gris](https://www.youtube.com/watch?v=XxM1SX35-GU), é composta basicamente por pianos, ótima para concentrar e para quem curte jogos, aconselho demais a dar uma conferida.

## O que é? Onde vive? O que come?

Assim como quando algo novo lança, vários devem estar se perguntando para que servem os tais hooks? Qual o ganho nisso? Vou ter que aprender tudo de novo?

Enfim, são váaarias dúvidas e aí eu separei essa parte inicial para responder algumas delas. Se você quiser ver ainda mais perguntas/respostas, o pessoal do React fez [um excelente FAQ](https://reactjs.org/docs/hooks-faq.html).

### O que são React Hooks?

Numa versão bem resumida:

> Hooks permitem que você utilize `states` e outros métodos de `states` sem precisar criar uma classe. Você também pode criar seus próprios Hooks e compartilhar a lógica entre mais componentes.

Ou seja, aqueles métodos como `componentDidMount` e `componentDidUpdate` que as vezes se tornavam complexos em componentes maiores, agora poderão ser simplificados na nova lógica dos hooks, além de poderem ser compartilhados.

### Por que criaram isso?

O Dan Abramov fez uma palestra no ano passado explicando todos os conceitos e motivações para criar essa nova estrutura, eu acho que vale super a pena assistir:

<iframe width="560" height="315" src="https://www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Uma outra fonte que eu acho super legal é esse Tweet abaixo:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">How migration of a class to hooks look like and how much code it saves &amp; simplifies. <a href="https://twitter.com/hashtag/React?src=hash&amp;ref_src=twsrc%5Etfw">#React</a> <a href="https://t.co/E72sNfi4ZX">pic.twitter.com/E72sNfi4ZX</a></p>&mdash; Andreas Kull (@akullpp) <a href="https://twitter.com/akullpp/status/1093192074038513664?ref_src=twsrc%5Etfw">February 6, 2019</a></blockquote>

Se você perceber, o código não ficou muito menor, mas as responsabilidades ficaram mais organizadas em seus devidos blocos, o que já facilita DEMAIS na escrita e leitura do código.

Existem outros vários motivos, mas vou pontuar os principais aqui:

#### É difícil de reutilizar lógica de estados entre componentes

A forma mais comum de compartilharmos comportamentos/funcionamentos entre componentes era através dos HOC's (Higher-order components) e das render props.

O grande problema desses padrões é que você precisa modificar boa parte do código do componente para que o mesmo se adapte ao funcionamento compartilhado, aumentando sua verbosidade e perdendo boa parte do isolamento de responsabilidade, ou seja, você acaba perdendo qual parte do código faz o que.

#### Classes ainda confundem pessoas e máquinas

Quando eu escrevi o post [Fundamentos JavaScript antes de aprender React](https://willianjusten.com.br/fundamentos-javascript-antes-de-aprender-react/), um dos primeiros conceitos que abordei lá, foi exatamente o uso de classes.

A equipe do React notou que o uso de classes ainda é uma grande barreira para aprender React. Você precisa entender como o Javascript funciona, que é bem diferente da maioria das linguagens orientadas a objeto. Você precisa lembrar de fazer o `bind` dos eventos e também entender qual é o `this` para cada contexto, o que pode ser simples para uns, mas ainda muito complicado para muitos.

Adicionalmente, o React é uma biblioteca que já está no mercado há aproximadamente 5 anos, mas eles querem que ela continue relevante por mais e mais anos. Para isso, eles já estão se preocupando com outras otimizações e eles notaram que o uso de classes pode permitir o uso de certas patterns que prejudicariam essa otimização, como uma não tão boa minificação e outros detalhes de mais baixo nível.

Para resolver esses problemas, os Hooks permitem que você utilize todas as features do React mas sem a necessidade de utilizar classes. Os componentes React sempre foram mais ligados a funções e os hooks vem para tornar isso ainda mais comum.

### Preciso aprender tudo de novo?

A resposta curta e grossa é **não**. Os Hooks são totalmente opcionais e você pode criar componentes novos utilizando essa nova estrutura e utilizar lado a lado com componentes antigos, tudo vai funcionar sem problemas. Mas se você não quiser ou não tiver tempo de ler sobre hooks, não há problema nenhum, você pode continuar a vida como está.

Hooks não adicionam nada novo nos conceitos de React. Eles somente adicionam uma forma mais direta de mexer na API do react, como: `props`, `state`, `context`, `refs`, e `lifecycle`.

Eles inclusive encorajam que você não saia reescrevendo tudo do zero, mas que vá [gradualmente adotando os hooks](https://reactjs.org/docs/hooks-intro.html#gradual-adoption-strategy).

## Hooks e seus funcionamentos

Existem alguns hooks e inclusive você pode criar os seus próprios! Eu vou mostrar inicialmente os mais importantes, fazendo comparações de antes e depois, para ajudar a entender o funcionamento.

### Usando o Hook de estados (useState)

Seguindo a ideia de antes/depois, segue abaixo um Componente Class Based:

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}
```

Utilizando hooks, ficaria assim:

```jsx
import React, { useState } from 'react'

function Example() {
  // Declare a new state variable, which we'll call "count"
  // Declarando uma nova variável de estado, que chamamos de "count"
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Basicamente, a grande mudança fica por conta desse `useState` que é importado diretamente do pacote do `react`. Temos também ali a criação do `count` e também um método `setCount` e por último, temos o método `setCount` sendo chamado no `onClick` assim como o `this.setState` era chamado antes. Bom, vamos quebrar isso em pedacinhos para entender.

#### Declarando a variável de estado

Numa classe, nós inicializamos o `count` como `0` definindo através do `this.state` lá no construtor.

```jsx
...
constructor(props) {
  super(props);
  this.state = {
    count: 0
  };
}
...
```

Num `function component` ou antes chamado também de `stateless component` (antes não controlávamos estados em funções puras), nós não tínhamos o `this.state` para poder definir valores ou chamar valores. Mas agora, com o hooks, nós podemos chamar o `useState` diretamente do nosso componente:

```jsx
const [count, setCount] = useState(0)
```

- E o que o `useState` faz?

Ele declara uma "state variable". Essa variável é chamada `count` para esse exemplo, mas poderia se chamar qualquer coisa, como `fruit`. Essa é a maneira de "preservar" os valores entre as funções. O `useState` tem as mesmas habilidades que o `this.state` tem para a classe. Normalmente variáveis desaparecem depois que a função é executada, mas os estados são preservados no React e isso é o que vai ocorrer com as variáveis criadas pelo `useState`.

- O que nós passamos de argumento no `useState`?

O `useState` aceita somente **um** argumento e ele é o estado inicial da variável. Diferente das classes, o estado não precisa ser um objeto nesse caso. Ele pode ser somente um número ou uma string, se é tudo que precisamos. No nosso exemplo, estamos alterando somente a quantidade de vezes que o usuário está clicando, então `0` é mais que suficiente.

**Importante:** se precisarmos guardar dois diferentes valores no estado, iremos utilizar o `useState` duas vezes.

- O que o `useState` retorna?

Esse método retorna um par de valores: o estado atual e uma função que atualiza o mesmo. E é por isso que escrevemos `[count, setCount] = useState()`.

Essa forma de assinalar 2 valores ao mesmo tempo é utilizando o [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring), que é uma feature que veio no ES6, não é exclusiva do React.

Agora que sabemos como o `useState` funciona, as coisas vão fazer mais sentido.

```jsx
const [count, setCount] = useState(0)
```

Ali nós declaramos a variável `count`, que vai ter `0` como seu valor inicial e criamos o método `setCount` que vai ser responsável por fazer a atualização do `count`.

#### Lendo a variável de estado

Para ler o valor da variável, na classe nós utilizávamos assim:

```jsx
<p>You clicked {this.state.count} times</p>
```

Ou seja, precisávamos buscar no nosso objeto `this.state` por cada variável. Nas funções com hooks podemos chamar a variável diretamente:

```jsx
<p>You clicked {count} times</p>
```

#### Atualizando a variável de estado

Na classe, nós precisávamos do método `this.setState()` para atualizar os valores:

```jsx
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
  Click me
</button>
```

Na função com hooks, nós já definimos tanto o `setCount` quanto o `count`, então fica bem mais simples:

```jsx
<button onClick={() => setCount(count + 1)}>Click me</button>
```

Se você ainda tem alguma dúvida nessa parte, recomendo ir [nessa parte da documentação](https://reactjs.org/docs/hooks-state.html), onde tem mais alguns detalhes.

### Usando o Hook de efeitos (useEffect)

Vimos acima como trabalhar com o `useState` para definir nossos estados, mas e nos casos que precisamos encadear ações baseadas em outras mudanças, como fazíamos no `componentDidMount`, `componentDidUpdate` e `componentWillUnmount`?

Seguindo a mesma ideia de antes/depois, segue um exemplo onde atualizamos o `title` da página baseada no nosso `count`. Primeiro class based:

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}
```

Repare que temos código duplicado ali! Isso acontece pois precisamos realizar a operação 2x, primeiro quando o componente é montado na página `componentDidMount` e depois quando ele é atualizado `componentDidUpdate`.

Agora vejamos com o `useEffect` hook:

```jsx
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

- O que o `useEffect` faz?

Usando esse Hook, você diz ao React que o componente precisa fazer algo depois de renderizar. Desta forma, no momento que o componente renderizar, o React vai chamar o método e toda vez que atualizarmos, ele também irá chamar o método. Nós utilizamos para uma simples mudança de `document.title`, mas poderia ser utilizado para um fetch numa API, por exemplo.

- Por que o `useEffect` é chamado dentro do componente?

Colocando o `useEffect` dentro do componente nos permite acessar a variável de `count` ou qualquer `props` que precisarmos. Tendo já dentro da função, não precisamos de nenhuma API para ler, já está dentro do escopo da função.

- O `useEffect` roda toda vez que renderiza?

Sim, por padrão ele vai rodar logo após ser renderizado e toda vez que for atualizado. Mais para frente veremos que também podemos customizar isso.

#### Efeitos com Cleanup

No exemplo acima, nós estamos alterando somente um ponto e não estamos "vigiando" nenhuma mudança em nenhum outro canto. Mas em algumas ocasiões nossos componentes precisam "vigiar" eventos enquanto estiverem na tela e depois precisamos limpar isso, para não correr o risco de ter memory leak e travar toda a aplicação. Usando classes, nós utilizamos o `componentWillUnmount` exatamente para fazer essa limpeza. Abaixo segue um exemplo onde trabalhamos com um módulo chamado `ChatAPI`:

```jsx
class FriendStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOnline: null }
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    )
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    )
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    })
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...'
    }
    return this.state.isOnline ? 'Online' : 'Offline'
  }
}
```

Repare que ao montar o componente nós fazemos um `subscribeToFriendStatus` e ao desmontar, fazemos exatamente o oposto com `unsubscribeFromFriendStatus`.

Já utilizando o `useEffect` hook faremos assim:

```jsx
import React, { useState, useEffect } from 'react'

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  })

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

Dentro do nosso método `useEffect`, nós faremos o **retorno de uma função**, nesse caso a função `cleanup` (não necessariamente precisa ter esse nome ou sequer ser uma named function).

O React ao ver que o `useEffect` possui uma função como retorno, automaticamente irá rodar sempre que o componente for desmontado. Dessa forma, nós temos o funcionamento de `componentDidMount` e `componentDidUnmount` como na classe.

Dentro da documentação existe uma parte [com algumas dicas](https://reactjs.org/docs/hooks-effect.html#tips-for-using-effects) para o `useEffect`, devo fazer um post futuramente com essa parte em separado, mas vale dar uma olhada lá também.

### Regras para os Hooks

Como já vimos, os Hooks são funções JavaScript, mas é necessário seguir duas regras fundamentais para poder usá-los. Inclusive existe um [plugin para o eslint](https://www.npmjs.com/package/eslint-plugin-react-hooks) que ajuda a não esquecer dessas regras.

#### Somente chame os Hooks no Top Level

Não chame Hooks dentro de loops, condicionais ou funções aninhadas. Ao invés disso, sempre chame os Hooks na primeira camada da sua função React. Seguindo esta regra, você garante que os Hooks serão chamados na mesma ordem. Isso permite que o React preserve corretamente o estado dos Hooks quando usados múltiplos `useState` e `useEffect`.

#### Somente chame os Hooks em funções React

Dessa forma você garante que toda a lógica de estados será visível por todo o componente.

#### Explicação

Um mesmo componente pode ter múltiplos `useState` e `useEffect`. Como o exemplo abaixo:

```jsx
function Form() {
  // 1. Use a variável "name" no state
  const [name, setName] = useState('Mary')

  // 2. Use um effect para persistir os dados do form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name)
  })

  // 3. Use a variável "surname" no state
  const [surname, setSurname] = useState('Poppins')

  // 4. Use um effect para atualizar o título da página
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname
  })

  // ...
}
```

Então, como o React sabe qual estado corresponde a qual chamada do `useState`? A resposta é **o React depende da ordem com que os Hooks são chamados**. O exemplo acima funciona, pois a ordem dos Hooks é sempre a mesma em todas as renderizações. Segue abaixo um fluxo:

```jsx
// ------------
// Primeira renderização
// ------------
useState('Mary') // 1. Inicializa a variável "name" como 'Mary'
useEffect(persistForm) // 2. Adiciona um effect para persistir o form
useState('Poppins') // 3. Inicializa a variável "surname" com 'Poppins'
useEffect(updateTitle) // 4. Adiciona um effect para atualizar o título

// -------------
// Segunda renderização
// -------------
useState('Mary') // 1. Lê a variável "name" (o argumento é ignorado)
useEffect(persistForm) // 2. Recoloca o efeito para persistir o form
useState('Poppins') // 3. Lê a variável "surname" (o argumento é ignorado)
useEffect(updateTitle) // 4. Recoloca o efeito para atualizar o título
// ...
```

Enquanto a ordem permanecer a mesma, não há problema nenhum, mas o que acontece se colocar uma condicional para um dos hooks?

```jsx
// 🔴 Estamos quebrando a primeira regra!
if (name !== '') {
  useEffect(function persistForm() {
    localStorage.setItem('formData', name)
  })
}
```

A condição `name !== ''` é verdadeira na primeira renderização, então chamamos o Hook. Entretanto, na próxima renderização o usuário pode querer limpar o form, fazendo a condição ser `false`. E com isso, a ordem de execução do hook muda:

```jsx
useState('Mary') // 1. Lê a variável "name" (o argumento é ignorado)
// useEffect(persistForm)  // 🔴 Esse hook foi passado
useState('Poppins') // 🔴 2 (mas era 3). Falha para ler o "surname"
useEffect(updateTitle) // 🔴 3 (mas era 4). Falha para substituir o effect
```

O React não saberia o que devolver para a segunda chamada do `useState`. Ele esperava receber o `useEffect` para persistir o form, assim como feito na renderização anterior, com isso todas as chamadas iriam "pular" uma etapa e isso levaria a vários bugs de estado.

Sei que isso acima parece super complexo, para mim também soou, mas você não precisa se preocupar. Se você estiver usando o [plugin para o eslint](https://www.npmjs.com/package/eslint-plugin-react-hooks), ele nunca vai deixar você cometer esse erro e com isso você está salvo \o/

### Criando seus próprios Hooks

Além dos hooks `useState` e `useEffect` que vimos, nós podemos criar nossos próprios hooks e compartilhar entre vários componentes, que é a parte mais interessante dos hooks.

Mais acima, nós tínhamos o seguinte componente, que servia para indicar se um amigo estava online ou offline.

```jsx
import React, { useState, useEffect } from 'react'

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  })

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

Agora, vamos dizer que na nossa aplicação também possuímos um contact list que renderiza os nomes dos usuários online com uma cor verde. Nós poderíamos copiar a lógica feito no `FriendStatus` e passaríamos para o nosso novo `FriendListItem`, mas isso não seria o ideal, olhe abaixo:

```jsx
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={ color: isOnline ? 'green' : 'black' }>
      {props.friend.name}
    </li>
  );
}
```

Repare que é praticamente tudo igual, a única diferença é na parte da renderização, mas os hooks são os mesmos. Para corrigir esse problema de duplicação, nós poderíamos ter 2 formas de compartilhar essa lógica, através do [render props](https://reactjs.org/docs/render-props.html) ou usando [higher-order components](https://reactjs.org/docs/higher-order-components.html).

Agora vamos ver como podemos solucionar esse problema utilizando hooks sem a necessidade de criar mais componentes.

#### Extraindo um Hook customizado

Quando queremos compartilhar lógica entre duas funções, nós extraímos em uma terceira função. Fazemos o mesmo com os hooks!

**Um hook customizado é uma função JavaScript que começa com a palavra "use" e pode chamar outros hooks.** Por exemplo, o `useFriendStatus` abaixo será nosso primeiro hook customizado.

```jsx
import React, { useState, useEffect } from 'react'

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline
}
```

Repare que não há nada de novo nessa função, nós basicamente copiamos a lógica dos componentes acima.

Diferente de um componente React, um hook customizado não precisa de assinatura específica. Nós decidimos o que ele irá receber como argumentos e também o que iremos retornar se precisarmos retornar algo. Em outras palavras, é basicamente uma função normal em JavaScript, só precisa ser iniciado com a palavra `use` para seguir as regras de hooks mencionadas anteriormente.

#### Usando um hook customizado

Agora que já extraímos a lógica para um hook separado, podemos simplesmente utilizar o mesmo nos nossos componentes:

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id)

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={ color: isOnline ? 'green' : 'black' }>
      {props.friend.name}
    </li>
  );
}
```

Repare que ficou bem mais limpo, sem código duplicado e sem a necessidade de criar um outro componente externo! Na [documentação](https://reactjs.org/docs/hooks-custom.html) temos mais alguns detalhes também.

## Links interessantes

Nossa, o post ficou bem grande, mas tem muitos outros detalhes legais que valem a pena ver, então vou botar alguns links aqui:

- [Documentação da API](https://reactjs.org/docs/hooks-reference.html)
- [FAQ](https://reactjs.org/docs/hooks-faq.html)
- [Site com vários hooks customizados](https://usehooks.com/)
- [Awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)

## Conclusão

Bom pessoal, espero que esse post tenha sido útil e que pelo menos te faça querer dar uma olhada a mais sobre hooks, acredito que essa foi uma enorme adição ao ecossistema React e será o futuro dessa lib. Ainda pretendo escrever mais posts sobre esse assunto, então fique atento! =)
