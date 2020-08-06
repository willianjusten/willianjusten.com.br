---
layout: post
date: 2020-08-05T02:59:30.000Z
image: /assets/img/next-gatsby-cra-cover.png
title: NextJS, Gatsby ou Create React App? Entendendo os conceitos de SSR, SSG e SPA.
description: Antes de escolher um deles, é importante saber as diferenças e suas
  necessidades.
introduction: Antes de escolher um deles, é importante saber as diferenças e
  suas necessidades.
twitter_text: Antes de escolher um deles, é importante saber as diferenças e
  suas necessidades.
main-class: js
color: "#D6BA32"
tags:
  - js
  - next
  - gatsby
---
## Introdução

Fala pessoal, o post de hoje é para falar de um assunto bem importante e que causa muitas dúvidas como: "Quando será que eu devo usar Gatsby ou Next ou Create React App?". Mas antes mesmo dessa dúvida, é importante saber as diferenças e também entender as suas necessidades, só assim a gente consegue realmente escolher o que for melhor para nossa aplicação.

Esse post será baseado em um dos vídeos que eu fiz para o meu curso [React Avançado](https://reactavancado.com.br/), no curso nós utilizamos o NextJS e por isso eu resolvi falar sobre os funcionamentos lá.

## Vídeo 

Se quiser optar por assistir a versão em vídeo, segue o vídeo abaixo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/X3W-YFe2_io" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## O que é um framework web?

O framework web é um sistema opinativo onde já são definidas as estruturas e ferramentas do projeto. Essas definições podem ir desde somente a estrutura de pastas, até mesmo a ferramenta que irá compilar o projeto.

## Por que usar um framework web?

Acho que já sabendo o que é, fica fácil saber o porquê de usar né? É muito mais fácil de seguir padrões já pré-determinados do que criar um completamente do zero. Sem contar que você já sai programando de fato a sua solução, ao invés de ter que pensar na parte ferramental de tudo.

## Mas, cuidado!

É uma maravilha já ter tudo prontinho para já botar a mão na massa, mas isso pode causar uma enorme dor de cabeça a longo prazo se você não souber exatamente o que usar e ir só pelo **hype** de ferramenta X ou Y.

Vou dar um exemplo que vi esses dias de um aluno perguntando:

> Galera que manja do next, eu consigo pegar um projeto já pronto em html, css e js, e passar ele para o nextjs?

E obviamente, eu perguntei, mas por que de usar o Next? E a resposta foi:

> A empresa quer umas mudanças e vai passar os projetos para o react e next para o SEO kkk

Um dos maiores erros de muitas pessoas/empresas é achar que se botar o Gatsby/Next vai ter um SEO melhor. Mas isso não é verdade e sabe por quê? Bem simples, tanto o Gatsby quanto o Next (usando SSG) vão gerar estáticos, que é exatamente "html/css/js" lá do início!

> Ou seja, você vai reescrever tudo e, no fim, trocar o famoso 6 por meia duzia.

É por isso que antes mesmo de escolher uma tecnologia/framework, é importante saber o que você precisa e o que você já tem. 

Pense assim, se você já tem uma equipe inteira proficiente em Angular, não tem razão nenhuma para trocar por React, só porque React tem "mais hype".

## Sobre o NextJS

O [NextJS](https://nextjs.org/) é um framework já "velho de guerra", mas que tem ganhado cada vez mais tração graças aos maravilhosos últimos updates deles, que aliás, não param de acontecer.

No momento que escrevo esse post, eles lançaram a [versão 9.5](https://nextjs.org/blog/next-9-5), que está absurdamente interessante, trazendo conceitos cada mais interessantes na parte do que eles chamam de "next-gen static".

E para quem não sabe, o NextJS fica embaixo do guarda-chuva da [Vercel](https://vercel.com/), antiga Zeit, que tem como fundador o [Guillermo Rauch](https://twitter.com/rauchg), que é o criador do [Socket.io](https://socket.io/) e bom, mais outras mil coisas que você usa ou já deve ter ouvido falar.

E quais seriam as características do NextJS? Bom, vou listar apenas algumas delas:

- Renderização no servidor (Server Side Rendering - SSR)
- Geração de estáticos (Static Site Generation - SSG)
- CSS-in-JS (Styled-jsx, Styled Components, Emotion, etc)
- Zero Configuration (rotas, hot reloading, code splitting…)
- Completamente extensível (controle completo do Babel/Webpack, plugins, etc)
- Otimizado para produção

E isso aí, é só a pontinha do iceberg, existem muito mais coisas e eu aconselho fortemente você dar uma olhada no site do [nextjs.org](https://nextjs.org/)

### E quais as diferenças entre Next, Gatsby e Create React App?

Para poder comparar, antes mesmo nós precisamos falar sobre os **diferentes tipos de aplicações**, que são:

- Sites estáticos (HTML/CSS/JS - SSG)
- Client Side Rendering (Single Page Application - SPA)
- Server Side Rendering (SSR)

Abaixo eu vou mostrar com umas animações fantásticas um pouco do processo de cada um.

## Como funciona um site estático (SSG - Static Site Generation)

<iframe width="560" height="315" src="https://www.youtube.com/embed/1zhT23VDVDc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Em um site estático (ou gerado estaticamente), o fluxo é bem simples:

Caso seja um site gerado estáticamente (seja usando Gatsby/Next), nós iremos fazer as requisições para uma API (ou até um conjunto de Markdown), vamos pegar esses dados e "colar" com os arquivos de template/componentes e iremos gerar a partir dali os arquivos de HTML, CSS e JS.

A partir daí, nós subimos esses arquivos em um servidor (que pode inclusive ser uma CDN) e não haverá nenhum processo mais ocorrendo no lado do servidor mais. Toda vez que um usuário requisitar uma página, nós vamos pegar o conteúdo daquela página e vamos entregar, como os arquivos foram gerados estaticamente, nenhuma chamada extra será feita e a página já vai ter incluso o HTML total da página, isso inclui as meta-tags e tudo mais.

### Vantagens

- Uso quase nulo do servidor
- Pode ser servido numa CDN (melhor cache)
- Melhor performance entre todos
- Flexibilidade para usar qualquer servidor
- Ótimo SEO

### Desvantagens

- Tempo de build pode ser muito alto
- Dificuldade para escalar em aplicações grandes
- Dificuldade para realizar atualizações constantes

### Quando usar um site estático?

- Site simples sem muita interação do usuário
- Se você é a única pessoa que publica conteúdo
- Se o conteúdo muda pouco
- Se o site é simples, sem tantas páginas
- Quando a performance é extremamente importante

**Exemplos**: Landing Page, Blogs, Portfólios

### Ferramentas que criam estáticos:

- Gatsby
- Next SSG
- Jekyll
- Hugo
- Hexo
- Procure por Jamstack / Static Generator e se surpreenda!

## Como funciona o Client Side Rendering (SPA)

<iframe width="560" height="315" src="https://www.youtube.com/embed/4-Lel1oaV7M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Quando o Angular/React/Ember e outros estouraram, foi exatamente por causa dessa nova forma de trabalhar com a renderização. Antes nós estávamos acostumados em chamar estáticos ou realizar as ações todas sempre no lado do servidor, mas vieram esses frameworks e mostraram que a gente poderia fazer tudo (ou quase tudo) do lado do cliente, permitindo assim interações mais bonitas, transições de páginas elegantes e tudo mais, que naquela época não era tão simples.

O custo dessa forma, é que como tudo é gerado no lado do cliente, o markup inicial que recebemos do servidor é limitado, não tendo o conteúdo ali de fato, mas tags que serão preenchidas pelo framework depois. Então, o grande problema é que bots/scrappers acabam tendo dificuldades de pegar o conteúdo e por isso, essa forma não tem um SEO tão bom.

Como é o fluxo nessa forma?

Você primeiro cria todo o seu site seja utilizando o [Create React App](https://github.com/facebook/create-react-app) ou qualquer outra estrutura parecida. E na etapa de build, é gerado normalmente um arquivo como `app.js`, que vai ser o coração da sua aplicação.

No momento que o usuário abre o seu site, ele irá baixar o esqueleto da aplicação (HTML sem conteúdo), o mesmo terá as chamadas para o seu `app.js` e outras coisas necessárias. Assim que esses arquivos carregarem, o `app.js` fará as chamadas para API e com o retorno dos dados, irá preencher o site com as informações.

Depois disso, as próximas mudanças de rotas serão mais rápidas, já que o JS principal já foi baixado na primeira interação. Esse roteamento também será feito no lado do cliente e não no lado do servidor, o que vai permitir transições mais suaves.

### Vantagens

- Permite páginas ricas em interações sem recarregar 
- Site rápido após o load inicial
- Ótimo para aplicações web
- Possui diversas bibliotecas

### Desvantagens

- Load inicial pode ser muito grande
- Performance imprevisível
- Dificuldades no SEO
- A maioria do conteúdo não é indexado

### Quando usar o SPA?

- Quando não tem tanta necessidade de indexar informações no Google
- Quando o usuário faz muitas interações na página e não quero refreshes
- Quando as informações vão ser diferentes para cada usuário (autenticação, por exemplo)

**Exemplos**: Twitter Web, Facebook Web, Spotify Web

### Ferramentas que criam SPA:

- Create React App e similares
- Angular
- Vue
- Next/Gatsby (ambos permitem ter um funcionamento interno como SPA, mas não é o foco)

## Como funciona o Server Side Rendering (SSR)

<iframe width="560" height="315" src="https://www.youtube.com/embed/0bvo6UKkNDA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

O *Server Side Rendering* apesar de parecer ser o "termo mais novo" por aqui, ele é na realidade, o mais comum e mais usado, afinal, tudo que é feito em PHP, Ruby, Python é feito no lado do servidor.

O fluxo aqui é bem simples, o usuário entra no seu site, isso faz uma requisição no seu servidor, ele faz as chamadas necessárias, cria os arquivos e então entrega para o usuário. Com isso, o usuário já recebe o HTML todo já renderizado, com todo o conteúdo, meta-tags e etc, já não precisando fazer mais nenhuma chamada no lado do cliente. 

### Vantagens

- Ótimo em SEO
- Meta tags com previews mais adequados 
- Melhor performance para o usuário (o conteúdo vai ser visto mais rápido)
- Código compartilhado com o backend em Node
- Menor processamento no lado do usuário

### Desvantagens

- TTFB (Time to first byte) maior, o servidor vai preparar todo o conteúdo para entregar
- HTML maior
- Reload completo nas mudanças de rota

### Quando utilizar Server Side Rendering?

- Quando tem necessidades de um SPA, mas precisa de um loading mais rápido
- Quando o conteúdo muda frequentemente
- Quando trabalha com um número muito grande de páginas
- Quando precisa de uma boa indexação no Google

**Exemplos**: Ecommerce, Sites de Notícias

### Ferramentas que criam SSR:

- NextJS
- NuxtJS (Next mas em Vue xD)
- Razzle
- Svelte com Sapper
- Angular Universal

## Okay, mas qual eu uso então?

Como vocês viram, o Next tem a vantagem de ter o SSR, que é algo que nem o Create React App e nem o Gatsby tem, mas além disso, ele também pode gerar estáticos. E aí como escolher entre eles, já que o Next faz de tudo?

Aqui vai mais uma opinião pessoal, eu costumo utilizar o Next para projetos bem simples e rápidos e/ou que serão tão grandes que o tempo de build de um estático poderia me atrapalhar/incomodar.

E eu costumo utilizar o Gatsby para soluções como Blogs ou sites com um número não tão grande de páginas, mas que trabalhe com muitas imagens, já que para mim, o `gatsby-image` é imbatível, ele otimiza tudo de um jeito bem fácil.

E para áreas autenticadas, administrações ou aplicações web, já utilizo o SPA, já que não precisarei me preocupar com o SEO e a fluidez e o número de interações feitas nessas páginas costumam ser muito grandes, onde um tratamento de estados entre rotas é feito muito melhor com um SPA.

## Conclusão

Espero que tenham gostado desse post, apesar de eu ter feito um vídeo sobre o assunto, eu confesso que prefiro textos para ler/estudar e sei que tem muitas pessoas que são assim como eu xD

E ~~momento jabá~~, se você gostou do assunto e tem interesse em saber ainda mais coisas sobre, recomendo fazer meu [curso de React Avançado](https://reactavancado.com.br/), onde vamos trabalhar bastante com o Next e os conceitos de SSG e SSR.