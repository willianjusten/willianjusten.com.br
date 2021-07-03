---
layout: post
title: '#9 - Colorindo em SVG'
date: 2015-04-03 15:59:38
image: '/assets/img/colorindo-svg/main.png'
description: 'Vamos voltar a ser crianças e colorir as coisas! Aprenda as técnicas para mudar as cores do SVG.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - css
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Colorindo em SVG. Vamos voltar a ser crianças e colorir as coisas!'
introduction: 'Vamos voltar a ser crianças e colorir as coisas! Aprenda como colorir o SVG usando classes, property-attributes e mais.'
---

## Índice da série

Tenho escrito bastante sobre SVG que agora os links cresceram e ficar listando todos o tempo todo aqui já vai ficar ruim, então para facilitar, basta ir em [series](https://willianjusten.com.br/series/) e lá estarão todos os meus links sobre SVG.

## Introdução

Como disse, sempre que eu estiver escutando alguma música ou banda, irei passar aqui para vocês, esse post foi escrito ouvindo a banda [A love like pi](http://www.alovelikepi.com/), que inclusive tem um dos sites em SVG mais bonitos que já vi, vale a pena olhar o site e ouvir as músicas. Um agradecimento especial ao [Cleyson Leal](https://github.com/Cleysonlb) que me mostrou esse site e essa banda.

Esses dias eu estava passeando por uma livraria (um dos meus passatempos favoritos) e encontrei um livro de colorir logo na entrada. Achei curioso, pois livros "infantis", em geral tem sua parte, coisas do gênero nunca ficam com tanto destaque. Depois cheguei em casa e acabei, por acaso, vendo [essa notícia](http://www.hypeness.com.br/2015/03/ilustradora-faz-sucesso-com-livro-de-colorir-para-adultos/).

Achei tão legal a ideia de colorir, que pensei, porque não fazer um post brincando sobre colorir SVG? =)

## Cores

As cores estão em tudo e a boa escolha delas irá influir diretamente na beleza do seu site e também na usabilidade do mesmo.

Eu costumo dizer que uma das melhores vantagens do SVG é poder manipular as cores, dessa forma podemos criar ícones únicos, ter várias logos diferentes no mesmo site, mas vindo de uma só fonte, dentre outras coisas mega legais.

No post [Estilizando SVG com CSS - Parte 1](https://willianjusten.com.br/estilizando-svg-com-css-parte-1/) eu falei das formas de se estilizar e no post [Estilizando SVG com CSS - Parte 2](https://willianjusten.com.br/estilizando-svg-com-css-parte-2/) eu mostrei algumas propriedades e como usá-las. Agora vamos a prática, que é mais legal.

### Mas e como funciona?

Toda imagem SVG crua é dividida em várias partes, para quem está ambientado com ferramentas de edição, são as chamadas _Layers_. Cada uma dessas layers, são os nossos elementos. Nós podemos selecionar cada um desses elementos, criar classes e pintá-los da forma que desejarmos.

Segue abaixo uma imagem de como funcionam as imagens em SVG.

![Ícones em SVG coloridos](/assets/img/colorindo-svg/color-icons.jpg)

### Colorindo com Fill

Após definirmos uma classe para cada elemento, basta pintarmos utilizando a propriedade `fill`. Segue abaixo um exemplo de como ficou, tente pintar de outras cores, se divirta =)

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dPLByM" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/dPLByM">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

#### Colorindo com Stroke

Outra propriedade que também pode receber cor é o `stroke`, que nada mais é que o contorno do elemento. Também podemos utilizar a propriedade `stroke-width` para deixar o traço mais fino ou mais grosso. Veja o exemplo abaixo:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vEMwbG" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/vEMwbG">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### Logos com cores diferentes

Imagina ter um site com a logo de uma cor no rodapé e de outra cor no topo, além de tamanhos diferentes. O que as pessoas fazem normalmente?

> "Ah, eu peço para o designer um png para logo do topo e um png para a logo do rodapé." - Programador de esquina

Dessa forma, você tem retrabalho do designer para criar duas imagens diferentes, tem mais peso na página e ainda duas requisições. Olha só o problemão!

Aí o cliente olha, diz que achou legal até, mas queria a logo do rodapé com uma outra cor. O que você faz? Pede de novo para o designer a logo com a cor que o cliente pediu, olha a trabalheira!!

Relaxa, com o SVG seus problemas acabaram! Basta termos uma só imagem em SVG e colorirmos com classes diferentes.

Para funcionar, criamos uma imagem SVG padrão sem estilos, dentro do elemento `symbol`, que irá nos permitir trabalhar com diferentes tamanhos e utilizamos o elemento `use` para chamar a logo, dentro de alguns estilos diferentes.

Se você se esqueceu como funciona o `symbol` e o `use`, dá uma lidinha no post [Atomic Design no SVG](https://willianjusten.com.br/atomic-design-no-svg/).

A ideia é possuirmos um só componente reutilizável e independente, assim podemos brincar como quisermos =)

Segue abaixo um exemplo de como funciona essa técnica:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JoVQWG" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/JoVQWG">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Conclusão

Olha como SVG se torna útil, essa semana na [globo.com](http://www.globo.com/) precisaram trabalhar com logos de diferentes cores para um trabalho novo e não pensaram duas vezes em utilizar SVG <3
