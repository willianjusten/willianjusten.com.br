---
layout: post
date: 2021-09-15 10:40:01
title: Como configurar o Google Analytics no NextJS em 2021
description: Como configurar corretamente o Google Analytics no NextJS com o next/Script
main-class: js
color: "#D6BA32"
tags:
  - nextjs
categories:
  - NextJS
---
## Introdução

Fala povo, tem um tempinho eu [migrei meu blog do Gatsby para o NextJS](https://willianjusten.com.br/migrei-meu-blog-do-gatsby-para-o-nextjs) e inclusive falei que iria fazer vários pequenos posts com dicas sobre alguns dos detalhes dessa migração e até mesmo como fazer certas coisas no NextJS. Acabei não tendo tempo, mas agora estou aqui! Vou começar com uma coisinha bem simples, mas que teve um diferencial com a versão mais nova do NextJS.

Enquanto vou escrevendo esse post vou ouvindo uma das minhas bandas favoritas de todas em um dos meus albuns favoritos, que é [Freak Show - Silverchair](https://open.spotify.com/album/511p6iaCuK8Sr0BYdpcfkq?si=e9lY9trvQJyJ5fhhdAO8WQ&dl_branch=1)

## Novo componente de Script

Uma coisa que eu gosto muito do NextJS é que eles estão sempre se atualizando e tentando melhorar ainda mais a performance das aplicações. Como é o slogan deles `Let’s make the Web. Faster.`

Na versão 11 eles lançaram o [Componente de Script](https://nextjs.org/docs/basic-features/script) que permite com que você tenha uma granularidade melhor no carregamento de scripts third-parties, o que como nós sabemos, pode afetar demais a performance dependendo do tamanho do arquivo e se ele é carregado junto com todo o resto ou se é carregado depois.

Com esse novo componente, nós temos 3 formas de carregamento:

- `beforeInteractive`: Para scripts críticos que precisam ser baixados e executados antes mesmo da página ser interativa. Normalmente scripts que são fundamentais para o funcionamento da página. Esses scripts são adicionados no server side.

- `afterInteractive` (padrão): Para scripts que podem ser baixados e executados após o carregamento da página. Coisas como tag managers e o próprio analytics. Esses scripts são adicionados já no client-side e rodam depois do hydrate.

- `lazyOnload`: Para scripts que podem carregar quando o carregamento das partes fundamentais já tiver finalizado e não tiver mais nenhuma ação acontecendo. Normalmente para scripts de redes sociais, chats, elementos que não vão estar aparecendo na primeira dobra da página.

## Configurando o Analytics e usando o Script

Agora que já conhecemos o componente de Script, podemos configurar o nosso Analytics para carregar no modo `afterInteractive`. Eu costumo criar um componente `Analytics` para ficar mais fácil de editar/adicionar:

```jsx
import Script from 'next/script'
import { GA_TRACKING_ID } from 'lib/gtag'

const Analytics = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <Script
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
      }}
    />
  </>
)

export default Analytics
```

Note que o `afterInteractive` é o comportamento padrão, mas eu costumo deixar bem explícito, até para que mesmo quem não conheça o `Script` saiba o que vai acontecer.

Outro detalhe é que eu tenho um arquivo `lib/gtag` que fica responsável pelos métodos e variáveis, que é assim:

```jsx
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
``` 

Note que para tudo funcionar precisamos criar uma variável `NEXT_PUBLIC_GA_ID` no nosso `.env.production` para que o mesmo funcione. Se quiser testar em local, basta criar um arquivo `.env.local`.

## Colocando para funcionar e enviando pageview

Só com os arquivos acima ainda não vai funcionar, pois precisamos adicionar esse componente na nossa `_app` e também precisamos enviar as `pageviews` sempre que tiver um acesso na página. Para isso, vamos precisar adicionar alguns detalhes, segue abaixo um arquivo `_app` só com os trechos necessários:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as gtag from 'lib/gtag'
import Analytics from 'components/Analytics'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default App

```

Se você notar, na primeira parte nós temos:

```jsx
const router = useRouter()

useEffect(() => {
  const handleRouteChange = url => {
    gtag.pageview(url)
  }
  router.events.on('routeChangeComplete', handleRouteChange)
  return () => {
    router.events.off('routeChangeComplete', handleRouteChange)
  }
}, [router.events])
```

Essa parte é a responsável por a cada mudança de rota enviar o `gtag.pageview` daquela url.

E para termos o `gtag` funcionando no escopo global, nós adicionamos o componente de `Analytics` bem ao final da `_app`:

```jsx
return (
  <>
    <Component {...pageProps} />
    <Analytics />
  </>
)
```

Com esses passos, aí sim toda pageview já será enviada ao Google Analytics de forma prática e sem impactar tanto a performance! =D

## Conclusão

Espero que tenha curtido esse post, ele já estava na minha lista de posts e tudo, mas semana passada mesmo teve um PR [no repositório oficial do NextJS](https://github.com/vercel/next.js/pull/27674) exatamente sobre isso, então achei bacana trazer para cá por agora e depois vou continuar com alguns outros posts do NextJS também, então fica ligado!