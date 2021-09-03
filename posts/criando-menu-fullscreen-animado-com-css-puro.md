---
layout: post
date: '2018-06-01 01:09:38'
image: /assets/img/menu-animado-cover.png
title: Criando Menu Fullscreen animado com CSS puro
description: >-
  Nesse post/video eu vou ensinar a segunda do nosso experimento, onde vamos
  criar um menu fullscreen animado e aprender um pouco de cubic bezier.
introduction: >-
  Nesse post/video eu vou ensinar a segunda do nosso experimento, onde vamos
  criar um menu fullscreen animado e aprender um pouco de cubic bezier.
twitter_text: >-
  Nesse post/video eu vou ensinar a segunda do nosso experimento, onde vamos
  criar um menu fullscreen animado e aprender um pouco de cubic bezier.
main-class: css
color: '#2DA0C3'
tags:
  - video
  - css
  - frontend
categories:
  - Dicas de CSS
---

## Introdução

Fala pessoal, dando continuidade ao [experimento](https://labs.willianjusten.com.br/menu-fullscreen/) que fizemos no [post passado](https://willianjusten.com.br/criando-icone-menu-hamburguer-animado-com-css-puro/), hoje iremos aprender a criar a animação para o nosso menu fullscreen.

Como já disse, a ideia é fazer vários tipos de vídeos lá no Youtube sobre coisinhas técnicas que podemos usar no nosso dia-a-dia e também, pretendo fazer alguns outros vídeos sobre carreira, trabalho remoto e outras coisas mais, que sempre me perguntam e que não daria para se fazer como um curso, mas cabe muito bem num vídeo.

Então, sem mais delongas, vamos ao vídeo e logo abaixo, o código como sempre.

## Vídeo

<iframe width="560" height="420" src="https://www.youtube.com/embed/i5Fps4GBBns" frameborder="0" allowfullscreen></iframe>

## Código

Primeiro segue o nosso html, que dessa vez não mudou muita coisa, só mesmo tendo a adição do nosso menu:

```html
<ul>
  <li><a href="#">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">Work</a></li>
</ul>
```

E aí, na parte do nosso css, tivemos também poucos detalhes. Nós primeiro fizemos o nosso efeito de hover, que também foi a base para usar na nossa animação, onde usamos a propriedade de `box-shadow`, que como eu disse, é extremamente poderosa no CSS.

Eu também uso `viewport unit` para definir os tamanhos do shadow e se você nunca tinha ouvido falar, eu tenho [um post](https://willianjusten.com.br/como-criar-secoes-fullscreen-com-css/) onde eu falo um pouquinho sobre e também mostro com exemplos.

O CSS feito nesse vídeo então, fica assim :

```css
.menu {
  cursor: pointer;
  box-shadow: 0 0 0 0 #fff, 0 0 0 0 #fff;
  transition: box-shadow 1.1s cubic-bezier(0.19, 1, 0.22, 1);
}

.menu:hover {
  box-shadow: 0 0 0 8px #fff, 0 0 0 8px #fff;
}

// animação do menu
input:checked ~ label .menu {
  box-shadow: 0 0 0 130vw #fff, 0 0 0 130vh #fff;
}

// só aparecer o menu ao clicar
input:checked ~ ul {
  opacity: 1;
}

// animação e estilo do menu
ul {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  font-size: 45px;
  opacity: 0;
  transition: 0.25s 0.1s cubic-bezier(0, 1.07, 0, 1.02);
  z-index: 2;
}

a {
  color: #00cec9;
  display: block;
  margin-bottom: 1em;
  text-decoration: none;
}
```

Se você quiser ver todo o código completo, só acessar [esse link do Github](https://github.com/willianjusten/labs/blob/gh-pages/menu-fullscreen/index.html).

## Conclusão

Bom pessoal, espero que tenham gostado desse novo formato, com vídeo e post. Acho que fica mais dinâmico quando é para explicar esse tipo de coisa. Se vocês gostaram, por favor, não deixem de compartilhar e dar joinhas lá no [YouTube](https://www.youtube.com/WillianJustenCursos?sub_confirmation=1).

E se você achou uma merda, pode falar também, eu aceito críticas numa boa e isso ajuda muito a melhorar para os próximos vídeos. Espero vocês nos próximos posts e vídeos!
