---
layout: post
date: '2018-03-16 11:42:05'
image: /assets/img/willian-justen-de-vasconcellos-441777-unsplash.jpg
title: Medindo a performance do seu site com Lighthouse
description: Uma ferramenta perfeita para dizer tudo que está bom e ruim no seu site.
introduction: Uma ferramenta perfeita para dizer tudo que está bom e ruim no seu site.
twitter_text: Uma ferramenta perfeita para dizer tudo que está bom e ruim no seu site.
main-class: dev
color: '#637a91'
tags:
  - performance
  - pwa
  - seo
categories:
  - "Performance Web"
---
## Introdução

Fala pessoal, para quem me segue no [Twitter](https://twitter.com/Willian_justen) deve ter visto que eu ando falando bastante sobre performance e talvez vocês tenham percebido também que o nosso blog lindinho tem estado bem mais rápido e "diferente". Fazia um tempo que eu num estudava um pouquinho e aí usei meu blog como cobaia, porque ele foi criado para isso né.

Eu sou extremamente aficcionado por performance e por mais que o blog já fosse rápido, muitas coisas me deixavam agoniado e quando rodei o [Lighthouse](https://developers.google.com/web/tools/lighthouse/) no blog e vi várias notas baixas, foi a gota d'água, eu precisava fazer alguma coisa!

Eu fiz muiiiitas mudanças no blog, desde o servidor, até fontes e funcionamento offline. E bom, como eu aprendi vários detalhes, por que não compartilhar com vocês? A partir de hoje, vou começar vários posts sobre tudo que fiz e dicas sobre isso, se você não quiser perder nada, adiciona o [feed do blog](https://willianjusten.com.br/feed.xml) no seu [Feedly](https://feedly.com/) ou me segue no Twitter/Facebook/Slack, acessa o blog todo dia <s>ok, não precisa, mas se quiser...</s>

Enquanto eu vou escrevendo esse post, vou ouvindo uma [Playlist](https://open.spotify.com/user/willianjusten/playlist/31qxv1gv7rMf9S3BFcHBob?si=zDTUBl4PQX-RFvFCMvlOfg) que acabei de criar com várias músicas acústicas calminhas e de bandas desconhecidas.

## Por que performance importa?

Antes mesmo de começar a falar mais sobre a ferramenta do Lighthouse, a gente precisa entender porque performance é tão importante.

É basicamente sobre **reter usuários!** Nós queremos que os usuários usem nosso site e que eles gostem disso. Se for um blog, nós queremos que as pessoas leiam os posts, se é uma loja, nós queremos que eles comprem o que oferecemos. Se é site institucional, nós queremos que a pessoa veja sobre a nossa empresa e que tenham confiança naquilo que estão vendo. E a performance é um fator muito significa nessa interação! Seguem alguns dados:

* [O Pinterest refez suas páginas ganhando 40% de performance e com isso aumentou o número de buscas e criação de contas em 15%](https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7)
* [Para a Mobify, a cada 100ms removidos do load aumentava em 1.11% o tempo de acesso do usuário e um aumento de $380.000 em ganho anual](http://resources.mobify.com/2016-Q2-mobile-insights-benchmark-report.html)

E da mesma forma que uma boa performance traz dados bons, uma performance com problemas pode trazer sérios problemas.

* [BBC descobriu que eles perdem 10% de usuários a cada segundo adicional ao load do site](https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale)
* [DoubleClick da Google descobriu que 53% das visitas a sites via mobile são abandonadas se a página dura mais de 3s para carregar](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)

É meus amigos, vocês não querem que o usuário abra o seu site e ele demore tanto que o usuário decida sair né? Então performance importa e muito! Não é só para os robôs do Google, é para algo maior, os seus usuários.

## O que é o Lighthouse?

Pegando a descrição que a própria Google dá para o [Lighthouse](https://developers.google.com/web/tools/lighthouse/):

> O Lighthouse é uma ferramenta automatizada de código aberto que aprimora a qualidade de apps da Web.

Abaixo você consegue ver como é a arquitetura do projeto e o processo que ela faz para analisar o seu site, é bem genial a parada!

![Arquitetura](https://raw.githubusercontent.com/GoogleChrome/lighthouse/master/assets/architecture.jpg)

Na imagem acima só mostra 4 categorias mas a ferramenta analisa o site através de 5 categorias específicas que são:

* Progressive Web App
* Performance
* Accessibility
* Best Practices
* SEO

E para cada uma dessas categorias a nota pode ser de 0 a 100. Tipicamente sites que tem valor acima de 90 representam o top 5% dos sites com melhor performance. Aqui tem [uma lista com todos os detalhes](https://docs.google.com/spreadsheets/d/1dXH-bXX3gxqqpD1f7rp6ImSOhobsT1gn_GQ2fGZp8UU/edit?ts=59fb61d2#gid=0) de pontuação, com todos os seus pesos.

Eles tem as referências para todas as regras no [site deles](https://developers.google.com/web/tools/lighthouse/scoring), lá você consegue ver separadinho cada ponto em cada categoria, vale a pena olhar também, muitas dicas de boas práticas.

## Como usar?

Existem algumas formas possíveis de utilizar o Lighthouse hoje, que são:

* [Via extensão no Google Chrome](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) - é atualizada constantemente e abre uma aba nova com o resultado, muito simples de usar.
* Via aba Audit no Google Chrome DevTools - funciona bem, mas não abre aba nova e tive impressão de uns valores estarem meio errados.
* Via terminal instalando com `npm install -g lighthouse` - funciona muito bem e gera o relatório em vários formatos.
* [Via Lighthouse-CI](https://github.com/ebidel/lighthouse-ci) - é um projeto que roda o lighthouse no terminal mas dentro do seu CI, nunca utilizei, mas parece promissor.

## Analisando o relatório

![Relatório do Lighthouse](/assets/img/relatorio-lighthouse.png)

Dentro do relatório ele mostra separadamente cada uma das categorias e mostra também uma separação em 3 partes:

* **Failed Audits**: que são as partes que estão erradas ou pelo menos não estão de acordo com as métricas do Lighthouse.
* **Opportunities**: que são coisas que já estão boas, mas você pode melhorar ainda mais.
* **Passed Audits**: os pontos onde você completou com excelência.

Cada um desses pontos sempre vem com boas explicações do que fazer para melhorar e o porque de serem dessa forma. Acho os relatórios do Lighthouse um prato cheio para se aprender boas práticas na Web. Leia tudo com calma e tente seguir os conselhos, mas uma dica:

> Seu site não precisa ter os absolutos 100 em tudo! Existem pontos que você pode ou não mudar. Então analise com calma e veja os prós e contras daquilo que o Google recomenda.

Se o seu site já estiver com **90+**, é um ótimo sinal! E se ele não estiver, também não tem problema, veja os problemas e vá melhorando conforme você achar necessário.

## Conclusão

Bom, esse é o primeiro post dessa parte sobre performance que eu vou falar. Nos próximos posts eu vou mostrar as coisas que eu fui melhorando no blog e também trazendo alguns resultados que eu já obtive, sim, tem menos de uma semana das mudanças, mas já notei crescimentos bem relevantes!

Se você tem alguma dúvida ou pedido, faz aí nos comentários. Você também pode postar as notas do seu site e até pedir ajuda de outros leitores, vamos ser participativos! =D
