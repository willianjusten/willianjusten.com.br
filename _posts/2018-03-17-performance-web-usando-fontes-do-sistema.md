---
layout: post
date: '2018-03-19 07:41:16'
image: /assets/img/alexander-andrews-513060-unsplash.jpg
title: 'Performance Web: Usando fontes do sistema '
description: Como algo tão simples como as fontes podem ajudar na performance do seu site.
introduction: Como algo tão simples como as fontes podem ajudar na performance do seu site.
twitter_text: Como algo tão simples como as fontes podem ajudar na performance do seu site.
main-class: dev
color: '#637a91'
tags:
  - performance
  - fontes
categories:
  - Performance Web
---
## Introdução

Dando continuidade aos [posts sobre performance](https://willianjusten.com.br/series/#performance-web), hoje vai ser um post bem simples e rápido. As vezes é bom ler algo rapidinho, mas que seja útil.

Enquanto escrevo, vou ouvindo a minha Playlist [Top Songs 2017](https://open.spotify.com/user/spotify/playlist/37i9dQZF1E9YL5rXG87YIz?si=WnC4pxyAQD-RFTnV-xPABA), ou seja, as músicas que mais ouvi ano passado. Pois é, hoje to saudosista.

## Uso de fontes

Bem lá no início da web, nós não podíamos ter escolha para fontes, era o que o sistema tinha basicamente (que era bem mal suportado e feio). Depois então vieram as fontes customizáveis, bastava baixar a fonte e colocar na sua pasta de assets, depois usar o `@font-face` e você podia ter aquele conjunto lindo de fontes que seu site tanto queria!

Com o tempo foram vendo que muitas fontes eram repetidas e até mesmo que alguns usavam essas fontes customizáveis de forma correta e outros não. Foi aí que nasceram projetos como o [Google Fonts](https://fonts.google.com/) e o [Typekit](https://typekit.com/), que são catálogos com diversas fontes que basta você escolher e eles já servem a fonte para você. O Google gera para você algo como:

```html
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700,800" rel="stylesheet">
```

Note que você pode inclusive escolher o peso da fonte como `400,600,700,800`. Mas conforme vamos escolhendo as fontes, o próprio Google vai avisando se é leve ou pesado.

![Imagem do Google Fonts, mostrando um Load Time: Slow](/assets/img/fonts.png)

Será que vale a pena então carregar fontes pesadas no seu site? Em alguns sites realmente não é possível largar a mão de alguma fonte, já que tem marcas que são feitas todas em cima de alguma tipografia. Mas se você puder fazer essa escolha, por que não?

## Use fontes que o usuário já está acostumado

Nos últimos tempos os sistemas trabalharam e evoluíram muito nas suas fontes. A Google tem feito um trabalho legal com a [Roboto](http://www.google.com/design/spec/style/typography.html), a Apple tem trabalhado na [San Francisco](https://developer.apple.com/fonts/) e a Mozilla também tem sua [Fira Sans](http://mozilla.github.io/Fira/). E a Microsoft? Ela também! Desde a interface Metro a Microsoft trabalhou muito na fonte deles, fortemente inspirada na [Segoe](https://en.wikipedia.org/wiki/Segoe).

E pense comigo, o usuário já passa o dia inteiro usando interfaces com essas fontes, por que mudar isso? Minha preocupação no blog é exatamente com a leitura, então não quero ficar mudando o comportamento do leitor. 

E como o nome já diz, as fontes são do sistema e com isso, não é necessário carregar nem **1Kb** a mais por isso, quer algo melhor que isso?

## Como usar as fontes do sistema?

Apesar de parecer ser super simples, não é tãaao assim também. Você precisar tomar cuidado na ordem das fontes, até para não receber resultados indesejados. O Github utiliza o seguinte approach:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
```

E o Medium/Wordpress fazem umas pequenas mudanças e usam:

```css
body {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,
      Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
}
```

**Nota:** esse método só pode ser usado com `font-family`, não utilize como `font`, pois poderá resultar em estilos inesperados.

## Conclusão

Como venho me preocupando com performance, posso dizer que a remoção de fontes customizáveis já resultou num ganho muito grande de velocidade, então, se você tiver essa oportunidade de usar fontes do sistema, se joga!

É isso, um post leve e simples hoje, mas não menos importante. Continue ligado que muitos posts sobre performance ainda vem por vir! Vem coisas sobre PWA, acessibilidade e mais!
