---
layout: post
date: '2018-05-31 01:18:14'
image: /assets/img/hamburguer-icon-cover.png
title: Criando ícone menu hamburguer animado com CSS puro
description: >-
  Nesse post/vídeo eu ensino como criar esse ícone animado para na segunda parte
  integrar a um menu real e bem legal.
introduction: >-
  Nesse post/vídeo eu ensino como criar esse ícone animado para na segunda parte
  integrar a um menu real e bem legal.
twitter_text: >-
  Nesse post/vídeo eu ensino como criar esse ícone animado para na segunda parte
  integrar a um menu real e bem legal.
main-class: css
color: '#2DA0C3'
tags:
  - video
  - css
  - animacao
categories:
  - Dicas de CSS
---

## Introdução

Fala pessoal, como o [ultimo post](https://willianjusten.com.br/menu-sticky-e-smooth-scroll-com-css-puro/) que eu escrevi teve uma recepção muito legal, resolvi dar continuidade e ensinar coisinhas úteis com css, que podem ser interessantes e utilizadas no seu dia-a-dia de trabalho.

Eu resolvi fazer em vídeo, porque fica mais fácil de mostrar cada detalhe, e bom, assim se você nunca fez um [curso meu](https://willianjusten.com.br/cursos/), já pode ver a didática para ver se gosta.

A proposta desses vídeos é fazer algo bem "cru", sem edições, assim você vai vendo de fato na prática como eu fui fazendo as coisas e explicando e até mesmo os erros (que, é claro, sempre acontecem). Acho que assim é melhor do que aqueles vídeos super editados, onde só tem copia/cola e no final você nem entende nada do que aconteceu. Se você achar que assim ficou muito ruim/lento, por favor, deixe seu feedback também.

## Demo live

Você pode ver o exemplo final através [desse link](https://labs.willianjusten.com.br/menu-fullscreen/) e se reparar, eu resolvi separar esse post e vídeo em duas partes, que serão:

- Como criar o ícone hamburguer animado
- Como criar o menu fullscreen animado

Assim fica mais leve para você, podendo ver só o que se interessa e também ajuda o meu SEO, que vai ter duas entradas diferentes =p

## Vídeo

<iframe width="560" height="420" src="https://www.youtube.com/embed/IGz4BI-aO_8" frameborder="0" allowfullscreen></iframe>

## Código e detalhes

O vídeo já é bem explicativo, então eu não vou entrar em muitos detalhes, só vou deixar aqui alguns links complementares, que podem ser importantes para você, caso não tenha entendido alguns dos pedaços:

- [Seletores CSS importantes para aprender](https://willianjusten.com.br/alguns-seletores-css-importantes-para-aprender/)
- [Como usar o input:checked num exemplo de switch button](https://willianjusten.com.br/criando-um-switch-button-com-css/)

E o código que temos na aula por enquanto é, primeiro o markup html:

```html
<body>
  <input id="menu-hamburguer" type="checkbox" />

  <label for="menu-hamburguer">
    <div class="menu">
      <span class="hamburguer"></span>
    </div>
  </label>
</body>
```

Onde eu criei um `input` e `label` para fazer o funcionamento do estado `:checked` e o `hamburguer`, que eu resolvi usar só um elemento e o `:before` e `:after`.

O nosso CSS dessa primeira parte ficou assim:

```css
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #81ecec;
}

.menu {
  background: #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 25px;
  right: 25px;
}

.hamburguer {
  position: relative;
  display: block;
  background: #000;
  width: 30px;
  height: 2px;
  top: 29px;
  left: 15px;
  transition: 0.5s ease-in-out;
}

.hamburguer:before,
.hamburguer:after {
  background: #000;
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: 0.5s ease-in-out;
}

.hamburguer:before {
  top: -10px;
}

.hamburguer:after {
  bottom: -10px;
}

input {
  display: none;
}

input:checked ~ label .hamburguer {
  transform: rotate(45deg);
}

input:checked ~ label .hamburguer:before {
  transform: rotate(90deg);
  top: 0;
}

input:checked ~ label .hamburguer:after {
  transform: rotate(90deg);
  bottom: 0;
}
```

Tem ali também um "reset default", que sempre uso nesses experimentos básicos e também as `transitions` e `transforms` que foram necessários para rotacionar os elementos e criar a animação necessária.

## Conclusão

Bom pessoal, espero que tenham gostado do post/vídeo, é uma nova modalidade que eu quero estar testando. E se você curtiu, não deixe de se inscrever lá no [Canal do YouTube](https://www.youtube.com/WillianJustenCursos?sub_confirmation=1) e também compartilhar com a galera.

Lembrando que amanhã (se você estiver lendo no dia que lancei), vai ter a segunda parte, onde eu ensino a criar o menu. Se esse dia já passou, vai ter o link aqui direitinho para o próximo post/vídeo.
