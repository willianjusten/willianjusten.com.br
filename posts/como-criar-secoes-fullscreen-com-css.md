---
layout: post
title: 'Como criar seções fullscreen com CSS'
date: 2015-07-19 13:44:01
image: '/assets/img/header-full/main.png'
description: 'Vários sites famosos criam divisões grandes na tela que chamam bastante atenção, vamos aprender a fazer também.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - tutorial
categories:
twitter_text: 'Como criar seções fullscreen com CSS e chamar atenção dos usuários.'
introduction: 'Vários sites famosos criam divisões grandes na tela que chamam bastante atenção, vamos aprender a fazer essas seções também, usando só css com as famosas viewport units.'
---

## Introdução

O som de hoje fica com uma banda brasileira que mescla MPB e Rock e chama [Maglore](https://open.spotify.com/artist/24me6m3bV7l2rnUwaXV0Tj), curti bastante o som deles, espero que curtam também =)

O post de hoje é extra, ele não era esperado, mas recebi um email de mais uma pessoa com a mesma dúvida, então resolvi externalizar essa dúvida aqui e como fazer.

Se você quiser pular já para o resultado está aqui:

- [Usando CSS simples](https://labs.willianjusten.com.br/full-screen-sections/height-100.html)
- [Usando Viewport Units](https://labs.willianjusten.com.br/full-screen-sections/viewport.html)

## Dúvida

> Willian tem uma tecnica que vi no seu blog e gostei muito...dai fui procurar como fazer mais não consegui encontrar nada parecido, até consegui mas não era como eu queria.. sou muito perfecionista.. XD. O efeito que me refiro é o que faz com que a div quer vem os titulos dos posts a "header-post" ela ocupa sempre a tela completa do usuario.. sei que é uma duvida bem simples, mas agradeço se puder me dar help. Abraços!

## Contexto

Como já devem ter notado, de um tempo para cá, virou uma tendência dos sites possuírem grandes headers ou seções para chamar atenção dos usuários. Essas grandes seções em geral se baseiam na altura do browser e acabam entregando exatamente aquele espaço, assim evitando que algo corte ou não fique tão legal para o usuário.

Seguem alguns exemplos de sites que utilizam dessa técnica:

![Spotify](/assets/img/header-full/header-4.png)
[Spotify](https://www.spotify.com/br/)

---

![Cameo](/assets/img/header-full/header-1.png)
[Cameo - Vimeo](https://vimeo.com/cameo)

---

![Pen & Quill](/assets/img/header-full/header-3.png)
[Pen & Quill](http://penandquill.net/)

## Problema

Nós estamos muito acostumados a trabalhar com a largura dos elementos e deixamos as alturas fluidas e no máximo conseguimos definir um `min-height`.Isso acontece pois, em geral, trabalhamos com o scroll do próprio browser, se definirmos uma altura, podemos acabar cortando alguma coisa que não queremos, então fica mais fácil deixar seguir sem problemas. Mas e se quisermos criar uma grande seção com uma altura pegando a tela toda?

## Solução 1

A primeira solução e mais simples é criar uma forma do elemento que desejamos ter altura máxima ter algum ponto relativo para que ele se expanda. Vamos tomar como o exemplo o seguinte markup:

```html
<html>
  <!-- outras informações -->
  <body>
    <header>
      <div class="container">
        <h1>Header Full Screen com CSS!!</h1>
        <h2>Dá para brincar e chamar atenção dos usuários! =)</h2>
      </div>
    </header>
  </body>
</html>
```

Os elementos mais externos que envolvem o `header` são o `html` e o `body`, dessa forma, podemos determinar que ambos devem conter em todo o espaço da tela:

```css
html,
body {
  width: 100%;
  height: 100%;
}
```

Depois disso, basta definirmos a altura em porcentagem que queremos que o `header` tenha, no caso vamos colocar um altura de 100%.

```css
header {
  height: 100%;
}
```

Segue um [exemplo](https://labs.willianjusten.com.br/full-screen-sections/height-100.html) de como ficará no final. O código está, é claro, no meu [github](https://github.com/willianjusten/labs/blob/gh-pages/full-screen-sections/height-100.html). Lembrando que é um código experimental, sempre separe o css do seu html, use meta-tags, classes bem definidas, wai-aria e etc =)

Se você se perguntar, mas como centralizou o texto, tem um [site irado](http://howtocenterincss.com/) que ajuda como centralizar qualquer coisa só com CSS.

## Solução 2 - Viewport Units

Particularmente acho essa unidade de medida incrível, como o nome já diz, ela trabalha com as unidades de medida da viewport, ou seja, de acordo com o tamanho da tela que ela tiver, ela irá calcular corretamente. Se você quiser saber um pouco mais sobre, tem [esse post super legal](http://desenvolvimentoparaweb.com/css/unidades-css-rem-vh-vw-vmin-vmax-ex-ch/).

Como nem tudo são flores, essas unidades não são compatíveis com todos os browsers e você pode ver no link do [can i use](http://caniuse.com/#feat=viewport-units). Mas como para todo problema, existe uma pessoa para resolvê-lo, existe um [polyfill](https://github.com/rodneyrehm/viewport-units-buggyfill) que ajuda a corrigir isso =)

Então, para a nossa situação, vamos imaginar o seguinte markup:

```html
<section class="height-80">
  <div class="content">
    <h1>Viewport Units são demais!</h1>
    <p>Essa div foi setada para ter 80vh, ocupando 80% da tela =)</p>
  </div>
</section>
```

Para termos uma altura de 80% da tela usando o viewport units é bastante simples. Iremos utilizar a unidade `vh` que vai de 0 até 100vh, que é o mesmo que 0 a 100%. Nosso css ficaria assim:

```css
.height-80 {
  height: 80vh;
}
```

Basta só essa linha para tudo ficar perfeito. Se você quiser ver um exemplo, está aqui o [link](https://labs.willianjusten.com.br/full-screen-sections/viewport.html) e o [código no github](https://github.com/willianjusten/labs/blob/gh-pages/full-screen-sections/viewport.html).

## Conclusão

Bom, esse foi um post rapidinho, espero que ajude quem ainda tinha essa dúvida e para lembrar que CSS é demais e podemos fazer muitas coisas com ele =)
Se alguém tiver alguma dúvida sobre qualquer coisa, pode mandar nos comentários, email ou redes sociais e eu terei o maior prazer de tentar ajudar.
