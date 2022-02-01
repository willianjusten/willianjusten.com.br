---
layout: post
date: '2019-01-04 02:26:13'
image: /assets/img/fundamentos-pre-react.jpg
title: Fundamentos JavaScript antes de aprender React
description: >-
  Na necessidade você pode ir direto para o React sem saber alguns conceitos e
  se complicar ainda mais. Esse post pode te ajudar nisso.
introduction: >-
  Na necessidade você pode ir direto para o React sem saber alguns conceitos e
  se complicar ainda mais. Esse post pode te ajudar nisso.
twitter_text: >-
  Na necessidade você pode ir direto para o React sem saber alguns conceitos e
  se complicar ainda mais. Esse post pode te ajudar nisso.
main-class: js
color: '#D6BA32'
tags:
  - react
  - js
  - es6
---

## Introdução

Fala pessoal, lá em 2015 eu dei início ~~e nem fiz direito~~ uma [série de posts](https://willianjusten.com.br/series/#aprendendo-reactjs) sobre React. Os posts são super acessados até hoje, mas já são bem defasados. Com isso, gostaria de voltar a escrever sobre o assunto, até para dar uma atualizada nesse conteúdo e também ajudar as pessoas que estão começando a estudar por agora.

No [primeiro post](https://willianjusten.com.br/comecando-com-react/) da série eu falo sobre a biblioteca e seus conceitos, então se você quiser ler hoje, ainda vai funcionar e ser eficaz. Mas antes disso, acho que é necessários saber alguns pequenos conceitos para não se perder na hora de estudar o React em si.

O que eu mais vejo são pessoas com dificuldades não no React, mas em coisas básicas como a sintaxe do ES6, high-order functions e até operadores ternários. Esse post vai ser baseado [num outro post em inglês](https://www.robinwieruch.de/javascript-fundamentals-react-requirements) que também fala bastante disso.

Se você já trabalha com React ou já sabe bem as novas sintaxes de ES6 assim como conceitos básicos de JavaScript, esse post provavelmente vai ser bem chato e repetitivo para ti, então se não quiser ler, não tem problema. Se você ainda nem começou com React e sente que ainda faltam coisas básicas, dá uma lidinha nesse post.

Vários dos conceitos abordados e principalmente a parte de ES6, eu tenho um [curso sobre isso na Udemy](https://www.udemy.com/js-com-tdd-na-pratica/?couponCode=PROMOFEV22) que talvez possa te interessar.

Enquanto escrevo, vou ouvindo [Solar Fields](https://open.spotify.com/artist/7GyhmlEy51sGUE09A5AWzc?si=P3-T0rYMQ7yyvOnDUDWTJg) que é um DJ Sueco criador da trilha sonora de Mirror's Edge Catalyst e várias outras coisas legais. Dessa vez, foi uma recomendação do meu amigo [Jonas Mendes](https://nipher.io/), que também é programador.

Bom, vamos lá, vou separar os tópicos aqui, para facilitar um pouquinho:

- [Primeiro contato com React](#primeiro-contato-com-react)
- [React e Classes no JavaScript](#react-e-classes-no-javascript)
- [Template Literals](#template-literals)
- [Arrow Functions](#arrow-functions)
- [Funções como componentes no React](#funções-como-componentes-no-react)
- [Sintaxe do React Class Component](#sintaxe-do-react-class-component)
- [Map, Reduce e Filter no React](#map-reduce-e-filter-no-react)
- [Operador Ternário no React](#operador-ternário-no-react)
- [Importando e Exportando no React](#importando-e-exportando-no-react)
- [Funções de Ordem Superior](#funções-de-ordem-superior)
- [Funções de Ordem Superior no React](#funções-de-ordem-superior-no-react)
- [Destructuring e Spread Operators](#destructuring-e-spread-operators)
- [Conclusão](#conclusão)

## Primeiro contato com React

Quando você entra no mundo React, é bem provável que você inicie o projeto utilizando o [create-react-app](https://github.com/facebook/create-react-app), já que essa é uma das ferramentas mais conhecidas para quem quer iniciar um projeto React sem muitas dificuldades e já com toda uma estrutura pronta. Isso tudo com o suporte do próprio time do React e Facebook. Ou então você pode acabar indo para alguns tutoriais na internet também.

Mas quando você vai ver os arquivos, é bem possível que dê de cara com um código como:

```jsx
import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
```

E logo de cara você já vai ver um `React class component`, ou seja, o uso de classes dentro do JavaScript. Hoje, isso já deve ser normal para uma grande parcela, mas ainda pode causar dificuldades para alguns iniciantes, já que o uso de classes veio somente com o ES6. E o uso de classes traz consigo conceitos como: definições de classe, métodos de classe e herança. Dentro do React não somos obrigados a usar somente classes, mas em algum momento você pode precisar/ver e vai ter que entender esses conceitos.

## React e Classes no JavaScript

Antes do ES6, já havia uma forma de trabalhar com heranças e objetos, utilizando os [prototypes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain), as Classes no ES6 nada mais são que um "sugar syntax" disso, ou seja, por debaixo dos panos também é usado o prototype.

Para entender melhor as classes, vamos usar sem o React no seguinte código abaixo:

```js
class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname
    this.lastname = lastname
  }

  getName() {
    return `${this.firstname} ${this.lastname}`
  }
}

const me = new Developer('Willian', 'Justen')

console.log(me.getName()) // "Willian Justen"
```

A classe `Developer` descreve uma entidade, que é usada como uma "forma" (pense naquelas formas de biscoito mesmo), para poder criar `instâncias` dessa entidade, comumente chamamos essas instâncias de `objetos`. Ou seja, a partir de uma classe, podemos criar vários objetos que `herdam` propriedades e métodos de sua classe.

Para criar uma instância baseada na classe, nós utilizamos a seguinte sintaxe: `new Nome_Da_Classe(paramêtros_aqui)` e assinalamos esse valor a uma variável, que é o caso da nossa variável `me` acima.

Uma classe pode ou não conter um `constructor`, que é um método inicial usado para definir certas propriedades que esse objeto irá possuir. Dentro das classes, também podemos criar nossos próprios métodos, que são chamados diretamente, sem necessidade de usar `function`, que é o caso do método `getName`.

A instância da classe é representada pelo objeto `this` dentro da classe e pela sua variável assinalada quando fora da classe, ou seja, para outros escopos, a nossa instância será a variável `me`, mas para métodos internos como o `getName`, nós utilizamos o `this`.

As classes normalmente são utilizadas para trabalhar com herança na programação orientada a objeto. E no JavaScript não poderia ser diferente, para criar essa herança entre classes, nós usamos a palavra `extends`. Abaixo segue um exemplo onde criamos uma outra classe `ReactDeveloper` que herda de `Developer`.

```js
class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname
    this.lastname = lastname
  }

  getName() {
    return `${this.firstname} ${this.lastname}`
  }
}

class ReactDeveloper extends Developer {
  getJob() {
    return 'React Developer'
  }
}

var me = new ReactDeveloper('Robin', 'Wieruch')

console.log(me.getName())
console.log(me.getJob())
```

Repare que além do novo método `getJob`, também é possível usar o método `getName`, assim como suas propriedades de `firstname` e `lastname`.

E bom, é basicamente isso que você precisa para entender como funcionam os `React Class Components`. Uma classe JavaScript é usada para definir um componente React, mas isso só é possível, pois nós estendemos/herdamos tudo de `Component` que faz parte do pacote `react`.

```jsx
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to React</h1>
      </div>
    )
  }
}

export default App
```

E é por isso que o método `render()` é obrigatório nos `React Class Components`, pois esse método que vai instruir o browser de que algo é preciso ser mostrado na tela. Mais para frente você vai ver que os métodos de ciclo de vida do React ([lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle)) também são só disponíveis em `React Class Components` ou no novíssimo `React Hooks`.

Bom, apesar de estar falando bastante de classes aqui e mostrando que é quase uma base para os componentes, o mais aconselhado é que você estenda somente o `React.Component` e trabalhe mais com composição ao invés de herança, existe inclusive uma parte na [documentação oficial falando sobre isso](https://reactjs.org/docs/composition-vs-inheritance.html).

## Template Literals

Uma outra coisa super simples, mas que ainda confunde muita gente são os template literals, que ajudam bastante na hora da concatenação de strings. Agora não precisamos mais usar aqueles sinais de `+` em mil cantos para concatenar as coisas, mas sim utilizar essa aspa invertida e escrever as variáveis nessa notação `${variável}`. Veja abaixo o antes e depois:

```js
getName() {
  return `${this.firstname} ${this.lastname}`;
}

// forma antiga
getName() {
  return this.firstname + ' ' + this.lastname;
}
```

## Arrow Functions

Outra coisa que veio com o ES6, mas ainda causa confusão para os iniciantes são as arrow functions. Isso muito acontece pois tem momentos que as chaves são necessárias, outros momentos que o `return` é necessário e vezes que ambos podem ser omitidos. Abaixo seguem os exemplos:

```js
// Função em ES5
function getGreeting() {
  return 'Welcome to JavaScript'
}

// Função em ES6 com {} e por isso o return obrigatório
const getGreeting = () => {
  return 'Welcome to JavaScript'
}

// Função em ES6 sem {} e return implícito
const getGreeting = () => 'Welcome to JavaScript'
```

Se você tem um método de uma linha só, as chaves e o return não se fazem necessários, mas se os métodos são um pouco maiores, há essa necessidade, é bom não confundir. Já tive muito aluno travando por esquecer de colocar o `return` mas ter adicionado as chaves.

## Funções como componentes no React

O React usa o melhor dos diferentes paradigmas da programação. No lado da programação orientada a objeto, ele permite a criação dos `React class components`, que permitem herdar métodos da API do React, assim como propriedades, como o `this.state`.

Por outro lado, o React também possui vários conceitos de programação funcional por trás. Permitindo a criação dos famosos `stateless components`, que são funções puras que definem componentes React.

Os `stateless components` são bem mais simples, são basicamente funções que recebem parâmetros, que são os `props` e renderizam o elemento na tela. Eles não mexem em estados e nem possuem todo o conjunto da API do React. Mesmo assim, eles são a forma preferida e mais performática de se criar componentes em React. Abaixo seguem formas possíveis de se criar um `stateless component`.

```jsx
// Função normal
function Greeting(props) {
  return <h1>{props.greeting}</h1>
}

// Arrow Function com {} e return
const Greeting = props => {
  return <h1>{props.greeting}</h1>
}

// Arrow Function sem {} e return implícito
const Greeting = props => <h1>{props.greeting}</h1>
```

## Sintaxe do React Class Component

As formas de definir componentes no React estão sempre evoluindo. No início era possível ver o uso do método `React.createClass`, mas com a chegada do ES6, passamos a ver mais o uso como mostrado acima, estendendo `Component` do pacote do `react`.

E exatamente por essa constante evolução, é possível que você veja diferentes formas de se fazer a mesma coisa. Uma das formas de trabalhar com estados (`states`) e métodos é assim:

```jsx
class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }

    this.onIncrement = this.onIncrement.bind(this)
    this.onDecrement = this.onDecrement.bind(this)
  }

  onIncrement() {
    this.setState(state => ({ counter: state.counter + 1 }))
  }

  onDecrement() {
    this.setState(state => ({ counter: state.counter - 1 }))
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        <button onClick={this.onIncrement} type="button">
          Increment
        </button>
        <button onClick={this.onDecrement} type="button">
          Decrement
        </button>
      </div>
    )
  }
}
```

Onde fazíamos o bind do objeto nos métodos dentro do construtor, para assim poder utilizá-los com states e ações no nosso template. Mas com o passar do tempo, esse processo de fazer [bind](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56) acabava sendo repetitivo e chato. Para evitar isso, podemos utilizar as Arrow Functions, que já fazem o autobind sem a necessidade de fazê-los no construtor. Aliás, caso não estejamos passando nenhum `props`, podemos inclusive omitir o uso do construtor. Ficando assim:

```jsx
class Counter extends Component {
  state = {
    counter: 0
  }

  onIncrement = () => {
    this.setState(state => ({ counter: state.counter + 1 }))
  }

  onDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }))
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        <button onClick={this.onIncrement} type="button">
          Increment
        </button>
        <button onClick={this.onDecrement} type="button">
          Decrement
        </button>
      </div>
    )
  }
}
```

## Map, Reduce e Filter no React

No React não existem métodos ou qualquer coisa que seja para trabalhar com arrays, objetos. Tudo que você usa e precisa, é o amado JavaScript. Com isso, alguns métodos como `map`, `reduce` e `filter` passam a ser os queridinhos para quem trabalha com React, mas por quê?

Simples, eles são métodos puros, que recebem um valor e retornam outro da forma desejada, trabalhando da forma funcional que o React tanto gosta. Eles facilitam bastante para retornar items da forma desejada (`map`), filtrar informações baseadas em algum parâmetro desejado (`filter`) ou até mesmo realizar operações em cima de um conjunto de valores para retornar somente um já trabalhado (`reduce`).

Um exemplo com o `map` para renderizar uma lista de items seria:

```jsx
import React, { Component } from 'react'

class App extends Component {
  render() {
    var users = [{ name: 'Robin' }, { name: 'Markus' }]

    return (
      <ul>
        {users.map(function (user) {
          return <li>{user.name}</li>
        })}
      </ul>
    )
  }
}

export default App
```

Para deixar ainda mais limpo, podemos fazer o uso da Arrow Function e criar a mesma coisa em somente uma linha:

```jsx
import React, { Component } from 'react'

class App extends Component {
  render() {
    var users = [{ name: 'Robin' }, { name: 'Markus' }]

    return (
      <ul>
        {users.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
    )
  }
}

export default App
```

E, como disse anteriormente, não só o `map` ajuda, mas funções como o `filter` também são geniais, como no exemplo abaixo:

```jsx
import React, { Component } from 'react'

class App extends Component {
  render() {
    var users = [
      { name: 'Robin', isDeveloper: true },
      { name: 'Markus', isDeveloper: false }
    ]

    return (
      <ul>
        {users
          .filter(user => user.isDeveloper)
          .map(user => (
            <li>{user.name}</li>
          ))}
      </ul>
    )
  }
}

export default App
```

Se você quiser ler mais sobre os métodos, segue aqui a documentação:

- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## Operador Ternário no React

No JSX não é possível utilizar o famoso `if-else` diretamente, mas você pode criar uma condicional antes e parar a renderização usando um return vazio. Desta forma, o React não irá mostrar nada em tela.

```jsx
import React, { Component } from 'react'

class App extends Component {
  render() {
    const users = [{ name: 'Robin' }, { name: 'Markus' }]

    const showUsers = false

    if (!showUsers) {
      return null
    }

    return (
      <ul>
        {users.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
    )
  }
}

export default App
```

Entretanto, se você quiser usar a lógica de if-else dentro do JSX, você pode utilizar os [operadores ternários](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), da seguinte forma:

```jsx
import React, { Component } from 'react'

class App extends Component {
  render() {
    const users = [{ name: 'Robin' }, { name: 'Markus' }]

    const showUsers = false

    return (
      <div>
        {showUsers ? (
          <ul>
            {users.map(user => (
              <li>{user.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }
}

export default App
```

Outra forma de fazer, só retornando um dos lados da condicional, é usando o operador `&&`, da seguinte forma:

```jsx
import React, { Component } from 'react'

class App extends Component {
  render() {
    const users = [{ name: 'Robin' }, { name: 'Markus' }]

    const showUsers = false

    return (
      <div>
        {showUsers && (
          <ul>
            {users.map(user => (
              <li>{user.name}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default App
```

Repare que caso o `showUsers` seja falso, nada irá aparecer, não precisando escrever o `: null` feito anteriormente.

## Importando e Exportando no React

Tá aí uma coisa que confunde muita gente. Como devo importar/exportar as coisas? Tem horas que tem umas chaves, outras horas não tem, o que significam?

Começaremos a falar pelos `exports`, que já irão explicar os `imports` diretamente. Nós possuímos 2 tipos de `exports`, que são:

- `named exports`: que são utilizados para exportar diversos métodos/valores de dentro de um mesmo arquivo.

```js
const firstname = 'Robin'
const lastname = 'Wieruch'

export { firstname, lastname }
```

Repare que temos 2 variáveis e as duas variáveis estão sendo exportadas separadamente. Na hora de importar esses valores, nós só podemos utilizar o mesmo nome que fora exportado ou então utilizar um alias. Existem 3 formas de se importar `named exports`.

```js
// Importando diretamente valor a valor, para isso é necessário o uso de chaves
import { firstname, lastname } from './file1.js'
console.log(firstname) // "Robin"

// Importando todos os valores e atribuindo a um objeto
import * as person from './file1.js'
console.log(person.firstname) // "Robin"

// Importando somente um valor, mas atribuindo um alias para o valor
import { firstname as username } from './file1.js'
console.log(username) // "Robin"
```

Cada uma das formas de importar tem suas vantagens.

- Importar um objeto inteiro facilita para identificar de forma rápida de onde está vindo.
- O uso do alias permite importar um método com outro nome para evitar que algum conflito possa acontecer com outro método de mesmo nome.
- Importar valor a valor permite que não importemos coisas que não iremos utilizar naquele momento.

A outra forma de exportar métodos é o `default export`, onde exportamos somente um único valor por arquivo. É o caso do nosso `App` que mostramos em alguns exemplos com React acima. Nesse caso, na hora de importar, não precisa necessariamente possuir o mesmo nome, exemplo:

```js
const robin = {
  firstname: 'Robin',
  lastname: 'Wieruch'
}

export default robin
```

E na hora de importar, podemos utilizar um nome qualquer que não `robin`:

```js
import developer from './file1.js'

console.log(developer)
// output: { firstname: 'Robin', lastname: 'Wieruch' }
```

## Funções de Ordem Superior

As Funções de Ordem Superior (High-order Functions) são um grande conceito na programação, principalmente quando se está indo para o lado funcional. No React, faz total sentido saber sobre esse tipo de funções, pois em algum momento você terá que trabalhar com `high-order component (hoc)` e será muito mais fácil de entender se você souber sobre as high-order functions primeiro.

Talvez você não saiba, mas nós já falamos sobre HOF há pouco tempo ainda nesse post! Isso mesmo, o `map()` é um exemplo de uma HOF, que nada mais é que `uma função que aceita uma ou mais funções como argumento.`

Vamos dar uma olhada no map novamente:

```js
const collection = ['Willian', 'Jonas', 'Marcio']

// Usando Função ES5
collection.map(function (person) {
  return `${person} Developer`
  // Output: ["Willian Developer", "Jonas Developer", "Marcio Developer"]
})

// Usando Arrow Function com {} e return
collection.map(person => {
  return `${person} Developer`
  // Output: ["Willian Developer", "Jonas Developer", "Marcio Developer"]
})

// Usando Arrow Function e return implícito
collection.map(person => `${person} Developer`)
// Output: ["Willian Developer", "Jonas Developer", "Marcio Developer"]
```

Repare que nós temos uma função que é o `map` e ela recebe como parâmetro uma outra função, é esta função usada de parâmetro que irá trabalhar em cima dos dados. Esse tipo de conceito nos permite abstrair melhor as ações, fazendo com que elas sejam de diversas formas, inclusive uma função pode servir para criar outra função maior ou até mesmo criar recursões.

Para entender ainda melhor desse conceito, aconselho dar uma lida [nesse capítulo do Eloquente JavaScript](http://braziljs.github.io/eloquente-javascript/chapters/funcoes-de-ordem-superior/) que mostra vários exemplos bem interessantes.

## Funções de Ordem Superior no React

Como falado antes, no React nós podemos criar componentes com funções simples, os chamados `stateless components`. Então um `high-order component` nada mais é que um `componente` que aceita um outro `componente` como argumento e retorna um `componente`.

Um exemplo, você pode criar um HOC que deixa tudo que é passado em maiúsculo.

```jsx
const yell = (PassedComponent) =>
  ({ children, ...props }) =>
    <PassedComponent {...props}>
      {children.toUpperCase()}!
    </PassedComponent>

const Title = (props) => <h1>{props.children}</h1>
const AngryTitle = yell(Title)

<AngryTitle>Whatever</AngryTitle>
// Output: <h1>WHATEVER!</h1>
```

Alguns detalhes como `children` e `props` ali são do React, então não vamos falar muito sobre eles. Mas entenda que o `children` será o conteúdo passado dentro de um componente, que no nosso caso é o texto `Whatever`. E o `props` é um objeto simples que são passados através de atributos para o componente.

Temos ali um método chamado `yell` que recebe um componente e utiliza o mesmo para encapsular o conteúdo, somente alterando o valor passado do children para ficar em maiúsculo.

Temos também o componente `Title` que recebe um atributo e o imprime na tela entre `<h1></h1>` de forma bem simples.

E o componente que faz essa conexão toda, que é o `AngryTitle`, que é responsável por chamar o método `yell` e dentro dele passa o componente `Title`.

Dessa forma, a string `Whatever` é passada para a função acima que transforma essa string em maiúscula e encapsula no componente `Title`, que por sua vez imprime o `<h1>WHATEVER!</h1>` na tela.

Isso pode parecer meio "inútil" e embolado, mas facilita e muito em abstrações maiores. Um grande exemplo que usa HOC é o Redux, que usa o `connect` para passar valores da `store` para os componentes.

Outra coisa útil é que extraindo funções em high-order functions para fora do componente React pode auxiliar para testar estados em isolamento também. Um exemplo abaixo:

```jsx
export const doIncrement = state => ({ counter: state.counter + 1 })

export const doDecrement = state => ({ counter: state.counter - 1 })

class Counter extends Component {
  state = {
    counter: 0
  }

  onIncrement = () => {
    this.setState(doIncrement)
  }

  onDecrement = () => {
    this.setState(doDecrement)
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        <button onClick={this.onIncrement} type="button">
          Increment
        </button>
        <button onClick={this.onDecrement} type="button">
          Decrement
        </button>
      </div>
    )
  }
}
```

Repare que temos os métodos `doIncrement` e `doDecrement` fora do componente e exportados. Assim nós conseguimos testar os métodos de forma isolada e organizada.

## Destructuring e Spread Operators

Um pouco acima tinha um tal de `...props`, que é usado para caramba no React, e isso é mais uma das maravilhas que vieram com o ES6. É muito comum se querer acessar várias propriedades de um `state` ou do `props` do componente, ao invés de assinalar variáveis um a um, podemos usar o destructuring para isso.

```js
// sem destructuring
const users = this.state.users
const counter = this.state.counter

// com destructuring
const { users, counter } = this.state
```

Ali já teremos as variáveis `users` e `counters` criadas, sem precisar fazer uma a uma. E isso é especialmente benéfico quando trabalhamos com `stateless components`, pois iremos sempre receber o objeto `props` em nossa função. Assim poderemos já chamar o conteúdo diretamente de `props` ao invés de o objeto todo.

```jsx
// sem destructuring
function Greeting(props) {
  return <h1>{props.greeting}</h1>
}

// com destructuring
function Greeting({ greeting }) {
  return <h1>{greeting}</h1>
}
```

E quanto aos pontinhos? Bom, esse é o `spread operator`, ele permite separar partes de um objeto, tendo propriedades específicas separadas e o resto num objeto.

```js
const { users, ...rest } = this.state
```

Ali nós teremos a propriedade `users` separada e o resto ficará no objeto `rest`. No nosso exemplo acima, nós queríamos o valor de `children` separado e para não perder nenhuma outra propriedade, nós mantivemos o resto do objeto `props`, usando o spread operator.

## Conclusão

Bom galera, sei que o post ficou grandinho, mas espero que tenha sido útil para vocês. Muitas pessoas dizem que React tem uma curva de aprendizado muito grande e é difícil, mas na maioria das vezes, não é o React em si, mas algumas coisas básicas da linguagem.

Se você acha que faltou algum detalhe ou tem outras referências legais, bota aí nos comentários! =)
