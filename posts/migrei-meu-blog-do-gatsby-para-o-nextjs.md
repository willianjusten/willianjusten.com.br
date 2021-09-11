---
layout: post
date: 2021-07-04 01:46:26
title: Migrei meu blog do Gatsby para o NextJS
description: Um pouco da razão da mudança, coisas que fiz e minhas impressões.
main-class: js
color: '#D6BA32'
tags:
  - nextjs
  - gatsby
  - blog
categories:
  - 'NextJS'
---

## Introdução

Fala pessoal! Alguns dias atrás eu resolvi migrar meu blog do [GatsbyJS](https://www.gatsbyjs.com/) para o [NextJS](https://nextjs.org/) e postei até no meu Twitter, alguns posts [sobre isso](https://twitter.com/Willian_justen/status/1411029194566418433), [aqui](https://twitter.com/Willian_justen/status/1411091307884421123) e [aqui também](https://twitter.com/Willian_justen/status/1411097667434856449).

No [post passado](https://willianjusten.com.br/como-ter-um-blog-ajuda-a-conseguir-oportunidades) muita gente gostou da minha recomendação do Sleeping Pandora, então hoje a recomendação é da banda [Novo Amor](https://open.spotify.com/artist/0rZp7G3gIH6WkyeXbrZnGi?si=ZZOUd6ovThOUZ1iCuwSOOw&dl_branch=1), que apesar de ter um nome bem brasileiro, é de um cara do País de Gales, a voz dele é incrível e as melodias são ótimas.

Nesse post eu vou falar um pouquinho desse processo, algumas das razões e pequenos detalhes. Minha ideia é fazer uma série inteira com vários pequenos detalhes separados em posts pequenos, até para facilitar nas buscas quando alguém estiver precisando. Então nesse post daqui, eu vou só dar uma "pincelada" em algumas das coisas, pois entrarei mais a fundo realmente em posts individuais. Se você tem interesse no assunto, num deixa me [seguir no Twitter](https://twitter.com/Willian_justen) ou assinar o [feed do blog](https://willianjusten.com.br/feed.xml) no seu [agregador de conteúdo favorito](https://willianjusten.com.br/usando-um-agregador-de-conteudo).

## A pergunta que não quer calar

Lá no Twitter algumas pessoas responderam o Tweet, outros chegaram até a mandar a DM fazendo sempre a mesma pergunta:

> Mas por que você vai trocar? Não gosta mais do Gatsby? O Next é bem melhor?

E bom, a primeira resposta que eu dou para essa é bem simples:

> Mudei porque deu vontade!

Isso mesmo, não tinha uma enorme razão para mudar, o blog já tinha uma boa performance, tudo estava funcionando direitinho, num tinha nada me agoniando nem nada.

## Mudança é oportunidade para aprendizado

Eu gosto de inventar essas mudanças, pois é sempre uma boa oportunidade para estudar algo diferente e testar. Eu já trabalho há anos com Next e Gatsby, mas nunca precisei migrar de um para o outro e queria ver como era. Nesse processo posso garantir que aprendi vários detalhezinhos.

Aliás, foi a primeira vez que eu codei com a ajuda do [GitHub Copilot](https://copilot.github.com/) que inclusive [gravei esse vídeo sobre](https://www.youtube.com/watch?v=EGiXsfyBST8) e posso dizer, estou surpreso! Tiveram vários momentos que ele sugeriu coisas super úteis!

## Meu processo

Eu demorei em torno de 2-3 dias e foi bastante divertido! Eu usei bastante a [técnica do Pomodoro](https://willianjusten.com.br/tecnicas-de-aprendizado) junto com o site/app [Pomofocus.io](https://pomofocus.io/).

Lá eu meio que fui definindo as tarefas que precisava fazer e ia iniciando os ciclos de 25min, fluiu super bem!

## Sobre Gatsby e Next

Como todos sabemos, tanto o Gatsby quanto o Next são feitos com React. A grande diferença é que o Gatsby é orientado a plugins, enquanto o Next é mais livre e agnóstico, deixando você criar as soluções como você quiser.

A vantagem do Gatsby é que ele tem um [ecossistema enorme de plugins](https://www.gatsbyjs.com/plugins/), então, tudo que você precisa, tem um plugin que alguém já fez, o que acelera bastante o processo de desenvolvimento. Mas isso também pode se tornar um vilão, pois a estrutura é bem própria do Gatsby, então você precisa conhecer como as coisas funcionam para começar a usar.

O Next, por outro lado, tenta ser o mais próximo possível do Javascript/React puro, então, todas as pequenas diferenças que ele tem, são em formas de funções e não arquivos de configuração. Outra grande vantagem do Next ao meu ver, é que ele permite diferentes tipos de desenvolvimento, seja um estático (SSG), um estático incremental (ISR) ou até mesmo server side rendering (SSR), o que te deixa bastante livre na hora de desenvolver.

Se você não sabe nada sobre essas siglas, recomendo fortemente [esse vídeo](https://www.youtube.com/watch?v=X3W-YFe2_io).

## Minhas impressões da migração

O meu objetivo dessa primeira mudança, foi permanecer com o mesmo visual e mudar só "a parte debaixo do capô". Dessa forma, por ambos serem React, eu consegui quase que exportar os componentes diretamente sem problemas, não posso dizer o mesmo das outras coisas, mas num geral, foi até que tranquilo, as "dificuldades" foram mais pelo meu blog ter muito conteúdo e já ter aí seus 6 aninhos de idade.

Eu pretendo escrever em posts separados alguns dos detalhes mais interessantes/importantes, mas aqui eu vou passar por alto algumas das coisas que você deve se preocupar/atentar.

### Arquivos estáticos e build

As mudanças são:

- Do `static` (Gatstby) para `public` (Next)
- O Gatsby faz o build para `public` (então lembre-se de remover do `.gitignore`)
- O Next cria uma pasta `.next` (esse você adiciona)

### Os componentes "cascas"

No Gatsby você tem um arquivo [html.js](https://github.com/willianjusten/gatsby-course/blob/master/src/html.js) que é a casca mais interna das páginas, onde você pode colocar algumas informações que você quer que persista em todas as páginas, coisas como tema (light/dark), algumas tags de verificação/etc.

Já no Next você possui 2 arquivos, que são:

- `pages/_document` - esse é o arquivo mais externo de todos e roda **somente** no build e/ou server side, ele serve mais para extendermos o html em si, adicionando tags de verificação, meta tags comuns a todas as páginas e mais. Você pode ler [mais aqui](https://nextjs.org/docs/advanced-features/custom-document).
- `pages/_app` - esse arquivo encapsula todas as páginas, mas ele roda no server e no client. É mais escolhido para persistirmos layouts, temas, estilos, etc.

### Links

Na hora da conversão dos componentes, esse foi um passo fundamental, apesar de bobo, se você não trocar, vai quebrar tudo xD

```js
// Gatsby

import { Link } from 'gatsby'

export default function Page() {
  return <Link to="/">meu link</Link>
}

// Next

import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/">
      <a>meu link</a>
    </Link>
  )
}
```

Como você pode ver, no Gatsby, o próprio `Link` já se comporta como um `a` e recebe a url através do `to`. No Next, você precisa criar um `Link` e passar um `a` dentro dele (isso é muito importante!) e o `href` ao invés de ficar no `a`, ele fica no `Link`.

### Styled Components

No Gatsby para trabalhar com `styled-components` você tem advinha o quê? Isso mesmo, um plugin! Já no Next, para fazer funcionar, você precisa de 2 detalhes:

#### Configurar o Babel

Você precisa instalar o `babel-styled-components` e também configurar o `.babelrc` com:

```json
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": true,
        "displayName": true
      }
    ]
  ],
  "env": {
    "test": {
      "plugins": [
        [
          "babel-plugin-styled-components",
          {
            "ssr": false,
            "displayName": false
          }
        ]
      ]
    }
  }
}
```

E depois disso, você precisa também alterar o `_document` para gerar os estilos no server.

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

Se você não fizer essas duas etapas, o blog pode "piscar" começando sem estilo e ganhando os estilos, o que não é legal.

### Criação de páginas/posts

No Gatsby, toda a criação é gerenciada através do arquivo [gatsby-node](https://github.com/willianjusten/gatsby-course/blob/master/gatsby-node.js#L39-L110), onde você vai trabalhar com uma source de dados, que pode ser desde um conjunto de markdown, até uma API de algum CMS. Mas é importante se atentar que aqui a interface de conexão vai ser sempre em GraphQL no final.

Já no Next, a criação das páginas é feita diretamente na pasta `pages` e vai caber a você definir a estrutura dessas páginas/slugs. Exemplo, para os posts do blog, eu criei um arquivo `[slug].js` que entende que terão várias páginas dinâmicas, onde a url será aquele `slug`. Isso para mim é bem mais fácil de achar e claro de como funciona. Outra questão é que você pode usar diferentes coisas para diferentes páginas sem problemas. Quer gerar as páginas de posts através de markdown? Vai lá. Quer criar páginas de outros assuntos usando GraphQL no mesmo projeto? Pode também. Enfim, você é livre para trabalhar como desejar.

Em um outro post vou mostrar detalhadamente como se faz tanto com markdown quanto com uma API.

### Componente de Imagem

O grande trunfo que o Gatsby tinha para mim, era o componente de `gatsby-image` que fazia tratamentos, lazy-loadings, blur, etc. O NextJS na época que eu criei o blog sequer tinha um componente para trabalhar com imagens, mas desde a v10 eles criaram um componente e evoluíram super rápido!

Você pode ver a [documentação do componente](https://nextjs.org/docs/api-reference/next/image), mas um exemplo simples de uso:

```jsx
import Image from 'next/image'

export default function Home() {
  return (
    <Image
      src="/image.png"
      alt="A text explaining the image"
      width={500}
      height={500}
    />
  )
}
```

Como pode ver, é bem simples e direto. Tendo algumas propriedades legais para passar como `placeholder="blur"`, `layout="responsive"` e outras coisas mais.

### Componente de SEO

Enquanto o Gatsby utiliza o `react-helmet`, dentro do Next você pode simplesmente criar suas tags diretamente ou então utilizar o `next-seo`. Um exemplo bem simples é:

```jsx
// src/components/seo.js

import Head from 'next/head'
import config from '../config'

export default function SEO({ description, title }) {
  const siteTitle = config.title

  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={config.social.twitter} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  )
}
```

## Conclusão

Enfim, esses foram alguns dos detalhes que eu fui mexendo para migrar e vou fazer uns posts in-depth sobre o assunto, mas se você já se interessou em conhecer o Next. Eu tenho 2 cursos que você pode dar uma olhada:

- [React Avançado](https://reactavancado.com.br) - esse é um curso bem extenso, onde eu crio um Ecommerce de jogos do zero usando tudo que o NextJS tem a oferecer, além de testes, GraphQL, backend com Strapi e mais uma pá de coisas.
- [NextJS na Prática](https://nextjs.willianjusten.com.br/) - esse é um curso mais rápido e direto nas funcionalidades do NextJS para criar uma espécie de blog, só que para viagens.

E se você quiser mais sobre as diferenças de performance, benchmarks e etc. Fica atento para o próximo post, onde falarei mais desse assunto!
