---
layout: post
title: '#4 - A estrutura do SVG'
date: 2015-01-20 13:01:39
image: '/assets/img/estrutura-do-svg/estrutura-do-svg.png'
description: 'Saiba como o SVG funciona de verdade, seus elementos, alguns de seus atributos e alguns atalhos para facilitarem nosso trabalho.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Estrutura do SVG - Saiba melhor como funciona.'
introduction: 'Saiba como o SVG funciona de verdade, seus elementos, alguns de seus atributos e alguns atalhos para facilitarem nosso trabalho.'
---

## Índice da série

- [#1 - Por que usar SVG?](https://willianjusten.com.br/por-que-usar-svg/)
- [#2 - Como usar SVG](https://willianjusten.com.br/como-usar-svg/)
- [#3 - Onde Baixar SVG](https://willianjusten.com.br/onde-baixar-svg/)

## Introdução

Sei que muita gente já está doida para aprender a fazer desenhos loucos e animações com SVG, mas é ainda mais importante aprender tudo que está por trás do SVG, para poder então, entender tudo que virá pela frente. Isso que vai diferenciar um cara que sabe SVG de um cara que aprendeu a futucar numa biblioteca e fez um "trequinho ali para empresa".

A ideia também não será escrever algo muito extenso e cansativo, mas uma base para que se você olhar para um arquivo SVG, entenda o que significa cada parte dele e inclusive poder fazer melhorias baseadas somente no código.

## Estrutura

Como a maioria já deve saber o SVG tem uma sintaxe baseada em `xml`. Estamos na segunda edição da versão [1.1](http://www.w3.org/TR/SVG/). E a especificação do [SVG 2.0](http://www.w3.org/TR/SVG2/) já está sendo formulada, já em um processo bastante adiantado, seguindo os moldes das novas especificações, como CSS3 e o HTML5.

```xml
<svg
version="1.1"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink">

<!-- código para o desenho -->

</svg>
```

### O que são essas coisas ali com a tag SVG?

São os `namespaces` do SVG. Eles servem para identificar a versão utilizada no SVG e o namespace padrão dele, assim o browser irá saber qual a melhor forma de renderizar aquele SVG. Isso será bastante importante para nós quando formos manipular o SVG através do Javascript, pois para criar novos elementos e definir atributos, iremos trabalhar no DOM através dos namespaces.

### Preciso definir isso sempre?

Não, não é necessário definir isso tudo sempre, mas é aconselhável, já que alguns browsers podem não entender muito bem como renderizar o seu SVG.

Se quiser entender um pouco melhor sobre Namespaces, acessa o [link da MDN](https://developer.mozilla.org/en/docs/Web/SVG/Namespaces_Crash_Course).

## Elementos

O SVG é tem algumas formas básicas, que permitem fazer os lindos desenhos que vemos. Irei mostrar essas formas e alguns de seus atributos, mas vale lembrar que elas serão mais necessárias caso você queira escrever o SVG inline e/ou para entender melhor um arquivo SVG de um desenho já pronto. Não será necessário que você faça desenhos mais complexos na mão, usando só essas formas.

### O elemento rect

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwmEag" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="http://codepen.io/willianjusten/pen/PwmEag/">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```xml
<svg>
  <rect x="50" y="30" width="300" height="200" fill="#0562dc"></rect>
</svg>
```

Esse elemento permite criar um retângulo e tem os seguintes atributos:

- `x` : desloca o elemento ao longo do eixo x (horizontal) de acordo com o espaço do svg (opcional)
- `y` : desloca o elemento ao longo do eixo y (vertical) de acordo com o espaço do svg (opcional)
- `width` : define a largura do elemento
- `height` : define a altura do elemento
- `fill` : define a cor do preenchimento (opcional)
- `rx` : define um curva nos cantos do retângulo (opcional)

### O elemento circle

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="YPVYOO" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="http://codepen.io/willianjusten/pen/YPVYOO/">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```xml
<svg>
  <circle cx="75" cy="75" r="50" fill="#0562dc" />
</svg>
```

Esse elemento permite criar um círculo e tem os seguintes atributos:

- `cx` : determina em qual local do eixo x irá ficar o centro do círculo
- `cy` : determina em qual local do eixo y irá ficar o centro do círculo
- `r` : define o raio do círculo
- `fill` : define a cor do preenchimento (opcional)

### O elemento ellipse

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bNWaZN" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="http://codepen.io/willianjusten/pen/bNWaZN/">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```xml
<svg>
  <ellipse cx="100" cy="60" rx="100" ry="50" fill="#0562DC" />
</svg>
```

Esse elemento permite criar uma ellipse e tem os seguintes atributos:

- `cx` : determina em qual local do eixo x irá ficar o centro da ellipse
- `cy` : determina em qual local do eixo y irá ficar o centro da ellipse
- `rx` : define o raio da ellipse no eixo x
- `ry` : define o raio da ellipse no eixo y
- `fill` : define a cor do preenchimento (opcional)

### O elemento line

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pvPpmE" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="http://codepen.io/willianjusten/pen/pvPpmE/">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```xml
<svg>
  <line x1="20" y1="10" x2="180" y2="60" stroke="#0562DC" stroke-width="4"/>
</svg>
```

Esse elemento permite criar uma linha e tem os seguintes atributos:

- `x1` : determina a posição no eixo x do primeiro ponto da linha
- `y1` : determina a posição no eixo y do primeiro ponto da linha
- `x2` : determina a posição no eixo x do segundo ponto da linha
- `y2` : determina a posição no eixo y do segundo ponto da linha
- `stroke` : define a cor do contorno da linha (opcional)
- `stroke-width` : define a largura da linha (opcional)

### O elemento polyline

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NPjXZG" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="http://codepen.io/willianjusten/pen/NPjXZG/">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```xml
<svg>
  <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" fill="white" stroke="#0562DC" stroke-width="4" />
</svg>
```

Esse elemento permite criar uma polyline e tem os seguintes atributos:

- `points` : define os pares ordenados (x,y) para cada ponto do elemento
- `fill` : define o preenchimento interno do elemento
- `stroke` : define a cor do contorno do elemento (opcional)
- `stroke-width` : define a largura do contorno (opcional)

### O elemento polygon

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bNWaXd" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="http://codepen.io/willianjusten/pen/bNWaXd/">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```xml
<svg>
  <polygon points="50,5 100,5 125,30 125,80 100,105 50,105 25,80 25,30" fill="#0562DC" stroke="#000" stroke-width="4"/>
</svg>
```

Esse elemento permite criar um polígono e tem os seguintes atributos:

- `points` : define os pares ordenados (x,y) para cada ponto do elemento
- `fill` : define o preenchimento interno do elemento
- `stroke` : define a cor do contorno do elemento (opcional)
- `stroke-width` : define a largura do contorno (opcional)

### O elemento path

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dPWdbQ" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="http://codepen.io/willianjusten/pen/dPWdbQ/">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

O elemento Path é um dos mais complexos e também mais importantes para o SVG. A partir dele, conseguimos criar qualquer forma e com isso gerar os belos desenhos existentes.

Existem 5 tipos de paths:

- Curveto (C,c)
- Smooth Curveto (Curveto Suave) (S,s)
- Curva Quadrática de Bézier (Q,q)
- Curva Quadrática de Bézier Suave (T,t)
- Arco Elíptico (A,a)

A letra **maiúscula** utiliza coordenadas **absolutas** para criar a forma, enquanto a letra **minúscula** utiliza coordenadas **relativas**.

## Conclusão

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qEmxNJ" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="http://codepen.io/willianjusten/pen/qEmxNJ/">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

A partir de formas básicas podemos até brincar um pouquinho de fazer alguns desenhos bobinhos, ou se você for um Mestre Jedi, até fazer coisas incríveis. Você consegue saber as formas usadas na imagem acima? Teve ideia para fazer algum desenho legal? Faz no [codepen](http://codepen.io/) e manda para cá nos comentários =)

Se quiser saber um pouco mais sobre Inline SVG tem o [Guia de Bolso do SVG](https://github.com/jonitrythall/svgpocketguide/blob/master/svgpocketguide-ptbr.md), que foi um livro que eu e o [Lucas Maia](https://github.com/lucasmaiaesilva) traduzimos com muito amor e carinho <3

E se tiver alguma dúvida, seja de algo que eu já falei ou que ainda não falei, manda nos comentários, tento responder o mais rápido que der =)
