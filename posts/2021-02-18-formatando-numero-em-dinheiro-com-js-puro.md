---
layout: post
date: 2021-02-18 12:35:11
image: /assets/img/copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-loading-e-transicao-de-paginas-no-nextjs-1-.png
title: Formatando número em dinheiro com JS puro
description: Evite usar bibliotecas externas para coisas simples como formatar
  números em dinheiro.
introduction: Evite usar bibliotecas externas para coisas simples como formatar
  números em dinheiro.
twitter_text: Evite usar bibliotecas externas para coisas simples como formatar
  números em dinheiro.
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



<iframe width="560" height="315" src="https://www.youtube.com/embed/eOMnHsVm6vE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



## Utilizando o poder do Intl.NumberFormat()



Antigamente para fazer esse tipo de formatação nós precisávamos fazer algum método próprio ou cair em soluções como o [currency.js](https://currency.js.org/). Mas agora graças ao [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) nós conseguimos fazer isso de forma simples, somente utilizando o JS puro.

Vamos ver abaixo alguns exemplos na prática:

```javascript
// Digamos que a gente tenha o seguinte número
const money = 1234567.89;

// Para converter em Real ( retorna => R$ 1.234.567,89 )
console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(money));

// Para converter em Euros ( retorna => 1.234.567,89 € )
console.log(new Intl.NumberFormat('de-De', { style: 'currency', currency: 'EUR' }).format(money));

// Para converter em Yenes ( retorna => ￥1,234,567 )
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(money));
```



## Conclusão



E aí, gostou da dica? Se curtiu, não deixa de se inscrever lá no [canal do YouTube](https://www.youtube.com/WillianJustenCursos/) para essa e mais outras dicas.