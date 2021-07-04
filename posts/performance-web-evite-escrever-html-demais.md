---
layout: post
date: '2018-05-29 08:10:42'
image: /assets/img/web-perf-html-cover.jpg
title: 'Performance Web: Evite escrever HTML demais'
description: >-
  Calma, HTML ainda é importante, mas é legal ficarmos atentos a quantidade de
  nós criados.
introduction: >-
  Calma, HTML ainda é importante, mas é legal ficarmos atentos a quantidade de
  nós criados.
twitter_text: >-
  Calma, HTML ainda é importante, mas é legal ficarmos atentos a quantidade de
  nós criados.
main-class: dev
color: '#637a91'
tags:
  - performance
  - seo
categories:
  - Performance Web
---
## Introdução

Dando continuidade aos [posts sobre performance](https://willianjusten.com.br/series/#performance-web), hoje vou falar sobre um coisa que muita gente nem se liga, mas que é bastante importante para a performance de uma página. Sim, estou falando do HTML!

Enquanto escrevo esse post, vou ouvindo [God Is An Astronaut](https://open.spotify.com/artist/079svMEXkbT5nGU2kfoqO2?si=XwF693duRLat7Dk5v3G_nw), uma banda de Post-Rock fantástica, que eu gosto demais. Inclusive, tem uma [issue no FrontendBR](https://github.com/frontendbr/forum/issues/1103) com algumas recomendações de músicas, dá uma olhada lá também =)

### Otimizar CSS, melhorar JS, mas e o HTML?

Quando a gente começa a falar de performance, todo mundo vai logo pensando em remover aquelas classes do CSS que não está usando. Ou então melhorar o código JS, mover para o final da página, evitar fazer repainting e outras mil coisas mais.

Só que, e o HTML? Será que ele não é importante também? Cada pedaço de HTML que você escreve, é uma parte do DOM, ou seja, a cada `<div>` nós temos um nó no DOM. E um DOM muito grande pode prejudicar a performance de muitas maneiras. Por exemplo:

* `Performance no carregamento`: se você está criando um DOM muito grande, você pode estar enviando muitos bytes desnecessários. Em resumo, um HTML maior, significa um arquivo maior sendo baixado.
* `Demora para o browser entender o conteúdo`: se o conteúdo for muito grande, o browser precisa primeiro ler tudo, para só então montar a página. O problema é que muitas vezes esse "DOM extra" nem sequer vai ser mostrado na primeira dobra da página. Isso faz com que o usuário demore mais tempo para poder interagir com o conteúdo da página.
* `Gasto de memória`: toda página que o browser está acessando gasta uma certa quantia de memória, seja para poder "pintar" na tela o conteúdo, seja para informar ao JS os seletores que você possa estar trabalhando. Se o conteúdo for muito grande, mais pesado o processo fica e com isso mais memória é pedida.

Bom, espero que com os pontos acima você já esteja no mínimo assim:

> Ai meu Deus! Sou eu quem faço o Chrome gastar 98% da minha memória!

Para melhorar isso, vou colocar aqui algumas dicas que podem ajudar a melhorar seu HTML e evitar esse monte de problemas.

## Dicas e recomendações para melhorar o HTML

* Tenha menos que 1500 nós no total
* Tenha no máximo uma profundidade de 32 nós no documento
* Evite que o elemento pai tenha mais que 60 filhos

Só com essas primeiras dicas, certeza que alguém pensou:

> E como eu vou saber o número dessa <s>caralha</s> toda?

Fique tranquilo, lembra daquele [post sobre o Lighthouse](https://willianjusten.com.br/medindo-performance-do-seu-site-com-lighthouse/)? Então, o Lighthouse vai lhe informar direitinho esses números e se já estiver bom, meus parabéns!

Continuando com as dicas:

* Evite entregar muito HTML que não vá ser visível na página. As vezes é melhor entregar conforme a necessidade do usuário, seja durante seu scroll ou o click de um botão.
* Faça paginação caso haja a necessidade (irei mostrar esse ponto mais a frente)
* Caso não tenha jeito e você precise mesmo entregar todo o html, tente [melhorar e simplificar seus seletores css](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

## Estudo de caso

Bom, como eu escrevo já faz um tempinho, acaba que eu tenho um número considerável de posts. Na minha home eu estava carregando todos os posts de uma só vez, sem nenhum tipo de paginação e é claro, o Lighthouse acusou que eu estava usando um número excessivo de nós e com isso minha performance estava sendo prejudicada. Segue abaixo um screenshot de como estava antes:

![Um screenshot indicando que a performance da pagina era de 96. Tendo como indicador vermelho, um numero de 2824 nós.](/assets/img/antes-paginacao.png)

Repare que apesar da performance já estar boa, com a nota 96, muito disso devido a outras mudanças que fui fazendo junto com a [série de Performance Web](https://willianjusten.com.br/series/#performance-web), eu estava com um número excessivo de nós, no valor de **2824 nós!**

Após ver isso, eu resolvi que estava na hora de melhorar isso e apliquei uma paginação no meu blog, usando a [documentação do Jekyll](https://jekyllrb.com/docs/pagination/), que fez o processo ser muito fácil.

Eu botei que cada página iria ter 21 posts, divisível por 3 já que tenho 3 colunas de cards. Continua sendo um número super grande de posts por página, porém a diminuição de nós foi considerável e isso me deu melhorias, como você poderá ver abaixo:

![Um screenshot indicando que a performance da pagina era de 98. E o antes indicador vermelho, agora é verde e com o valor de 618.](/assets/img/depois-paginacao.png)

Como podem perceber, minha nota passou para 98, mas não é isso que importa, mas outros marcadores também foram melhorados, como:

- First Contentful Paint: **-310ms** (melhoria de **~22%**)
- Estimated Input Latency: **-33ms** (melhoria de **~39%**)
- Speed Index: **-1060ms** (melhoria de **~49%**)

E o que esses dados significam? Significa que eu já mostro o conteúdo na tela de forma mais rápida (First Contentful Paint), o usuário também já consegue interagir mais rápido (Estimated Input Latency) e a velocidade num geral do site aumentou (Speed Index).

## Conclusão

A ideia desse post é mostrar que as vezes de onde menos esperamos, podemos melhorar. A gente sempre se preocupa com outras coisas no nosso site, mas nos esquecemos que o HTML também é importante. Como podem notar, pelo simples fato de criar uma paginação no meu blog, eu já dei uma melhorada em vários índices de velocidade. Meu próximo passo é reescrever todo o CSS e os seletores para seguir alguma metodologia, é bem possível que eu siga para a [Metodologia BEM](http://getbem.com/), que tem sido a mais indicada pela [Google](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations).
