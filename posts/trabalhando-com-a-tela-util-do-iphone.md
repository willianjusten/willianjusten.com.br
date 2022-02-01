---
layout: post
date: 2020-05-06 09:25:35
image: /assets/img/iphone-area-cover.jpg
title: Trabalhando com a tela útil do iPhone
description: Como lidar com o notch no topo e a navegação sem botões na parte
  inferior do iPhone num Web App.
introduction: Como lidar com o notch no topo e a navegação sem botões na parte
  inferior do iPhone num Web App.
twitter_text: Como lidar com o notch no topo e a navegação sem botões na parte
  inferior do iPhone num Web App.
main-class: dev
color: '#637a91'
tags:
  - iphone
  - webview
---

## Introdução

Fala pessoal, o post de hoje é sobre uma coisa bem interessante que eu não tinha a menor ideia e acabei de descobrir! Espero que também seja novidade para vocês, se num for, ~~finjam que é~~ tudo bem xD

Como hoje não tem vídeo, não posso deixar de postar uma playlist né? Para hoje, vai a [Evening Chill](https://open.spotify.com/playlist/37i9dQZF1DWZ0OzPeadl0h?si=ybpTtFbZTDO_reyTvED70Q), várias músicas bem legais e calmas.

## Atualização da barra do site

Um aluno [escreveu um tweet](https://twitter.com/brenonovelli/status/1257678890069307392) sobre um projeto que ele criou através do meu [Curso de Gatsby](https://www.udemy.com/course/gatsby-crie-um-site-pwa-com-react-graphql-e-netlify-cms/?couponCode=PROMOFEV2220). E eu notei que ele criou uma sidebar off-canvas no mobile que eu já estava há muito tempo para fazer no meu blog e sempre enrolava.

Aproveitei que estava com tempo livre e resolvi fazer. Se você nunca viu meu site no celular, segue abaixo um gif do antes/depois:

![Menubar antes/depois com mais e menos ícones e uma sidebar vindo da lateral](/assets/img/menubar-before-after.gif)

## Problema do iPhone X

Antes de lançar essa mudança, eu perguntei ao meu amigo [Guilherme Louro](https://github.com/guilouro) para dar uma testada e ele falou que tava muito ruim no iPhone X, pois como esse celular não tem botões de menu, mas sim uma barrinha na parte de baixo, acabava que ficava conflitando. Veja abaixo a imagem de como estava:

![Tela do iphone X mostrando uma barrinha branca logo acima da barra dos ícones](/assets/img/iphone-barra-antes.jpeg)

Antes mesmo o site já tinha problemas com isso, mas ninguém nunca havia me reportado. Foi aí que o próprio Guilherme comentou que no React Native existe uma coisa chamada [Safe Area View](https://reactnative.dev/docs/safeareaview) que é exatamente para solucionar esse problema. Só que meu site obviamente não usa native, então resolvi procurar sobre isso para web e encontrei a [documentação do webkit](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) falando como fazer e funciona mesmo!

## Resolvendo o problema da área útil

Para resolver esse problema é bem fácil até. A primeira coisa que precisamos fazer é identificar essa área útil e alterar o valor da `viewport` para identificar e ocupar toda a área, isso é feito adicionando o `viewport-fit=cover` na tag que utilizamos no nosso `head`:

```html
<meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
```

Depois disso, nós precisamos respeitar as chamadas `safe areas` do iphone, abaixo segue uma imagem explicando:

![Imagem do iphone indicando as variáveis de safe-area-inset para cada extremidade](/assets/img/safe-areas.png)

Cada um desses lados tem uma variável que podemos utilizar no nosso css, que são: `safe-area-inset-left`, `safe-area-inset-right`, `safe-area-inset-bottom` e `safe-area-inset-top`.

Sabendo qual variável precisamos trabalhar, é só escrever o css da seguinte forma:

```css
.menu-bar {
  padding-bottom: env(safe-area-inset-bottom);
}
```

Logo após fazer isso, o meu site já estava corrigido!

![Tela do iphone agora mostrando que as barras não colidem mais entre si](/assets/img/iphone-barra-depois.jpeg)

## Conclusão

Sei que é uma coisa bem específica e bem pequena, mas é sempre bom tratarmos nosso site da melhor forma e para todos. E eu confesso que fiquei bem feliz de descobrir uma coisa nova que resolvi escrever esse post.
