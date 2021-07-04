---
layout: post
title: '#10 - Criando um SVG responsivo e adaptativo'
date: 2015-04-04 15:18:49
image: '/assets/img/responsivo-svg/main.png'
description: 'Hoje em dia com a variedade de telas que temos, o desafio é dar o melhor conteúdo para cada tipo de tela.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - css
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Criando um SVG responsivo e adaptativo!'
introduction: 'Hoje em dia com a variedade de telas que temos, o desafio é dar o melhor conteúdo para cada tipo de tela. Saiba como criar um SVG responsivo e adaptativo.'
---

## Índice da série

Tenho escrito bastante sobre SVG que agora os links cresceram e ficar listando todos o tempo todo aqui já vai ficar ruim, então para facilitar, basta ir em [series](https://willianjusten.com.br/series/) e lá estarão todos os meus links sobre SVG.

## Introdução

Enquanto escrevo esse post, vou ouvindo uma [playlist de Chill Step](https://open.spotify.com/user/kent1337/playlist/6IjDl5eRczFdgZkKYXhuHZ), ótimo para relaxar e programar, aconselho fortemente!

Hoje será outro post rapidinho, mas bastante importante, visto que falaremos sobre uma coisa que está muito em alta, responsividade!

## Tamanhos e tamanhos

Hoje em dia com a variedade de telas que temos, o desafio é dar o melhor conteúdo para cada tipo de tela e isso está diretamente ligado aos ícones e imagens que o seu site irá possuir.

Telas menores não devem ter um conteúdo muito grande ou organizado de forma errada, visto que seu espaço é muito menor e a quantidade de informações que iremos colocar precisa em geral estar uma em cima da outra.

Mas e por que SVG se torna tão importante? Simples, SVG é responsivo por natureza. Ele é uma imagem vetorial, que não perde qualidade independente do tamanho do device, até num projetor hiper mega bolado, o SVG vai estar lá lindão.

## Tornando o SVG fluido

Antes de sair adicionando o SVG a torto e a direito, precisamos nos atentar para alguns detalhes.

### 1 - Retire o width e height do elemento SVG

Se você determinar um tamanho dentro do elemento `svg`, que é o nosso "container", você estará bloqueando o tamanho e com isso perdendo a fluidez.

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 32 128"
  width="32"
  height="128"
>
  <!-- tira aquele width e height ali!!! -->
</svg>
```

### 2 - Determine uma viewBox

A viewBox permite a visualização de uma parte específica de uma parte de um elemento. Esses valores incluem quatro números separados por "commas" ou espaços: `min-x`, `min-y`, `width` e `height` esses parâmetros geralmente, são os limites da viewport.

Os valores min representam em qual ponto dentro da imagem a viewBox deve iniciar, enquanto o width e height estabelecem o tamanho do box.

Se nós optarmos por não definir a viewBox a imagem não será redimensionada e irá corresponder a configuração feita na viewport.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="...">
  <!-- defina a viewBox bonitinha =) -->
</svg>
```

### 3 - Coloque o preserveAspectratio para xMidYMidmeet

Se a `viewport` e `viewBox` não possuirem as mesmas dimensões de width e height, o atributo `preserveAspectRatio` direciona o browser em como efetuar o display da imagem. Se o elemento já possuir uma viewBox e não tiver tamanho fixado na viewport, este se torna um item não obrigatório.

```html
<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <!-- se não tiver viewBox ou width e height -->
</svg>
```

## Adicionando o SVG

Tendo feito essas especificações, basta inserir o seu SVG onde quiser. E como eu disse no post [Como usar SVG](https://willianjusten.com.br/como-usar-svg/), existem algumas maneiras de se utilizar SVG e em todas elas é possível criar um SVG fluido, uns são nativos e outros precisam de hack para IEca... Mas isso não é problema para nós!

### Como imagem, object e embed

Basta adicionar o svg como `src` e para assegurar que ele possua o tamanho máximo de onde se encontrar, basta definir o `width` como máximo. Assim, a imagem vai adquirir o tamanho máximo de onde você adicionar.

```html
<style>
  img,
  object,
  embed {
    width: 100%;
  }
</style>
<img src="imagem.svg" alt="Minha linda imagem em SVG" />
<object data="imagem.svg" type="image/svg+xml"></object>
<embed src="imagem.svg" type="image/svg+xml" />
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwvoXB" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/PwvoXB">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Experimente mudar o tamanho do container para ver que a imagem continuará a mesma.

### Como background e inline

Nesses casos não há necessidade de nenhum hack, basta adicionar onde desejar e ele irá se adaptar de acordo com o container em que estiver.

```html
<!-- como background -->
.element { background-image: url("imagem.svg"); }

<div class="element"></div>

<!-- como inline -->
<div class="container">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 128">
    <!-- conteúdo do svg aqui -->
  </svg>
</div>
```

## Logos Adaptativas

Uma das mágicas mais legais do SVG é fazê-lo mudar de acordo com o espaço em que ele estiver contido. O exemplo é a imagem abaixo:

![Logos em diferentes tamanhos](/assets/img/responsivo-svg/logos-sizes.jpg)

Para fazer essa mágica é bastante fácil, basta já termos definido como Responsivo, seguindo os passos acima e então definir grupos para cada elemento e classes para eles, assim, poderemos trabalhar com as `media-queries`.

![Logo descontruída](/assets/img/responsivo-svg/logo-ungroup.png)

Segue uma base de código de como fica:

```html
<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 612 612"
>
  <g class="shards">
    <!-- aqui temos os cristais verde e amarelo -->
  </g>
  <g class="crystal">
    <!-- aqui o cristal maior roxo -->
  </g>
  <g class="shadow">
    <!-- aqui fica a sombra -->
  </g>
  <g class="text">
    <!-- aqui fica o texto -->
  </g>
</svg>
```

De posse das classes dos elementos, basta pensarmos nos Steps que queremos e nos cortes da tela.

### Corte 1

Para a primeira diferenciação, queremos retirar os cristais amarelo e verde, visto que eles ficam muito grandes para telas menores, para isso, basta omitirmos a classe `.shards`, que definimos anteriormente.

```css
@media (min-width: 480px) and (max-width: 640px) {
  .shards {
    display: none;
  }
}
```

### Corte 2

Para o corte 2, queremos retirar também o cristal grande e para que a logo permaneça visível, queremos deixar o texto na cor roxa. Para isso é só usar a propriedade `fill`, como vimos no [post anterior](https://willianjusten.com.br/colorindo-em-svg/).

```css
@media (max-width: 480px) {
  .shards {
    display: none;
  }

  .text path {
    fill: #ba27e4;
  }

  .crystal {
    display: none;
  }
}
```

Feito isso, seu componente já está responsivo e adaptativo!! Veja o experimento pronto abaixo:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZYVPep" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/ZYVPep">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Para ver os diferentes estados de uma forma mais fácil, [abra esse link](http://codepen.io/willianjusten/full/ZYVPep/) e faça resize da tela.

## Conclusão

Depois dessa simples explicação, fica claro que o SVG veio para dominar no quesito responvidade e adaptatividade. Vamos parar de usar imagens png para tudo e vamos tratar de criar novas interatividades com o SVG.
