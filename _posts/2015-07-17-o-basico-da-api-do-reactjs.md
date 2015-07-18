---
layout: post
title: "#3 - O básico da API do ReactJS"
date: 2015-07-17 00:18:37
image: '/assets/img/react-3/main.png'
description: "Aprenda um pouco mais sobre a API do React e como começar a brincar."
tags:
- react
- js
categories:
- Aprendendo ReactJS
twitter_text: "Aprenda um pouco mais sobre os principais métodos do ReactJS."
---

## Introdução

Para animar um pouco, a trilha sonora escolhida é o [novo cd do Tame Impala - Currents](https://open.spotify.com/album/0rxKf57PZvWEoU8v3m5W2q), aproveitando que lançou essa semana.

Como prometido, vou dar continuidade a série de posts sobre ReactJS e para acompanhar tanto essa série, como outras, é só ir no link [series](http://willianjusten.com.br/series/).

Nos posts anteriores eu falei um pouco do que é o React e as formas de utilizá-lo em um projeto, agora eu irei mostrar e explicar um pouco da API do React para podermos começar a brincadeira.

Tentarei não fazer um post grande e cansativo, portanto, irei separar os conceitos básicos e no decorrer dos outros posts, onde iremos criar mini aplicações, a gente vai pegando mais coisas.

## Criando e Renderizando componentes

O primeiro de tudo é saber como podemos criar os componentes e como renderizá-los. Para isso, irei demonstrar com um simples `Hello World`, mas lembre-se que isso poderiam ser componentes de qualquer forma. 

### React.render

{% highlight js %}
ReactComponent render(
  ReactElement elemento_para_criar,
  DOMElement container,
  [function callback]
)
{% endhighlight %}

O método `render` é um dos métodos mais importantes do React e que será responsável por renderizar elementos. Ele recebe 3 parâmetros, que são o elemento a ser criado, o local onde será inserido no DOM e uma função de callback, que é chamada logo após a renderização.

Um detalhe importante aqui é que, caso o elemento já exista no DOM, o render somente irá atualizar as partes novas no DOM, seguindo o algoritmo de diff, comentado no [primeiro post](http://willianjusten.com.br/comecando-com-react/).

Segue um [vídeo em inglês](http://learnreact.com/lessons/1-render-getting-started), explicando este método.

### Render sem JSX - React.createElement

{% highlight js linenos %}
React.render(
    React.createElement('h1', null, "Hello World!"),
    document.getElementById("content")
);
{% endhighlight %}

Sem o JSX, não temos como adicionar tags html dentro do nosso render, portanto, precisamos criar esses elementos na mão. Para criar, utilizamos o método `createElement`, que recebe 3 parâmetros também. O primeiro parâmetro é a tag html, o segundo é um objeto, que fica responsável pelo conjunto de informações, que podem ser classes, ids, data, estilos, etc.

Segue um [vídeo em inglês](http://learnreact.com/lessons/2-createelement), falando sobre este método. 

### Render com JSX

{% highlight js %}
React.render(
    <h1>Hello World!</h1>,
    document.getElementById("content")
);
{% endhighlight %}

Para o render com o JSX, basta criamos o elemento com as tags do próprio html e ligarmos a um container.

## React.createClass

{% highlight js %}
ReactClass createClass(object specification)
{% endhighlight %}

Serve para criar um componente dada uma especificação. Um componente implementa um método render que retorna um filho único. Esse filho pode ter uma estrutura arbitrária. A vantagem deste método é que nos permite já criar componentes para serem reaproveitados.

{% highlight js linenos %}
var Hello = React.createClass({
    render: function() {
      return (
        <h1>Hello World!</h1>
      );
    }
});

React.render(
    <Hello />,
    document.getElementById("content")
);
{% endhighlight %}

Como podemos notar, com a utilização do `React.createClass`, habilitamos um componente com o nome da variável determinada, no nosso caso `Hello` e então podemos chamá-lo em diversos lugares como `<Hello />`, conforme indicado na linha `10`.

Segue um [vídeo em inglês](http://learnreact.com/lessons/4-createclass), explicando como funciona.

### React.component (ES6)

No ES6, nós ganhamos classes para o nosso lindo javascript e, com isso, conseguimos extender métodos para essa classe, permitindo também a criação de componentes reutilizáveis, conforme o exemplo a seguir:

{% highlight js %}
class Hello extends React.Component {
    render(){
        return (
            <h1>Hello World!</h1>
        )
    }
}

React.render(
    <Hello />,
    document.getElementById("content")
)
{% endhighlight %}

### Exemplos 

Seguem os exemplos rodando no Codepen:

<p data-height="266" data-theme-id="11319" data-slug-hash="JdBMya" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/JdBMya/'>React Render Examples</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

Repare que eu criei diferentes containers para que cada elemento fosse renderizado em um desses espaços.

### Usando JS dentro do render

Já que é tudo JS, podemos usar o próprio JS para brincar dentro do render, como, por exemplo, receber um array e iterar nele para poder renderizar uma lista.

{% highlight js %}
var frutas = ['Banana', 'Maçã', 'Uva'];

React.render(
  <div>
  {
    frutas.map(function (fruta) {
      return <li>{fruta}</li>
    })
  }
  </div>,
  document.getElementById('compras')
);
{% endhighlight %}

<p data-height="266" data-theme-id="11319" data-slug-hash="waxpmW" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/waxpmW/'>React Render Examples</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

No exemplo, eu tenho um array `frutas` e através do comando `map`, eu itero e mando retornar fruta por fruta dentro de uma lista com o id `compras`.

## Props

Quando utilizamos nossos componentes no React, nós podemos adicionar atributos a eles, dos quais chamamos de `props`. Esses atributos ficam disponíveis para nosso componente através do `this.props` e podem ser usados no método de `render` para renderizar dados dinâmicos, de acordo com o quisermos passar.

{% highlight js %}
var Hello = React.createClass({
    render: function () {
        return (
            <h1>Hello { this.props.name }!</h1>
        );
    }
})

React.render(<Hello name='Willian' />, document.getElementById('hello'));
{% endhighlight %}

Olhando no exemplo, notamos que ele recebe o nome da variável `name` e consegue renderizar o nome corretamente.

<p data-height="266" data-theme-id="11319" data-slug-hash="qdypxL" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/qdypxL/'>React Render Examples</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## Especificações, Ciclos de Vida e Estado

### Especificações (Specs)

Quando criamos um elemento e utilizamos o `render`, ele irá procurar pelas propriedades (this.props) e estado (this.state) daquele elemento. Se você precisar interagir com essas informações, existem alguns métodos para isso.

#### getInitialState

Esse método é chamado uma só vez antes de renderizar e ele servirá para definir um valor para o `this.state` do elemento, para que ele possa ser utilizado depois.

#### getInitialProps

Esse método é chamado uma só vez antes de renderizar e ele servirá para definir um valor para o `this.props` do elemento, para que ele possa ser utilizado depois.

### propTypes

O objeto de `propTypes` permite validar as propriedades que estão sendo passadas para os componentes.

### Ciclos de Vida (Lifetime Cycles)

O método de `render` é responsável por pegar as informações e renderizar na tela, mas existem outros ciclos que podem existir dentro dessa renderização, que são:

* `componentWillMount`: chamado uma vez só, tanto do lado client quando do server antes da renderização acontecer.
* `componentDidMount`: chamado uma vez só, só na parte do cliente, depois da renderização.
* `shouldComponentUpdate`: chamado depois da renderização quando as propriedades e o estado está sendo definido. Ele retorna `true` ou `false` para dizer se o elemento deve atualizar.
* `componentWillUnmount`: chamado quando desejamos desmontar o componente.

Existem mais métodos na API, basta dar uma [olhada aqui](https://facebook.github.io/react/docs/component-specs.html).

## Criando um timer

Já tendo os conceitos acima, conseguimos criar um simples timer. Segue o código e vamos destrinchá-lo:

{% highlight js linenos %}
var Timer = React.createClass({

    getInitialState: function(){
        return { elapsed: 0 };
    },

    componentDidMount: function(){
        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
      this.setState({elapsed: new Date() - this.props.start});
    },

    render: function() {
        
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(1);    

        return (
            <p>Já se passaram <b>{seconds}</b> segundos.</p>
        );
    }
});

React.render(
    <Timer start={Date.now()} />,
    document.getElementById('timer')
);
{% endhighlight %}

Na linha `3`, usamos o método `getInitialState` para poder definir que o estado inicial é quando `elapsed` vale 0, ou seja, não passou o tempo ainda.

Na linha `7`, estamos usando o `componentDidMount` que será chamado assim que o elemento for renderizado na página, setamos aqui o `setInterval` para que ele fique chamando o método `tick` para ficar atualizando o tempo durante esse intervalo.

Na linha `11`, colocamos o `componentWillUnmount` para dizer que se por algum motivo o componente for removido da tela, ele ativar aquele evento, que nada mais é que limpar o interval, já que não iremos mais atualizar nada na tela.

A linha `15` é onde criamos uma função de auxílio, que servirá para ir definindo o estado do meu componente, que nada mais é que o tempo que já passou. Para isso, utilizamos o método `setState`. Repare que utilizamos o seguinte trecho `this.props.start`, isso significa que estamos passando para o nosso componente uma propriedade com o nome `start` (guarde isso, por enquanto).

Na linha `25` estamos basicamente fazendo a etapa de renderização com o `render`, onde usamos a variável `seconds` que é definida na linha `21` usando como parte do cálculo o estado do componente, que é setado por `this.state.elapsed`.

Por fim, na linha `31` estamos chamando o nosso componente `Timer` e passando a tal propriedade `start`, que seria o tempo de agora, para que ele possa iniciar a contagem do tempo.

Segue um exemplo live no Codepen:

<p data-height="266" data-theme-id="11319" data-slug-hash="MwBrBr" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/MwBrBr/'>React Render Examples</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

O legal é que o React irá modificar somente o elemento que está com estado sendo modificado, ou seja, somente o que está dentro de `<b>{seconds}</b>`, o resto da frase permanecerá intacta, com isso, impacta menos o DOM.

## Conclusão

Bom, esses são os principais métodos do React e com eles já conseguimos fazer bastante coisa, se quiser se aprofundar, vale dar uma olhada na [documentação](https://facebook.github.io/react/docs/top-level-api.html). Durante a elaboração dos códigos, eu foquei somente nas possibilidades do React e não no JS em si, caso você ainda não se sinta confortável com algumas das coisas feitas acima, aconselho que volte um pouco e estude mais de JS, para que possa desenvolver melhor. Lembrando que é sempre mais importante saber a linguagem do que uma biblioteca. 

#### Ahhh, mas como eu aprendo mais de Javascript?

Tem um curso do [Fernando Daciuk](https://twitter.com/fdaciuk) que é foda para caramba e vai te ensinar a realmente virar um Ninja no JS, se quiser saber mais do curso, basta ir [nesse link](http://blog.da2k.com.br/curso-javascript-ninja/). Pode parecer propaganda, mas não é, o curso é realmente bom e é realmente importante entender a linguagem antes de partir mais para frente. Mas qualquer dúvida, é claro que você pode falar nos comentários abaixo!!




