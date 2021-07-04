---
layout: post
title: "#11 - Usando SVG Sprites"
date: 2015-05-24 15:25:53
image: '/assets/img/svg-sprites/main.png'
description: "Já foi provado que o SVG substitui icon fonts, mas e Sprites? Aprenda a utilizar essa técnica com SVG de várias formas."
main-class: 'svg'
color: '#7D669E'
tags:
- svg
- css
- tutorial
categories:
- "O mundo mágico do SVG"
twitter_text: "Já foi provado que o SVG substitui icon fonts, mas e Sprites? Aprenda as técnicas de como usar."
introduction: "Já foi provado que o SVG substitui icon fonts, mas e Sprites? Aprenda como utilizar essa técnica com SVG de várias formas."
---

## Índice da série

Tenho escrito bastante sobre SVG que agora os links cresceram e ficar listando todos o tempo todo aqui já vai ficar ruim, então para facilitar, basta ir em [series](https://willianjusten.com.br/series/) e lá estarão todos os meus links sobre SVG.

## Introdução

Vou escrevendo esse post ouvindo algumas músicas do Need For Speed, em especial [Get Low](https://open.spotify.com/track/0r2Bul2NuCViraT2zX1l5j). Para quem não sabe, a EA vai fazer um reboot da série e me deixou bastante animado, já que sou bastante fã.

Bom, vamos deixar de lenga-lenga e partir para o que importa. Como já vimos em posts anteriores, o SVG é excelente para ícones e existem várias formas de se utilizar. Hoje vou mostrar um pouco das técnicas de sprite que permite utilizar a tag `img` para chamar nosso ícone desejado.

## O que são Sprites?

Antes de começar a fazer, seria bom um breve resumo do que seria um sprite e qual sua utilidade. Segue uma breve introdução feita pela [MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/CSS_Image_Sprites).

> Sprites são usados em vários web apps onde vários ícones são utilizados. Ao invés de incluir cada ícone como um arquivo `.png`, é muito melhor utilizar uma só imagem contendo todos os ícones, que irá diminuir o número de requisições HTTP e será consideravelmente menor. - MDN

Além desses benefícios, acho muito mais fácil de organizar os ícones, afinal já sei onde todos eles estão, num mesmo arquivo.

## Escolhendo os ícones

O primeiro de tudo é escolher seus ícones de preferência e montar o arquivo SVG. Se você não sabe desenhar e não tem ideia de onde baixar, fiz um [post falando sobre vários lugares para baixar](https://willianjusten.com.br/onde-baixar-svg/).

Para o post eu utilizei o seguinte [conjunto de ícones](http://br.freepik.com/vetores-gratis/animais-vector-set-plana_715458.htm).

![Conjunto de animais](/assets/img/svg-sprites/sprites.png)

## Definindo posições

Assim como os sprites criados com `background-position` no `css`, no `svg` nós também iremos definir a área do nosso ícone. Primeiramente definimos o tamanho total do documento e depois o tamanho do nosso ícone, lembrando que aqui **não** iremos utilizar dimensões em `px`, para podermos ter total controle e flexibilidade no tamanho e qualidade de nosso ícone.

![Medidas dos ícones](/assets/img/svg-sprites/sprites-medidas.png)

Tendo em vista que as propriedades da `viewBox` são "posicao x, posicao y, largura, altura". Nosso svg ficará assim:

```html
<svg viewBox="0 0 225 55">...</svg>
```

### 1 - Técnica com views no SVG

Para cada ícone precisaremos criar uma `view` bem simples, colocando cada ícone em sua posição.

```html
<view id='icon-pig' viewBox='0 0 45 55' />
<view id='icon-chicken' viewBox='45 0 45 55' />
<view id='icon-fox' viewBox='90 0 45 55' />
<view id='icon-rabbit' viewBox='135 0 45 55' />
<view id='icon-cow' viewBox='180 0 45 55' />
```

Se você notar, a largura, altura e posição y se mantém e só modificamos a posição no eixo x, que representa uma imagem ao lado da outra.

Com o arquivo todo pronto, eu salvei com o nome de `animals-sprite.svg` dentro da minha pasta `/assets/img/`. Se quiser dar uma olhada diretamente na imagem, segue [link](https://willianjusten.com.br/assets/img/animals-sprite.svg).

Tendo a imagem pronta, fica simples de usar, segue um exemplo:

<style>
	.animal {
		width: 180px;
		height: 220px;
	}
	.animais {
		width: 225px;
		height: 250px;
		display: inline-block !important;
	}
</style>

<img class="animais" alt="Imagem de um porquinho" src="/assets/img/animals-sprite.svg#icon-pig">
<img class="animais" alt="Imagem de uma vaca" src="/assets/img/animals-sprite.svg#icon-cow">
<img class="animais" alt="Imagem de uma raposa" src="/assets/img/animals-sprite.svg#icon-fox">

```html
<img src="/assets/img/animals-sprite.svg#icon-pig" alt="Porquinho">

<img src="/assets/img/animals-sprite.svg#icon-cow" alt="Vaquinha">

<img src="/assets/img/animals-sprite.svg#icon-fox" alt="Raposinha">
```

### 2 - Técnica com a view definida na chamada da imagem

Se você não quiser criar uma `view` dentro do arquivo SVG, pode definir diretamente na chamada, ficando da seguinte forma:

<img class="animal" src="/assets/img/animals-sprite.svg#svgView(viewBox(45, 0, 45, 55))" alt="Galinha">

```html
<img src="/assets/img/animals-sprite.svg#svgView(viewBox(45, 0, 45, 55))" alt="Galinha">
```

### 3 - Técnica utilizando :target

Uma técnica bem legal, que vi no [css-tricks](https://css-tricks.com/svg-fragment-identifiers-work/), é utilizar o seletor `:target` para ativar o ícone a ser mostrado.

![Stack Sprites SVG](https://css-tricks.com/wp-content/uploads/2014/11/layers.gif)

A técnica é bem simples, basta ocultar todos os elementos do SVG e só mostrar o que estiver com `:target` marcado.

```css
g {
	display: none;
}
g:target {
	display: inline;
}
```

Dessa forma não há necessidade de se criar views, bastando somente colocar `ids` em cada ícone.

```html
<svg>
	<g id="pig">...</g>
	<g id="chicken">...</g>
	<g id="fox">...</g>
	<g id="rabbit">...</g>
	<g id="cow">...</g>
</svg>
```

E para usar cada ícone, basta chamar a imagem seguida da `id`.

<img class="animal" src="https://willianjusten.com.br/assets/img/animals-sprite-stack.svg#rabbit" alt="Coelhinho">

```html
<img src="/assets/img/animals-sprite-stack.svg#rabbit" alt="Coelhinho">
```

## Conclusão

Bom, é só isso galera. Essa é mais uma forma bastante útil de se utilizar o SVG quando não se quiser usar SVG inline ou não puder. Existem ferramentas que irão nos auxiliar para a criação desses sprites de uma forma mais fácil e que eu irei abordar no próximo post. Se tiver alguma dúvida sobre este post, mande suas dúvidas nos comentários abaixo, farei questão de ajudar =)
