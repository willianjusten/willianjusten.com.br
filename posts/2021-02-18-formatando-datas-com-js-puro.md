---
layout: post
date: 2021-02-18 12:49:00
image: /assets/img/copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-loading-e-transicao-de-paginas-no-nextjs-2-.png
title: Formatando datas com JS puro
description: Nem sempre precisamos de bibliotecas enormes para resolver um problema simples.
introduction: Nem sempre precisamos de bibliotecas enormes para resolver um problema simples.
twitter_text: Nem sempre precisamos de bibliotecas enormes para resolver um problema simples.
main-class: js
color: "#D6BA32"
tags:
  - dicas
categories:
  - Dicas rápidas
---
## Introdução

Fala pessoal, eu recentemente comecei uma [série de vídeos com dicas bem rápidas](https://www.youtube.com/watch?v=1dNNL95BsJE&list=PLlAbYrWSYTiOviR_zL01FMa-kWEMDIjeO) lá no meu canal do YouTube, mas como eu também gosto de texto e também quero facilitar a busca seja pelo Google ou pelo YouTube, vou portar os vídeos para cá também. Espero que dê certo =)

## Vídeo

<iframe width="560" height="315" src="https://www.youtube.com/embed/2EAs2BH3Y_4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Utilizando o poder do Intl.DateTimeFormat()

Antigamente para fazer esse tipo de formatação nós precisávamos fazer algum método próprio ou cair em soluções como o [moment.js](https://momentjs.com/). Mas agora graças ao [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) nós conseguimos fazer isso de forma simples, somente utilizando o JS puro.

Vamos ver abaixo alguns exemplos na prática:

```javascript
// Digamos que a gente tenha a seguinte data
const today = new Date(); // Thu Feb 18 2021 12:55:04 GMT-0300 (Brasilia Standard Time)

// Para converter no formato mais simples do Brasil => 18/02/2021
console.log(new Intl.DateTimeFormat('pt-BR').format(date));

// Para converter em => 18 de fev. de 2021
console.log(new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric'} ).format(today));

// Para converter com mês completo => 18 de fevereiro de 2021
console.log(new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'} ).format(today));

// Para converter em inglês => February 18, 2021
console.log(new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric'} ).format(today));

// Convertendo horas com timeZone => 12:55 AM GMT+9
console.log(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Tokyo', timeZoneName: 'short'} ).format(today));
```

## Conclusão

E aí, gostou da dica? Se curtiu, não deixa de se inscrever lá no [canal do YouTube](https://www.youtube.com/WillianJustenCursos/) para essa e mais outras dicas.
