---
layout: post
title: '#12 - Animações em SVG com CSS'
date: 2015-07-01 04:22:29
image: '/assets/img/svg-animacoes-css/main.png'
description: 'Aprenda como criar animações para o SVG usando só CSS e tenha um site leve e bonito.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - css
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Como criar animações para o SVG usando só CSS.'
introduction: 'Veja como criar diferentes animações para o SVG usando só CSS3. E já saia criando loaders e outras coisas mais.'
---

## Índice da série

Tenho escrito bastante sobre SVG que agora os links cresceram e ficar listando todos o tempo todo aqui já vai ficar ruim, então, para facilitar, basta ir em [séries](https://willianjusten.com.br/series/) e lá estarão todos os meus links sobre SVG.

## Introdução

Como de costume, a trilha sonora enquanto escrevo esse post é uma playlist chamada [Totally Stress Free](https://open.spotify.com/playlist/37i9dQZF1DWT7XSlwvR1ar?si=Msf4R5xgSxyBqfCxDb5rzQ), estou com uma puta sinusite e não consigo dormir, então umas músicas mais calmas para eu tentar relaxar e conseguir dormir. Por favor, ignorem os erros grotescos que puderem haver no post, ele vai ser bem pequeno até por isso também.

O post de hoje será em forma de mini-tutorial, então já vou passando logo os exemplos que faremos hoje.

- [Airplane Loader SVG](https://willianjusten.github.io/svg-animation-css/loader.html)
- [Earth SVG](https://willianjusten.com.br/svg-animation-css/)
- [Repositório no Github](https://github.com/willianjusten/svg-animation-css)

## Relembrando...

Uma das grandes vantagens do SVG é que ele é um código xml, que pode ser facilmente manipulado. Esse código possui uma estrutura bem definida, com elementos bases e se você quiser lembrar um pouquinho, basta ler [A estrutura do SVG](https://willianjusten.com.br/a-estrutura-do-svg/).

E como irei fazer animações usando CSS, é bom que você já tenha lido as formas de se [estilizar o SVG usando CSS](https://willianjusten.com.br/estilizando-svg-com-css-parte-1/) e se quiser, pode também se aprofundar em alguns dos [estilos especificos do SVG](https://willianjusten.com.br/estilizando-svg-com-css-parte-2/).

### Passo 1 - Obtendo um SVG

Para este tutorial, eu vou utilizar 2 SVG diferentes. Um contendo somente um elemento e o outro com vários elementos. Para poder mostrar que é possível animar tanto 1 como muitos elementos do DOM sem perda de performance e com uma qualidade bem bacana.

Os arquivos foram [exemplo 1](http://www.freepik.com/free-vector/airplane-vector-template-free_714802.htm) e [exemplo 2](http://www.freepik.com/free-vector/world-travel-vector-free-template_714008.htm).

Se você quiser, tem o link de [onde baixar svg?](https://willianjusten.com.br/onde-baixar-svg/).

### Passo 2 - Limpando o vetor

Como pode ter notado, o arquivo veio em `.AI`, para ser aberto no Illustrator. O que eu queria era somente o avião e seu rastro. Para isso selecionei somente esses dois elementos e os passei para um outro arquivo e o salvei como SVG.

![Imagem do Illustrator](/assets/img/svg-animacoes-css/illustrator.png)

### Passo 3 - Otimizando o SVG

Em geral, esses vetores obtidos da internet vem muito sujos e com muita coisa escrita desnecessária e para isso temos o nosso salvador [SVGOMG](https://jakearchibald.github.io/svgomg/), que é o melhor otimizador de SVG que existe na face da Terra! Basta colocar o seu SVG lá e mandar otimizar, os ganhos as vezes podem ser de mais de 80%!!!

![Imagem do Illustrator](/assets/img/svg-animacoes-css/svgomg.png)

### Passo 4 - Dando nome aos bois

Já tendo o nosso código otimizado, podemos nomear os elementos dos quais queremos estilizar e animar.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KpQdGo" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/KpQdGo">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Nesse caso, eu criei um grupo para unir o avião e seu rastro e dei a esse grupo a classe `plane`. Ao redor eu criei uma classe `loader` só para poder segurar o elemento e centralizá-lo.

### Passo 5 - Criando a animação

Para ambos os exemplos, eu não fiz um uso maciço de tipos de animação, até porque o objetivo é só mostrar as habilidades do SVG e a facilidade com que temos para animar.

No caso eu utilizei `keyframes` para criar a minha rotação e o `animate` para chamar essa animação. Se você se interessar por animação e quiser saber mais sobre, só dar uma olhada nos posts:

- [CSS Transition e CSS Animation por Raphael Fabeni](https://tableless.com.br/transition-e-animation/)
- [CSS Animation for Beginners por Rachel Cope](https://robots.thoughtbot.com/css-animation-for-beginners)
- [Usando animações CSS pela MDN](https://developer.mozilla.org/pt-BR/docs/CSS/Using_CSS_animations)
- [Criando animação Flipping por Maujor](http://www.maujor.com/tutorial/criando-animacao-flipping-com-css.php)

### Extras: bug do Firefox e Safari

Para as animações de `rotate` é necessário definir um ponte de origem onde a rotação irá ser realizada, para ambos os exemplos, o centro é ponto ideal, podemos fazer de duas formas:

- `transform-origin: 50% 50%;`: dessa forma definimos o centro no eixo X e no eixo Y, considerando que o meio do elemento é sempre metade do mesmo.
- `transform-origin: Kpx Zpx;`: onde K é a metade da largura e Z a metade da altura.

Porém, nem tudo são flores e o Firefox ainda possui um bug em que ele não consegue identificar muito bem as origens quando se usa porcentagem e com pixels ele também se confunde. Então o jeito é utilizar o atributo prefixado.

`-moz-transform-origin: Apx Bpx`

Assim conseguimos contornar esse defeito no Firefox. Para você ter ideia, a Sara Soueidan, que é uma das maiores evangelistas de SVG, também já cansou de reclamar sobre esse bug.

<p><blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Dear <a href="https://twitter.com/firefox">@firefox</a>,&#10;&#10;Please fix that 100-years-old SVG `transform-origin` bug <a href="https://t.co/IO9Qy0gipD">https://t.co/IO9Qy0gipD</a>&#10;&#10;Sincerely,&#10;Everyone animating SVG w/ CSS</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/543789877767061504">December 13, 2014</a></blockquote></p>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Para o Safari, o problema é bem mais simples, as animações de rotate e transforms ainda necessitam do uso do prefixo `-webkit`, então basta adicionar os prefixo e tudo passará a funcionar. Se você utilizar Gulp ou Grunt, basta adicionar o autoprefixer para fazer esse trabalho. Ou então crie mixins no seu pre-processador.

Na dúvida do que funciona? Sempre veja no [Can I use](http://caniuse.com/).

### Dica: SVG com muitos elementos

![Segundo Exemplo mostrando um planeta rodeado por aviões e outras coisas](/assets/img/svg-animacoes-css/segundo-exemplo.png)

No segundo exemplo, apesar do código ser grande, existe um método bem fácil de conseguir nomear e separar as coisas. Insira o SVG inline na página sem nomear nada e com o inspect, vá marcando elemento a elemento e procurando dentro do arquivo para adicionar as classes. Caso tenha dificuldades de notar visualmente se está selecionando o elemento certo, modifique o `fill` do elemento para uma cor bem diferente, assim você consegue filtrar mais fácil também.

Para o segundo exemplo, eu criei keyframes girando para o lado direito e esquerdo (`spin-right` e `spin-left`) e de acordo com o elemento, eu coloquei tempos diferentes, para que assim as rotações não ficassem tão embaralhadas e dessem um aspecto mais legal.

## Conclusão

Bom, com esse post, acho que fica claro em como é fácil animar o SVG usando só CSS puro. Se você tiver curiosidade, aconselho a ver outros vários exemplos muito bacanas sobre.

Na awesome tem em [Experimentos](https://github.com/willianjusten/awesome-svg/blob/master/topics/Experiments.md) e para se aprofundar ainda mais sobre o assunto também temos [Animations](https://github.com/willianjusten/awesome-svg/blob/master/topics/Animation.md) lá na awesome.
