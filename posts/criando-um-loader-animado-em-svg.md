---
layout: post
title: 'Criando um loader animado em SVG'
date: 2017-06-15 19:59:34
image: '/assets/img/loader-svg/loader-svg.png'
description: 'Aprenda a criar um loader com uma animação única em SVG com apenas poucas linhas.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - animacao
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Aprenda a criar um loader animado em SVG com apenas poucas linhas.'
introduction: 'Aprenda a criar um loader com uma animação única em SVG com apenas poucas linhas.'
---

## Introdução

Faaaaaala pessoal, quanto tempo não escrevo aqui e hoje eu venho trazer um post um pouco diferente para vocês, com um vídeo do meu [Curso de SVG do Início ao Avançado](https://www.udemy.com/aprendendo-svg-do-inicio-ao-avancado/?couponCode=PROMOFEV22). Nesse vídeo eu explico como fazer uma das coisas mais legais do SVG, que é trabalhar com as propriedades de `stroke` do SVG. Mas também mostro um pouquinho sobre como construir uma forma geométrica e outras coisinhas mais que temos no SVG.

## Vídeo

<div class='embed-container'><iframe style="width: 100% !important; height: 400px" src='https://www.youtube.com/embed/T4ApXdYyYTE' frameborder='0' allowfullscreen></iframe></div>

## Detalhes

Se você quiser ver na prática ao invés de só no vídeo, segue o [link da demo](https://willianjusten.com.br/curso-de-svg/strokes/loader.html).

Como visto no vídeo, primeiro a gente precisa criar um triângulo, definindo um `svg` com sua `viewbox`. Se quiser, tem um [post sobre a estrutura do SVG](https://willianjusten.com.br/a-estrutura-do-svg/) onde você pode ler mais sobre também. E o código fica:

```html
<svg width="200" height="200" viewBox="0 0 40 60">
  <polygon
    class="triangle"
    fill="none"
    stroke="#fff"
    stroke-width="1"
    points="16,1 32,32 1,32"
  />
</svg>
```

Depois disso, nós precisamos criar a nossa animação usando as propriedades `stroke-dasharray` e `stroke-dashoffset`, você pode ler mais nesse [post sobre o efeito de desenhar com SVG](https://willianjusten.com.br/efeito-de-desenhar-com-svg/). E unida a essas duas propriedades, precisamos usar o `keyframes` para criar a animação.

```css
.triangle {
  stroke-dasharray: 17;
  animation: dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: 136;
  }
}
```

Por fim, basta adicionar o texto de loading e posicioná-lo em nosso SVG.

```html
<svg width="200" height="200" viewBox="0 0 40 60">
  <polygon
    class="triangle"
    fill="none"
    stroke="#fff"
    stroke-width="1"
    points="16,1 32,32 1,32"
  />
  <text class="loading" x="0" y="45" fill="#fff">Loading...</text>
</svg>
```

E fazer a animação dele utilizando a opacidade para que ele fique piscando.

```css
.loading {
  font-family: 'Orbitron', sans-serif;
  font-size: 7px;
  animation: blink 0.9s ease-in-out infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
```

## Conclusão

Bom galera, é só isso! Bem simples de fazer uma animação utilizando o SVG e você consegue um efeito que não veria usando só CSS/JS. Se você gostou do vídeo e da explicação, aproveita que fiz uma promoção na [Udemy com o cupom BLACKFRIDAY](https://www.udemy.com/aprendendo-svg-do-inicio-ao-avancado/?couponCode=PROMOFEV22), onde o curso está saindo de **R\$200** por apenas **R\$25**, mas se liga, a promoção vai só até dia **18/06/17 (Domingo)**, não perde tempo e aproveita! =D
