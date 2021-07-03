---
layout: post
title: '#7 - Estilizando SVG com CSS - Parte 1'
date: 2015-03-07 14:58:45
image: '/assets/img/estilizando-svg/main.png'
description: 'Aprenda as diferentes formas de mudar o estilo de um SVG somente com CSS.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - css
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Estilizando SVG com CSS - Parte 1'
introduction: 'Aprenda as diferentes formas de mudar o estilo de um SVG somente com CSS, mude suas cores, contornos e mais.'
---

## Índice da série

Uffa, tenho escrito bastante sobre SVG que agora os links cresceram e ficar listando todos o tempo todo aqui já vai ficar ruim, então para facilitar, basta ir em [series](https://willianjusten.com.br/series/) e lá estarão todos os meus links sobre SVG.

Espero voltar a escrever com mais frequência, até porque tem muita coisa legal para aprendermos em SVG ainda!

Também pretendo escrever menos e colocar mais exemplos, para facilitar o entendimento de todos e lembre-se, qualquer dúvida é só falar nos comentários, terei o maior prazer em ajudar.

## Introdução

Como eu sempre escrevo escutando alguma coisa, vou sempre falar o que estou ouvindo nos meus posts, hoje é dia de [Faded Paper Figures](http://www.fadedpaperfigures.com/).

No [artigo passado](https://willianjusten.com.br/sistemas-de-icones-em-svg/) eu falei que uma das vantagens do SVG é poder estilizá-lo via CSS e hoje vamos falar um pouquinho sobre essa grande vantagem.

## Propriedades de Estilo

Para nós que trabalhamos com Web sabemos que existem milhares de propriedades CSS e cada vez tem [crescido mais](https://webdesignerdepot.com/2015/01/css-you-can-get-excited-about-in-2015/). No SVG não é diferente, ele além de compartilhar uma série de propriedades com o CSS, também tem suas propriedades únicas.

![Propriedades em SVG e CSS](/assets/img/estilizando-svg/svg-properties.png)

Se quiser saber melhor de todas as propriedades tem esse [artigo da W3C sobre SVG 1.1](http://www.w3.org/TR/SVG/styling.html) e temos também o [draft da W3C sobre SVG 2](http://www.w3.org/TR/SVG2/styling.html#SVGStylingProperties).

## Métodos para estilizar

### Estilo inline

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300">
  <polygon points="..." style="fill:#0562DC; stroke: #000; stroke-width: 5;" />
</svg>
```

Note que eu adiciono um `style` dentro elemento que eu desejo modificar, as vezes pode ser útil quando não tenho acesso a uma folha de estilo independente ou desejo fazer uma rápida modificação.

### Estilo dentro do SVG

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300">
  <style type="text/css">
    polygon {
      fill: #0562dc;
      stroke: #000;
      stroke-width: 5;
    }
  </style>
  <polygon points="..." />
</svg>
```

Bastante útil quando se deseja componentizar um elemento SVG, visto que sua estrutura e todo o seu estilo pode ser facilmente movimentado entre sistemas diferentes.

### Estilo fora do SVG

```html
<!DOCTYPE html>
<html>
  ...
  <style type="text/css">
    polygon {
      fill: #0562dc;
      stroke: #000;
      stroke-width: 5;
    }
  </style>

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300">
    <polygon points="..." />
  </svg>
</html>
```

Não é um método muito utilizado, visto que caso aquele SVG não fique mais naquele arquivo depois de um tempo, os estilos tornam-se inúteis e a manutenção não é tão boa.

### Estilos externos

```html
<?xml version="1.0" standalone="no"?>
<?xml-stylesheet type="text/css" href="styles.css"?>

<svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  width="300px"
  height="300px"
  viewBox="0 0 300 300"
>
  <!-- Conteúdo do SVG -->
</svg>
```

Quando você quiser separar totalmente a estrutura do estilo, você pode criar um arquivo separado contendo os estilos. **Nota:** você pode ser "purista" e chamar o estilo pelo xml _para_ manter um padrão de SVG ou também pode chamar via `<link rel="stylesheet" href="styles.css">`

## Peso das propriedades

![Peso das propriedades](/assets/img/estilizando-svg/css-specificity.jpg)

Na imagem acima os elementos na parte inferior sobreescrevem os elementos anteriores, ou seja, um estilo inline irá sobreescrever um estilo em um arquivo externo. Vamos a um exemplo para entedermos melhor:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VYGzZK" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/VYGzZK">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Como podemos notar no exemplo acima, a estrela ficou com a cor amarela, mesmo tendo outras cores atribuídas. Mas por que disso? A cor amarela está sendo atribuída como estilo inline: `style="fill:yellow"`, que possui o maior peso, depois nós temos o estilo no documento: `<style>polygon {fill: blue}</style>`, depois a cor vermelha atribuída no arquivo css externo: `polygon {fill: red;}` e por último temos o estilo de apresentação na cor preta: `fill="black"`. Continuou sem entender? Vai lá no [pen](http://codepen.io/willianjusten/pen/VYGzZK) e tenta ir apagando uma propriedade de cada vez para notar quem vai ser priorizado, vai ser bem mais didático do que eu falando aqui =)

Entendendo bem sobre como funcionam os pesos e sabendo como estilizar, já vamos poder brincar com as propriedades, mas este será assunto para o próximo post, espero vocês até lá.
