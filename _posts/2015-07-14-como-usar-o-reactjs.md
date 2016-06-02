---
layout: post
title: "#2 - Como usar o ReactJS"
date: 2015-07-14 12:16:16
image: '/assets/img/react-2/main.png'
description: "As diferentes formas de se usar e se iniciar um projeto com ReactJS."
main-class: 'js'
color: '#D6BA32'
tags:
- react
- js
- tutorial
categories:
- Aprendendo ReactJS
twitter_text: "As diferentes formas de se usar e se iniciar um projeto com ReactJS."
introduction: "As diferentes formas de se usar e se iniciar um projeto com ReactJS. Veja usando o famoso JSX, sem ele e alguns boilerplates famosos."
---

## Introdução

A trilha sonora fica por conta de [Tame Impala](https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb), uma banda bastante psicodélica e que fez um dos melhores shows que já pude assistir =)

Como prometido, vou dar continuidade a série de posts sobre ReactJS e para acompanhar tanto essa série, como outras, é só ir no link [series](http://willianjusten.com.br/series/).

## Iniciando

No [post anterior](http://willianjusten.com.br/comecando-com-react/) eu falei um pouquinho do que era o React, como ele funciona e uma nova forma de se pensar em componentes que ele traz. Só que ficou faltando o mais importante, como usar?

Nesse post irei dar algumas alternativas de como trabalhar com o ReactJS, para assim já podermos começar a trabalhar ainda mais com ele. Lembrando que nenhuma das formas é a melhor, cada uma tem sua utilidade em determinado momento.

Não se preocupe com todos os detalhes dos códigos, pois iremos ver mais detalhadamente em outros posts. Não curto muito exemplos de Hello World, já que não ensinam nada, mas para esse caso será útil, visto que só quero mostrar as formas de uso. Estes exemplos estão no [zip do getting started](https://facebook.github.io/react/downloads/react-15.1.0.zip) que existe na documentação do React, mas que não são explicados.

Se você quiser se adiantar um pouco, aconselho a ir dando uma lida na [API do React](http://facebook.github.io/react/docs/top-level-api.html), que contém todos os comandos primários que vamos utilizar nos exemplos.

### Arquivos

Para usar o React da forma mais simples, basta baixar uma de suas versões na [página de downloads](https://facebook.github.io/react/downloads.html).

Ou você pode utilizar de uma CDN também:

**update: (02/06/2016)** - O react se desmembrou em react e react-dom desde o lançamento do post. Agora qualquer tratamento de renderização e DOM são tratados no react-dom.

{% highlight html %}
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
{% endhighlight %}

O carregamento do Babel serve para poder transpilar em tempo real, o seu código.

Existe também como baixar via [Bower](http://bower.io/):

{% highlight bash %}
bower install --save react
{% endhighlight %}


### Básico sem JSX

Essa forma é a mais básica de todas e funciona como se fosse usar uma biblioteca normal de Javascript. Baixe o arquivo do React e chame no seu html:

{% highlight html %}
<script src="react.js"></script>
<script src="react-dom.js"></script>
{% endhighlight %}

E logo após a chamada da biblioteca, coloque o seu script, seja ele inline ou chamando de um outro arquivo.

{% highlight js linenos %}
<script>
  var ExampleApplication = React.createClass({
    render: function() {
      var elapsed = Math.round(this.props.elapsed  / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message =
        'O React está rodando com sucesso há ' + seconds + ' seconds.';
        return React.DOM.p(null, message);
      }
  });

  var ExampleApplicationFactory = React.createFactory(ExampleApplication);
  var start = new Date().getTime();

  setInterval(function() {
    ReactDOM.render(
      ExampleApplicationFactory({elapsed: new Date().getTime() - start}),
      document.getElementById('container')
    );
  }, 50);
</script>
{% endhighlight %}

**update: (02/06/2016)** - na linha `16` atualizamos para utilizar o `ReactDOM.render()`, pois ele agora é separado do React original.

Utilizando o React em JS cru, necessitamos de algumas manipulações para criação de elementos ou utilizar alguns que o próprio React nos dá.

Como disse anteriormente, não se preocupe com todo o código, visto que irei falar sobre cada detalhe mais tarde. Só se atente as linhas `8`, `12` e `17`, que são as mais específicas para o caso de React sem JSX.

Na linha `8`, estamos utilizando um factory built-in do React para selecionar a tag `p` no DOM e inserir o valor de `message`. Na linha `12` estamos criando um elemento de React com o método [createFactory](http://facebook.github.io/react/docs/top-level-api.html#react.createfactory), que nos permitirá extendê-lo e utilizá-lo sempre que quisermos. Na linha `17`, estamos chamando o elemento criado, passando a propriedade `elapsed` e seu valor.
Essa sintaxe é mais verbosa e precisaremos escrever um pouco mais, mas ela é Javascript puro e os mais puristas, que reclamam de Html no JS, não podem reclamar.


### Utilizando JSX

O JSX é uma sintaxe criada para o React, que se assemelha ao XML e que facilita bastante o nosso workflow. Se quiser saber um pouco mais sobre, aconselho [este link](https://facebook.github.io/react/docs/jsx-in-depth.html).

Para usar essa sintaxe diretamente no Browser, precisamos do Babel e do React chamados no nosso html:

{% highlight html %}
<script src="react.js"></script>
<script src="react-dom.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>
{% endhighlight %}

Podemos ter o JSX de duas formas: inline, utilizando a tag `<script type="text/jsx">` ou num arquivo externo com a extensão `.jsx`. Segue um exemplo usando um script inline:

**update: (02/06/2016)** - antigamente era utilizado o JSXTransformer, mas agora o Babel fica encarregado dessa mudança. Então, no `type` do script, precisamos colocar `text/babel`, para que o Babel consiga <interpretar class=""></interpretar>

{% highlight js linenos %}
<script type="text/babel">
  var ExampleApplication = React.createClass({
    render: function() {
      var elapsed = Math.round(this.props.elapsed  / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message =
        'React has been successfully running for ' + seconds + ' seconds.';
        return <p>{message}</p>;
      }
  });
  var start = new Date().getTime();
  setInterval(function() {
    ReactDOM.render(
      <ExampleApplication elapsed={new Date().getTime() - start} />,
      document.getElementById('container')
    );
  }, 50);
</script>
{% endhighlight %}

As grandes diferenças nessa sintaxe estão na linha `8` e `14`. Na linha `8`, não necessitamos mais de utilizar função para criar um elemento, bastando apenas utilizar a tag html que quisermos. E na linha `14` é onde criamos nosso componente, que está recebendo suas devidas propriedades.


### Utilizando o ES6 (Harmony)

Com o ES6 vindo aí com força total, o React passou a dar suporte a partir da [versão 0.13.0 Beta 1](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html). Com isso podemos utilizar de algumas features novas, como Classes, fat arrows, autobinding, mixins e etc. Se quiser saber um pouquinho mais sobre ES6, tem o site [JSRocks](http://jsrocks.org/pt-br/), que é cheio de coisinhas bacanas.

**update: (02/06/2016)** - antes utilizámos o parâmetro `harmony=true`, agora é só passar que o tipo é `text/babel` para funcionar.

{% highlight js linenos %}
<script type="text/babel">
  class ExampleApplication extends React.Component {
    render() {
      var elapsed = Math.round(this.props.elapsed  / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message =
        `React has been successfully running for ${seconds} seconds.`;
        return <p>{message}</p>;
    }
  }
  var start = new Date().getTime();
    setInterval(() => {
      ReactDOM.render(
      <ExampleApplication elapsed={new Date().getTime() - start} />,
      document.getElementById('container')
    );
  }, 50);
</script>
{% endhighlight %}

O grande diferencial aqui fica por conta da criação de uma classe `ExampleApplication` e a extensão que fazemos de `React.Component` para criar o nosso componente. A utilização de `${}` para concatenar uma variável e o uso do fat arrow `=>` para nos facilitar e escrever menos, também são algumas das vantagens do ES6.


### JS pré-compilado

Podemos escrever em `JSX` e antes de enviar para nosso servidor, podemos fazer um build compilando esse `JSX` para `JS`. 

**update: (02/06/2016)** - Antigamente utilizávamos o react-tools para fazer esse trabalho de compilação. Mas agora fica tudo a cargo do babel. Onde instalamos a cli do babel e o seu preset para react.

{% highlight bash %}
npm install -g babel-cli
npm install babel-preset-react
{% endhighlight %}

E então rodarmos o compilador, definindo que o preset é react e para onde queremos jogar nosso código compilado.

{% highlight bash %}
babel example.js --presets react --out-dir=build
{% endhighlight %}

Basicamente o que muda aqui é que iremos escrever em `JSX`, mas o código a subir será `JS` puro.

### Usando o CommonJS

Muita gente que trabalha com `NodeJS` está acostumada com a sintaxe dele e seu sistema modular, que é o padrão do CommonJS. O React também permite essa abordagem (que é linda <3).

Dessa forma, não precisamos chamar o `React` diretamente no nosso markup, visto que ele será chamado via `require` dentro do código e quando ele for compilado, já terá todo ele incluso. O trecho de código chamando o React seria:

{% highlight js %}
var React = require('react');
var ReactDOM = require('react-dom');
{% endhighlight %}

Para esses casos, eu sempre opto por iniciar um projeto com o `npm init` e então instalo as dependências no meu projeto, para que fiquem na pasta `node_modules`. Para trabalhar com o CommonJS, eu utilizo bastante o [Browserify](http://browserify.org/), mas você também pode optar pelo [Webpack](http://webpack.github.io/), que inclusive é preferido pelos devs de React.

Para o browserify, basta instalar os seguintes módulos:

{% highlight bash %}
npm install browserify envify reactify react --save-dev
{% endhighlight %}

E para compilar usando o browserify, basta rodar:

{% highlight bash %}
browserify --debug --transform reactify index.js > bundle.js
{% endhighlight %}

Onde ele irá pegar o conteúdo de `index.js` e compilar para `bundle.js`.


### Boilerplates

Existem alguns boilerplates lá no github que já vem com algumas estruturas bem organizadas, se você tiver interesse em ver como alguns organizam, seguem os links:

* [mozilla/neo](https://github.com/mozilla/neo)
* [gaearon/react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)
* [erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)
* [cloverfield-tools/universal-react-boilerplate](https://github.com/cloverfield-tools/universal-react-boilerplate)
* [jakemmarsh/react-rocket-boilerplate](https://github.com/jakemmarsh/react-rocket-boilerplate)
* [christianalfoni/react-app-boilerplate](https://github.com/christianalfoni/react-app-boilerplate)

Também existem alguns posts bem interessantes sobre organizações:

* [React JS and a Browserify Workflow (Part 1)](https://www.codementor.io/reactjs/tutorial/react-js-browserify-workflow-part-1)
* [React JS and a Browserify Workflow (Part 2)](https://www.codementor.io/reactjs/tutorial/react-js-browserify-workflow-part-2)
* [Creating the Ultimate Workflow](https://docs.google.com/presentation/d/1X2k7U1iinUSSBJQvKLef4qDRuLhok6gtEl6PFf6op0o/edit)


## Conclusão

Bom, agora que já sabemos para que serve e diversas formas de usar, já poderemos começar a brincar com alguns conceitos do React e fazer algumas brincadeiras, que irão começar no próximo post. Esse post ficou meio grande e talvez um pouco complexo, se tiverem alguma dúvida, só comentarem abaixo =)

## Veja mais posts

[Série sobre React](http://willianjusten.com.br/series/#aprendendo-reactjs)
