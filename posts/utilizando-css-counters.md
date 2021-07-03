---
layout: post
date: '2020-04-13 04:28:10'
image: /assets/img/css-counter.jpg
title: Utilizando CSS Counters
description: Vamos aprender a fazer o CSS contar!
introduction: Vamos aprender a fazer o CSS contar!
twitter_text: Vamos aprender a fazer o CSS contar!
main-class: css
color: '#2DA0C3'
tags:
  - css
  - dev
categories:
  - Dicas de CSS
---

## Introdução

Fala pessoal, o post de hoje é mais um [daqueles super simples de CSS](https://willianjusten.com.br/series/#dicas-de-css), mas que talvez vocês não conheçam.

Enquanto escrevo, vou ouvindo uma banda de metalcore muito boa chamada [Architects](https://open.spotify.com/artist/3ZztVuWxHzNpl0THurTFCv?si=Fgce72yKQvq8RqjPzUx5wQ). Se nunca ouviu e curte um som mais pesado, pode ouvir que você vai curtir.

Chega de papo furado e vamos direto ao assunto.

## O que são CSS Counters?

São propriedades do CSS que permitem gerar um conteúdo numérico para elementos, baseados na localização deles no html.

### Como assim?

Basicamente as propriedades são:

- `counter-reset`: é usada para definir ou inicializar um ou mais contadores.
- `counter-increment`: usada para especificar o valor de incremento para os contadores.
- `counter()`: é uma função usada junto com o `content` para mostrar o valor do contador.

### Tá, mas como funciona na prática?

São três passos bem simples. Vamos lá. Digamos que tenhamos o seguinte html:

```html
<div class="content">
  <h2>Escolha um nome para o counter</h2>
  <h2>Incremente o counter</h2>
  <h2>Assinale o counter no seu elemento</h2>
</div>
```

Digamos que eu queira adicionar um número para cada título, então primeiro eu preciso inicializar o nosso counter no elemento pai, que nesse caso é o `content`, para isso, farei:

```css
.content {
  counter-reset: section; // pode ser qualquer nome desejado
}
```

Depois eu preciso adicionar o incremento:

```css
h2:before {
  counter-increment: section;
}
```

O método de `counter-increment` recebe o contador e também o valor para iniciar a contagem, se nada for passado, será a partir do `1` como padrão.

E por último, basta eu inicializar a função do contador:

```css
h2:before {
  counter-increment: section;
  content: counter(section);
}
```

Aí adicionando um pouquinho de estilo, já podemos ter a nossa numeração dinâmica com CSS:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="QWjbvpG" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/QWjbvpG">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### Nested Counters

Nós podemos também numerar conteúdos internos. Digamos que tenhamos a seguinte lista:

```html
<ul class="services">
  <li class="services__item">
    Design
    <ul>
      <li>Web</li>
      <li>Mobile</li>
      <li>Graphic</li>
    </ul>
  </li>
  <li class="services__item">Web Development</li>
  <li class="services__item">
    Mobile Development
    <ul>
      <li>iOS</li>
      <li>Android</li>
      <li>Windows Phone</li>
    </ul>
  </li>
</ul>
```

Para termos uma lista tendo `1` e sub-níveis como `1.1`, podemos fazer o css da seguinte forma:

```css
// Definimos o contador principal
.services {
  counter-reset: services;
}

.services__item:before {
  counter-increment: services;
  content: counter(services) '.';
}

// Definimos o contador para os sub-níveis
.services__item ul {
  counter-reset: sub-services;
}

// Nosso `content` pode ser estilizado para conter qualquer coisa, até palavras
.services__item li:before {
  counter-increment: sub-services;
  content: counter(services) '.' counter(sub-services);
}
```

Segue abaixo o exemplo pronto:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZEbGKya" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/ZEbGKya">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### Bem legal isso daí, mas e a compatibilidade?

Pode ficar despreocupado! Isso funciona até no IE8, como você pode ver no [Can I use](https://caniuse.com/#feat=css-counters).

## Conclusão

Como disse, era um post mega simples, mas que se você não conhecia, agora já conhece! E se você já conhecia, passe adiante!
