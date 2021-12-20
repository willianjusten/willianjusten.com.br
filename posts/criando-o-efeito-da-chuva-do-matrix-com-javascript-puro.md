---
layout: post
date: 2021-12-20 11:16:50
title: Criando o efeito da chuva do Matrix com JavaScript puro
description: Aprenda como criar esse efeito em poucas linhas manipulando o Canvas
main-class: js
color: "#D6BA32"
tags:
  - js
  - canvas
---
## Introdução

Fala pessoal, faz um bom tempo que não escrevo no blog e um dos motivos é que eu estava viajando em NY e Vancouver, se quiser ver umas fotinhas de lá, [só me seguir no IG](https://www.instagram.com/will_justen/). 

Esse post eu planejava fazer até como um vídeo, mas infelizmente eu acabei contraindo Covid assim que cheguei no Brasil, então estou isolado num cômodo só da casa, ou seja, sem um microfone decente para gravar. E como estou entediado, vou fazer em post agora e depois qualquer coisa eu faço em vídeo se vocês quiserem.

Nesse post eu serei bem detalhista e farei bem passo-a-passo, já que muita gente pode não estar ambientada com o conceito de Canvas e quero também fazer algo onde qualquer iniciante consiga acompanhar. Minha dica é que você vá fazendo junto comigo, garanto que será uma experiência divertida e interessante.

E claro, para continuar com a tradição das músicas nos posts, eu estou ouvindo [Post Malone](https://open.spotify.com/artist/246dkjvS1zLTtiykXe5h60?si=jKgOAYKlTmmYLihN1iebMQ), que andei ouvindo bastante na viagem.

## Como é a chuva do Matrix e Demo

Antes de começarmos o projeto, precisamos falar sobre o que é né? Bom, se você nunca viu Matrix <del>pode se retirar</del>, eles basicamente brincam com a ideia de que o mundo em que vivemos nada mais é que um código de computador. Em alguns momentos do filme, eles mostram esses "códigos", que muito depois foi descoberto que [eram receitas de Sushi](https://nerdist.com/article/the-matrix-code-sushi-recipe/) usando hiragana, katakana, kanjis e alguns outros símbolos. Esses símbolos por sua vez vão caindo pela tela, fazendo o famoso efeito da "chuva do Matrix". 

Se você nunca viu esse efeito, [segue a demo do projeto](https://labs.willianjusten.com.br/matrix-rain).

## Inicializando o projeto

Nesse projeto não utilizaremos React, Next, SVG, nada nada, será um bom e velho `index.html` e um pouquinho de JavaScript. Então segue abaixo o esqueleto base:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Matrix Rain</title>
</head>
<body>

</body>
</html>
```

### Entendendo o Canvas API

O [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) é basicamente uma maneira de conseguirmos desenhar na tela utilizando o JavaScript. Para isso, precisamos criar esse elemento no nosso html para então manipular com o JS, adicionaremos dentro do `body` a seguinte linha:

```html
<canvas id="matrix"></canvas>
```

Tendo esse elemento, nós precisamos prepará-lo para começar a desenhar. Essa "preparação" consiste em buscar o elemento do Canvas e definir em qual contexto iremos desenhar, que pode ser desde o `2d` que o nome já diz, desenhar em 2 dimensões ou até o `webgl`, que já expande para experimentos em 3d bem interessantes também. Como nosso propósito é simplesmente descer as letrinhas na tela, iremos utilizar o `2d`. Essa definição de contexto se faz com o comando [getContext](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext).

Nosso código inicial ficará da seguinte forma então:

```html
<script>
  // Pegando o elemento do Canvas
  const c = document.getElementById("matrix");

  // Definindo o seu contexto
  const ctx = c.getContext("2d");
</script>
```

### Pintando algo na tela

Como falei, quero fazer esse tutorial bem devagar, sem simplesmente tacar as coisas para ter o projeto pronto. Então, primeiro vamos aprender a pintar na tela utilizando o Canvas. 

O primeiro comando mais simples para pintar no Canvas é utilizar o [fillRect](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect), que pelo nome já dá para entender que permite desenhar retângulos. Então se escrevermos algo como:

```js
// fillRect(eixoX, eixoY, largura, altura)
ctx.fillRect(0, 0, 100, 100)
```

Nós teremos um quadrado de 100x100 no canto superior da tela! 

![Pequeno quadrado preto na tela](/assets/img/small-square.png)

E se quisermos pintar o canvas inteirinho? Podemos fazer o seguinte código:

```js
ctx.fillRect(0, 0, c.width, c.height);
```

Note que `c` é o nosso elemento do canvas definido logo acima, então estaremos pegando sua largura e altura para pintar o retângulo, mas se você reparar, preencheu apenas um pedaço da tela! 

![Um retangulo preto na tela](/assets/img/all-canvas-without-size.png)

### Definindo o canvas para o tamanho todo da tela

No nosso exemplo, nós queremos que o desenho cubra toda a tela, não apenas um pequeno pedaço como vimos acima. Se você inspecionar o seu elemento de canvas, verá que ele por padrão tem um tamanho especificado pelo browser, no Chrome é 300x150. Para torná-lo do tamanho total da página, basta editar os atributos do canvas:

```js
// definindo o canvas com tamanho máximo da tela
c.height = window.innerHeight;
c.width = window.innerWidth;
```

Agora o seu canvas já se comporta com o tamanho todo da tela e se você tiver pintado o retângulo todo de preto, a tela deve estar "quase" toda preta, mas ainda ficaram umas bordas!

![Tela quase toda preta mas com bordas brancas](/assets/img/fullscreen-canvas.png)

### Resetando margins e paddings

Essas margens brancas que estamos vendo nada mais são que definições padrões do browser. Para removê-las, nós precisamos fazer uma coisa que chamamos de `Reset CSS`, onde removemos de qualquer elemento `*` as margins e paddings. Além disso também vou definir o `display: block` do nosso canvas, assim ele não correrá risco de vazar a tela e criar scrolls laterais. Vou então colocar o seguinte trecho no nosso `index.html` acima do body:

```html
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  canvas {
    display: block;
  }
</style>
```

E agora, pode reparar que a tela ficou completamente ocupada pelo canvas.



![Tela completamente preta](/assets/img/with-reset.png)

### Escrevendo no Canvas

Beleza, nós já aprendemos como criar o canvas, pintar ele e inclusive colocar do tamanho máximo da tela, mas agora nós precisamos também aprender como escrever textos no Canvas, já que teremos vários símbolos caindo. Para isso, nós primeiro definimos um tipo de fonte e então usamos o comando de [fillText ou strokeText](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text). Vamos fazer um exemplo simples:

```js
// definindo o tamanho e tipo de fonte
ctx.font = `60px arial`;

// definindo o texto a ser escrito e posição x, y
ctx.fillText("Matrix Rain", 0, 60);
```

Com isso, você ter visto o texto "Matrix Rain" escrito bem grande começando na pontinha da tela. Se você não viu e está tudo preto, é porque tanto o retângulo desenhado quanto o texto estão em preto, remova o retângulo que criamos por um momento e veja o texto. 

![Matrix rain escrito em preto na tela](/assets/img/matrix-rain-black-text.png)

Mas note uma coisa! Eu não comecei na posição `0,0`, mas sim na posição `0,60`, isso acontece pois se eu iniciar o eixo Y como `0`, o texto iria ficar para cima e sequer apareceria na tela, então eu preciso mover o mesmo tamanho da fonte, para que o texto de fato apareça na tela, lembre-se desse detalhe, é fundamental.

### Colorindo as formas e textos

Como você notou nas coisas que fizemos até agora, tudo é sempre preto, mas nossa letra é verdinha e o fundo que é preto, para mudar as cores, temos outra propriedade chamada [fillStyle/strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors).

Se colocarmos o seguinte trecho:

```js
ctx.fillStyle = "#0F0";
ctx.font = `60px arial`;
ctx.fillText("Matrix Rain", 0, 60);
```

Nós iremos ver nosso texto finalmente em verde na tela! 

![Matrix rain texto escrito em verde](/assets/img/matrix-rain-green-text.png)



Agora você já sabe o suficiente para poder criar o nosso projetinho! **Fim da introdução**, vamos para diversão!

### Pegando os símbolos do Matrix

Para utilizar os mesmos símbolos do Matrix, eu encontrei esse [post](https://scifi.stackexchange.com/questions/137575/is-there-a-list-of-the-symbols-shown-in-the-matrixthe-symbols-rain-how-many) já indicando todos os símbolos. Com isso em mãos, eu criei um array:

```js
const letters = ["日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ","ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ","ｹ","ﾒ","ｴ","ｶ","ｷ","ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ",":","・",".","=","*","+","-","<",">","¦","｜","ﾘ"];
```

### Definindo as colunas para imprimir as letras

Para posicionarmos corretamente as letras, nós precisamos dividir o espaço total da tela pelo tamanho das letras. 

Além disso, eu também irei criar um array chamado `drops` que vai servir exatamente para podermos ir variando as posições no eixo y, já que o eixo x nunca vai mudar para a gota, ela sempre vai cair na mesma linha vertical. Para isso, criei o seguinte código:

```js
const fontSize = 18

// definindo quantas colunas serão necessárias pelo tamanho da tela e fonte
const columns = c.width / fontSize;

// criando um array para cada gota, sempre iniciando na posição do y=1
const drops = new Array(Math.floor(columns)).fill(1);
```

### Escrevendo toda a primeira linha

Juntando os pedacinhos que já fizemos e removendo as coisas que estávamos só aprendendo, teremos o código assim:

```js
// Pegando o elemento do Canvas
const c = document.getElementById("matrix");

// Definindo o seu contexto
const ctx = c.getContext("2d");

// definindo o canvas com tamanho máximo da tela
c.height = window.innerHeight;
c.width = window.innerWidth;

// letras do Matrix Rain
// ver mais em: https://bit.ly/3yFJoU3
const letters = ["日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ","ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ","ｹ","ﾒ","ｴ","ｶ","ｷ","ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ",":","・",".","=","*","+","-","<",">","¦","｜","ﾘ"];

const fontSize = 18;

// definindo quantas colunas serão necessárias pelo tamanho da tela e fonte
const columns = c.width / fontSize;

// criando um array para cada gota, sempre iniciando na posição do y=1
const drops = new Array(Math.floor(columns)).fill(1);
```

Só com o código acima não teremos absolutamente nada pintado na tela ainda. Para isso, iremos criar uma função `draw`, onde primeiro eu irei pintar nosso fundo de tela e também irei preencher a nossa primeira linha com as letras do Matrix.

```js
function draw() {
  // preenchendo a tela toda de preto com opacidade
  // esse truque da opacidade será útil para o efeito 
  // das letras sumindo aos poucos
  // como teremos muitos quadros sobre quadros
  // o preto que no início é quase transparente ficará bem opaco
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  // definindo a cor e estilo da fonte
  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px arial`;

  for (let i = 0; i < drops.length; i++) {
    // pegando uma letra randomicamente no nosso array
    const text = letters[Math.floor(Math.random() * letters.length)];

    // escrevendo na tela
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  }
}

// chamando a função criada
draw()
```

Repare que eu fiz um loop iniciando com `i=0`, isso significa que nossa primeira letra será impressa na posição `ctx.fillText(text, 0, 18)`, afinal de contas `0 * 18 === 0` e como todos os items dentro de `drops` tem o valor iniciado como `1`, `drops[0] = 1 * 18 === 18`.

Se você continuar iterando de cabeça, fazendo `i=1,2,3,por aí vai`, verá que eu estarei sempre movendo as letras no eixo x até preencher toda a primeira linha.



![Tela com primeira linha impressa](/assets/img/first-line-matrix.png)

### Animando quadro a quadro

Até agora sempre estávamos criando imagens estáticas, mas nosso projeto necessita de uma animação para fazer as gotas caírem. Para isso, irei alterar nossa função `draw` acrescentando alguns detalhes.

A primeira delas é utilizar o método de [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). Esse método recebe uma callback que diz ao browser para realizar a animação antes do próximo repaint. Ou seja, ele vai ficar chamando o método numa animação quadro a quadro, que é exatamente o que nós queremos. Eu vou aplicar isso dentro da própria função de `draw` e utilizar o `requestAnimationFrame` para chamar a `draw`, criando assim uma [função recursiva](https://www.geeksforgeeks.org/recursive-functions/), que é uma função que chama ela mesma, causando o loop da nossa animação.

```js
function draw() {
  // preenchendo a tela toda de preto com opacidade
  // esse truque da opacidade será útil para o efeito 
  // das letras sumindo aos poucos
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  // definindo a cor e estilo da fonte
  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px arial`;

  for (let i = 0; i < drops.length; i++) {
    // pegando uma letra randomicamente no nosso array
    const text = letters[Math.floor(Math.random() * letters.length)];

    // escrevendo na tela
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  }

  // chamada recursiva para animar quadro a quadro
  window.requestAnimationFrame(draw);
}

// chamando a função criada
draw()
```

Ao fazer isso, você vai ver que a primeira linha vai ficar se redesenhando, com as letras umas em cima das outras. 

![Letras se sobrepondo](/assets/img/overlap-letters.gif)

Isso está ocorrendo pois eu não estou mudando as letras no eixo y, para isso, lá nosso `for`, eu vou adicionar ao final, um contador para o `drops[i]`, assim ele vai crescer conforme o loop e fará as letras descerem.

```js
function draw() {
  // preenchendo a tela toda de preto com opacidade
  // esse truque da opacidade será útil para o efeito 
  // das letras sumindo aos poucos
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  // definindo a cor e estilo da fonte
  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px arial`;

  for (let i = 0; i < drops.length; i++) {
    // pegando uma letra randomicamente no nosso array
    const text = letters[Math.floor(Math.random() * letters.length)];

    // escrevendo na tela
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // movendo as gotas no eixo y
    drops[i]++;
  }

  // chamada recursiva para animar quadro a quadro
  window.requestAnimationFrame(draw);
}

// chamando a função criada
draw()
```

Com isso feito, as letras já descem certinhas, mas depois de chegarem ao fim, elas simplesmente não retornam e aí é como se a chuva tivesse "acabado". 

![Chuva uma unica vez](/assets/img/rain-without-loop.gif)

Para fazer com que as gotas fiquem caindo infinitamente, o que eu farei é sempre que elas chegarem no ponto final da tela (altura máxima) que elas resetem para posição inicial. Para isso, no nosso `for` loop colocarei o seguinte:

```js
if (drops[i] * fontSize > c.height) {
  drops[i] = 0;
}
```

Ao fazer isso, temos um loop certinho, onde a gota começa do topo e vai caindo. Mas ainda não está legal, já que a chuva fica sempre sincronizada e sem graça. 



![](/assets/img/rain-uniform-loop.gif)

Para tornar as gotas mais randomicas, eu vou adicionar mais uma regra nesse `if`, só dizendo que além da questão da altura, também quero que respeite uma comparação com um número randômico qualquer:

```js
if (drops[i] * fontSize > c.height && Math.random() > 0.95) {
  drops[i] = 0;
}
```

Eu cheguei nesse `0.95` testando para ver como as gotas caíam, se o número era abaixo de `0.5` significa que pelo 50% das gotas de chuva iriam respeitar a regra e com isso ainda parecia algo muito "sincronizado", então botei um número bem grande, fazendo com que se tornasse algo realmente bem variado.

![Chuva da Matrix](/assets/img/final-rain.gif)

E pronto! Sua chuva da Matrix está feitinha! Segue o código inteiro:

```js
// Pegando o elemento do Canvas
const c = document.getElementById("matrix");

// Definindo o seu contexto
const ctx = c.getContext("2d");

// definindo o canvas com tamanho máximo da tela
c.height = window.innerHeight;
c.width = window.innerWidth;

// letras do Matrix Rain
// ver mais em: https://bit.ly/3yFJoU3
const letters = ["日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ","ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ","ｹ","ﾒ","ｴ","ｶ","ｷ","ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ",":","・",".","=","*","+","-","<",">","¦","｜","ﾘ"];

const fontSize = 18;

// definindo quantas colunas serão necessárias pelo tamanho da tela e fonte
const columns = c.width / fontSize;

// criando um array para cada gota, sempre iniciando na posição do y=1
const drops = new Array(Math.floor(columns)).fill(1);

function draw() {
  // preenchendo a tela toda de preto com opacidade
  // esse truque da opacidade será útil para o efeito 
  // das letras sumindo aos poucos
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  // definindo a cor e estilo da fonte
  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px arial`;

  for (let i = 0; i < drops.length; i++) {
    // pegando uma letra randomicamente no nosso array
    const text = letters[Math.floor(Math.random() * letters.length)];

    // escrevendo na tela
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // resetando a posição da gota ao chegar no fim
    if (drops[i] * fontSize > c.height && Math.random() > 0.95) {
      drops[i] = 0;
    }

    // movendo as gotas no eixo y
    drops[i]++;
  }

  // chamada recursiva para animar quadro a quadro
  window.requestAnimationFrame(draw);
}

// chamando a função criada
draw()
```

Se quiser ver o codigo pelo [meu GitHub](https://github.com/willianjusten/labs/blob/main/matrix-rain/index.html).

## Conclusão

Espero que tenha gostado do post e tenha feito o passo-a-passo junto comigo. Pode parecer bobeira, mas tivemos vários conceitos super interessantes nesse exemplo! Desde desenhar no canvas, entender coordenadas do plano cartesiano, animações quadro-a-quadro e até uma leve rebuscada de funções recursivas!
