---
layout: post
date: '2018-03-21 07:52:41'
image: /assets/img/broken-link.png
title: Varrendo seu site atrás de links quebrados
description: Não perca a credibilidade do seu site com imagens ou links quebrados.
introduction: Não perca a credibilidade do seu site com imagens ou links quebrados.
twitter_text: Não perca a credibilidade do seu site com imagens ou links quebrados.
main-class: dev
color: '#637a91'
tags:
  - performance
  - tools
categories:
  - Performance Web
---

## Introdução

Mais um post da série sobre [Performance Web](https://willianjusten.com.br/series/#performance-web), esse hoje nem foi um post muito planejado, por isso vai ser bem rapidinho, mas é extremamente importante!

Enquanto vou escrevendo esse post, vou ouvindo a banda [A love like pi](https://open.spotify.com/artist/0BRqvQoxmmLexIg5tsOeBb?si=g_jBxLo6THeYjAfa9TX2VA) que mistura um pouco de rock com eletrônico, tem músicas muito calmas e fofas como [Jack and the Giant](https://open.spotify.com/track/1XALSFY5nrFQ9NaI2XNp9t?si=GBOSYn7XTk-isgG7pfcTiw).

## Morte aos links mortos! Ops, pera...

Todos sabemos que a pior coisa do mundo é o usuário abrir o nosso site e encontrar um bug, certo? E links/imagens quebrados são bugs sim e dos piores!

No meu blog eu costumo referenciar vários links, tanto internos como externos, atualmente já são mais de **1500 links**! E como saber se os links estão sempre funcionando? Hoje mesmo alguns alunos comentaram de uma página com imagens quebradas e eu fiquei tão triste...

Foi aí que lembrei do que fiz com a [Awesome SVG](https://github.com/willianjusten/awesome-svg) e a [Awesome Audio Visualization](https://github.com/willianjusten/awesome-audio-visualization), que são duas listas de links que tenho no Github. Lá eu uso o [awesome bot](https://github.com/dkhamsing/awesome_bot), que pega todas as urls da lista e vai testando uma a uma. E aí resolvi fazer uma solução para o meu blog também.

## Htmlproofer

O [Html Proofer](https://github.com/gjtorikian/html-proofer) é o cara responsável por rodar todo o meu site em busca dos links/imagens quebrados, mas não só isso, ele faz várias outras verificações como checar se o site tem favicon, se scripts externos estão carregando corretamente. E tudo isso de forma bem fácil e customizável, vai lá no github do projeto e veja como é simples.

Aqui abaixo fica o script simples que eu fiz com ele:

```bash
#!/usr/bin/env bash
set -e # halt script on error

echo 'Testing links...'
bundle exec jekyll build
bundle exec htmlproofer ./_site --http-status-ignore "0,999"
```

Eu precisei usar o `--http-status-ignore "0,999"`, pois alguns sites com latência mais alta (mas que estão funcionando) acabavam retornando 0 ou 999, então só para evitar mostrar erros falsos, usei essa opção.

## Travis CI

O segundo carinha que utilizei foi o [Travis CI](https://travis-ci.org/). Ele é um CI simples e que funciona muito bem com projetos open source, basta criar um arquivinho e tudo passa a funcionar.

Eu criei um arquivo `.travis.yml` no meu repositório com o seguinte:

```yml
language: ruby
rvm:
  - 2.3.1

before_script:
  - chmod +x testlinks.sh

script: ./testlinks.sh

branches:
  - master
  - drafts

env:
  global:
    - NOKOGIRI_USE_SYSTEM_LIBRARIES=true # speeds up installation of html-proofer
```

O `HtmlProofer` e o `Jekyll` são em Ruby, então por isso eu defini o ambiente como de ruby. O `before_script` serve para rodar coisas que são necessárias antes do meu teste principal. No caso eu mudo a permissão para execução do `testlinks.sh`, assim a máquina consegue rodar sem problemas.

Depois eu mando executar o script, que basicamente gera os arquivos do Jekyll e depois roda o HtmlProofer para verificar tudo. Eu também defino os branches `master` e `drafts`, que são os que utilizo no meu blog. Também defino uma variável global, só para a instalação do Htmlproofer ser mais rápida.

## Nightli.es

Por último, mas não menos importante, eu utilizo o [Nighli.es](https://nightli.es/) para criar builds noturnas todos os dias. Assim toda noite o Travis roda os testes e me reporta se algum link tiver quebrado. Isso vai me garantir que o meu blog sempre está funcionando direitinho e bonito, sem links/imagens quebradas!

## Outras ferramentas

Vocês podem falar:

> Ahhh, mas eu num uso Ruby. Ruby é lento, Ruby é aquilo, Ruby num sei o que...

Então tudo bem, existem várias ferramentas do gênero em várias linguagens e até mesmo para quem não sabe programar:

- [Broken-link-checker em JS](https://github.com/stevenvachon/broken-link-checker)
- [Um site para verificar os links para você](https://www.deadlinkchecker.com/)

## Conclusão

É isso aí pessoal, mais um post simples, mas importante para termos sites funcionais e performáticos, afinal de contas, se a imagem não estiver quebrada, não vamos ter demora na resposta da requisição. Além disso, ninguém quer clicar num link que leva para 404 né?

E ah, se você tem alguma dúvida ou sugestão de post, faça nos comentários daqui do blog, estou sempre atento!
