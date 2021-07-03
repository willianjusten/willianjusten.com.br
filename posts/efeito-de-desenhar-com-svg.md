---
layout: post
title: '#15 - Criando o efeito de desenhar com SVG'
date: 2015-10-05 18:41:21
image: '/assets/img/draw-svg/main.png'
description: 'Um tutorial de como fazer aquele efeito legal de desenhar elementos na tela com SVG.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - css
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Aprenda como desenhar na tela usando SVG.'
introduction: 'Um tutorial de como fazer aquele efeito legal de desenhar elementos na tela com SVG e CSS3.'
---

## Introdução

Estou aproveitando que estou descendo a serra e vou iniciar mais um post, não sei se vou ter paciência para terminar, mas vamos lá. No momento estou ouvindo Radiohead, mais especificamente o cd The Bends, que é um dos meus favoritos.

Nesse post eu vou mostrar uma das paradas mais legais de todas do SVG, que é a técnica de Line Drawing, mais famosa como "aquele efeito louco de desenhar na tela". Essa é uma técnica bastante simples, mas que pode ser utilizada de diversas formas e permite criar vários tipos de interação e usabilidade.

Se você não sabe que efeito é esse, dá uma olhadinha nessa [coleção do codepen](http://codepen.io/collection/cEust/10/).

## Contornos

Se pararmos para pensar, todo desenho começa a partir de um contorno e depois colorimos as formas criadas. Então, para criarmos esse efeito de "desenhar" basta manipularmos o contorno, que no nosso SVG é a propriedade `stroke`.

## Stroke-dasharray e Stroke-dashoffset

A propriedade `stroke-dasharray` permite você determinar qual vai ser o tamanho do traço no contorno e o espaço entre um traço e outro. Exemplo:

```css
path {
  stroke-dasharray: 10;
}
```

Isso significa que cada traço no desenho terá um tamanho de 10 e um espaço de 10 para o próximo traço.

Já a propriedade `stroke-dashoffset` permite mudar onde o `stroke-dasharray` vai começar e terminar.

Então para o efeito acontecer, basta que eu determine que o `stroke-dasharray` seja o tamanho máximo do elemento e fazer com que o `stroke-dashoffset` vá diminuindo do tamanho máximo até zero. Assim teríamos:

#### Passo 1

```css
inicio {
  stroke-dasharray: 'tamanho do desenho';
  stroke-dashoffset: 'tamanho do desenho';
}
```

Aqui, como determinamos que o `stroke-dashoffset` é o tamanho do desenho, ele empurra todo o traço e não enxergamos nada na tela.

#### Passo 2

```css
final {
  stroke-dashoffset: 0;
}
```

Nesse passo, dizemos que o traço deve começar do ponto zero do mesmo e como dizemos que o `stroke-dasharray` tem o tamanho todo, vemos claramente todo o contorno.

Mas vamos parar de falar teoria e vamos para a prática:

## Criando o Efeito de Desenhar

### 1 - Baixando um SVG ou criando um.

Para esse primeiro exemplo, eu resolvi criar um bem simples, que nada mais é que escrever "Hello" na tela. Minha letra é uma bosta, então releve, por favor, depois faça com sua assinatura ou qualquer coisa e manda nos comentários =)

Eu fiz o desenho no Illustrator, mas ele também pode ser feito no Inkscape, Sketch e outros editores de SVG.

![Imagem mostrando um Hello escrito no Illustrator](/assets/img/draw-svg/hello.png)

### 2 - Otimizando o SVG

Sempre que baixar um SVG ou criar um, a melhor coisa a se fazer é dar uma otimizada, isso ajuda a eliminar muita sujeira que atrapalharia até na leitura do próprio SVG. Nesses casos pontuais (só um item), aconselho muito o [SVG OMG](https://jakearchibald.github.io/svgomg/).

### 3 - Inserindo o SVG na página

Basta copiar o código gerado e colar inline no seu html. Aproveite e defina uma classe para o SVG, no caso, eu coloquei `class="hello"`.

```html
<svg class="hello" width="230.3px" height="155.9px" viewBox="0 0 230.3 155.9">
  <path
    fill="none"
    stroke="#000000"
    stroke-miterlimit="10"
    d="M0.5,0.2c2.2,5.8,0.7,12,0.9,18.2C2,33.2,4.9,48.5,7,63.2
        c2.2,15.4,5.8,30.3,7.4,45.7c1.3,13.2,0.4,29.8,4.7,42c-0.3-16.9-3.1-48.5,19.5-49.6c21.2-1,11.1,25.8,23.1,37.2
        c28.4,27,66.2-29,34.8-38.2c-7.2,17.2-5.8,50.6,21.5,44.5c14.1-3.2,20.7-26.4,22.9-39.2c1.3-7.5,12.1-75.8,1-73.9
        c-12.1,2.1-15.8,45.5-16.3,54.4c-0.8,14.8,1.3,26.9,6.8,40.2c4.6,11,6.9,19.4,19.3,20.7c14.3,1.6,21.8-11.7,27.2-24
        c8.4-19.3,6.5-43,6.5-64c0-7.3-4.1-27-13-15.4c-4.3,5.6-4.1,23.6-4.4,30.7c-0.5,11.9-1.1,24.4,2.4,35.7c5,15.9,14.8,31.2,30.1,38.3
        c7.9,3.7,19.4,7.5,25.9-0.5c3.6-4.4,4.6-23.3,2.2-28.6c-5.5-12.5-25-10.9-29.4,1.6c-5.2,14.8,1.6,25.3,9,34.8"
  />
</svg>
```

### 4 - Descobrindo o tamanho total do path

Para que possamos fazer o truque de desenhar, precisamos saber o tamanho do path para definir em nosso `stroke-dasharray` e `stroke-dashoffset`. Para isso, basta usarmos um método do Javascript. No próprio console do seu devTools, faça:

```js
var draw = document.querySelector('.hello path')
console.log(draw.getTotalLength())
```

No meu caso, o resultado foi de `1044.4212646484375`.

### 5 - Criando a animação

Depois de tudo ali em cima, agora fica bem fácil de fazer essa animação. Primeiro vamos definir para a nossa classe `hello`, o seu tamanho máximo e uma largura para o traço.

```css
.hello {
  stroke-width: 3px;
  stroke-dasharray: 1045; // numero arrendoda do tamanho
}
```

Depois disso, vamos criar a animação em css usando `@keyframes`, se você não conhece ainda, dá uma lidinha no [site da MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes), lá eles falam bastante sobre. Mas o que você precisa saber é que através dos keyframes a gente consegue definir estados da animação, seja "de-para" (from-to) até o uso de porcentagens de um tempo. Para o nosso caso, faremos aquela jogadinha dos `strokes`.

```css
// write é o nome da nossa animação
@keyframes write {
  0% {
    stroke-dashoffset: 1045; // tamanho inicial
  }
  100% {
    stroke-dashoffset: 0; // tamanho final
  }
}
```

Feito isso, basta definirmos essa animação lá na nossa classe `hello`:

```css
.hello {
  stroke-width: 3px;
  stroke-dasharray: 1045; // numero arrendoda do tamanho
  animation: 6s write; // quanto menor, mais rápido
}
```

Prontinho, temos nossa animação feita!! Segue abaixo o exemplo criado, para ver a animação é só clicar em "Rerun" ali no canto inferior direito:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jbELOQ" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/jbELOQ">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Desenhando e preenchendo

Junto a essa brincadeira de desenhar, podemos além de só desenhar o contorno, podemos também pintar as coisas. Segue um exemplo simples feito com a logo do Python, que baixei no [SVG Porn](http://svgporn.com/). Lembre de clicar no "Rerun" caso a animação já tenha acontecido:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="epvovO" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/epvovO">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Para esse exemplo, utilizei 3 pontos no `keyframe` para poder pintar somente ao finalizar os traços, deixando como se fosse um efeito de montar a logo. Para que desse uma suavizada das cores, eu usei a propriedade `fill-opacity`, que é bastante similar a propriedade `opacity` do css, porém que funciona só nos preenchimentos.

## Desenhando com Scroll

Outro efeito legal é fazer o desenho ser criado ao scrollar a tela. Para isso precisamos de um pouquinho mais de Javascript, para que a cada scroll, a gente vá diminuindo o valor do `stroke-dashoffset` até que ele alcance o valor de zero.

Segue um exemplo:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BoWEwP" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/BoWEwP">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Vamos prestar atenção a certos trechos do código. Primeiro precisamos verificar qual o tamanho do elemento e então definir seu `stroke-dasharray` e o `stroke-dashoffset` igual nos outros exemplos.

```js
// Seleciona o path do nosso desenho
var path = document.querySelector('path')

// Pega o tamanho total dele
var pathLength = path.getTotalLength()

// Faz com que o stroke-dasharray fique com o tamanho total
path.style.strokeDasharray = pathLength + ' ' + pathLength

// Faz com que o stroke-offset fique com o tamanho total
// Escondendo assim o desenho
path.style.strokeDashoffset = pathLength
```

Depois nós precisamos criar um evento de `scroll` e de acordo com ele, ir diminuindo o valor do `stroke-dashoffset` até 0.

```js
// Adiciona o evento de Scroll
window.addEventListener('scroll', function (e) {
  // determina a porcentagem do quanto o usuário já scrollou na tela
  var scrollPercentage =
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight)

  // Determinando o tamanho do desenho pela porcentagem
  var drawLength = pathLength * scrollPercentage

  // Diminuindo o valor do offset para criar o desenho
  path.style.strokeDashoffset = pathLength - drawLength
})
```

## Conclusão

Bom, espero que tenham gostado desse post, essa é uma das animações mais legais que tem no SVG e que é praticamente exclusiva dele, visto que não conseguimos interagir com imagens e criar certos desenhos somente em CSS é quase inviável.

E se você acha que o efeito é legal, mas não saberia aplicar em seu site, seguem alguns sites que utilizam muito bem dessa técnica.

- [Garden](http://gardenestudio.com.br/)
- [Panizzon](http://panizzon.ind.br/)
