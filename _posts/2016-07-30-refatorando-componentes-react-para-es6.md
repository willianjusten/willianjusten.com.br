---
layout: post
title: "Refatorando componentes React de ES5 para ES6"
date: 2016-07-30 03:10:26
image: '/assets/img/react-es5-es6/main.png'
description: "Aproveite a nova sintaxe e entenda a diferença entre os códigos."
main-class: 'js'
color: '#D6BA32'
tags:
- react
- js
- tutorial
categories:
- "Aprendendo ReactJS"
twitter_text: "Aproveite a nova sintaxe e entenda a diferença entre os códigos."
introduction: "Aproveite a nova sintaxe e entenda a diferença entre os códigos."
---

## Introdução

Fala pessoal, vou ouvindo uma banda chamada [Balmorhea](https://open.spotify.com/artist/1U0FaHAc4fcwQcYEJFgkm9), que é uma banda de post-rock instrumental, tem um som ótimo para estudar/codar, pois é calma e tem várias sonoridades.

São 3:20 da manhã e a insônia não me deixa dormir, eu deveria estar fazendo mil outras coisas, mas sei lá, quando vem a vontade de escrever, melhor obedecer né. Só não sei quando vou postar, quem sabe se eu terminar antes de dormir =)

Esse é um post bem legal, especialmente para quem está começando, pois vou mostrar para vocês como seria um código em ES5 e depois em ES6. Então, para quem olhar tutoriais na internet escritos de diferentes formas, pelo menos vai conseguir se guiar e entender o que se está passando ali. Vou separar em vários trechinhos bem pequeninos, assim vai facilitar o entendimento de cada sintaxe.

### Importando o React

Em ES5 seria o modelo normal do CommonJS:

```js
var React = require('react');
var PropTypes = require('prop-types');
```

Já em ES6 usando o sistema de [import de módulos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import):

```js
import React, { PropTypes } from 'react';
```

Se você reparar, no `PropTypes` eu utilizo as chaves em volta, isso significa que eu estou pegando só uma parte do módulo `react`, que é o `PropTypes`, evitando ter que digitar `React.PropTypes` toda vez que precisar. Isso se chama [Object destructuring](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

### Criando um componente e exportando

Em ES5 nós criamos componentes utilizando o método `createReactClass` e depois nós os exportamos usando o `module.exports`.

```js
var MeuComponente = createReactClass({
    ...
});

module.exports = MeuComponente;
```

Em ES6, você pode criar uma classe e extender de `React.Component` para ter as funcionalidades do React.

```js
export default class MeuComponente extends React.Component {
    ...
}
```

Repare que eu estou também exportando diretamente o `MeuComponent` passando o `export default` no início. Quando eu passo o `default`, estou dizendo que não me importo em qual nome ele vai receber quando for importado. Se eu tivesse colocado só `export`, eu obrigatoriamente teria que importar com o mesmo nome. Outra forma de escrever exportando seria removendo o `export default` no início e colocando `export default MeuComponente;` ao final do código, que é minha opção favorita.

```js
class MeuComponente extends React.Component {
    ...
}

export default MeuComponente;
```

### PropTypes e getDefaultProps

~~Em ES5, meu objeto de propTypes fica **dentro** da minha classe, assim como tenho um método para definir minhas propriedades default.~~
**update 17/05/2018** - após a versão 15.5 PropTypes foi colocado em uma biblioteca separada do React

```js
var React = require('react');
var PropTypes = require('prop-types');

var MeuComponente = createReactClass({
    propTypes: {
        title: PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        return {
            title: 'Heey',
        };
    }
});
```

~~Já em ES6, tanto a definição de `PropTypes` quanto o `defaultProps` vão para o lado de **fora**.~~

```js
import React from 'react';
import PropTypes from 'prop-types;

export default class MeuComponente extends Component {
    ...
}

MeuComponente.propTypes = {
    title: PropTypes.string.isRequired,
}

MeuComponente.defaultProps = {
    title: 'Heey',
};
```

### getInitialState

Para definir estados iniciais ao meu componente, em ES5 eu preciso usar o método `getInitialState`.

```js
var MeuComponente = createReactClass({
    getInitialState: function() {
        return {
            title: this.props.title,
        };
    },
});
```

Como em ES6 estamos criando classes, nós temos o `constructor`, que como o nome já diz, irá construir nossa instância base, então é lá que vamos definir nossos estados iniciais.

```js
export default class MeuComponente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        };
    }
}
```

### Fazendo Bind dos métodos

Esse talvez seja o ponto de maior incidência de erros da história do React! Muita gente já deve ter ido dormir pensando "Por que meu método tá dando undefined? Tá tudo certinho..."

O que acontece é que quando se utilizava o `createReactClass`, ele já fazia o [autobinding](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding), fazendo a ligação do `this` a todos os métodos.

Em ES5 temos:

```js
var MeuComponente = createReactClass({
    handleClick: function(event) {
        this.setState({
            liked: !this.state.liked,
        });
    }
});
```

Em ES6, precisaremos fazer o bind manual então:

```js
export default class MeuComponente extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            liked: !this.state.liked,
        });
    }
}
```

Reparem que eu faço o bind no `contructor`, que é a forma correta de se fazer. Se você já viu um bind direto na função, **corrija**, é uma má prática.

### Shorthand Syntax

Se você reparar no exemplo acima, em ES5 eu uso `handleClick: function()...` e já no ES6 eu escrevo só `handleClick()` direto. Isso acontece pois todos os métodos são propriedades do objeto. Em ES5, eu preciso definir o nome da propriedade e então chamar uma função, que é o método que eu quero em si.

```js
var MeuComponente = createReactClass({
    componentWillMount: function() {
        ...
    }
});

module.exports = MeuComponente;
```

Em ES6, como temos a [Shorthand Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions), podemos simplesmente escrever como método direto:

```js
export default class Mycomponent extends React.Component {
    componentWillMount() {
        ...
    }
}
```

## Conclusão

Bom pessoal, essas são as principais mudanças de escrita para o React. Espero que você tenha entendido tudo que está ocorrendo e se encontrar mais posts por aí, consiga se virar, não importando em qual sintaxe esteja escrito =)

Lembrem-se sempre de utilizar boas práticas de escrita, não importando se está em ES5 ou em ES6, um ótimo styleguide, que tem bastante dica mastigadinha e explicada é o [Airbnb Styleguide](https://github.com/airbnb/javascript/tree/master/react), aconselho darem uma olhadinha.
