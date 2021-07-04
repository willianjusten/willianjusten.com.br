---
layout: post
date: 2021-02-21 04:12:03
image: /assets/img/merge-array.png
title: Juntando arrays e objetos com Spread syntax no JavaScript
description: Evite usar bibliotecas externas para coisas simples como fazer
  merge de objetos e arrays.
introduction: Evite usar bibliotecas externas para coisas simples como fazer
  merge de objetos e arrays.
twitter_text: Evite usar bibliotecas externas para coisas simples como fazer
  merge de objetos e arrays.
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

<iframe width="560" height="315" src="https://www.youtube.com/embed/1Y8h-R-uymM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Utilizando o poder do ...Spread

Antigamente para fazer esse tipo de formatação nós precisávamos fazer algum método próprio ou cair em soluções como o [Lodash](https://lodash.com/docs/4.17.15#merge). Mas agora graças ao [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) nós conseguimos fazer isso de forma simples, somente utilizando o JS puro.

Vamos ver abaixo alguns exemplos na prática:

```javascript
const arrayOne = [1, 2, 3, 4]
const arrayTwo = [5, 6, 7, 8]

// juntando os arrays
const newArray = [...arrayOne, ...arrayTwo] // [1, 2, 3, 4, 5, 6, 7, 8]

// funciona com objetos também!
const props = { id: '1', name: 'Willian' }
const moreProps = { age: 30, height: 178 }

const newObj = { ...props, ...moreProps } // { id: '1', name: 'Willian', age: 30, height: 178 }

// E você também consegue sobrepôr valores
const defaultProps = { id: '1', name: 'Willian' }
const newProps = { id: '3', age: 30 }

// Chaves iguais são sobreescritas pelo último objeto passado
const propsObj = { ...defaultProps, ...newProps } // { id: '3', name: 'Willian', age: 30 }

```

## Conclusão

E aí, gostou da dica? Se curtiu, não deixa de se inscrever lá no [canal do YouTube](https://www.youtube.com/WillianJustenCursos/) para essa e mais outras dicas.
