---
layout: post
title: 'Criando Reading Progress com CSS Variables'
date: 2017-08-05 13:02:18
image: '/assets/img/reading-progress/css-variables.png'
description: 'Uma forma fácil de implementar uma barra de reading progress em poucas linhas.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - frontend
categories:
twitter_text: 'Criando Reading Progress com CSS Variables.'
introduction: 'Uma forma fácil de implementar uma barra de reading progress em poucas linhas.'
---

## Introdução

Faaala pessoal, nem era a ideia escrever um post hoje não, mas o tempinho aqui em Petrópolis está meio chuvoso e friozinho. Coloquei para tocar [Donovan Woods](https://open.spotify.com/artist/4SOtk3HtPYKqxnVuxNBMti) que é um cantor canadense que toca um Folk bem calminho, e pensei, por que não escrever um post?

## CSS Variables

O post de hoje eu vou utilizar uma feature bem maneira que é a [CSS Variables](https://tutorialzine.com/2016/03/what-you-need-to-know-about-css-variables), basicamente é a possibilidade de utilizar variáveis dentro do CSS de forma nativa! Isso não é demais? =D

E sempre quando se fala de algo novo, vem a primeira pergunta `ahhh, mas isso não deve pegar em lugar nenhum!`. Só que é aí que você se engana. O suporte é até bem legal como você pode ver aqui no [Can I use](http://caniuse.com/#feat=css-variables), basicamente Firefox, Chrome, Android Browser e até o Safari! Não funciona no IE, mas quem se importa? =p

A outra pergunta comum é: `Mas por que usar isso? Já tenho no meu pre-processador.`, bom isso é uma verdade, o pre-processador ajuda pacas e possui várias coisas legais para brincar, inclusive variáveis. Mas essas variáveis ficam somente naquele momento, depois você gera o CSS final e essas variáveis somem. Aqui não é o caso, a variável está disponível no Browser para você poder criar várias brincadeiras, como a que vamos fazer, por exemplo.

### Básico do CSS Variables

Bom, vamos logo para a parte prática que é mais interessante. Digamos que eu tenha um site e eu quero que o header tenha cores diferentes se estiver na home ou em páginas normais. Seguindo o seguinte html:

```html

<!-- Página Home  -->
<html>
    <body class="home">
    <header class="header"></header>
        ...
    <body>
</html>

<!-- Página Contact  -->
<html>
    <body class="page page-contact">
    <header class="header"></header>
        ...
    <body>
</html>
```

Tendo em vista o seguinte markup, podemos criar um css assim:

```css
:root {
  --header-home-bg-color: blue;
  --header-pages-bg-color: white;
}

.home .header {
  background-color: var(--header-home-bg-color);
}

.page .header {
  background-color: var(--header-pages-bg-color);
}
```

Bastante intuitivo né? Mas vamos as explicações de como funciona. Para você definir uma variável no CSS, basta utilizar esses dois traços no início da variável, `--variavel-linda` e para utilizar o valor dela, é só chamar dentro do `var(--variavel-linda)`. Sim gente, é só isso. Precisa de mais nada! E outra coisa bastante legal, o `var` pode receber dois parâmetros, um que é sua variável e o outro que é um fallback caso o valor da sua variável seja inválido. Por exemplo:

```css
:root {
  --font-stack: 'Open Sans';
}
body {
  font-family: var(--font-stack, 'Arial');
}
```

Caso o valor de `--font-stack` não fosse achado ou válido, ele iria utilizar o valor `Arial`.

### Integrando com Javascript e criando nosso Reading

Claro que precisamos integrar isso com JS né? E é também simples demais. Basta utilizar o método `setProperty` do `style` no elemento que você desejar.

Primeiro vamos criar nosso html bem bobo, que vai ser um grande texto num container. E o item principal, nossa div `progress`, que vai ser responsável por fazer a barrinha de progresso no topo.

```html
<div class="progress"></div>

<div class="container">
  <!-- texto  -->
</div>
```

Depois vamos criar nosso CSS para o `progress`.

```css
.progress {
  background: linear-gradient(to right, #3863a0 var(--scroll), transparent 0);
  background-repeat: no-repeat;
  position: fixed;
  width: 100%;
  height: 8px;
  z-index: 2;
}
```

Reparem que eu estou utilizando uma variável ali que é `var(--scroll)` e também reparem que eu não criei ela no CSS, pois eu vou criar no meu JS.

Para fazer o cálculo do scroll e identificar o progresso, vamos utilizar algums métodos do JS, que são:

- [clientHeight](https://developer.mozilla.org/pt-BR/docs/Web/API/Element/clientHeight) - permite verificar a altura da janela do browser, ou seja, só a parte visível da sua tela.
- [scrollTop](https://developer.mozilla.org/pt-BR/docs/Web/API/Element/scrollTop) - verifica a distância do topo da página até o topo da primeira parte visível da tela. Dá uma olhada no link, lá tem uma imagem bem explicativa.
- [scrollHeight](https://developer.mozilla.org/pt-BR/docs/Web/API/Element/scrollHeight) - verifica a altura do elemento, considerando suas partes não visíveis.

Tendo esses métodos em mente, fica fácil criar a seguinte função:

```js
const progress = document.querySelector('.progress')
const body = document.body
const page = document.documentElement
let scroll

document.addEventListener('scroll', function () {
  scroll = (body.scrollTop / (body.scrollHeight - page.clientHeight)) * 100
  progress.style.setProperty('--scroll', scroll + '%')
})
```

Primeiro eu verifico a altura do topo da página até o topo do meu elemento (body.scrollTop) e então divido pelo tamanho total do meu elemento menos a altura do browser, isso multiplicado por 100, para poder obter a porcentagem do quanto eu já desci na tela.

Tendo esse valor fica fácil, basta definir esse valor dentro de `progress`, para isso eu uso o método `setProperty`, que vai definir o valor da variável `--scroll` e assim vai aumentar e diminuir o background do meu elemento, fazendo o efeito de progresso na leitura.

Abaixo você pode ver esse exemplo rodando:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XapJQX" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/XapJQX">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Conclusão

Bom galera, espero que tenham gostado do post, é bem simplão, mas é bem maneiro. E mostra como as CSS Variables podem se tornar ótimas ferramentas no futuro. Eu aconselho a assistirem [essa talk da Lea Verou](https://www.youtube.com/watch?v=2an6-WVPuJU) que foi basicamente de onde eu extraí tudo para fazer esse post. Ela é incrível nessa talk, vale muito a pena =)
