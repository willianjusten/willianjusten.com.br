---
layout: post
date: '2020-04-24 12:34:33'
image: /assets/img/netlify/main.png
title: Como habilitar builds incrementais do Gatsby no Netlify
description: >-
  Tenha builds muito mais rápidos com a nova atualização do Gatsby Incremental Build.
introduction: >-
  Tenha builds muito mais rápidos com a nova atualização do Gatsby Incremental Build.
twitter_text: >-
  Tenha builds muito mais rápidos com a nova atualização do Gatsby Incremental Build.
main-class: dev
color: '#637a91'
tags:
  - netlify
  - blog
categories:
---

## Introdução

Dando uma leve pausa dos [vídeos de dicas de CSS](https://willianjusten.com.br/series/#dicas-de-css), o post de hoje vai ser rapidinho, mas foi extremamente útil para mim e tenho certeza que será super útil para todos aqueles que já fizeram o meu [Curso de Gatsby: Crie um Site PWA com React, GraphQL e Netlify CMS](https://www.udemy.com/course/gatsby-crie-um-site-pwa-com-react-graphql-e-netlify-cms/?couponCode=PROMOFEV22).

Ontem o Gatsby lançou essa nova feature chamada de [Experimental Page Build Optimizations for Incremental Data Changes](https://www.gatsbyjs.org/docs/page-build-optimizations-for-incremental-data-changes/), onde eles criam um cache e fazem o build somente do que é necessário, fazendo com que certos builds que demoravam **~10min** passem a demorar **~1min**!

Existem duas vantagens nisso, a primeira e mais óbvia é o ganho de tempo, já que você terá algo no ar muito mais rápido. A outra questão é que se você utiliza o [Netlify gratuito](https://www.netlify.com/pricing/) deve saber que eles deixam somente **300 minutos/mês**. Ou seja, em 30 deploys você acabaria gastando toda a quota do mês e isso não é nada legal né?

Bom, vamos deixar de papo furado e fazer logo isso funcionar né? Dá o play nessa [playlist de Eletronic Focus](https://open.spotify.com/playlist/37i9dQZF1DX0wMD4IoQ5aJ?si=-A5AVvQYQ76dRp_ZHFgzIQ) e vamos nessa!

### Passo 1 - Atualize o Gatsby para v2.20.4 ou maior

Essa nova feature veio somente na versão mais atual, então rode:

```bash
# se utilizar npm
npm install gatsby@latest

# se utilizar yarn
yarn upgrade gatsby@latest
```

### Passo 2 - Habilite o Netlify Build Plugins

Para que a gente consiga salvar o cache entre os builds é necessário utilizar um build plugin, como essa é uma feature bem nova do Netlify, é necessário que você habilite através do [seguinte link](https://app.netlify.com/enable-beta).

Para saber mais informações do Beta, só [entrar neste link](https://docs.netlify.com/configure-builds/build-plugins/).

### Passo 3 - Adicione o Gatsby Cache Netlify Build Plugin

Os builds incrementais dependem completamente do cache do Gatsby, portanto precisamos habilitar o `netlify-plugin-gatsby-cache`, que vai persistir as pastas `public` e `.cache` entre os builds.

No seu arquivo `netlify.toml` na raiz do projeto, adicione o seguinte:

```bash
[[plugins]]
  package = "netlify-plugin-gatsby-cache"
```

E instale o `netlify-plugin-gatsby-cache` no seu projeto com o comando:

```bash
npm install netlify-plugin-gatsby-cache

// ou se usar yarn
yarn add netlify-plugin-gatsby-cache
```

### Passo 4 - Adicione a flag para habilitar o Gatsby incremental builds

Atualize o comando de `build` no seu `package.json` para incluir a seguinte flag:

```json
"scripts": {
  "develop": "gatsby develop",
  "build": "GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true gatsby build --log-pages"
}
```

A flag `--log-pages` irá mostrar quais páginas o Gatsby fez build em cada deploy, é opcional e se você quiser, basta remover.

### Passo 5: Faça alguma mudança e veja funcionando!

Assim que você fizer todas as mudanças acima, o site já estará preparado para os builds incrementais. Na primeira vez que você subir alguma mudança, ele irá demorar o mesmo tempo que já demora atualmente, porém já guardando os arquivos no cache.

Na segunda vez que você rodar, prepare-se para um build bem mais rápido!

## Conclusão

É isso aí galera, foi um post rapidinho, mas que espero que seja útil para todos vocês, eu amo a dupla Gatsby+Netlify e eles estão cada vez mais se superando!

E se você não chegou a fazer meu curso de Gatsby, aproveita esse [lindo cupom de desconto](https://www.udemy.com/course/gatsby-crie-um-site-pwa-com-react-graphql-e-netlify-cms/?couponCode=PROMOFEV22) e corre logo para estudar!
