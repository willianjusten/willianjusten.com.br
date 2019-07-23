---
layout: post
date: '2019-07-23 06:50:10'
image: /assets/img/gabriel-ramos-unsplash-analytics.jpg
title: Como usar o Google Analytics Events Tracker?
description: >-
  Qual a importância de rastrear eventos no seu site e como fazer isso de forma
  simples.
introduction: >-
  Qual a importância de rastrear eventos no seu site e como fazer isso de forma
  simples.
twitter_text: >-
  Qual a importância de rastrear eventos no seu site e como fazer isso de forma
  simples.
main-class: dev
color: '#637a91'
tags:
  - google analytics
  - javascript
  - react
---
## Introdução

Fala pessoal, o post de hoje será sobre um assunto que eu gosto demais, **métricas!** Vira e mexe eu posto algumas coisinhas no meu [Twitter](https://twitter.com/Willian_justen) sobre estatísticas do blog e até mesmo em outros trabalhos, eu era vidrado em analisar dados. Sejam dados de performance, acessos e outras coisinhas mais.

Na maioria das vezes, eu faço essas métricas por curiosidade e elas não tem nenhum objetivo final. Mas essas métricas são extremamente importantes, principalmente se você tem um negócio próprio e deseja medir sua performance de vendas, atração de novos usuários e etc. Então por isso que irei falar sobre isso =)

Enquanto eu escrevo esse post vou ouvindo um músico/youtuber que encontrei por acaso no Spotify, ele faz músicas instrumentais muito boas! Se curte rock instrumental, vai no [perfil dele no Spotify](https://open.spotify.com/artist/4vnQIQmsGTMXSQy3B5ElAw?si=INHTMGSZRsSjirgq7ohA6Q).

## O que são esses eventos?

Antes de falar como usar, é melhor explicar o que são né? A explicação mais simples é:

> Evento é uma interação/atividade do usuário com elementos da página, pode ser desde a simples `view` até interações mais diretas, como o clique ou submissão de um formulário.

Alguns exemplos de interação seriam:

* View de uma página
* Clique num link de menu
* Uma busca no site
* Play num vídeo
* Download de um pdf
* Play de um podcast
* Scroll da página

Enfim, você pode mensurar qualquer tipo de interação que o usuário tenha no seu site!

## Qual a importância disso?

Se até agora você não viu a importância disso, vou dar alguns exemplos para ajudar.

### Situação 1:

> Você tem um site onde publica seus podcasts e quer saber quantas pessoas entram na página e quantas de fato botam para tocar o episódio.

### Situação 2:

> Você tem um blog e deseja saber se as pessoas fazem de fato a leitura do post. Você pode analisar a porcentagem de scroll que eles fazem na página, assim é possível ter uma métrica melhor do que só a view.

### Situação 3:

> Você tem um ecommerce online e deseja saber a porcentagem de pessoas que adicionam coisas no carrinho, mas não finalizam. Você pode adicionar um evento no botão de adicionar ao carrinho e analisar contra as vendas e assim vai ter dados melhores também.

Enfim, são **infinitas** as possibilidades de métricas que você pode criar e analisar e os ganhos são imensos!

## A estrutura dos eventos

O Google Analytics tem uma estrutura bem definida dos eventos, o que facilita demais para podermos criá-los e criar métricas em cima deles. Essa estrutura é formada por **5 dados**:

### Event Category

Esse é o nome dado para um grupo de eventos similares que você deseja rastrear. Exemplo: eu tenho uma [página de cursos](https://willianjusten.com.br/cursos/) e quero analisar o clique nos cursos. Todos os eventos ficam na categoria "cursos" então. Assim como os links de curso que tenho.

### Event Action

Como o nome já diz, essa é a ação que você está rastreando. Exemplos: play de vídeo, clique num curso, clique num link do menu, scroll de uma página.

### Event Label

Aqui é onde você especifica melhor o evento em si. Por exemplo, no caso dos meus cursos, é aqui que eu defino o nome do curso que foi clicado. Assim eu consigo através do `category` ver todos os cliques nos cursos e aqui eu consigo ver curso a curso de forma mais específica. Assim eu consigo saber qual o curso mais clicado, por exemplo.

### Event Value

Esse é um valor **numérico**, que você assinala ao evento que está rastreando. Geralmente é associado a um valor monetário. Exemplo: o valor do produto que foi adicionado ao carrinho, valor que o download de um pdf significa, etc.

### Non Interaction

Esse é o último parâmetro que você passa no evento. Como disse lá acima, evento pode ser uma interação ou atividade do usuário. Para informar se esse evento é interativo ou não, você passa esse último parâmetro, iremos entrar em mais detalhes da implementação logo abaixo.

## Implementando o Google Analytics

A primeira das coisas e mais óbvia é que você precisa criar uma conta no [Google Analytics](https://analytics.google.com/analytics/web/) e o processo, como mostrado na imagem abaixo, são basicamente 3 etapas:

![Uma imagem mostrando as 3 etapas do Google Analytics. Você primeiro passa alguns dados, vai receber um script para colocar no site e depois é só aguardar e ver os dados no site do analytics.](/assets/img/google-analytics-tracker.png)

Esse código de acompanhamento é bem famoso, e fica parecido com o abaixo:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58087941-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'XX-XXXXXXXX-X');
</script>

```

O mais importante desse script é o seu **tracking code**, que ali está representado por `XX-XXXXXXXX-X`.

No meu caso, como eu uso o Gatsby, existe o [gatsby-plugin-google-analytics](https://www.gatsbyjs.org/docs/adding-analytics/), e aí a configuração fica:

```js

// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "XX-XXXXXXXX-X" with your own Tracking ID
        trackingId: "XX-XXXXXXXX-X",
      },
    },
  ],
}
```

## Implementando os eventos

Como eu já disse tudo sobre a estrutura ali acima, então fica muito fácil de implementar! A sintaxe é a seguinte:

```js
ga('send', {
  hitType: 'event',
  eventCategory: [Category],
  eventAction: [Action],
  eventLabel: [Label],
  eventValue: [Value],
  nonInteractive: [True | False]
});
```

Como a ordem dos parâmetros é sempre a mesma, você pode simplificar mais e colocar só:

```js
ga('send', 'event', 'Category', 'Action', 'Label', 'Value');
```

Okay, o código é esse, mas como e onde você coloca? Vamos a alguns exemplos:

Em eventos de `click`, onde são geralmente botões, você pode fazer até inline como:

```html
<a href="/foo" onclick="ga('send', 'event', 'Category', 'click', 'Label', 'Value');">Ir para Foo</a>
```

Se for algum evento de view, você pode colocar também diretamente na página, com um script inline:

```html
<script>
ga('send', 'event', 'Category', 'View', 'Label', 'Value', nonInteractive: true);
</script>
```

E se for algum evento ligado a um scroll, por exemplo, você pode adicionar diretamente no seu script, só lembrando de verificar a existência do `window.ga`, algo como:

```js

document.addEventListener('scroll', () => {
  if typeof window.ga !== undefined {
     // sua implementação aqui e mais o evento
     ga('send', 'event', 'Category', 'Scroll', 'Label', 'Value');
  }
})
```

## Como eu faço no Gatsby/React?

Existe um plugin chamado [React GA](https://github.com/react-ga/react-ga), que já facilita com todas as configurações necessárias para mim. E aí no exemplo da minha página de cursos, basta eu fazer o seguinte código:

```jsx
const courseClickTrack = title => {
  ReactGA.event({
    category: 'cursos',
    action: 'click',
    label: `Link Curso - ${title}`
  })
}

const Course = ({ title, description, link, image }) => {
  return (
    <S.CourseLink href={link} onClick={() => courseClickTrack(title)}>
      <S.CourseWrapper>
        <Image filename={image} alt={title} />
        <S.CourseInfo>
          <S.CourseTitle>{title}</S.CourseTitle>
          <S.CourseDescription>{description}</S.CourseDescription>
        </S.CourseInfo>
      </S.CourseWrapper>
    </S.CourseLink>
  )
}
```

Repare que no `onClick` do React eu ainda passo o `title` para que assim a minha `label` tenha diferentes valores para cada curso.

E eu faço isso para outras coisas, como podem ver [nesse tweet](https://twitter.com/Willian_justen/status/1151614625768755207). Então, se quiserem ver os trackers que eu uso, só acessar o [código fonte do blog](https://github.com/willianjusten/willianjusten.com.br/).

## Conclusão, Agradecimento e chamada para Open Source

É isso pessoal, espero que esse post ajude você a conseguir criar métricas mais legais e interessantes para os seus próximos sites. E se você tiver outras sugestões, não deixe de falar ali nos comentários ou no Twitter.

E para continuar, quero fazer um agradecimento ao [Luciano Carvalho](https://github.com/lucianocarvalho) que achou links quebrados no blog e não só avisou, como fez [um Pull Request](https://github.com/willianjusten/willianjusten.com.br/pull/110) corrigindo. 

Outras pessoas avisaram coisas via Twitter também e até fizeram sugestões, fica aqui meu obrigado a todos vocês! <3

E se você está começando na área e não sabe como iniciar, está aí uma oportunidade! O meu blog inteiro é open source e você pode ajudar na revisão dos artigos, melhorias de código e até inclusão de features que você acha que seria legal ter. Não perde a oportunidade e [vai lá no Github agora](https://github.com/willianjusten/willianjusten.com.br).








