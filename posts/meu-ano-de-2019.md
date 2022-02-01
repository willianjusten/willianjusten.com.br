---
layout: post
date: '2019-12-27 12:30:11'
image: /assets/img/willian-justen-de-vasconcellos-q1tvymwgwpw-unsplash.jpg
title: Meu ano de 2019
description: 'Um ano movimentado na Toptal, blog novo, curso novo e viagens como sempre.'
introduction: 'Um ano movimentado na Toptal, blog novo, curso novo e viagens como sempre.'
twitter_text: 'Um ano movimentado na Toptal, blog novo, curso novo e viagens como sempre.'
main-class: misc
color: '#7AAB13'
tags:
  - cursos
  - blog
---

## Introdução

Como todo ano eu faço, esse post aqui serve para eu revisitar um pouco de como foi meu ano e até mesmo para analisar minha evolução de acordo com os anos anteriores. Se você quiser comparar também, seguem aqui os posts dos outros anos:

- [Meu ano de 2015](https://willianjusten.com.br/meu-ano-de-2015/)
- [Meu ano de 2016](https://willianjusten.com.br/meu-ano-de-2016/)
- [Meu ano de 2017](https://willianjusten.com.br/meu-ano-de-2017/)
- [Meu ano de 2018](https://willianjusten.com.br/meu-ano-de-2018/)

Esse ano eu ouvi muiiita coisa, como sempre né? A banda mais ouvida foi [City and Colour](https://open.spotify.com/artist/74gcBzlQza1bSfob90yRhR?si=6BaUHAm2TIuE62OaG9Rtyg), também ouvi bastante o album do While she sleeps que foi o [So What?](https://open.spotify.com/album/2jd0syXer1txxASx3W2oy0?si=qkEwSe8qT_KSjIx5y66LdA). Tenho uma música favorita com minha namorada que também ouço demais, que é [Home - Edward Sharpe and The Magnetic Zeros](https://open.spotify.com/track/7w5cxTEzp1rfV3KCy0Bd5N?si=ooFjOcaSSAags5zBEg2HvA).

Enfim, se quiser ouvir tudo que eu mais ouvi, só ver [minha playlist do Spotify desse ano](https://open.spotify.com/playlist/37i9dQZF1EtkiMqKxAIioe?si=vYua-vbnTOGHH1vGVY3lqw), já vou avisando, tem **muito** City and Colour xD

Vamos ao que interessa e falar sobre as coisas que me aconteceram esse ano.

## Blog

Depois de alguns anos usando o mesmo layout, eu resolvi mudar drasticamente o blog. Apesar de eu amar o [Jekyll](https://jekyllrb.com/) e ele funcionar muito bem para mim, eu queria me aventurar em alguma coisa nova. E para isso, eu escolhi o [GatsbyJS](https://www.gatsbyjs.org/). Tiveram vários motivos para eu escolher ele, mas os principais foram:

- Usa React/GraphQL, que são tecnologias que uso no meu dia-a-dia
- Focado em performance (me preocupo demais com isso)
- Funciona bem no Netlify (que já usava no Jekyll)
- Vira um PWA com uma linha

Como tudo meu, o código está [lá no Github](https://github.com/willianjusten/willianjusten.com.br/) e você está mais do que livre para enviar correções/mudanças ou somente olhar o código xD

As grandes mudanças com o visual foram:

- Ter o dark theme por padrão, no blog passado eu passei um tempo catando dados [através do analytics events tracker](https://willianjusten.com.br/como-usar-o-google-analytics-events-tracker/) e vi que uma parcela gigante de pessoas usava o dark theme, então melhor ter como padrão
- Eu mudei também o visual padrão para ser em lista, mas depois de uns pedidos, eu implementei o modo em Grid também, assim o blog acabou sendo bastante customizável
- As páginas todas tem transições suaves e com uma barra lateral/inferior que dão até um aspecto de app para o site

Se quiser ler ainda mais sobre todas as mudanças, escolhas de stack e etc, recomendo o [post de making of](https://willianjusten.com.br/making-of-blog-novo/).

### Algumas métricas

Como eu sou o maluco das métricas, vão aqui algumas:

### Usuários no Ano

![Gráfico do analytics mostrando que tive 200.743 usuarios no ano](/assets/img/acessos-2019.png)

Tive um aumento bem pequeno (5.72%) em relação ao ano passado, mas creio que isso se deve ao número pequeno de novos posts, foi um ano bem cheio para mim, então não pude escrever com tanta frequência.

### Preferência Visual

![Uma tabela indicando que o Dark Theme e a List View são a preferência no blog, com porcentagens acima de 40%](/assets/img/tema-view-2019.png)

Aqui podemos ver que a preferência dos usuários é o Dark Theme e o List View, que é basicamente a visão padrão do blog. Para metrificar isso, eu removo a first view de um first user, visto que se ele entrar pela primeira vez, acabaria vendo o visual padrão e isso atrapalharia nas métricas, mas mesmo assim, a preferência pelo tema padrão é clara.

### Cidades que mais acessam

![Tabela de cidades que mais acessam: São Paulo, Rio de Janeiro, BH, não definido, Curitiba](/assets/img/cidades-2019.png)

Não é muita surpresa que as cidades que mais acessam meu blog sejam essas, afinal de contas, são as maiores do Brasil e com isso tem mais gente, além disso, são os grandes centros, mas nossa, São Paulo tá ganhando por muito =o

### Sistemas Operacionais e Browsers mais utilizados

![Lista dos SO mais utilizados: Windows, Linux, Android, Mac, iOS](/assets/img/so-2019.png)

Na lista de Sistemas Operacionais, o primeiro lugar e segundo lugar eu já imaginava que seria o Windows e o Linux. O interessante foi ver o Android na frente do Mac e por último o iOS.

É muito legal ver essas métricas, pois assim eu consigo ver "além da minha bolha". Por que digo isso? Bom, a maioria dos meus amigos e pessoas próximas utilizam o Mac e iOS, mas claramente dá para ver que não são a maioria.

![Lista dos Browsers mais utilizados: Chrome, Firefox, Safari, Opera, Android](/assets/img/browsers-2019.png)

Na lista dos browsers, nada muito diferente do que imaginava, com exceção do **Opera**! WTF? Pensei que esse browser tinha morrido hahaha

## Troca de time na Toptal

Desde quando entrei na Toptal, eu trabalhei principalmente nas páginas públicas da Toptal, isso basicamente envolviam as páginas normais do site e também o blog. No início desse ano nós lançamos o [novo blog da Toptal](https://www.toptal.com/blog), que eu tive o prazer de liderar o desenvolvimento. Tínhamos algumas limitações que vinham desde o backend até mesmo a grande quantidade de posts já existentes. Então precisávamos mudar tudo, porém com muita calma e análise, para não quebrar nada que já existia. Foi um trabalho bem legal, porém muito estressante, então após finalizar essa grande etapa, eu resolvi respirar novos ares e me mudei para um outro time.

No meu time atual, eu trabalho mais na parte de captação de novas clientes/empresas e o seu onboarding no portal onde elas vão criar seus jobs, entrevistar freelancers, definir pagamentos e tudo mais que envolva essa parte do freela.

Dentro dessa parte, eu trabalho bastante com React, Redux, Apollo, GraphQL, mas tem coisinhas do backend que são feitas em Ruby on Rails.

Espero que o ano que vem tenham ainda mais desafios e que eu possa aprender bastante com eles.

## Lançamento do curso de Gatsby

Logo após eu lançar meu blog usando o Gatsby, eu tive um pedido massivo para fazer um curso sobre e bom, eu já estava planejando fazer mesmo. Então, não muito depois de lançar o blog eu já comecei com a criação dos vídeos.

Eu decidi ensinar a fazer um blog igualzinho ao meu, pois assim era um projeto real e que já estava no ar, ao invés de só ensinar "foo/bar" que acho meio vazio e que não ensina tanto na real.

[O curso](https://www.udemy.com/course/gatsby-crie-um-site-pwa-com-react-graphql-e-netlify-cms/?couponCode=PROMOFEV2220) se mostrou um sucesso e tem uma das mais altas classificações lá na Udemy, com vários reviews muito legais!

![Alguns reviews do curso de Gatsby tendo 5 estrelas e com ótimos elogios.](/assets/img/reviews-gatsby.png)

Se você não tem o curso, aproveita e usa [esse cupom de BLACKFRIDAY](https://www.udemy.com/course/gatsby-crie-um-site-pwa-com-react-graphql-e-netlify-cms/?couponCode=PROMOFEV2220) que deixa com um desconto maneirão =)

## Encontros da Toptal

Outra coisa bastante legal desse ano é que não tive só um encontro grande da Toptal, mas **dois** encontros!

### Brazil Gathering

O primeiro encontro foi de todos os brasileiros do Core Team da Toptal, e ele foi num paraíso, que é Porto de Galinhas. Passamos 1 semana trabalhando literalmente de frente para o mar, numa mansão gigante e linda! Foi muito legal pois eu pude rever algumas caras conhecidas, mas também várias pessoas novas que eu nem fazia ideia de que eram brasileiros e trabalhavam na Toptal. Pois é, a empresa é bem grande e são muitos times, é normal não conhecer a maioria das pessoas xD

![Uma foto com 5 pessoas sentadas em frente a uma casa com 2 andares e uma piscina, com uma vegetação a frente deles.](/assets/img/toptal-porto.png)

Nessa foto temos em ordem: [Bruno Facca](https://github.com/brunofacca), [Gustavo Saiani](https://twitter.com/gusaiani), [Marco Andrade](https://github.com/Marco-Andrade), eu e [Jônatas Paganini](https://github.com/jonatas)

E bom, o que falar desse paraíso?

![Uma foto de drone mostrando a orla e o mar azul de Porto de Galinhas](/assets/img/willian-justen-de-vasconcellos-a8c8_h-qthy-unsplash.jpg)

E teve dia que eu fiz questão de acordar as 4h da manhã, só para ver o Sol nascendo, apesar de estar morto de cansaço, valeu super a pena!

![Nascer do Sol ao fundo, um trecho de mar e um trecho de areia. E na frente uma vegetação e um pequeno portãozinho de madeira.](/assets/img/willian-justen-de-vasconcellos-lwnu5llnrs8-unsplash.jpg)

Se você quiser ver/baixar as fotos dessa viagem, só ir lá [nessa do collection do Unsplash](https://unsplash.com/collections/8678577/my-adventures-in-porto-de-galinhas-brazil)

### Encontro do time em Barcelona

Apenas 3 semanas depois desse encontro no Brasil, eu estava pegando um vôo para Barcelona para encontrar o meu time (e mais um time que é agregado), o que foi muito bom, já que eu só conhecia um deles pessoalmente. Foi ótimo conhecer todos e trabalhar juntos, engraçado que nós planejamos o sprint com menos coisas, pensando que seria mais "bagunça" do que trabalho, mas se mostrou o contrário, nós produzimos para caramba! Mas é claro que aproveitamos bastante também, e nossa, como pessoas do leste europeu bebem, nem tente competir, é bem possível que você teria um coma alcóolico!

![Foto com 18 pessoas em frente a um restaurante](/assets/img/encontro-barcelona.jpg)

Nessa foto num vou marcar todo mundo, porque é muita gente, mas temos pessoas da Espanha, Rep. Tcheca, Canadá, EUA, Ucrânia, Alemanha, Lituânia, Argentina, Itália e mais xD

## Viagem para Itália e Suiça

Aproveitando que eu estava na Europa, não podia deixar de ir em alguns lugarzinhos né? Pretendo escrever mais detalhadamente sobre essas viagens, até porque eu fiquei cerca de 40 dias e visitei diversos lugares, então vale um post separado com várias dicas de coisas que aprendi.

### Workshop de Fotografia nas Dolomitas

Mas foi uma viagem muito legal e especial, pois eu fiz um [workshop de fotografia](https://photography-tours.com/tours/dolomites-october-6-11-2020/) com 2 ídolos meus, que são o [Tobias Hägg / Airpixels](https://www.instagram.com/airpixels/) e a [Emma Svensson](https://www.instagram.com/emmasvenssonphoto/). Sempre fui apaixonado pelas Dolomitas e foi incrível poder fotografar ao lado deles e de outros fotógrafos fantásticos, aprendi demais!

Aqui vão algumas fotos dessa viagem:

![Foto do Tre Cime di Lavaredo, que é uma montanha com 3 picos, estava amanhecendo, porém ainda escuro e com névoa na parte inferior.](/assets/img/willian-justen-de-vasconcellos-gzly-0kpg3m-unsplash.jpg)

Esse é o Tre Cime di Lavaredo, que foi um dos pontos mais altos do workshop. Para ver e baixar em alta resolução, [acesse no Unsplash](https://unsplash.com/photos/GZLY-0kPG3M).

![Uma foto nas Dolomitas de uma cadeia de montanhas envolta em névoa, num visual bem misterioso.](/assets/img/willian-justen-de-vasconcellos-kzit2oyws-s-unsplash.jpg)

Essa foto para mim é bem especial, pois ela foi tirada no meu celular, sim, isso é foto de celular! No caso eu tenho um [Huawei P30 Pro](https://consumer.huawei.com/br/phones/p30-pro/) e essa foto ainda virou foto do dia no Unsplash! Para ver e baixar em alta resolução, [acesse no Unsplash](https://unsplash.com/photos/KZIT2OYws-s).

![Foto de drone de um lago bem azul com vários pinheiros ao redor e uma cadeia de montanhas ao fundo.](/assets/img/willian-justen-de-vasconcellos-5zzaapsfu6y-unsplash.jpg)

Na viagem eu vi diversos lagos maravilhosos, esse aí é o Lago di Misurina, para ver e baixar em alta resolução, [acesse no Unsplash](https://unsplash.com/photos/5zZAaPsfu6Y).

Se quiser ver mais fotos (ainda estou subindo outras), é só acessar [essa collection no Unsplash](https://unsplash.com/collections/8919833/my-adventures-in-dolomites).

### Um passeio pela maravilhosa e CARA Suiça

Sempre fui apaixonado pela Suiça e é tudo isso mesmo, o país é lindo demais, extremamente organizado, limpo e com as mais belas paisagens que já vi. O problema é que eu deixei quase um rim por lá, de tão absurdo de caro que é o país. Mas bom, uma vez a gente precisa se aventurar né? Seguem abaixo algumas fotos:

![Foto de montanhas nevadas ao fundo, um pequeno trecho de lago super azul e uma pessoa de costas em pé numa pedra.](/assets/img/willian-justen-de-vasconcellos-q1tvymwgwpw-unsplash.jpg)

Esse é o Oeschinensee, um maravilhoso lago de água super azul, é uma caminhada bem tranquila para ver essa maravilha e vale a pena demais! Para ver e baixar em alta resolução, [acesse no Unsplash](https://unsplash.com/photos/q1tvymWgwPw).

![Foto de um trem passando num viaduto bem alto entre montanhas.](/assets/img/willian-justen-de-vasconcellos-ubwnghh-jie-unsplash.jpg)

Imagina uma pessoa ficar esperando horas para um trem passar num viaduto famoso só para tirar uma foto. Bom, esse fui eu! Mas fotografia é isso, paciência e preparo. No final eu amei essa foto e me teletransporto para o mundo de Harry Potter sempre que vejo. Para ver e baixar em alta resolução, [acesse no Unsplash](https://unsplash.com/photos/UBWnGHh-JIE).

## Conclusão

Quando pensei em escrever esse post, eu fiquei até pensativo sobre o que escrever, pois achava que nem tinha feito muitas coisas, mas de pouquinho em pouquinho, eu vi que na realidade fiz coisa para caramba!

E você? Como foi seu ano? Tente pensar em todas as coisas que fez, não precisam ser grandes como "comprei uma casa", tenho certeza que você vai encontrar várias coisas que foram bem significativas, se quiser, compartilha aí embaixo! =D
