---
layout: post
title: "#2 - Como usar SVG"
date: 2015-01-13 02:20:24
image: '/assets/img/como-usar-svg/como-usar-svg.png'
description: "Aqui irei explicar as diferentes formas de se inserir um SVG na sua página web. Um breve início da grandiosidade que se está por vir."
tags:
- svg
categories:
- "O mundo mágico do SVG"
twitter_text: "Como usar o SVG?"
---

## Introdução

Como eu havia falado no [último post](http://willianjusten.com.br/atualizacoes/), irei fazer uma série de posts ensinando tudo sobre SVG, sim, você vai cansar de me ver falando sobre SVG, até que você comece a usar!! =)

O [primeiro post](http://willianjusten.com.br/por-que-usar-svg/), foi falando sobre o porquê de usar SVG. Lá eu falei várias coisas legais que podem ser feitas com essa tecnologia e eu aposto que vocês se impressionaram com alguma das habilidades que ela tem.

Agora que você já está ambientado com o que é SVG e porque usar o SVG nos seus sites e aplicações, só falta uma coisa:

## Como usar?

Atualmente existem 5 formas de se utilizar o SVG, que são:

1. Como Imagem
2. Como Background-image
3. Inline SVG
4. Via iframe/object/embed
5. Utilizando Data URIs

Cada uma dessas formas tem suas utilidades, vantagens e desvantagens e eu irei explicar adiante.

### 1 - Como Imagem

<p data-height="268" data-theme-id="11319" data-slug-hash="emvYLJ" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/emvYLJ/'>Svg como imagem</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

Para adicionar um SVG como imagem, basta colocá-lo dentro da `src` da tag `img`.

{% highlight html %}
<img src="img/logo.svg" alt="Logo" />
{% endhighlight %}

A utilização desta forma impede o acesso dos elementos separados do SVG, porém a imagem não irá perder qualidade caso seja redimensionada.

### 2 - Como Background-image

<p data-height="266" data-theme-id="11319" data-slug-hash="zxZYmK" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/zxZYmK/'>SVG Background-image</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

Para adicionar um SVG como background-image, basta criar um elemento com uma classe definida e então nesta classe, adicionar o SVG na propriedade de background-image.

{% highlight css %}
.element {
    background-image: url(/image/image.svg);
}
{% endhighlight %}

Quando se deseja criar grandes cenários, um método bastante interessante é utilizar o background-image para o SVG, assim você consegue desenhar vários elementos na tela com mais facilidade e podendo replicá-los ao decorrer de seu ambiente. Um exemplo bem legal é o [Santa Tracker](https://santatracker.google.com) da Google, que utiliza está técnica.

### 3 - Inline SVG

<p data-height="266" data-theme-id="11319" data-slug-hash="ByWaqv" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/ByWaqv/'>Svg Inline</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

O SVG inline é a utilização da sua estrutura jogada diretamente no código html, como o SVG trabalha numa estrutura similar ao xml/html, ele acaba se encaixando sem problemas dentro do site. Uma dica é criar partials separadas, contendo todos esses elementos SVG e adicioná-los no seu código, assim evita de ver aquele código gigante que algumas imagens podem ter. As vantagens do inline é que você tem a manipulação total dos elementos e também tem um carregamento super veloz.

### 4 - Via Iframe/Object/embed

São métodos antigos, que eu já não aconselho a utilizar, visto que perdem performance na página e não irão adicionar nada para que o workflow seja preferido. De qualquer forma, para adicionar, seria:

{% highlight html %}
<iframe src="img/img.svg" frameborder="0"></iframe>

<object data="img/img.svg" type=""></object>

<embed src="img/img.svg" type="" />
{% endhighlight %}

### 5 - Via Data URIs

Uma das últimas formas de se adicionar o SVG no nosso html é utilizando os Data URIs, que pode ser inserido como utf-8 ou convertido para base64 e adicionado na tag de `img` ou como propriedade de `background-image`.

{% highlight html %}
<img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo etc">

.base64 {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0i etc);
}
{% endhighlight %}

A vantagem é que dependendo do tipo do seu svg, ele convertido pode ficar bastante pequeno, deixando o sistema ainda mais leve. Um dos exemplos mais legais que eu já vi trabalhando com isso é o site do [Make your money matter](http://makeyourmoneymatter.org/).

## Conclusão

Bom galera, essa é a primeira sobre como utilizar SVG. Agora que você já sabe, procura alguns sites legais que utilizaram, vejam quais técnicas que eles usaram e tente entender o porquê de ter sido de forma `A` e não `B`, as vezes você pode propôr até uma mudança para algo melhor.