---
layout: post
date: '2019-07-13 10:43:12'
image: /assets/new-blog.png
title: Making of - Blog Novo
description: 'Coisas que usei por trás desse blog, escolhas de visual e outras coisas mais.'
introduction: 'Coisas que usei por trás desse blog, escolhas de visual e outras coisas mais.'
twitter_text: 'Coisas que usei por trás desse blog, escolhas de visual e outras coisas mais.'
main-class: js
color: '#D6BA32'
tags:
  - js
  - gatsby
  - netlify
---
## Introdução

Fala pessoal, faz muito tempo que não escrevo e já recebi até email de gente perguntando o que estava acontecendo e porque não tinha mais nenhum post novo! De fato, eu andei bem ocupado nos últimos tempos, principalmente pois eu estava trabalhando em certos projetos na [Toptal](https://www.toptal.com/) e também cuidando um pouco da minha saúde. E junto a isso, também tem aquela famosa preguiça né, se tivesse um título para a pessoa que mais procrastina, com toda certeza eu estaria no **top 10**.

O blog é novo, mas algumas coisas não podem mudar né, então lá vai aqui a banda que estou ouvindo enquanto escrevo esse post, o nome dela é [While She Sleeps](https://open.spotify.com/artist/38LdIuxB548zgHoEY2AN7a?si=HlQ3kLIqQX-jG5xmpcAVAA), é um pouco mais agitada, assim vou tentar não enrolar para escrever e lançar logo esse post.

Bom, a ideia nesse post é falar as tecnologias novas que usei e o porquê delas, **não pretendo ensinar como fazer nada do zero aqui** (muito possível eu crie um curso sobre isso).

## Visual e Mudanças

Bom, se você ainda se lembra do blog antigo, ele tinha um menu hamburguer que acabava escondendo alguns dos links e com isso perdiam alguns cliques. O blog iniciava claro e então você poderia escolher para mudar para o Dark Mode e a lâmpada ficava sempre no bottom, as vezes escondendo um pouco do conteúdo atrás.  Eu coloquei um evento para identificar qual tema era mais utilizado (Dark ou Light) e com quase 80% o Dark mode ganhou, então, por isso eu decidi colocá-lo como padrão. Abaixo segue um screenshot do blog antigo:

![Screenshot da home antiga, tela branca e cards brancos. ](/assets/blog-antigo.png)

No blog novo, meu objetivo era trazer alguns links meus já para o primeiro olhar da pessoa, por isso adicionei as minhas redes sociais, onde não pude deixar de incluir o [Unsplash](https://unsplash.com/@willianjusten), que é onde boto as minhas fotos de viagem, que são uma grande paixão que tenho atualmente. Além desses links, também já deixei aparente os links para [cursos](https://willianjusten.com.br/cursos/) e [séries](https://willianjusten.com.br/series/), que são partes bastante importantes no blog para mim. Se você entrou por esse post e num viu a home, fica abaixo um screenshot dela:

![Screenshot do blog novo, com interface escura e os posts em lista.](/assets/blogo-novo.png)

Outra grande mudança na estrutura, foi a adição dessa barra de ações na lateral, assim fica mais fácil de usar a busca, mudar o tema e uma feature que há muito me pediam também (de ir para o topo, já que meus posts são imensos).

Já dentro dos posts, a mudança foi pouca, mais centralizada mesmo no header, antes possuía um header bem grande até chegar o post e agora eu resolvi remover isso, já que a ideia é que a pessoa já vá direto no texto. Também haviam uns bugs de altura nesse header que me incomodavam desde a primeira vez, então nada melhor que removê-los.

## Sai Jekyll entra Gatsby

Desde quando iniciei o meu blog, lá em [2015](https://willianjusten.com.br/making-of-parte-1/), eu utilizei um gerador estático, no caso o Jekyll. Ele sempre me serviu muito bem e ainda serve! Eu não mudei do Jekyll por achar ele ruim ou qualquer outra coisa, muito pelo contrário, adoro demais a simplicidade do Jekyll. 

A minha mudança para o [Gatsby](https://www.gatsbyjs.org/) foi motivada somente pelo fato de ser em React e usar GraphQL, que são duas tecnologias que venho usando faz tempo e queria brincar e treinar um pouco meus conhecimentos. E como eu sempre digo:

> Não há nada melhor que usar o seu blog como cobaia para testes e aprendizados.

Posso dizer que aprendi bastante com o Gatsby e to achando uma ferramenta incrível! Não há melhor/pior entre Gatsby e Jekyll, pois eles fazem praticamente a mesma coisa. Mas uma grande diferença que notei, é que apesar do Gatsby ser mais novo, ele tem uma documentação incrível e uma comunidade melhor ainda! Todos os problemas que eu tinha, achava a solução muito rapidamente. Além dos vários plugins embutidos que facilitam demais! Eu consigo fazer um site se tornar PWA com somente uma linha!

## Styled Components

No blog anterior eu utilizava o [Stylus](http://stylus-lang.com/), numa estrutura bem simples, mas que ao mesmo tempo, era um pouco complicada de organizar e até de gerar um css inline de boa qualidade e de fácil customização.

Para o blog de agora, nem foi difícil de pensar, já que estaria trabalhando com React, minha primeira escolha foi o [styled-components](https://www.styled-components.com/), é leve e super simples de usar. Posso criar os estilos diretamente para o componente e também os estilos globais para todas as páginas.

Junto dele, eu utilizei o [styled-media-query](https://github.com/morajabi/styled-media-query) para poder criar os estilos de acordo com cada media query.

A estrutura, ficou mais ou menos assim:

```sh
├── components
│   ├── Avatar
│   │   ├── index.js
│   │   └── styled.js
│   ├── Course
│   │   ├── Image.js
│   │   ├── index.js
│   │   └── styled.js
│   ├── Layout
│   │   ├── index.js
│   │   └── styled.js
│   ├── MenuBar
│   │   ├── index.js
│   │   ├── styled.js
│   │   └── trackers.js
│   ├── MenuLinks
│   │   ├── content.js
│   │   ├── index.js
│   │   └── styled.js
...
```

Repare que tenho uma pasta específica para componentes e para cada componente eu tenho um `index.js` que é onde tem a lógica dele e tenho um `styled.js` que é onde ficam os meus estilos. Prefiro fazer assim, pois eu tenho o css separado, então sei onde editar e isso evita aqueles arquivos imensos, que unem lógica e visual.

Pegando um trecho de código para exemplificar como faço:

```js
// components/Layout/styled.js

import styled from 'styled-components'
import media from 'styled-media-query'

export const LayoutWrapper = styled.section`
  display: flex;

  ${media.lessThan('large')`
    flex-direction: column;
    padding-top: 4.125rem;
  `}
`

export const LayoutMain = styled.main`
  background: var(--background);
  min-height: 100vh;
  padding: 0 3.75rem 0 20rem;
  transition: background 0.5s, color 0.5s;
  width: 100%;

  ${media.lessThan('large')`
    padding: 0 0 3rem 0;
  `}
`
```

Nesse arquivo, eu crio e exporto minhas classes e então para utilizar, faço assim:

```jsx
// components/Layout/index.js

import * as S from './styled'

const Layout = ({ children }) => (
    <S.LayoutWrapper>
      <GlobalStyles />
      <TransitionPortal level="top">
        <Sidebar site={site.siteMetadata} />
      </TransitionPortal>
      <S.LayoutMain>{children}</S.LayoutMain>
      <TransitionPortal level="top">
        <MenuBar />
      </TransitionPortal>
    </S.LayoutWrapper>
  )
```

Eu retirei alguns trechos não referentes ao `styled-components` para facilitar a leitura. Mas perceba que eu faço um import de tudo que tem em `./styled` como `S`. Assim os componentes que iniciam por `<S.` eu sei que são referentes a estilo e não a outros componentes externos.

Creio que essa é uma das melhores organizações que já achei, eu ganho em legibilidade separando os arquivos e também ganho na facilidade de identificação do que é estilo e do que não é.

## Markdown + Graphql = Remark

Uma coisa que eu não queria abrir mão era de utilizar o Markdown, para quem não conhece ~~mas deveria já conhecer~~, o [Markdown](https://daringfireball.net/projects/markdown/) é um formato de texto simples que se converte em html, ele é usado em vários lugares, inclusive quando você vai escrever aquele Pull Request lá no Github.

Ao invés de escrever tags, eu simplesmente coloco símbolos onde eu quero e muitas vezes nem isso. Como é o caso dos parágrafos, que é só pular uma linha e ele entende.

Mas como fazer isso funcionar no Gatsby? Quando eu li pela primeira vez, eu vi que ele utilizava API's como o [Contentful](https://www.contentful.com/) para alimentar o GraphQL e então poder mostrar os dados na tela. Mas foi então que eu descobri o [Gatsby Transformer Remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/), que pega os meus posts em Markdown, faz algumas mágicas e libera os dados via GraphQL para eu poder usar no Gatsby sem problemas!

Depois de instalar o plugin e configurar no arquivo `gatsby-config.js` (que é o arquivo onde todos os plugins e configurações são feitas), bastou subir o servidor e eu podia ver todos os dados lá no `http://localhost:8000/___graphql`. Abaixo fica uma imagem de como isso fica:

![Screenshot da interface do GraphQLi, onde eu tenho uma query buscando por vários dados de todos os posts](/assets/gatsby-graphql-remark.png)

## Search usando o Algolia

O Search do blog anterior era um pouquinho simples, para num dizer burro mesmo. Eu basicamente tinha um JSON e percorria ele baseado na string que a pessoa digitava, além de não mostrar nenhum "preview" das coisas que poderiam ser buscadas. Com isso, muita gente acabava sem saber o que pesquisar, por onde começar e muitas vezes sequer achava o que gostaria (mesmo eu tenho posts do assunto!).

Para corrigir isso, eu resolvi utilizar o [Algolia](algolia.com), eles são um sistema de busca extremamente rápido e inteligente. Possibilitando buscas por sinônimos, por conteúdos dentro do texto do post, além de ter um "typo correction", ou seja, se a pessoa errar uma letra ou outra, ele vai buscar pelo termo certo.

Ele possui vários planos, e o que eu uso é o Community, que é gratuito e já me permite 50 mil operações por mês, o que é bem suficiente para o tamanho do meu blog. Além disso, ele me dá alguns dados relacionados a que tipos de buscas foram feitas, isso me ajuda a saber o que as pessoas procuram e se eu não tiver nada do assunto, posso começar a escrever! Olha só a dica. Abaixo segue um screenshot sobre essa parte dos analytics:

![Imagem mostrando uma lista das pesquisas mais feitas no site](/assets/algolia-search.png)

## Netlify e Netlify CMS

Se você já viu minha página de [cursos](https://willianjusten.com.br/cursos/), com toda certeza já viu meu [Mini curso de Netlify](https://www.youtube.com/watch?v=a1cIjP1bueM&list=PLlAbYrWSYTiMGMxQf9JSoZUU1rgVpGPth). Eu sou extremamente fã do serviço deles, além de ser super simples, me dá várias vantagens, uma delas é poder ter preview/deploy de diferentes branches. E foi assim que eu consegui fazer testes fora do meu local, permitindo que outras pessoas também pudessem testar, além de eu analisar a performance (sim, sou o fissurado da performance).

Junto do Netlify, tem também o Netlify CMS, que basicamente adiciona um CMS para o meu blog, sem esforço nenhum, bastando algumas linhas. 

E porque usar um CMS, se eu já subo tudo para o Github e eu sei ler Markdown sem problemas?

Simples, no CMS, eu posso escrever rascunhos de forma mais fácil, deixar uma pilha de ideias lá e ir terminando conforme eu achar necessário. Além de ter um preview do que estou escrevendo e bom...Quando eu for fazer algum site para o cliente e ele pedir um CMS, eu já sei como fazer rapidinho, sem precisar de um elefante branco ~~to olhando para você Wordpress~~.

Abaixo segue alguns screenshots de como funcionam as interfaces:

> Lista de Posts no CMS

![Lista de Posts no CMS](/assets/cms-posts.png)

> Parte de Workflow, para definir os rascunhos, revisando e prontos para lançar

![Parte de Workflow, para definir os rascunhos, revisando e prontos para lançar](/assets/workflow-cms.png)

> Preview do Post

![Preview do Post](/assets/preview-cms.png)

Como pode ver, é uma interface super simples, mas super funcional! E o legal que dá para extender, criar seus próprios componentes e tudo!

## Extras

Bom, tiveram outras várias coisas que utilizei no blog
