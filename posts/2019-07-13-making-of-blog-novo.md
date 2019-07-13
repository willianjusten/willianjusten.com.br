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

Bom, a ideia nesse post é falar as tecnologias novas que usei e o porquê delas, não pretendo ensinar como fazer nada do zero aqui (muito possível eu crie um curso sobre isso).

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

