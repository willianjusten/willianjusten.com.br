---
layout: post
title: 'Background fixo com CSS'
date: 2015-07-24 00:50:02
image: '/assets/img/reveal-bg/main-2.png'
description: 'Como atrair usuários usando seções com backgrounds fixos usando só css.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - tutorial
categories:
twitter_text: 'Como atrair usuários usando seções com backgrounds fixos usando só css.'
introduction: 'Como atrair usuários usando seções com backgrounds fixos usando só css, também conhecidos como Paralax.'
---

## Introdução

Mais um post extra que venho fazendo enquanto subo a serra em direção a minha querida Petrópolis. No caminho, como não poderia deixar de ser, vou ouvindo uma incrível [playlist de jazz](https://open.spotify.com/playlist/37i9dQZF1DWVqfgj8NZEp1?si=tc-jCV7WQ_C4xwda_ZEVaQ), que foi importante para criação desse mini mini mini tutorial.

## O que vamos fazer?

Seguindo um pouco daquele post sobre [Seções em Fullscreen](https://willianjusten.com.br/como-criar-secoes-fullscreen-com-css/), resolvi dar uma melhorada naquela técnica incluindo outras técnicas. A ideia desses tipos de posts é mostrar alguns conceitos simples e propriedades do css, para que iniciantes conheçam utilidades práticas de algumas coisas.

**Lembrando que são experimentos, verifique a compatibilidade e o suporte que deseja ter.**

Para quem gosta de ver o resultado antes mesmo de começar <s>apressadinho =p</s>, segue aqui o link do experimento:

- [DEMO](https://labs.willianjusten.com.br/background-fixo-css/)

## Montando o Markup

Para cada frase eu criei uma seção e de acordo com os pesos que eu desejava para a fonte, utilizei diferentes `headings` e o `p` para os autores. Como são citações, utilizei a tag `blockquote`, se não conhece, dê uma olhada na [MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/blockquote).

```html
<section class="vh100">
  <h1>Great Music Quotes</h1>
</section>

<section class="vh100">
  <blockquote cite="Friedrich Nietzsche">
    <h3>"Without music, life would be a mistake."</h3>
    <p>Friedrich Nietzsche</p>
  </blockquote>
</section>

<section class="vh100">
  <blockquote cite="John Green">
    <h1>"Some people have lives; some people have music."</h1>
    <p>John Green</p>
  </blockquote>
</section>

<section class="vh100">
  <blockquote cite="Victor Hugo">
    <h4>
      "Music expresses that which cannot be said and on which it is impossible
      to be silent."
    </h4>
    <p>Victor Hugo</p>
  </blockquote>
</section>

<section class="vh100">
  <h1>Where words leave off, music begins.</h1>
</section>
```

## Brincadeiras no CSS

### Seções com altura total

Primeiro, para ter seções ocupando 100% da viewport, vou fazer o mesmo trabalho do [post anterior](https://willianjusten.com.br/como-criar-secoes-fullscreen-com-css/), ou seja, irei [viewport units](http://desenvolvimentoparaweb.com/css/unidades-css-rem-vh-vw-vmin-vmax-ex-ch/). E para os espaçamentos e fontes, resolvi brincar com as viewport units também, porém, trabalhando com a largura da tela `vw`.

```css
section {
  height: 100vh;
  padding: 2vw;
  font-size: 4vw;
}
```

### Textos centralizados verticalmente

Para centralizar os textos, também resolvi brincar dessa vez com Flexbox, se quiser aprender sobre tem esse [artigo fodão](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) que ensina tudo. Primeiro defino o `display: flex` para informar que vou usar esse modelo de layout. Depois defino que quero organizar o layout com `flex-direction: column`, que no caso irá organizar de de cima para baixo. E então uso `align-itens: center` para ter meu texto centralizado verticalmente.

```css
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
```

Para a primeira seção o seu título precisava de um destaque maior, resolvi usar o pseudo-seletor `first-of-type` para pegar só essa primeira seção. Lembrando que pseudo-seletores não são tão performáticos quanto classes, mas em momentos que você não pode utilizar classes diretamente, se tornam ótimas soluções.

```css
section:first-of-type {
  text-transform: uppercase;
  font-size: 7vw;
}
```

### Background fixo e em toda área

Para dar o toque final, primeiro vamos inserir um background que cubra a área toda.

```css
section {
  background-size: cover;
  background-repeat: no-repeat;
}
```

O `backgroung-size` será responsável por fazer a imagem ocupar toda a área que ela puder e se ajeitar se a tela for menor. Só tome cuidado para não colocar imagens com qualidade muito baixa, pois isso pode fazer com que a imagem perca muito a qualidade. O `background-repeat` servirá só para evitar que a imagem não se repita caso tenha espaço sobrando.

Como são vários backgrounds diferentes, resolvi brincar com outro pseudo-seletor que é o `nth-child(n)`, ele é responsável por selecionar elementos de acordo com o valor de `n` passado. Aproveitei que as seções ímpares são aquelas com letra branca e sombra, usei o `nth-of-type(odd)`, para assim, selecionar os números ímpares (1,3,5).

```css
section:nth-of-type(odd) {
  color: #fff;
  background-color: #000;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}
section:nth-child(1) {
  background-image: url(../img/guitar.jpg);
}
section:nth-child(3) {
  background-image: url(../img/bass.jpg);
}
section:nth-child(5) {
  background-image: url(../img/drums.jpg);
}
```

Nesse momento, temos o seguinte:

![background scroll](/assets/img/reveal-bg/bg-scroll.gif)

Um fundo fixo e um pouco sem graça né? Para deixar ele com uma interação diferente, coloquei ele como fixo, assim o texto na frente se move e o fundo fica fixo, causando uma espécie de paralax. Para deixar o fundo fixo, só usar `background-attachment: fixed`. E teremos algo assim:

![background fixo](/assets/img/reveal-bg/bg-fixo.gif)

E bom, é isso, algo bem simples, mas bonito e apresentável =)

## Polyfill

Como sabemos as viewport units não são totalmente compatíveis em todos os browsers e por isso, podemos usar algum polyfill para poder garantir uma melhor compatibilidade. Algumas pessoas me mandaram algumas dúvidas relacionadas a isso. Então estou adicionando aqui o link de um polyfill que achei excelente como se utiliza.

- [VUnit](http://joaocunha.github.io/vunit/)

Para utilizar é bem simples, basta inserir a chamada do script e seu inicializador:

```html
<script type="text/javascript" src="js/vunit.js"></script>
new vUnit({ CSSMap: { '.vh': { property: 'height', reference: 'vh' } }
}).init();
```

Você define uma classe, ali no caso é o `.vh` e está irá de `.vh0` até `vh100` indicando o tamanho e qual a referência. No caso eu quero que ele mude as unidades de `vh` para `height`.

No markup ficaria assim:

```html
<section class="vh100">
  <blockquote cite="Friedrich Nietzsche">
    <h3>"Without music, life would be a mistake."</h3>
    <p>Friedrich Nietzsche</p>
  </blockquote>
</section>
```

Onde o `class="vh100"` indica que eu quero uma área com 100% de altura da viewport.

## Conclusão

Enfim, foi mais um post pequeno, fácil e rápido mostrando algumas coisinhas legais do css. Lembre-se que são só experimentos e não necessarimente você precisa usar todas essas coisas. Se tiver alguma dúvida ou quiser perguntar alguma coisa, só falar nos comentários abaixo.
