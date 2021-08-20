---
layout: post
date: '2018-05-30 01:37:00'
image: /assets/img/scroll-sticky-cover.png
title: 'Menu Sticky e Smooth Scroll com CSS puro '
description: >-
  Aprenda algumas propriedades bem interessantes do CSS e já saia brincando por
  aí.
introduction: >-
  Aprenda algumas propriedades bem interessantes do CSS e já saia brincando por
  aí.
twitter_text: >-
  Aprenda algumas propriedades bem interessantes do CSS e já saia brincando por
  aí.
main-class: css
color: '#2DA0C3'
tags:
  - frontend
  - css
categories:
  - Dicas de CSS
---

## Introdução

Fala pessoal, como eu acho que fiquei parado muito tempo e o número de posts caiu muito, quero voltar a escrever mais. E por isso decidi que vou fazer vários posts bem simples, mas não menos importantes, sobre algumas propriedades do CSS que podemos usar a nosso favor, assim como alguns experimentos legais, que podem ser usados nos seus próximos trabalhos.

Eu já tinha pensando em fazer esse post, mas o [@felipefialho\_](https://twitter.com/felipefialho_) acabou dando uma forcinha quando criou o seguinte Tweet:

<blockquote class="twitter-tweet" data-lang="en"><p lang="pt" dir="ltr">👉 position: sticky;<br><br>- Mistura \\`fixed\\` e \\`absolute\\`<br>- Só com CSS conseguimos um efeito que necessitava de JavaScript <br>- Suporte em todos os browsers modernos (bugs contornáveis)<br>- É legal pra caraleo<br><br>Vejam esse exemplo simplezão 😁<a href="https://t.co/fM22xYUMBV">https://t.co/fM22xYUMBV</a></p>&mdash; Felipe Fialho (@felipefialho_) <a href="https://twitter.com/felipefialho_/status/1001473242719277057?ref_src=twsrc%5Etfw">May 29, 2018</a></blockquote>

Bom vamos lá, a trilha sonora que me acompanha hoje é um post-rock dos bons, a banda se chama [Tides from nebula](https://open.spotify.com/artist/1CzKORB9IN0EjPEyeKBIkf?si=A6YHiIyCSre7opSSu6a5Yw) e para mim é um som perfeito para se concentrar e programar.

## O experimento

![Gif mostrando uma tela sendo scrollada, mostrando uma imagem do Samuel L Jackson indo junto com a tela fixa.](/assets/img/samuel-sticky.gif)

Se quiser pular tudo e já ver funcionando, só abrir [esse link aqui](https://labs.willianjusten.com.br/sticky-scroll/). Mas se quiser seguir comigo a explicação é super super fácil!

## Position: sticky

Essa é uma propriedade que já foi introduzida há um boooooom tempo, lá [nos idos de 2012](https://developers.google.com/web/updates/2012/08/Stick-your-landings-position-sticky-lands-in-WebKit) e então logo foi removida, pois na época a sua implementação era "bugada" e não funcional como alguns dos desenvolvedores falavam.

Mas agora em 2016 o [sticky voltou](https://developers.google.com/web/updates/2016/12/position-sticky)! E como ele funciona?

> O `position: sticky;` é um híbrido entre o `fixed` e o `relative`. O elemento é tratado como `relative` até alcançar um limite especificado, que é através do `top, bottom, left, right`. Alcançando esse ponto, ele vai ser tratado como fixo. E assim que chegar a sua posição "original", ele voltará a funcionar como `relative`.

Parece meio complicado né? Vamos tentar ver melhor na prática.

### Menu fixo

Vamos lá, como foi feito o exemplo acima? Primeiro vendo o menu, temos o seguinte html:

```html
<body>
  <header>
    <h1>Scroll & Sticky!</h1>
  </header>

  <nav>
    <ul>
      <li><a href="#hey">Hey!</a></li>
      <li><a href="#cool">Cool</a></li>
      <li><a href="#truth">Truth</a></li>
      <li><a href="#all-css">All CSS</a></li>
    </ul>
  </nav>
</body>
```

Reparem que eu tenho 2 elementos filhos do `body`, que são o `header` e o `nav`. Eu fiz algumas pequenas edições no css, dando uma altura ao header e também estilo ao nav, mas vamos focar nas seguintes propriedades css:

```css
header {
  height: 90vh;
}

nav {
  position: sticky;
  top: 0;
}
```

Se você não reconhece aquele valor `vh` ali, saiba que é uma viewport unit, eu escrevi sobre isso, [neste post](https://willianjusten.com.br/como-criar-secoes-fullscreen-com-css/). Mas tenha em mente que a única coisa que isso faz é dar uma altura de 90% do espaço da tela visível.

Com isso, o meu `nav` vai aparecer logo no finalzinho da tela certo? Já que o header vai ocupar 90% de altura. E é aí que entra o pulo do gato. Ao definir o `position: sticky` no meu `nav` junto com o `top: 0`, eu digo para ele que no momento que o `nav` alcançar o topo do `body`, que ele comece a se comportar como `fixed` e é isso que faz o nosso menu ficar preso ali no topo.

> E porque ele não some da tela por mais que faça scroll?

Simples, como o `nav` é filho do `body`, o pai vai sempre estar na tela e o position do `top` é em relação a visão do elemento pai na tela.

### Samuel fixo

Eu resolvi colocar um outro elemento com `position: sticky` para mostrar a diferença e também porque é divertido ver o Samuel L. Jackson pulando no meio da tela e não saindo, vai dizer que não é legal?

Bom, vamos entender como esse funciona, primeiro, vamos ao markup:

```html
<article class="container">
  <section id="hey"></section>
  <section id="cool"></section>
  <section id="truth"></section>
  <section id="all-css"></section>

  <img class="sticky" src="..." />

  <section></section>

  <a class="link" href="http://slipsum.com/">Text by Samuel L. Ipsum</a>
</article>
```

Reparem agora que eu tenho a imagem com a classe `.sticky` e ela está dentro do pai, que é o `.container`. Isso significa que o posicionamento da minha imagem vai funcionar em relação ao `.container`.

Agora então definindo o seguinte css:

```css
.sticky {
  position: sticky;
  bottom: 50px;
}
```

Eu digo para o meu elemento o seguinte, no momento que o meu elemento `pai` aparecer, comporte-se como `fixed` com espaçamento de `50px` da parte inferior da tela, quando chegar na posição original dentro do pai, volte a ser `relative`.

### Compatibilidade

Essa propriedade apesar de já ser velha conhecida, como falei lá no início do post, ela ainda está sendo aplicada aos poucos pelos browsers, mas já está funcionando nos browsers mais atuais. E você pode olhar no [Can I use](https://caniuse.com/#feat=css-sticky).

## Smooth Scroll

Por final, se você clicar em cada uma das âncoras, vai ver o efeito de `scroll to`, onde eu deslizo a tela até o elemento indicado pela âncora. Mas repare que é um deslizar bonitinho, que a maioria dos clientes pedem naquelas landing pages. E o mais incrível de tudo isso, é que esse efeito é feito com apenas 1 propriedade do css:

```css
html {
  scroll-behavior: smooth;
}
```

### Compatibilidade

Essa propriedade é bem legal, mas infelizmente ainda está bem no início, só funcionando no Chrome e Firefox, mas vamos ter fé que já já melhora o suporte, vamos vendo no [Can I use](https://caniuse.com/#feat=css-scroll-behavior).

## Conclusão

Bom galera, espero que tenham curtido o post, é algo bem simples, mas talvez seja útil em algum projeto de vocês, nem que seja só para um protótipo para validar uma ideia =)

Eu prometo continuar com posts mais frequentes e outras dicas assim. E vamos que vamos! Se você não tem acessado o blog recentemente, eu lancei 2 posts nos últimos 2 dias, uhul! Dá uma lida também, [Criando um Codepen simples em poucas linhas](https://willianjusten.com.br/criando-um-codepen-simples-em-poucas-linhas/) e [Performance Web: Evite escrever HTML demais](https://willianjusten.com.br/performance-web-evite-escrever-html-demais/).
