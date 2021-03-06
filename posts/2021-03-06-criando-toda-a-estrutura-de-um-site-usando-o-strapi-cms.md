---
layout: post
date: 2021-03-06 11:57:17
image: /assets/img/strapi-estrutura.png
title: Criando toda a estrutura de um site usando o Strapi CMS
description: Nessa aula eu mostro como penso e monto o backend de um site
  institucional simples.
introduction: Nessa aula eu mostro como penso e monto o backend de um site
  institucional simples.
twitter_text: Nessa aula eu mostro como penso e monto o backend de um site
  institucional simples.
main-class: dev
color: "#637a91"
tags:
  - dicas
  - strapi
categories:
  - Dicas rápidas
---
## Introdução

Fala pessoal, eu recentemente comecei uma [série de vídeos com dicas bem rápidas](https://www.youtube.com/watch?v=1dNNL95BsJE&list=PLlAbYrWSYTiOviR_zL01FMa-kWEMDIjeO) lá no meu canal do YouTube, mas como eu também gosto de texto e também quero facilitar a busca seja pelo Google ou pelo YouTube, vou portar os vídeos para cá também. Espero que dê certo =)

## Vídeo

<iframe width="560" height="315" src="https://www.youtube.com/embed/VWuTUd0dRCM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Utilizando tudo que o Strapi tem a oferecer

Quando eu vou montar um backend de qualquer coisa com o Strapi, eu tento pensar em cada pedaço e ver o que posso reaproveitar, o que será único e o que vai ser repetido. Baseado nisso, eu consigo definir se vai ser `Single Type`, `Component`, `Collection Type`.

Exemplo, para partes únicas de um site, como um `Menu` eu costumo criar como um `Single Type`, afinal de contas, todas as páginas vão possuir o mesmo componente, então nem faz sentido ficar adicionando/removendo nas collections.

Agora para estruturas que podem ou não se repetir em diferentes páginas eu costumo criar como `Component`, assim eu tenho a estrutura de dados e posso reutilizar nos seus devidos lugares.

E para as páginas em si, eu gosto bastante de utilizar o `Dynamic Zone`, que permite uma área onde você pode adicionar diferentes tipos de componentes, assim a sua página se torna super genérica, podendo ir desde uma Home, até a página de about, baseado em quais componentes você for utilizar.

No vídeo acima você consegue ver mais desses pensamentos em prática.

## Conclusão

E aí, gostou da dica? Se curtiu, não deixa de se inscrever lá no [canal do YouTube](https://www.youtube.com/WillianJustenCursos/) para essa e mais outras dicas.