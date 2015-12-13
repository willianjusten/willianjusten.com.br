---
layout: post
title: "Entendendo Testes de Software"
date: 2015-12-12 13:49:42
image: '/assets/img/'
description: 'Para que servem os testes? O que eu ganho com eles? Que tipos de testes existem? O que fazer e o que não fazer.'
tags:
- tdd
- qualidade
categories:
- 'Aprendendo Testes'
twitter_text: 'Para que servem os testes? O que eu ganho com eles?..'
introduction: 'Para que servem os testes? O que eu ganho com eles? Que tipos de testes existem? O que fazer e o que não fazer. Algumas dúvidas importantes para começarmos a brincar nesse mundo dos testes e TDD.'
---

## Introdução

Fala pessoal, esse talvez seja um dos posts que mais quis escrever e mais demorei também. Muito pelo fato de que eu não conseguia definir uma linha de pensamento de como escrever. Eu decidi que irei falar as teorias primeiro, que eu considero muito importante <s>por mais que ninguém goste</s> e então farei a prática.

A ideia é ser uma pequena série de posts, onde vou falar sobre testes, Integração Contínua (CI), Entrega Contínua (CD) e após isso, a criação de uma app simples usando testes do início ao fim e fazendo deploy via CI no Heroku.

Enquanto eu vou escrevendo, vou ouvindo [Ghost B.C.](https://open.spotify.com/artist/1Qp56T7n950O3EGMsSl81D), uma banda bastante controversa, mas que passei a curtir bastante.

Pega lá um cafézinho e vem comigo, sei que você não gosta de teoria, mas é importante saber umas coisinhas.

## Qualidade de Software

Antes mesmo de começar a falar sobre Testes, precisamos voltar um pouco e falar sobre Qualidade de Software. A nossa preocupação por ter um sistema de qualidade, que nos fez pensar em métodos para garantir isso e daí nasceram os testes! =D

Esse ano eu tive a oportunidade de palestrar na [Imasters DeveloperWeek 2015 - RJ](http://developerweek.imasters.com.br/rio-de-janeiro/) e falei sobre Qualidade de Software, você pode ver os [slides aqui](http://willianjusten.com.br/imasters-2015/#/). E como a palavra *qualidade* é um termo vago e que possuem diferentes pontos de vista, eu resolvi mostrar algumas dessas visões.

### Qualidade para o cliente

Para um cliente, ele quer que tudo esteja funcionando, que seja bonito e o principal, que ele não gaste muito com isso. O medidor de qualidade para o cliente é quando ele faz uma cara mais ou menos assim:

![Foto de um cara sorrindo](http://willianjusten.com.br/imasters-2015/img/visao-cliente.gif)

### Qualidade para o chefe

Já para o seu chefe/empresa, qualidade é quando você faz as coisas sem demorar muito ou ter que refazer. Quando ele consegue gerar lucros e o cliente está feliz. Uma imagem que demonstra muito bem o que importa (qualidade) para o seu chefe é:

![Um homem deitado no dinheiro](http://willianjusten.com.br/imasters-2015/img/visao-chefe.gif)

### Qualidade para o desenvolvedor

Nós desenvolvedores, obviamente vamos ver qualidade aonde? Se você respondeu no código, ponto para você! Quanto mais fácil de ler e entender o código, mais qualidade ele tem para nós. Assim como você ter uma boa documentação. Segue abaixo uma imagem que descreve bastante nossas reações a códigos bons e ruins:

![Uma imagem com duas portas e pessoas discutindo, uma tem várias reclamações pelo código ruim, a outra tem poucas, pois o código é bom.](http://willianjusten.com.br/imasters-2015/img/visao-programador.png)

## Test Driven Development (TDD)

TDD é o desenvolvimento de software orientado a testes, Test Driven Development em inglês. Porém mais do que simplesmente testar seu código, TDD é uma filosofia, uma cultura. E foi fortemente adotado e influenciado pelo movimento ágil.

De acordo com Kent Beck, um método ágil é comparável ao ato de dirigir um
carro: você deve observar a estrada e fazer correções contínuas para se manter no caminho. Neste contexto onde a agilidade é fundamental, o testador seria aquele que ajuda o motorista a chegar com segurança ao seu destino, impedindo que sejam feitas conversões incorretas durante o percurso, evitando que o motorista se perca e fazendo com que ele pare e peça instruções quando necessário. 

Neste ambiente, destaca-se o TDD, como sendo uma abordagem evolutiva na qual o desenvolvedor escreve o teste antes de escrever o código funcional necessário para satisfazer aquele teste.











