---
layout: post
date: 2020-06-17T10:56:41.000Z
image: /assets/img/strapi-intro.png
title: Introdução ao Strapi - Headless CMS
description: O que é um Headless CMS, quais as vantagens do Strapi e como ele funciona.
introduction: O que é um Headless CMS, quais as vantagens do Strapi e como ele funciona.
twitter_text: O que é um Headless CMS, quais as vantagens do Strapi e como ele funciona.
main-class: dev
color: "#637a91"
tags:
  - strapi
  - cms
  - videos
---
## Introdução

Faaala pessoal, o post de hoje é também um vídeo, ultimamente tenho trabalhado mais com vídeos, tentando crescer o [humilde canal no YouTube](https://www.youtube.com/WillianJustenCursos/?sub_confirmation=1), inclusive, se puder ajudar, se inscreve lá xD

O post de hoje é para falar sobre o [Strapi](https://strapi.io/), que é um Headless CMS bem legal que eu vou utilizar no meu futuro curso chamado [React Avançado](https://reactavancado.com.br/). Vieram muitas dúvidas sobre o que era o Strapi e como ele funcionava, então no vídeo eu explico um pouco de tudo.

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/L3LWzYOaWMQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## O que é um Headless CMS?

Primeiro precisamos saber o que é um CMS né? Um CMS (sigla para *Content Management System* — Sistema de Gerenciamento de conteúdo), é um software responsável por gerenciar o conteúdo, ou seja, permitir a criação, edição e organização de um determinado conteúdo.

Eles são fundamentais, por permitirem que pessoas não técnicas, consigam adicionar o conteúdo desejado, sem precisar mexer em nenhuma linha de código. O mais famoso de todos os CMS que existem por aí, é definitivamente o [Wordpress](https://br.wordpress.org/).

![Um fluxograma mostrando o cms tradicional a esquerda e o headless cms a direita. Explicações sobre no texto abaixo.](/assets/img/traditional-vs-headless-cms.png)

Mas como você pode ver no fluxo ali acima, em um CMS tradicional, que é o caso do Wordpress e muitos outros, você tem basicamente tudo junto (conteúdo, banco de dados e também a parte do frontend), tendo já um compilado final de tudo, que é entregue para o cliente.

Enquanto no Headless CMS (tradução literal de sem cabeça), a parte do frontend não é acoplada ao CMS, mas sim uma API, que poderá alimentar diferentes tipos de código e consequentemente dão bem mais liberdade para os desenvolvedores.

Eu vi em um tweet uma citação bem legal:

> Um CMS Tradicional é como o livro que você compra em uma livraria. Quer acessar o conteúdo? Você pega o livro e lê ele, e esta é a única forma. Um Headless CMS é como comprar um eBook. Você lê ele no Amazon Kindle, ou você usa o aplicativo do Kindle no PC, Mac, smartphone ou Tablet.

Ou seja, apesar do modelo de CMS tradicional ser extremamente utilizado até nos dias de hoje, essa estrutura engessada dele acaba travando certos tipos de desenvolvimento e foi por isso que o modelo de Headless CMS foi criado e está crescendo tanto.

## Strapi 3.0

Eu conheci o Strapi quando ele estava saindo da versão 2 para a versão alfa do 3, me parecia um CMS bem promissor, mas era cheio de problemas também. Com o tempo eles foram melhorando e as últimas versões beta já estavam bem legais.

Recentemente eles receberam um [investimento de 10 milhões de dólares](https://strapi.io/blog/announcing-strapi-10m-series-a-funding) e aí finalmente lançaram a [versão estável 3.0 do projeto](https://strapi.io/blog/strapi-stable-community-edition), com direito a um belo redesign da logo e do site.

Com todo esse investimento e essa versão lançada, a minha opinião é que o CMS agora tem tudo para crescer e ser cada vez mais utilizado, assim como o Gatsby e o NextJS também estão crescendo muito.

## Vantagens do Strapi

Diferentes de outros Headless CMS como o [Contentful](https://www.contentful.com/) e o [DatoCMS](https://www.datocms.com/), onde todos os dados ficam na nuvem deles e você paga uma mensalidade por isso. O Strapi é completamente **opensource** e **self hosted**, ou seja, você controla o código e também os dados.

Na minha opinião, só essas duas coisas, já o tornam muito melhor e mais confiável. Afinal de contas, eu posso estender o código conforme eu quiser e eu quem decido onde quero que meus dados sejam hospedados, assim como controlar toda a sua estrutura de dados. Isso sem pagar por nenhum serviço externo (com exceção da hospedagem é claro).

A outra grande vantagem para mim é que ele funciona tanto com Rest API quanto com o GraphQL, podendo mudar de uma para a outra com apenas alguns cliques!

## Como instalar e usar

Para iniciar um projeto com o Strapi, basta que você digite:

```bash
npx create-strapi-app my-project
```

Ele vai te fazer algumas perguntas, como, por exemplo, qual tipo de banco de dados você vai querer usar (SQLite, MySQL, PostgreSQL ou MongoDB), o que mostra ainda mais a flexibilidade do projeto.

Após instalado, a estrutura dele é bem simples, além dele possuir uma [documentação](https://strapi.io/documentation/v3.x/getting-started/quick-start.html) bem completa para te auxiliar em cada detalhe.

Ele trabalha com 3 estruturas de dados bem importantes que são:

- `Collection Types`: a estrutura de dados base, normalmente utilizado para criarmos tabelas de produtos, usuários, jogos, enfim, o que for necessário para seu projeto.
- `Single Types`: são usados para partes específicas e singulares da sua aplicação, pense nos dados/estrutura da sua Home ou então no footer do projeto. Não faz sentido criarmos uma tabela para um footer, que sabemos que será um só não é mesmo? xD
- `Components`: são feitos para estruturas reutilizáveis, similar ao single types, mas que podemos agregar as collections. Pense, por exemplo, na estrutura de uma galeria, ela é igual para todos os cantos, mas pode ser usada na Home, mas também em outras páginas.

Você pode criar todos esses dados seja pelo próprio CMS ou também através [dos comandos da CLI](https://strapi.io/documentation/v3.x/cli/CLI.html). E, é claro, você também pode fazer na mão, basta seguir a estrutura que eles utilizam ou então estender e customizar a API do Strapi.

## Conclusão

Bom pessoal, espero que tenham gostado do post/vídeo e que algumas das principais perguntas tenham sido solucionadas. E se você quiser aprender muito mais, muito em breve estarei lançando meu novo curso de [React Avançado](https://reactavancado.com.br/) onde o módulo 2 será inteiramente focado no Strapi.

Se vocês tiverem quaisquer dúvidas relacionadas ao Strapi só mandar aí nos comentários. E se tiverem dúvidas em relação ao curso, eu fiz uma [live no YouTube](https://www.youtube.com/watch?v=PNu4ifGq3mU) onde respondi muitas perguntas, muitas mesmo! 