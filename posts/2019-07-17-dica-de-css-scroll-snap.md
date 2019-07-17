---
layout: post
date: '2019-07-17 07:39:23'
image: /assets/img/fullpage-cover.png
title: 'Dica de CSS: Scroll Snap'
description: Criando fullpage scroll com simples linhas de CSS.
introduction: Criando fullpage scroll com simples linhas de CSS.
twitter_text: Criando fullpage scroll com simples linhas de CSS.
main-class: css
color: '#2DA0C3'
tags:
  - CSS
  - Dicas
categories:
  - Dicas de CSS
---

## Introdução

Fala pessoal, uma coisa que pediam muito enquanto eu estava meio parado, eram dicas e coisas com CSS. Pois então, vamos voltar a fazer mais posts para a [série de dicas de CSS](https://willianjusten.com.br/series/#dicas-de-css).

A dica de hoje é extremamente simples, mas bem interessante, nós vamos aprender a criar um efeito que é usado em vários sites famosos, que é o chamado fullpage scroll ou onepage scroll. Ele nada mais é que uma adaptação do scroll, que faz com que ao você dar scroll, ele "mova uma tela inteira de uma vez só".

Bom, enquanto escrevo esse post, eu vou ouvindo o [Unplugged MTV do Alice in Chains](https://open.spotify.com/album/5PdgIAHzwDvTZRjIGSQGtN?si=FA3a1dtIQnmRZH_c50E0Xg), na minha opinião, é um dos melhores Unplugged que já ouvi, e olha que existem muitos bons.

## Demo

Se você quiser ver logo o negócio funcionando, seguem aqui as 3 diferentes demos:

- [Vertical](https://labs.willianjusten.com.br/scroll-snap/vertical)
- [Horizontal](https://labs.willianjusten.com.br/scroll-snap/horizontal)
- [Proximity](https://labs.willianjusten.com.br/scroll-snap/proximity)

Abaixo segue um gif do exemplo vertical, para você já entender o que faremos.

![Fotos de paisagens na Austria sendo scrolladas verticalmente](/assets/scroll-snap.gif)

## Plugins famosos e sites que usam

Como disse, vários sites usam essa técnica, mas eles acabam caindo em plugins JS. Que são os casos do:

- [FullPage](https://alvarotrigo.com/fullPage/)
- [One Page Scroll](http://www.thepetedesign.com/demos/onepage_scroll_demo.html)
- [RevealJS](https://revealjs.com/#/)

E aí, eu separei alguns sites bem legais que usam:

- [BBC - Partition of India Article](https://www.bbc.co.uk/news/resources/idt-d88680d1-26f2-4863-be95-83298fd01e02)
- [One Month Off - Indonesia](https://readymag.com/repponen/20907/10/)
- [Coca Cola Annual Review](https://www.coca-colacompany.com/annual-review/2017/index.html)

E quanto ao [RevealJS](https://revealjs.com/#/), existem várias apresentações de dev por aí usando ele. Já pensou, agora você pode fazer suas apresentações usando só css simples para passar os slides! =D

## Mas e como fazer isso só com CSS?

Existe um conjunto de propriedades chamadas [CSS Scroll Snap](https://caniuse.com/#feat=css-snappoints), que já é até bem antigo, mas vem ganhando compatibilidade com os browsers aos poucos. E algumas dessas propriedades, que é o caso do [scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) já é bastante compatível e já faz o efeito que precisamos.

A sintaxe mudou um pouco e agora está ainda mais simples de usar, então vamos ver como que faz.

### Criando o Markup

Basicamente precisamos criar um `.container` e então as `sections`, que irão ocupar toda a página e para ter as imagens, utilizaremos diferentes `backgrounds`, então a forma mais simples fica assim:

```html
<div class="container">
  <section class="one">
    <div class="description">
      <p>
        Um caminho qualquer em Bad Ausee, uma cidade na região da Estíria que
        tem pouco mais de 5 mil habitantes.
      </p>
    </div>
  </section>
  <section class="two">
    <div class="description">
      <p>
        A caminho da cidade de Hallstatt, conhecida como uma das mais bonitas do
        mundo. Para chegar lá, somente de barco ou dando uma grande volta pelo
        lago de mesmo nome.
      </p>
    </div>
  </section>
  <section class="three">
    <div class="description">
      <p>
        As margens do lago Autaussee. Esse dia fazia apenas 10 graus negativos,
        mas eu queria muito passear e explorar todos os lugares.
      </p>
    </div>
  </section>
  <section class="four">
    <div class="description">
      <p>
        Mais uma foto do mesmo barco que leva a Hallstatt, mas dessa vez do meu
        drone, amo como a reflexão ficou tão azul em contraste com as montanhas.
      </p>
    </div>
  </section>
  <section class="five">
    <div class="description">
      <p>
        Momentos antes do pôr-do-sol visto de Hallstatt. Essa cadeia de
        montanhas é realmente maravilhosa!
      </p>
    </div>
  </section>
</div>
```

Cada `section` tem uma classe específica, assim conseguimos adicionar diferentes backgrounds para cada um.

### Criando o CSS base para as sections

Antes de fazer o scroll funcionar, vamos criar os estilos para as seções ficarem fullscreen e a caixa da descrição da foto. Para ocupar a tela inteira vamos utilizar as propriedades `vw` e `vh`, que são unidades de viewport, eu falo [mais sobre elas aqui](https://willianjusten.com.br/como-criar-secoes-fullscreen-com-css/). Segue abaixo o css:

```css
section {
  background-size: cover;
  background-position: center center;
  height: 100vh;
  width: 100vh;
}

.description {
  background: rgba(0, 0, 0, 0.3);
  bottom: 1rem;
  color: white;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 250px;
  padding: 2rem;
  position: absolute;
  right: 1rem;
}

.one {
  background-image: url('./img/one.jpg');
}
.two {
  background-image: url('./img/two.jpg');
}
.three {
  background-image: url('./img/three.jpg');
}
.four {
  background-image: url('./img/four.jpg');
}
.five {
  background-image: url('./img/five.jpg');
}
```

### Agora a mágica do CSS

Basicamente precisamos dizer ao nosso `.container`, que ele vai ter esse controle de scroll, utilizando a propriedade `scroll-snap-type`. Ela recebe 2 parâmetros que podem ser `scroll-snap-type: x|y|both mandatory|proximity`.

O primeiro parâmetro indica para onde será o scroll, `x` para o scroll horizontal, `y` para scroll vertical e `both` se for para os dois eixos. Já o segundo parâmetro indica como funcionará o scroll.

O `mandatory` diz que pelo simples fato de você mover um pouco o scroll, ele já irá para o próximo "slide", já o `proximity`, ele vai calcular qual está mais próximo, se você mover só um pouco ele vai voltar a centralizar o slide atual.

Então para fazer os slides mudarem de forma horizontal, usaremos da seguinte forma:

```css
.container {
  scroll-snap-type: x mandatory;
  display: flex;
}

section {
  scroll-snap-align: start;
}
```

Passando a propriedade `scroll-snap-align`, a gente diz em qual parte do slider queremos que o scroll pare e alinhe, como é uma página inteira, faz mais sentido ser no `start`, mas existem também as opções de `end` e `center`.

E pronto! Já está funcionando! Sim, só isso, não precisa de mais nadinha! Você pode ver o exemplo do [horizontal aqui](https://labs.willianjusten.com.br/scroll-snap/horizontal) e se quiser ver o [código inteiro](https://github.com/willianjusten/labs/blob/gh-pages/scroll-snap/horizontal.html).

Para o exemplo na vertical, basta trocar o eixo de `x` para `y`, ficando `scroll-snap-type: y mandatory;`. Você pode ver exemplo do [vertical aqui](https://labs.willianjusten.com.br/scroll-snap/vertical) e se quiser ver o [código inteiro](https://github.com/willianjusten/labs/blob/gh-pages/scroll-snap/vertical.html).

## Conclusão

A dica de hoje foi super rápida e simples, mas é possível que muita gente não conheça essa propriedade, então é legal passar adiante. Vou continuar postando algumas outras dicas com CSS para criar soluções que usamos no nosso dia a dia. Se vocês tem alguma coisa específica em mente, deixa aí nos comentários ou manda lá no [Twitter](https://twitter.com/Willian_justen) que eu posso estar fazendo.
