---
layout: post
title: "Alguns seletores css importantes para aprender"
date: 2015-06-29 21:22:47
image: '/assets/img/seletores-css/main.png'
description: 'Porque CSS é muito mais do que só classes e ids. Aprenda alguns truques legais para facilitar nos seus layouts.'
tags:
- css
- frontend
categories:
twitter_text: "Porque o CSS é muito mais do que só classes e ids."
---

## Introdução

Como de costume, lá vai a playslist do dia, que se chama [Smart is the new sexy](https://open.spotify.com/user/spotify/playlist/1ewJMPn8IYsjGCqI1n5dfV), curtindo bastante.

Escolhi escrever sobre um assunto que é bastante básico, mas importantíssimo, tanto para quem está começando, como para quem já trabalha há um tempo e não usa certos benefícios que o css dá.

Vai ser um post rapidinho, com alguns exemplos e caso tenham alguma dúvida, podem usar os comentários sempre =)

## A + B

Chamado de seletor adjacente, serve para selecionar o elemento imediatamente depois do primeiro elemento.

<p data-height="266" data-theme-id="11319" data-slug-hash="vOpvMR" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/vOpvMR/'>Seletor A+B</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

Note que somente o elemento `p` seguinte de `a` é afetado pelo estilo.


## A > B

O seletor descendente serve para editar todos os filhos diretos do primeiro elemento, não modificando os elementos mais internos.

<p data-height="266" data-theme-id="11319" data-slug-hash="doJwEJ" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/doJwEJ/'>Seletor A > B</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

Como pode-se notar, as tags `p` diretas de `.container` ganharam o estilo, enquanto a tag `p` mais interna não sofreu alteração.


## A ~ B

Conhecido como elemento irmão, é bastante parecido com o seletor **A + B**, porém ele seleciona todos os elementos diretos de A e não somente o primeiro. É também importante não se confundir com o seletor **A > B**, visto que ele não é para elementos filhos e sim para elementos seguintes.

<p data-height="266" data-theme-id="11319" data-slug-hash="YXYdoa" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/YXYdoa/'>Selector A ~ B</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

Perceba que os elementos `p` no mesmo nível de `a` recebem o estilo, enquanto os elementos mais internos e fora do contexto não são afetados.


## A[contexto]

Acho que um dos seletores mais interessantes, de acordo com o que está definido no contexto, conseguimos estilizar em diferentes abordagens.

### A[alt]

Esse irá selecionar os elementos com o atributo `alt` definido.

<p data-height="266" data-theme-id="11319" data-slug-hash="xGpMKr" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/xGpMKr/'>Selector A[contexto]</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

Somente a imagem com o atributo `alt` recebeu o estilo. Útil para você rastrear se alguma imagem não recebeu o atributo `alt`, que é importante para a acessibilidade. Mas pode ser com qualquer tipo de atributo, como um `title`, por exemplo.

### A[href='link']

Irá editar só os links determinados.

<p data-height="266" data-theme-id="11319" data-slug-hash="eNyxYz" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/eNyxYz/'>Seletor a[href='...']</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

### A[href*='trecho']

Os links que possuírem pelo menos esse trecho serão estilizados.

<p data-height="266" data-theme-id="11319" data-slug-hash="PqEVoX" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/PqEVoX/'>Seletor a[href*='trecho']</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

### A[href^='inicio']

Links iniciados com o trecho serão estilizados.

<p data-height="266" data-theme-id="11319" data-slug-hash="WvdPNV" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/WvdPNV/'>Seletor A[hrefˆ='inicio']</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

### A[src$='final']

Só trechos com o final igual irão receber o estilo.

<p data-height="266" data-theme-id="11319" data-slug-hash="qdpgEP" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/qdpgEP/'>Selector A[src$='final']</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## A:not(B)

Quando você quer selecionar todos os elementos, exceto um elemento em particular.

<p data-height="266" data-theme-id="11319" data-slug-hash="PqEVqV" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/PqEVqV/'>Seletor A:not(B)</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>


## A:first-child | A:last-child

Para selecionar o primeiro e o último filho de um elemento. Um dos pseudo-seletores mais úteis que eu conheço. Para remover aquela borda do último elemento, entre outras várias coisas.

<p data-height="266" data-theme-id="11319" data-slug-hash="bdazdP" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/bdazdP/'>Seletores A:first-child e A:last-child</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## A:checked

Seletor utilizado em inputs do tipo `radio` e `checkbox`, serve para várias coisas legais, bastante utilizado em interações sem precisar usar uma linha de JS. Se quiser ver uns exemplos maneiros, tem esse [projeto do Felipe Fialho](http://www.felipefialho.com/css-components/).

E aqui um exemplo simples:

<p data-height="266" data-theme-id="11319" data-slug-hash="NqXoGQ" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/NqXoGQ/'>Seletor A:checked</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## A:nth-child(n)

Outro pseudo-seletor bastante bacana, serve para selecionar o elemento na posição indicada pelo argumento `n`. Por exemplo, se colocamos `:nth-child(2)` iremos selecionar o segundo elemento daquele conjunto. Mas podemos criar uma expressão `:nth-child(3n)`, onde todos os elementos múltiplos de 3 seriam selecionados (3,6,9...).

<p data-height="266" data-theme-id="11319" data-slug-hash="BNJMjE" data-default-tab="result" data-user="willianjusten" class='codepen'>See the Pen <a href='http://codepen.io/willianjusten/pen/BNJMjE/'>Seletor A:nth-child(n)</a> by Willian Justen de Vasconcellos (<a href='http://codepen.io/willianjusten'>@willianjusten</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script src="//assets.codepen.io/assets/embed/ei.js"></script>

## Conclusão

Existem outros vários seletores e pseudo-seletores, escolhi alguns que acho bastante interessantes, mas você sempre pode ir mais a fundo e buscar conhecimento. Aconselho muito a [MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Reference) e para quem já entende um pouco mais de inglês, tem o meu favorito e lindo [Codrops](http://tympanus.net/codrops/css_reference).
