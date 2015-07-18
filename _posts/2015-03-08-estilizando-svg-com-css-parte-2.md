---
layout: post
title: "#8 - Estilizando SVG com CSS - Parte 2"
date: 2015-03-08 12:58:00
image: '/assets/img/estilizando-svg/main-2.png'
description: "Aprenda quais as propriedades que o SVG possui e como trabalhar com elas."
tags:
- svg
- css
categories:
- "O mundo mágico do SVG"
twitter_text: "Estilizando SVG com CSS - Parte 2"
---

## Índice da série

Tenho escrito bastante sobre SVG que agora os links cresceram e ficar listando todos o tempo todo aqui já vai ficar ruim, então para facilitar, basta ir em [series](http://willianjusten.com.br/series/) e lá estarão todos os meus links sobre SVG.

## Introdução

Hoje resolvi que seria o dia de escutar clássicos e estou ouvindo [Pink Floyd](http://www.pinkfloyd.com/), para ser mais específico o [The Dark Side of The Moon - 2011 Remastered Version](http://open.spotify.com/album/3a0UOgDWw2pTajw85QPMiz), se quiser clica ali e segue junto =)

No [post anterior](http://willianjusten.com.br/estilizando-svg-com-css-parte-1/) eu expliquei um pouco sobre quais propriedades o SVG possui, quais ele compartilha com o CSS e quais as formas de estilizar. Hoje vou mostrar um pouco de algumas propriedades na prática.

**Nota**: irei utilizar alguns conceitos já explicados e mostrados em outros posts, então caso você se perca em alguma parte do código, dá uma olhada nos [posts anteriores](http://willianjusten.com.br/series/)

## Propriedade Fill

Como o nome diz, ela quem irá preencher a cor da forma selecionada. Uma das propriedades mais utilizadas e vai servir para dar aquele toque especial na imagem. A grande vantagem é poder preencher cada pedaço desejado da imagem.

<p data-height="266" data-theme-id="11319" data-slug-hash="azaERB" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/azaERB/'>Exemplo propriedade Fill</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## Propriedade Fill-opacity

Uma variável da propriedade `fill`, onde iremos só modificar a opacidade do preenchimento naquele elemento.

<p data-height="266" data-theme-id="11319" data-slug-hash="pvOaNg" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/pvOaNg/'>Exemplo propriedade fill-opacity</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## Propriedade Stroke e Stroke-width

Essa propriedade irá alterar a cor do contorno (`stroke`) e sua espessura (`stroke-width`). Por padrão, os elementos vem sem nenhum contorno.

<p data-height="266" data-theme-id="11319" data-slug-hash="VYGQpB" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/VYGQpB/'>Exemplo stroke e stroke-width</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## Propriedade Stroke-dasharray

O atributo `stroke-dasharray` transforma os caminhos em traços ao invés de linhas sólidas.

Com o atributo você pode especificar o tamanho do traço, assim como a distância entre eles, separados por vírgulas ou espaços.

No exemplo abaixo, temos o primeiro círculo com a propriedade `stroke-dasharray: 10`, então cada traço terá `10px` e uma distância de `10px` para o próximo traço. O segundo círculo tem a propriedade `stroke-dasharray: 10, 40`, ou seja, cada traço terá `10px` e a distância entre eles será de `40px`.

Para mostrar que podemos brincar também com interatividade no SVG, adicionei um evento ao dar `hover` no segundo círculo, para que mude a propriedade `stroke-dasharray` do mesmo.

<p data-height="266" data-theme-id="11319" data-slug-hash="KwxQqz" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/KwxQqz/'>Exemplo do Stroke-dasharray</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## Propriedade Stroke-linecap

O `stroke-linecap` define qual forma terá o final de um caminho aberto, seja ele uma `path`, `line` ou `polyline`. E aceita três valores possíveis: `butt`, `round` e `square`.

De acordo com o exemplo abaixo, podemos observar o seguinte:

* `butt`: irá cortar a ponta exatamente na sua espessura, deixando a ponta quadrada.
* `round`: irá deixar as pontas arredondas, acrescentando um "padding" nas pontas.
* `square`: irá deixar a ponta quadrada, acrescentando um "padding" nas pontas.

<p data-height="266" data-theme-id="11319" data-slug-hash="raZJYw" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/raZJYw/'>Exemplo stroke-linecap</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## Propriedade Stroke-linejoin

O `stroke-linejoin` define qual aparência os cantos dos contornos irão possuir nos caminhos e formas básicas.

* `mitter`: terá o canto pontiagudo
* `round`: terá o canto arrendondado
* `bevel`: terá o canto chanfrado

<p data-height="266" data-theme-id="11319" data-slug-hash="MYqQQp" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/MYqQQp/'>Exemplo stroke-linejoin</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## Conclusão

Essas são as propriedades mais comuns que o SVG possui, mas olhando para elas já podemos imaginar várias brincadeiras que podemos fazer não?

No início parece um pouco complicado e inútil, mas o SVG tem um grande poder. No primeiro exemplo do fill eu mostro um gráfico de barras feito em SVG, imagina fazer bibliotecas de gráficos em SVG como o [chartist](http://gionkunz.github.io/chartist-js/)?
