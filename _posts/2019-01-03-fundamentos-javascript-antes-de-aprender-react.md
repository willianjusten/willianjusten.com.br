---
layout: post
date: '2019-01-03 02:26:13'
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

O [primeiro post](https://willianjusten.com.br/comecando-com-react/) da série eu falo sobre a biblioteca e seus conceitos, então se você quiser ler hoje, ainda vai funcionar e ser eficaz. Mas antes disso, acho que é necessários saber alguns pequenos conceitos para não se perder na hora de estudar o React em si.

O que eu mais vejo são pessoas com dificuldades não no React, mas em coisas básicas como a sintaxe do ES6, high-order functions e até operadores ternários. Esse post vai ser baseado [num outro post em inglês](https://www.robinwieruch.de/javascript-fundamentals-react-requirements) que também fala bastante disso.

Enquanto escrevo, vou ouvindo uma banda recomendada pelo meu amigo [Jonas Mendes](https://nipher.io/), que também é programador. A banda em questão se chama [Solar Fields](https://open.spotify.com/artist/7GyhmlEy51sGUE09A5AWzc?si=P3-T0rYMQ7yyvOnDUDWTJg) e é da Suécia, terra onde meu amigo mora faz um tempinho. Eles tem uma pegada instrumental ambiente, bem relaxante também.

Bom, vamos lá, vou separar os tópicos aqui, para facilitar um pouquinho:


### Primeiro contato com React

Quando você entra no mundo React, é bem provável que você inicie o projeto utilizando o [create-react-app](https://github.com/facebook/create-react-app), já que essa é uma das ferramentas mais conhecidas para quem quer iniciar um projeto React sem muitas dificuldades e já com toda uma estrutura pronta. Isso tudo com o suporte do próprio time do React e Facebook. Ou então você pode acabar indo para alguns tutoriais na internet também.

Mas quando você vai ver os arquivos, é bem possível que dê de cara com um código como:

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
    );
  }
}

export default App;
```

E logo de cara você já vai ver um `React class component`, ou seja, o uso de classes dentro do JavaScript. Hoje, isso já deve ser normal para uma grande parcela, mas ainda pode causar dificuldades para alguns iniciantes, já que o uso de classes veio somente com o ES6. E o uso de classes traz consigo conceitos como: definições de classe, métodos de classe e herança. Dentro do React não somos obrigados a usar somente classes, mas em algum momento você pode precisar/ver e vai ter que entender esses conceitos.

### React e Classes no JavaScript

Antes do ES6, já havia uma forma de trabalhar com heranças e objetos, utilizando os [prototypes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain), as Classes no ES6 nada mais são que um "sugar syntax" disso, ou seja, por debaixo dos panos também é usado o prototype. 

Para entender melhor as classes, vamos usar sem o React no seguinte código abaixo:

```js
class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getName() {
    return `${this.firstname} ${this.lastname}`;
  }
}

const me = new Developer('Willian', 'Justen');

console.log(me.getName()); // "Willian Justen"
``` 

A classe `Developer` descreve uma entidade, que é usada como uma "forma" (pense naquelas formas de biscoito mesmo), para poder criar `instâncias` dessa entidade, comumente chamamos essas instâncias de `objetos`. Ou seja, a partir de uma classe, podemos criar vários objetos que `herdam` propriedades e métodos de sua classe.

Para criar uma instância baseada na classe, nós utilizamos a seguinte sintaxe: `new Nome_Da_Classe(paramêtros_aqui)` e assinalamos esse valor a uma variável, que é o caso da nossa variável `me` acima.

Uma classe pode ou não conter um `constructor`, que é um método inicial usado para definir certas propriedades que esse objeto irá possuir. Dentro das classes, também podemos criar nossos próprios métodos, que são chamados diretamente, sem necessidade de usar `function`, que é o caso do método `getName`.

A instância da classe é representada pelo objeto `this` dentro da classe e pela sua variável assinalada quando fora da classe, ou seja, para outros escopos, a nossa instância será a variável `me`, mas para métodos internos como o `getName`, nós utilizamos o `this`.

As classes normalmente são utilizadas para trabalhar com herança na programação orientada a objeto. E no JavaScript não poderia ser diferente, para criar essa herança entre classes, nós usamos a palavra `extends`. Abaixo segue um exemplo onde criamos uma outra classe `ReactDeveloper` que herda de `Developer`.

```js
class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getName() {
    return `${this.firstname} ${this.lastname}`;
  }
}

class ReactDeveloper extends Developer {
  getJob() {
    return 'React Developer';
  }
}

var me = new ReactDeveloper('Robin', 'Wieruch');

console.log(me.getName());
console.log(me.getJob());
```

Repare que além do novo método `getJob`, também é possível usar o método `getName`, assim como suas propriedades de `firstname` e `lastname`.

E bom, é basicamente isso que você precisa para entender como funcionam os `React Class Components`. Uma classe JavaScript é usada para definir um componente React, mas isso só é possível, pois nós estendemos/herdamos tudo de `Component` que faz parte do pacote `react`.

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to React</h1>
      </div>
    );
  }
}

export default App;
```

E é por isso que o método `render()` é obrigatório nos `React Class Components`, pois esse método que vai instruir o browser de que algo é preciso ser mostrado na tela. Mais para frente você vai ver que os métodos de ciclo de vida do React ([lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle)) também são só disponíveis em `React Class Components` ou no novíssimo `React Hooks`.

Bom, apesar de estar falando bastante de classes aqui e mostrando que é quase uma base para os componentes, o mais aconselhado é que você estenda somente o `React.Component` e trabalhe mais com composição ao invés de herança, existe inclusive uma parte na [documentação oficial falando sobre isso](https://reactjs.org/docs/composition-vs-inheritance.html).

### Template Literals

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

### Arrow Functions

Outra coisa que veio com o ES6, mas ainda causa confusão para os iniciantes são as arrow functions. Isso muito acontece pois tem momentos que as chaves são necessárias, outros momentos que o `return` e necessário e vezes que ambos podem ser omitidos. Abaixo seguem os exemplos:

```js
// Função em ES5
function getGreeting() {
  return 'Welcome to JavaScript';
}

// Função em ES6 com {} e por isso o return obrigatório
const getGreeting = () => {
  return 'Welcome to JavaScript';
}

// Função em ES6 sem {} e return implícito
const getGreeting = () =>
  'Welcome to JavaScript';
```

Se você tem um método de uma linha só, as chaves e o return não se fazem necessários, mas se os métodos são um pouco maiores, há essa necessidade, é bom não confundir. Já tive muito aluno travando por esquecer de colocar o `return` mas ter adicionado as chaves.

### Funções como componentes no React

O React usa o melhor dos diferentes paradigmas da programação. No lado da programação orientada a objeto, ele permite a criação dos `React class components`, que permitem herdar métodos da API do React, assim como propriedades, como o `this.state`. 

Por outro lado, o React também possuir vários conceitos de programação funcional por trás. Permitindo a criação dos famosos `stateless components`, que são funções puras que definem componentes React.

Os `stateless components` são bem mais simples, são basicamente funções que recebem parâmetros, que são os `props` e renderizam o elemento na tela. Eles não mexem em estados e nem possui todo o conjunto da API do React. Mesmo assim, eles são a forma preferida e mais performática de se criar componentes em React. Abaixo seguem formas possíveis de se criar um `stateless component`.

```jsx
// Função normal
function Greeting(props) {
  return <h1>{props.greeting}</h1>;
}

// Arrow Function com {} e return
const Greeting = (props) => {
  return <h1>{props.greeting}</h1>;
}

// Arrow Function sem {} e return implícito
const Greeting = (props) =>
  <h1>{props.greeting}</h1>
```

### Sintaxe do React Class Component

As formas de definir componentes no React estão sempre evoluindo. No início era possível ver o uso do método `React.createClass`, mas com a chegada do ES6, passamos a ver mais o uso como mostrado acima, estendendo `Component` do pacote do `react.

E exatamente por essa constante evolução, é possível que você veja diferentes formas de se fazer a mesma coisa. Uma das formas de trabalhar com estados (`states`) e métodos é assim:

```jsx
class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState(state => ({ counter: state.counter + 1 }));
  }

  onDecrement() {
    this.setState(state => ({ counter: state.counter - 1 }));
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        <button onClick={this.onIncrement} type="button">Increment</button>
        <button onClick={this.onDecrement} type="button">Decrement</button>
      </div>
    );
  }
}
```
Onde fazíamos o bind do objeto nos métodos dentro do construtor, para assim poder utilizá-los com states e ações no nosso template. Mas com o passar do tempo, esse processo de fazer [bind](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56) acabava sendo repetitivo e chato. Para evitar isso, podemos utilizar as Arrow Functions, que já fazem o autobind sem a necessidade de fazê-los no construtor. Aliás, caso não estejamos passando nenhum `props`, podemos inclusive omitir o uso do construtor. Ficando assim:

```jsx
class Counter extends Component {
  state = {
    counter: 0,
  };

  onIncrement = () => {
    this.setState(state => ({ counter: state.counter + 1 }));
  }

  onDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        <button onClick={this.onIncrement} type="button">Increment</button>
        <button onClick={this.onDecrement} type="button">Decrement</button>
      </div>
    );
  }
}
```

### Map, Reduce e Filter no React







