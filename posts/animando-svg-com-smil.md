---
layout: post
title: '#13 - Animando SVG com SMIL'
date: 2015-07-21 21:55:02
image: '/assets/img/svg-smil/main.png'
description: 'Aprenda a criar animações usando só SVG e nada mais!'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - smil
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Aprenda a criar animações usando só SVG e nada mais!'
introduction: 'Aprenda a criar animações usando só SVG e nada mais, através da api exclusiva de animação SMIL.'
---

## Introdução

Enquanto escrevo esse post vou ouvindo [Deftones](https://open.spotify.com/artist/6Ghvu1VvMGScGpOUJBAHNH), mudar para um som mais pesado para animar um pouco.

Já faz um tempinho que não escrevia sobre SVG, então vou dar uma quebra nos outros posts e voltar a falar um pouquinho sobre. Se você ainda não conhece SVG <s>sai daqui</s>, dá uma olhadinha na [série](https://willianjusten.com.br/series/) que eu escrevo nesse blog.

Esse post foi baseado num apanhado de informações de vários cantos:

- [Guide SVG Animation Smil](https://css-tricks.com/guide-svg-animations-smil/)
- [Three ways animate svg](https://css-tricks.com/video-screencasts/135-three-ways-animate-svg/)
- [How SVG Shape Morphing Works](https://css-tricks.com/svg-shape-morphing-works/)

## Animações

Não é de hoje que animações são as queridinhas nos sites e apps, seja pela melhoria em algum aspecto na usabilidade, seja pela beleza que a animação pode proporcionar.

O SVG é tão incrível que permite vários tipos de animações, já falei sobre [animações usando css](https://willianjusten.com.br/animacoes-em-svg-com-css/) e agora irei falar sobre um tipo específico do SVG, que é a animação usando SMIL.

## Mas o que é SMIL? É de comer?

[SMIL](http://www.w3.org/TR/2001/REC-smil-animation-20010904/) ou **S**ynchronized **M**ultimedia **I**ntegration **L**anguage é uma linguagem baseada em XML que permite escrever interações para os elementos. A sua sintaxe é basicamente representada pelos tempos de animações, mudanças dos elementos e inicializações dos comportamentos.

**Obs.:** funciona em todos os browsers exceto IE [caniuse](http://caniuse.com/#feat=svg-smil)

## Por que usar esse treco aí?

A animação em SMIL é [declarativa](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/#toc-imperative-declarative), ou seja, você declara transições e estados para os elementos. A vantagem é que os browsers podem otimizar esse tipo de animação, não pesando tanto na renderização. A grande desvantagem de animações declarativas é que, em geral, elas não são tem tanto poder e não fazem tantas coisas. Eis que o SMIL brilha, ele tem a facilidade e otimização que o CSS permite com o poder de manipulação que só o JS teria.

Como o SMIL é mais poderoso, ele permite animar propriedades que o CSS não conseguiria, como, por exemplo, as formas das Paths.

Outra coisa bastante bacana é que animações feita em SMIL funcionam até mesmo quando o SVG é inserido na tag `img`! =)

E também conseguimos manipular as animações com eventos! Convencido?

## Comandos básicos

Assim como as diferentes tags que o SVG possui para suas formas, ele também possui algumas poucas tags para realizar essas animações, que são:

- `<animate>`: permite animar atributos e propriedades num determinado período de tempo.
- `<animateTransform>`: usado para animar a transformação dos atributos num período de tempo.
- `<animateMotion`: para mover um elemento ao longo de um path.
- `<set>`: usado também como um "shorthand" para o `animate`, é útil para definir valores não numéricos para animação e propriedades, como a propriedade de `visibility`.

### Sintaxe

```html
<animate
  id="myAnim"
  attributeName=" "
  from=" "
  to=" "
  dur=" "
  begin=" "
  fill=" "
  ...
/>
```

Para o `animate` temos os principais atributos:

- `attributeName`: o atributo do qual iremos alterar, pode ser um `fill` ou `points` de um `path`.
- `from`: de onde se inicia.
- `to`: para onde vai a animação.
- `dur`: a duração da animação.
- `begin`: é a "trigger" de inicialização da animação. Podemos colocar como `click` para dizer que só inicia com um click ou podemos colocar como `begin=2s`, onde dizemos que a animação só irá começar 2s depois de ter carregado.
- `fill`: não confunda com preenchimento, esse atributo serve para dizer se a animação deve parar em seu estado final (`freeze`) ou a animação ser removida quando alcançar o estado final (`remove`).
- `repeatCount`: como o nome já diz a quantidade de vezes que a animação vai repetir, se quiser que seja infinito, basta usar `indefinite`.
- `repeatDur`: marca o tempo de duração da repetição, a notação é conforme relógio normal, exemplo, `1:30` significa 1 minuto e 30 segundos.

### Modos de uso

Existem duas formas de se aplicar animações, que são:

#### Especificando um target

```html
<rect id="myRect" ... /> <animate xlink:href="#myRect" ... />
```

#### Aninhando dentro do elemento

```html
<rect id="myRect" ...>
  <animate ... />
</rect>
```

Um outro detalhe muito importante é que para cada `animate` só podemos animar um atributo principal, que é determinado pelo `attributeName`. Portanto se quisermos fazer 2 tipos diferentes de animação, iremos precisar de 2 elementos `animate` para cada atributo.

### Exemplo

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BNOJjg" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/BNOJjg">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```html
<svg width="500" height="100">
  <circle id="orange-circle" r="30" cx="50" cy="50" fill="orange" />

  <animate
    xlink:href="#orange-circle"
    attributeName="cx"
    from="50"
    to="450"
    dur="1s"
    begin="click"
    fill="freeze"
  />
</svg>
```

No exemplo acima, determinamos que vamos alterar o atributo `cx` do círculo, ou seja, sua posição no `eixo x`, passando de `50` para `450`, com a duração de `1s` após haver o `click` e tendo animação finalizada pelo `freeze` ao final da movimentação.

Segue abaixo um exemplo da mudança de posição e de cor, note que utilizamos 2 `animate`:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vOzpGV" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/vOzpGV">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Controlando animações com keyTimes e values

Assim como nos keyframes do css, no SMIL também podemos criar um conjunto de valores e tempos para criar a animação da forma que desejarmos.

Segue um exemplo utilizando:

```html
values="50; 490; 350; 450" keyTimes="0; 0.5; 0.8; 1"
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bdxaWN" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/bdxaWN">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Como pode perceber, no tempo `0` o círculo está na posição `50`, aos `0.5` é onde ele vai mais longe, `490`, depois ele retorna para `350` e então avança para `450`, exatamente como os valores informados. Sempre obedecendo a proporção de uma mudança para um tempo.

## Mudando as formas de uma path

Como disse no início do post, a vantagem do SMIL é poder manipular propriedades que o CSS não muda, como, por exemplo a forma de um path.

Vamos pensar num primeiro exemplo, onde queremos transformar um quadrado em um círculo.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="mJGpMg" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/mJGpMg">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Nós iremos trabalhar no `attributeName=d`, que é onde desenhamos a path e teremos 2 passos, `from`, que contém a forma de um quadrado e o `to`, que contém a forma de um círculo, definimos um tempo para a animação ocorrer e pronto, a mágica acontece.

Agora vamos pensar numa situação em que eu tenho um quadrado virando um triângulo e este virando um círculo, ou seja, 3 etapas. Para trabalhar com mais de uma etapa, basta definir mais valores dentro de `values` e casos queiramos mudar o tempo de acordo com a mudança, podemos usar o `keyTimes`. Segue um exemplo dessa transição:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RPYxLd" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/RPYxLd">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Mas e se eu quisesse além de mudar os 3 visuais, também quisesse mudar de cor? Basta adicionar mais um animate, passando os `values` do `attributeName=fill`. Segue um exemplo colorido:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="rVZppG" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/rVZppG">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Aplicação prática em UX

Pow Willian, isso tudo aí é muito legal, muito maneiro, mas não vejo utilidade nenhuma nisso aí. Onde eu poderia aplicar um treco desses no meu site?

Podemos, por exemplo, aplicar uma mudança de um ícone para dar um feedback para o usuário. Segue um botão seguindo esse tipo de interação:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BNOJON" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/BNOJON">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

As animações realizadas para o botão acima ficam separadas em:

- Transformar no check
- Mudar para cor verde
- Transformar na estrela
- Mudar para cor amarela

Para cada uma dessas animações utilizamos a tag `animate` sempre definindo o `to`, que significa para onde estamos transformando. O JS utilizado no exemplo é só para adicionar o textinho (salvar -> salvo!) e iniciar as animações. Mas lembramos que podemos utilizar o `begin=click` para fazer esse tipo de trigger para inicialização.

## Conclusão

Bom pessoal, esse post serviu para mostrar mais uma habilidade exclusiva e super interessante que o SVG possui. Lembre-se que animações para conseguir melhorar a usabilidade do usuário são sempre boas adições e o SVG pode te prover isso muito bem. Existem muitas coisas sobre SMIL, portanto não fique somente neste post e busque ainda mais informação, qualquer coisa, também pergunte nos comentários.
