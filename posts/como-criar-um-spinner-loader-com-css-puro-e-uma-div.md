---
layout: post
date: '2018-06-04 10:00:00'
image: /assets/img/spinner-loader-cover.png
title: Como criar um loader com CSS puro e uma div
description: >-
  Todos nós já tivemos que usar um loader na vida, aprenda a criar o seu do zero
  com pouquíssimas linhas de código.
introduction: >-
  Todos nós já tivemos que usar um loader na vida, aprenda a criar o seu do zero
  com pouquíssimas linhas de código.
twitter_text: >-
  Todos nós já tivemos que usar um loader na vida, aprenda a criar o seu do zero
  com pouquíssimas linhas de código.
main-class: css
color: '#2DA0C3'
tags:
  - video
  - css
  - frontend
categories:
  - Dicas de CSS
---

## Introdução

Fala pessoal, seguindo a mesma onda dos outros posts, eu acabei criando uma nova série chamada [Dicas de CSS](https://willianjusten.com.br/series/#dicas-de-css), que é onde eu vou estar jogando esses posts com dicas simples, porém utéis para a gente.

E o post de hoje é para mostrar como se criar um spinner loader com **uma div** e só **10 linhas** de CSS. Bom, segue o vídeo embaixo e o código, como tem sido nesses posts.

Se você quiser ver funcionando, aqui [está o link](https://labs.willianjusten.com.br/spinner-loader/).

## Video

<iframe width="560" height="420" src="https://www.youtube.com/embed/j3rOA1spG8A" frameborder="0" allowfullscreen></iframe>

## Código

Para fazer esse loader, vamos utilizar só a `div.spinner` e iremos usar o `border` para criar o entorno do nosso loader. O "pulo do gato" é que mudamos a cor de só um lado do quadrado, assim fará nosso efeito desejado, para isso, usaremos o `border-left-color`. Ao final é só usar o `border-radius:50%` para transformar num círculo:

```css
.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #22a6b3;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
```

Como podem ver, ainda temos o `animation` ali, que vai ser o responsável por criar a animação, que é basicamente um `keyframes` fazendo uma rotação de 360 graus infinitamente:

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

Se você quiser, o código também está lá no [Github](https://github.com/willianjusten/labs/blob/gh-pages/spinner-loader/index.html).

## Conclusão

Espero que tenham curtido esse post/vídeo e lembrando, por favor, compartilhem em todas as redes sociais que puderem, manda naquele slack/telegram que vocês participam, quanto mais gente seguinte lá no [YouTube](https://www.youtube.com/WillianJustenCursos?sub_confirmation=1), melhor! =)
