---
layout: post
title: 'Mask e Clip com CSS e SVG'
date: 2018-01-24 19:31:00
image: '/assets/img/mask-svg/main.png'
description: 'Dois efeitos simples que podem transformar seu site com estilo.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - css
  - mask
  - clip
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Dois efeitos simples que podem transformar seu site com estilo.'
introduction: 'Dois efeitos simples que podem transformar seu site com estilo.'
---

## Introdução

Fala pessoal, faz tanto tempo que não escrevo um post mais técnico, então por que não escrever um post sobre `SVG` já que eu amo tanto. Enquanto escrevo esse post, vou ouvindo uma banda que já falei em outra oportunidade, mas que é sempre bom ouvir de novo, trata-se de [Ghost](https://www.youtube.com/watch?v=neRhGoW3Kbc&list=RDneRhGoW3Kbc&start_radio=1&t=7) e o link leva para um acústico muito bom.

## Ideia do Post

Eu resolvi fazer esse post, pois recebi um email do [Unsplash](https://unsplash.com/@willianjusten) falando que eu tinha acabado de completar **10 milhões** de views em minhas fotos! E não só a notícia me deixou feliz, como o detalhe que fizeram em colocar uma das minhas fotos como fundo para os números.

![Um screenshot do email com 10M escrito sobre uma foto de uma cachoeira](/assets/img/mask-svg/screenshot.png)

É um efeito extremamente simples de se fazer, mas que ficou super bonito e único. Então vamos lá aprender a fazer isso e brincar em nossos novos sites e aplicações!

**Importante:** por se tratar de propriedades experimentais, é possível que não funcione em todos os dispositivos e browsers. Por preferência veja no Chrome Desktop =)

## Clipping

Para quem já usou Photoshop deve conhecer o `Clipping Mask` e o que faremos não é nada diferente disso. O Clipping envolve usar uma camada com uma forma (um círculo, triângulo, texto) sobre uma imagem ou um elemento. Qualquer coisa atrás dessa forma fica aparente e o resto ao redor some. Segue um exemplo abaixo:

![Uma forma sobre uma imagem criando o Clipping](https://getflywheel.com/wp-content/uploads/2016/08/css-svg-clipping-masking-clipping-graphic.jpg)

### Clip em ação

Já entendendo a teoria, vamos logo para prática, porque é o que importa. É possível se criar o Clipping de duas formas.

#### Clip-path com CSS

Uma das formas disponíveis é o [Clip-path do CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path), mas que a [compatibilidade](https://caniuse.com/#feat=css-clip-path) ainda é um pouco baixa. Segue abaixo um exemplo:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bayPyB" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/bayPyB">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Como você pode ver, eu utilizei duas classes com a propriedade `clip-path`:

```css
.polygon {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.circle {
  clip-path: circle(100px at 150px 100px);
}
```

Sobre o `.polygon`, você basicamente define os pontos com as coodenadas do eixo (x,y), ou seja, a primeira coordenada (primeiro ponto) possui um deslocamento de `50%` no eixo `x` e `0%` no eixo y.

Para o `.circle`, o primeiro valor é o tamanho do Raio e o segundo é a coordenada do centro do círculo. Ou seja, um raio de `100px`, que tem como centro `150px` no eixo `x` e `100px` no eixo `y`.

#### Clip-path com SVG

Enquanto o `clip-path` do CSS não é compatível em tudo, usando SVG você alcança a compatibilidade em tudo, visto que ele usa SVG por natureza, que segue a seguinte [compatibilidade](https://caniuse.com/#feat=svg).

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vpwodK" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/vpwodK">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Para fazer funcionar, é extremamente similar ao feito com o CSS, mas a diferença é que a forma é criada no SVG, segue abaixo o código:

```html
<svg class="clip-svg">
  <defs>
    <clipPath id="triangle-mask" clipPathUnits="objectBoundingBox">
      <polygon points="0 0.87, 0.5 0, 0.5 0, 1 0.87" />
    </clipPath>
  </defs>
</svg>
```

Repare em duas coisas importantes, primeiro uma classe no externo do SVG, que é o `clip-svg`, todo SVG por padrão vem com um tamanho no Browser e ocupa um espaço, então para remover isso, adicionamos essa classe e zeramos `height` e `width` no css. E depois temos o id `#triangle-mask`, que vai ser referenciado no nosso css, de forma a criar o clip que desejamos. E para determinar isso, é só uma linha:

```css
clip-path: url('#triangle-mask');
```

Gostou disso, mas achou extremamente difícil/chato criar as formas? Não se preocupe! Existe uma ferramenta chamada [Clippy](http://bennettfeely.com/clippy/). Através dela você tem formas pré-determinadas e também pode criar as suas.

![Screenshot do site Clippy](/assets/img/mask-svg/clippy.png)

## Masks

Diferente do `clip-path` que definimos as "bordas" de onde queremos ter a imagem e eliminamos o resto. Na máscara nós queremos fazer uma composição, que as vezes pode conter toda a imagem ou não.

### Mask no SVG e no CSS

Para criar as máscaras, nós utilizamos o `<mask>` do SVG e a propriedade `mask` do css. Segue abaixo um exemplo:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="rpENJY" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/rpENJY">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Como podemos ver no exemplo, possuímos `3 componentes`, o primeiro elemento é a imagem `.background`, depois temos o retângulo `.base` que é o cara que fica por cima da imagem e onde iremos aplicar a `#mask`, que é o que faz a mágica acontecer. Dentro da `#mask` nós temos o `.alpha` que é responsável por criar a transparência da máscara, quanto mais próximo de `#000` (preto) fica mais transparente e quanto mais próximo de `#fff` (branco), mais opaco fica e o nosso texto, que convenientemente usamos o `<text>` do SVG. E para tudo funcionar, é só usar `mask: url(#mask);`.

O legal é que as máscaras funcionam não só com imagens estáticas, mas podem ter animações e até vídeos! Segue abaixo um exemplo onde o fundo é um gradiente sendo animado:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xpobbm" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/xpobbm">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Repare que no exemplo acima, a base é a mesma, possuímos um `<mask>` no SVG que contém o texto e essa máscara é aplicada em outro elemento usando `mask: url('#mask');`.

Ou seja, a base sempre será a mesma, tenha um svg com `<mask>` e assinale essa máscara para o elemento do qual você quer compôr.

### Mask-image

E por último, você pode ter também o `mask-image`, onde você determina no css a forma base que vai compôr com a imagem, lembra bastante o `clip-path`. Abaixo segue um exemplo:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jYjEXp" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/jYjEXp">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Como você pode ver, nós temos a `img` que vai conter a imagem que nós queremos mostrar e no css nós definimos o `mask-image` que é a forma/ícone onde vamos inserir a imagem. Temos as seguintes linhas de código:

```css
.object-mask {
  mask-image: url(https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_Unsplash.svg);
  mask-repeat: no-repeat;
  mask-size: 350px;
  mask-position: center;
}
```

Como podemos ver acima, esse `mask-image` lembra muito com as propriedades de um `background-image`, onde determinamos se vai repetir ou não, seu tamanho e sua posição.

## Momento Jabá

Brincadeiras a parte, se você se embolou um pouquinho com SVG ou se interessou em saber mais sobre, meu [curso de SVG do início ao avançado](https://www.udemy.com/aprendendo-svg-do-inicio-ao-avancado/?couponCode=PROMOFEV22) está com promo usando o cupom **BLACKFRIDAY** por apenas **24 conto**, menos que um lanche no McDonald's, vai lá, pega o curso e dá um up no seu conhecimento =)

## Conclusão

Bom galera, espero que tenham curtido o post e agora possam utilizar esse efeito em seus sites com bastante criatividade! Para ajudá-los, vou deixar aqui abaixo mais alguns posts/exemplos, assim vocês podem pegar mais ideias e se você fizer algo, deixa nos comentários!

- [Masking vs. Clipping: When to Use Each](https://css-tricks.com/masking-vs-clipping-use/)
- [Pen utilizando vídeo](https://codepen.io/daviddarnes/pen/vEjMLr)
- [Pen com Vídeo no Hero](https://codepen.io/estevanmaito/pen/RamBKE)
- [Pen com clip-path e fundo interativo](https://codepen.io/mhotovec/pen/WZWxKg)
- [Pen com animações na mask](https://codepen.io/celli/pen/bExxQy)
- [Página 404 com canvas + svg](https://codepen.io/tmrDevelops/pen/aNGKzN)
