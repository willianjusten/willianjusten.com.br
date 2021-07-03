---
layout: post
title: 'Utilizando SVG Sprites com React'
date: 2016-06-03 20:30:39
image: '/assets/img/react-svg/main.png'
description: 'Aprenda a utilizar os famosos ícones SVG dentro do React de forma bem fácil com Stateless Functions.'
main-class: 'js'
color: '#D6BA32'
tags:
  - react
  - js
  - tutorial
categories:
  - 'Aprendendo ReactJS'
twitter_text: 'Aprenda a utilizar ícones SVG dentro do React de forma fácil.'
introduction: 'Aprenda a utilizar os famosos ícones SVG dentro do React de forma bem fácil.'
---

## Introdução

Fala pessoal, para dar início as escritas sobre React, resolvi unir com outra paixão minha, que é o SVG. Então, qual forma melhor de explicar alguma coisa, do que fazendo algo na prática?

Se você ainda não viu nenhum post meu sobre React, eu estou voltando a escrever dentro [dessa série](https://willianjusten.com.br/series/#aprendendo-reactjs), olha lá.

Vou falando e ouvindo [um álbum de remixes do Ludovico Einaudi](https://open.spotify.com/album/5vvLGd70sOZSZddNnIejFv), bom demais esse som =D

## Sprites em SVG

Já fiz dois posts sobre esse tipo de técnica em SVG. Um sobre [sistemas de ícones em SVG](https://willianjusten.com.br/sistemas-de-icones-em-svg/) e um outro sobre a [própria técnica](https://willianjusten.com.br/usando-svg-sprites/) de utilizar sprites em SVG.

A prática consiste basicamente em você ter um arquivo com vários ícones, famoso sprite, com cada ícone sendo um `symbol` do SVG referenciado pelo seu id.

Um exemplo de sprite svg seria:

```html
<svg>
  <symbol id="icon-lamp" viewBox="0 0 57 64">...</symbol>
  <symbol id="icon-globe" viewBox="0 0 57 64">...</symbol>
  <symbol id="icon-chemistry" viewBox="0 0 57 64">...</symbol>
</svg>
```

Se você quiser ver o código extendido, só clicar [neste link](https://willianjusten.com.br/assets/img/react-svg/sprite.svg).

Se você reparar, cada ícone tem o seu próprio `symbol` e também sua própria `viewBox`, que serve para delimitar seu tamanho e área. Para você utilizar um ícone dessa forma, basta você utilizar a tag `use`, seguindo esse exemplo:

```html
<svg>
  <use xlink:href="#icon-lamp" />
</svg>
```

No lugar do `xlink:href`, você passa o id do ícone que você deseja. Para chamar dessa forma, é necessário que o SVG já tenha sido carregado na página anteriormente, para que o `use` consiga encontrar a referência. Mas também é possível utilizar com um sprite totalmente externo, o conhecido `external use`, onde você passa o link da sua imagem + o id, da seguinte forma:

```html
<svg>
  <use
    xlink:href="https://willianjusten.com.br/assets/img/react-svg/sprite.svg#icon-lamp"
  />
</svg>
```

Bom, agora que demos uma revisada em como se utilizar ícones SVG, vamos para a parte do React.

## Componentes Reutilizáveis

Não queremos criar um componente React que simplesmente jogue a nossa chamada do ícone SVG já pronto, nós queremos deixar algo mais parametrizável, para que possamos reutilizar o mesmo código sempre. E isso é muito fácil graças ao React. Para isso, vamos aprender hoje como trabalhar com [Stateless Functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).

## O que são Stateless Functions?

As `stateless functions` são de fato, funções sem estado. Ué? Como assim? Você num tinha dito que os componentes de React tinham estado? Mostrou até [um pouco da API](https://willianjusten.com.br/o-basico-da-api-do-reactjs/).

![Gato com dúvida](https://warosu.org/data/fa/img/0063/58/1371640339134.png)

No React você pode definir seus componentes como funções puras do Javascript, isso mesmo. Sem precisar criar classe, definir estados, nem nada. Você escreve como se fosse Javascript puro mesmo. Vamos dar uma olhada na sintaxe de como funciona:

```jsx
function HelloMessage(props) {
  return <div>Hello {props.name}</div>
}
ReactDOM.render(<HelloMessage name="Willian" />, document.getElementById('app'))
```

Reparem, eu criei uma função chamada `helloMessage`, que recebe um parâmetro `props`. Essa funciona me retorna uma div com um texto dentro escrito "Hello Willian", isso acontece, pois eu estou passando a propriedade `name`, que fica dentro de `props`.

Reescrevendo o código acima em ES6, ficaria assim:

```jsx
const HelloMessage = props => <div>Hello {props.name}</div>
ReactDOM.render(<HelloMessage name="Willian" />, document.getElementById('app'))
```

Ali utilizo `const` e a `fat arrow` do ES6 para diminuir minha escrita e ficar ainda mais bonito meu JS.

Essa forma simplificada é destinada para se criar componentes que não vão ter estados internos e nem vão utilizar os métodos de ciclo de vida de um componente. Num mundo ideal, todos os seus componentes deveriam ser `stateless functions` porque assim conseguimos ter uma performance melhor, evitando verificações e alocamentos de memória desnecessários. Esse é um padrão altamente recomendado, utilize sempre que possível.

## Legal, mas e como uso com SVG?

É muito simples meu caro, se já sabemos como chamar nossos sprites, basta passar essa forma para dentro do React. Escrevendo em ES6 ficaria:

```jsx
// Definimos a url onde se encontra o sprite
const url = 'https://willianjusten.com.br/assets/img/react-svg/sprite.svg'

// Aqui criamos um componente
// que irá gerar nosso ícone SVG
const Icon = props => (
  <svg viewBox="0 0 16 16" className={`icon icon-${props.icon}`}>
    <use xlinkHref={`${url}#icon-${props.icon}`} />
  </svg>
)

// Aqui chamamos nossos ícones
// passando a propriedade "icon"
ReactDOM.render(
  <div class="icons">
    <Icon icon="globe" />
    <Icon icon="chemistry" />
    <Icon icon="lamp" />
  </div>,
  document.getElementById('app')
)
```

Definimos a url do nosso sprite, nesse caso, estou chamando um sprite do meu blog mesmo. Depois criamos nossa `stateless function` e ali temos alguns pulos do gato.

- Eu estou utilizando uma funcionalidade nova do ES6 para fazer interpolação usando o novo símbolo, que é essa aspas ao contrário. Assim eu posso concatenar minha variável `props.icon` com `${props.icon}` e também minha `url.
- Depois disso, basta criar um componente e passar a propriedade `icon` com a id que eu desejo.

Segue o exemplo funcional:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bedoLV" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/bedoLV">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Se você estiver com dúvidas no ES6, como funciona esse tal de `const`, `fat arrow` e agora esse tal de `template string`, aconselho o [Blog do Nipher](https://nipher.io/series), onde ele explica isso muito bem.

## Conclusão

Bom galera, post bastante simples, mas muito importante, tanto para o ecossistema React, quanto para o SVG. É importante que você tente ao máximo criar funções puras para ter mais performance na sua aplicação React. E também é bastante importante que você utilize Sprites SVG para diminuir o número de requisições e também possuir ícones que se adaptam em qualquer tipo de tela.

Se você estiver com dúvidas em SVG e quiser saber mais, aproveita que até dia **05/06** meu curso está com o desconto da pré-venda, você pode saber [mais informações aqui](https://willianjusten.com.br/pre-venda-curso-de-svg/).
