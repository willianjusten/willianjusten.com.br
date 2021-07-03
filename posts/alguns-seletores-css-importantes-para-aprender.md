---
layout: post
title: 'Alguns seletores css importantes para aprender'
date: 2015-06-29 21:22:47
image: '/assets/img/seletores-css/main.png'
description: 'Porque CSS é muito mais do que só classes e ids. Aprenda alguns truques legais para facilitar nos seus layouts.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - frontend
  - tutorial
categories:
twitter_text: 'Porque o CSS é muito mais do que só classes e ids.'
introduction: 'Porque CSS é muito mais do que só classes e ids. Veja alguns truques legais para facilitar nos seus layouts.'
---

## Introdução

Como de costume, lá vai a playslist do dia, que se chama [Smart is the new sexy](https://open.spotify.com/user/spotify/playlist/1ewJMPn8IYsjGCqI1n5dfV), curtindo bastante.

Escolhi escrever sobre um assunto que é bastante básico, mas importantíssimo, tanto para quem está começando, como para quem já trabalha há um tempo e não usa certos benefícios que o css dá.

Vai ser um post rapidinho, com alguns exemplos e caso tenham alguma dúvida, podem usar os comentários sempre =)

## A + B

Chamado de seletor adjacente, serve para selecionar o elemento imediatamente depois do primeiro elemento.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vOpvMR" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/vOpvMR">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Note que somente o elemento `p` seguinte de `a` é afetado pelo estilo.

## A > B

O seletor descendente serve para editar todos os filhos diretos do primeiro elemento, não modificando os elementos mais internos.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="doJwEJ" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/doJwEJ">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Como pode-se notar, as tags `p` diretas de `.container` ganharam o estilo, enquanto a tag `p` mais interna não sofreu alteração.

## A ~ B

Conhecido como elemento irmão, é bastante parecido com o seletor **A + B**, porém ele seleciona todos os elementos diretos de A e não somente o primeiro. É também importante não se confundir com o seletor **A > B**, visto que ele não é para elementos filhos e sim para elementos seguintes.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="YXYdoa" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/YXYdoa">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Perceba que os elementos `p` no mesmo nível de `a` recebem o estilo, enquanto os elementos mais internos e fora do contexto não são afetados.

## A[contexto]

Acho que um dos seletores mais interessantes, de acordo com o que está definido no contexto, conseguimos estilizar em diferentes abordagens.

### A[alt]

Esse irá selecionar os elementos com o atributo `alt` definido.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xGpMKr" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/xGpMKr">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Somente a imagem com o atributo `alt` recebeu o estilo. Útil para você rastrear se alguma imagem não recebeu o atributo `alt`, que é importante para a acessibilidade. Mas pode ser com qualquer tipo de atributo, como um `title`, por exemplo.

### A[href='link']

Irá editar só os links determinados.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="eNyxYz" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/eNyxYz">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### A[href*='trecho']

Os links que possuírem pelo menos esse trecho serão estilizados.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PqEVoX" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/PqEVoX">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### A[href^='inicio']

Links iniciados com o trecho serão estilizados.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WvdPNV" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/WvdPNV">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### A[src$='final']

Só trechos com o final igual irão receber o estilo.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qdpgEP" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/qdpgEP">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## A:not(B)

Quando você quer selecionar todos os elementos, exceto um elemento em particular.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PqEVqV" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/PqEVqV">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## A:first-child | A:last-child

Para selecionar o primeiro e o último filho de um elemento. Um dos pseudo-seletores mais úteis que eu conheço. Para remover aquela borda do último elemento, entre outras várias coisas.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bdazdP" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/bdazdP">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## A:checked

Seletor utilizado em inputs do tipo `radio` e `checkbox`, serve para várias coisas legais, bastante utilizado em interações sem precisar usar uma linha de JS. Se quiser ver uns exemplos maneiros, tem esse [projeto do Felipe Fialho](https://www.felipefialho.com/css-components/).

E aqui um exemplo simples:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NqXoGQ" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/NqXoGQ">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## A:nth-child(n)

Outro pseudo-seletor bastante bacana, serve para selecionar o elemento na posição indicada pelo argumento `n`. Por exemplo, se colocamos `:nth-child(2)` iremos selecionar o segundo elemento daquele conjunto. Mas podemos criar uma expressão `:nth-child(3n)`, onde todos os elementos múltiplos de 3 seriam selecionados (3,6,9...).

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BNJMjE" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/BNJMjE">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Conclusão

Existem outros vários seletores e pseudo-seletores, escolhi alguns que acho bastante interessantes, mas você sempre pode ir mais a fundo e buscar conhecimento. Aconselho muito a [MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Reference) e para quem já entende um pouco mais de inglês, tem o meu favorito e lindo [Codrops](http://tympanus.net/codrops/css_reference).
