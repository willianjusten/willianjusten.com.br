---
layout: post
date: '2019-08-20 11:36:57'
image: /assets/img/lista-dicas-seo.jpg
title: Lista de dicas de SEO para Devs
description: Algumas dicas que podem ajudar o seu site se destacar nas pesquisas do Google.
introduction: Algumas dicas que podem ajudar o seu site se destacar nas pesquisas do Google.
twitter_text: Algumas dicas que podem ajudar o seu site se destacar nas pesquisas do Google.
main-class: dev
color: '#637a91'
tags:
  - seo
  - frontend
---
## Introdução

Fala pessoal, o post de hoje, é na realidade uma [tradução/adaptação de um post](https://dev.to/pagely/seo-cheat-sheet-for-devs-5h1g). Eu já escrevi [um post sobre SEO](https://willianjusten.com.br/como-melhorar-meu-seo/) antes, mas como são informações diferentes, achei válido de compartilhar aqui.

Enquanto escrevo, vou ouvindo um dos melhores lives que já ouvi na vida, que é o album [Guide me back home (Live)](https://open.spotify.com/album/4dfzMiWAbm39kNAbvgptDr?si=C14YEC2VS4-6pecYfOZb3g) do City and Colour. As músicas são lindas demais e a interação dele com o público deixa tudo ainda mais legal.

Mas bom, vamos logo ao post!

## Preparando para lançar ou migração

1. Coloque o seu domínio para renovar automaticamente. Pode parecer óbvio, mas muita gente já perdeu o domínio porque esqueceu de renovar.
2. Instale o [Google Analytics](https://analytics.google.com/analytics/web/) ou outro [similar](https://www.searchenginejournal.com/9-google-analytics-alternatives/92071/).
3. Certifique-se de seguir todas as [boas práticas com as meta tags](https://moz.com/blog/the-ultimate-guide-to-seo-meta-tags). 
4. Configure o [Search Console da Google](https://search.google.com/search-console/about?hl=pt-br) no seu site. Ele permite você saber como as pessoas estão alcançando seu site, por quais palavras na busca e até mesmo sua posição na busca.
5. Ajude o Google a entender o conteúdo do seu site usando [dados estruturados](https://developers.google.com/search/docs/guides/intro-structured-data?visit_id=1-636507697624367960-3670912478&rd=1). E teste esses dados na [própria ferramenta deles](https://search.google.com/structured-data/testing-tool/u/0/).
6. Use ferramentas para testar o seu SEO, desde o [Lighthouse](https://willianjusten.com.br/medindo-performance-do-seu-site-com-lighthouse/), até ferramentas externas como [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) ou [Neil Patel SEO](https://neilpatel.com/br/seo-analyzer/).
7. Verifique se o seu site é amigável para mobiles, desde o visual até a performance. [53% das visitas são abandonadas se o site mobile demora mais de 3s para carregar](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/).
8. [Revise os erros mais comuns que desenvolvedores cometem quando criam um site mobile](https://developers.google.com/search/mobile-sites/mobile-seo/common-mistakes).
9. Diga para os mecanismos de pesquisa qual URL usar. A Moz descreve que isso (criar canonical links) é a [maneira de previnir problemas causados por conteúdos iguais ou "duplicados" de aparecerem em múltiplas URLs](https://moz.com/learn/seo/canonicalization).
10. Use `https`: [desde 2015, Gary Illyes da Google diz que se as páginas forem identificadas como iguais, o sistema irá priorizar sempre o https, indicando um domínio seguro](https://www.bruceclay.com/blog/gary-illyes-interview/). 
11. Identifique suas images usando o `alt`. Os sistemas de busca não enxergam imagens sem um texto que consiga descrevê-las. Sem contar que isso é **extremamente importante para acessibilidade**.
12. Crie URLs amigáveis. Nada de urls gigantescas, com números e letras desordenadas. Isso só vai prejudicar com que as pessoas tentem acessar.
13. Se seu site possuir uma pesquisa [tente instalar o search box no seu site para que seja possível pesquisar através do Google](https://developers.google.com/search/docs/data-types/sitelinks-searchbox).
![Uma imagem mostrando o search dentro do próprio Google](https://res.cloudinary.com/practicaldev/image/fetch/s--4yXlk8jE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pagely.com/wp-content/uploads/2018/01/search-engine-box.png)
14. Numa migração, tome algum tempo para verificar todos os casos de páginas 404 e crie redirects para os seus devidos links.
15. Tenha um olhar crítico para a usabilidade. Será que seus usuários querem que o vídeo toque automaticamente? Esse menu faz sentido?
16. Use formulários de contato ao invés de só passar o seu email para evitar spams. 

## Após o site ser lançado

1. Veja quantas páginas estão sendo indexadas no Google usando **site:yourwebsite.com** na busca do Google.
2. Conforme o site for mudando e novas urls forem aparecendo, [peça ao Google para rastrear novamente seu site](https://support.google.com/webmasters/answer/6065812?hl=en).
3. Veja os erros do Google no Search Console.
![Uma imagem indicando os erros do site](https://res.cloudinary.com/practicaldev/image/fetch/s--7wV6EGFG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pagely.com/wp-content/uploads/2018/01/crawl-errors.png)
4. Atualize seu sitemap removendo URLs não canônicas e páginas 40x antes de submeter o sitemap.
5. [Escreva um markup que ajude as buscas](https://support.google.com/webmasters/answer/99170)
6. Fique sempre de olho na [velocidade do seu site](https://developers.google.com/speed/). No lançamento o site pode estar lindo e rápido, mas se não continuar checando frequentemente, a velocidade pode ser prejudicada por imagens grandes e outros conteúdos que talvez não fossem necessários.
7. Verifique por links quebrados e sempre redirecione para os corretos.
8. Verifique se os backlinks não foram perdidos com a migração do site ou o novo design. O [Ahrefs](https://ahrefs.com/) é uma boa ferramenta para descobrir isso.
9. Use sites como [Signals](https://cognitiveseo.com/signals/), [Mozcast](http://mozcast.com/) ou [Barracuda](https://barracuda.digital/panguin-seo-tool/) para ficar atento a mudanças no algoritmo de busca do Google que podem impactar seu site.

## Conclusão

O design do site é uma grande parte do SEO e essa lista pode te ajudar no lançamento ou migração do seu site. A empresa que escreveu esse post tem [estudo de caso](https://pagely.com/case-studies/bmc/) onde eles duplicaram os acessos de um cliente, então é algo que realmente funciona.

A Google atualizou recentemente o [Guia de SEO](https://support.google.com/webmasters/answer/7451184) deles, vale dar uma olhada também.

E se você tiver alguma dica, bota aí nos comentários =)
