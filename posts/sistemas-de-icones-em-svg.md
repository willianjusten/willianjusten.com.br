---
layout: post
title: '#6 - Sistemas de Ícones em SVG'
date: 2015-03-06 19:33:23
image: '/assets/img/svg-icons/main.png'
description: 'Como usar ícones em SVG e por que ele é bem melhor que outras alternativas?'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - icons
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Como usar ícones em SVG e por que ele é bem melhor que outras alternativas? '
introduction: "Como dizem 'Uma imagem vale mais que mil palavras' e isso é um fato. Muitas vezes conseguimos simbolizar uma ação apenas com uma imagem. Então vamos aprender a usar ícones em SVG."
---

## Índice da série

- [#1 - Por que usar SVG?](https://willianjusten.com.br/por-que-usar-svg/)
- [#2 - Como usar SVG](https://willianjusten.com.br/como-usar-svg/)
- [#3 - Onde Baixar SVG](https://willianjusten.com.br/onde-baixar-svg/)
- [#4 - A Estrutura do SVG](https://willianjusten.com.br/a-estrutura-do-svg/)
- [#5 - Atomic Design no SVG - g, use, defs, symbol](https://willianjusten.com.br/atomic-design-no-svg/)

## Introdução

Como dizem "Uma imagem vale mais que mil palavras" e isso é um fato. Muitas vezes conseguimos simbolizar uma ação apenas com uma imagem. Pensando nisso, os designers desde o início da criação de interfaces resolveram utilizar símbolos para isto e na web não iria ser diferente. Muito provavelmente você já se pegou vendo um ícone de X para fechar alguma coisa ou até ícones mais "modernos", como o famoso `Hamburguer Menu`.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="Alayb" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/Alayb">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Por que usar SVG e não outros tipos?

Bom, primeiro precisamos saber quais são as formas de se utilizar ícones na web:

### Image Sprites

Seria um conjunto de imagens dentro de um mesmo arquivo, sendo cada imagem identificada pela sua posição `x` e `y` dentro do arquivo.

**Vantagens**

- Permite uso de imagens coloridas

**Desvantagens**

- Não é escalável
- Não há opção de mudar cores
- Peso em Kb considerável

### Font Icons

Talvez seja o mais utilizado dos tipos. Consiste em criar um tipo de fonte contendo os icones desejados e estes identificados através de codigos unicode. Em geral, são adicionados via css ao pseudo-elemento `:before` ou `:after`.

**Vantagens**

- Escalável
- Permite modificar cor (somente uma cor por vez! Ainda é monocromático)

**Desvantagens**

- Maior número de requisições normalmente.
- Enquanto não carrega a fonte, bug de aparecer um quadrado é bem comum.

![Imagem mostrando o Bug que o font-icon tem quando demora a carregar ou não é compatível](https://i.stack.imgur.com/vZhku.png)

### SVG icon

Basicamente um ícone desenhado no illustrator e exportado para o formato SVG.

> Ahhh, mas eu não sei desenhar não, para icon font eu baixo o [Font Awesome](https://fontawesome.com/) e vem tudo pronto. - Você mesmo!

Beleza campeão, mas com SVG você pode fazer o mesmo e até melhor, se quiser, dá uma olhada nesse post, [onde baixar SVG](https://willianjusten.com.br/onde-baixar-svg/) e você irá ver que tem muita coisa legal =)

**Vantagens**

- Escalável
- Múltiplas Cores
- Mais leve de todos (inline com gzip)
- Acessibilidade
- Melhor controle via CSS
- Mais semântico

**Desvantagens**

- Certa incompatibilidade com IE8- (pode usar fallback! \o/)

Bom, vendo essa lista, fica claro que ícones em SVG são bem melhores e mais funcionais, está esperando o quê para mudar os ícones nos seus sites e sistemas? Como fazer? Então vamos nessa =)

## Como fazer?

Basicamente existem 3 etapas a serem feitas para se utilizar SVG icons.

- Obter os ícones SVG seja através de um sistema de ícones ou os arquivos feitos por algum designer.
- Adicionar o SVG inline na página em que será usada.
- Chamar o ícone desejado.

Como tudo na prática é melhor, vamos a ela. Vou utilizar o [IcoMoon](https://icomoon.io/) para obter meus ícones SVG.

#### Passo 1.1

Clicar na opção `IcoMoon App`:

![Passo 1](/assets/img/svg-icons/passo-1.png)

#### Passo 1.2

Escolher os ícones desejados ou importar de alguma fonte externa (sim, ele ainda aceita imports!)

![Passo 2](/assets/img/svg-icons/passo-2.png)

#### Passo 1.3

Clicando em `Generate SVG/PNG` conforme indicado no canto inferior esquerdo da imagem anterior irá te levar para uma tela que te permite renomear seus ícones da forma desejada e então baixar um zip contendo os arquivos necessários.

![Passo 3](/assets/img/svg-icons/passo-3.png)

Segue abaixo o conteúdo do zip baixado, indicando os 3 ícones em PNG e em SVG separados e no formato de `defs`, que já é a união de todos os ícones num arquivo só e já utilizando o elemento `defs`, que permite adicionar os ícones, sem renderizá-los diretamente. Eu fiz um post explicando um pouco sobre algumas dessas propriedades do SVG, se não estiver familiriazado, dê uma lidinha no artigo: [#5 - Atomic Design no SVG - g, use, defs, symbol](https://willianjusten.com.br/atomic-design-no-svg/)

![Arquivos](/assets/img/svg-icons/arquivos.png)

#### Passo 2 e 3

Já com os arquivos em mãos, abra o arquivo com as `defs` e inclua em seu projeto. **Dica:** se você utilizar uma linguagem de backend ou até mesmo algo pré-compilado, separe esse arquivo e somente inclua no header do seu projeto. Segue exemplo dos meus [ícones utilizados no blog](https://github.com/willianjusten/willianjusten.github.io/blob/master/_includes/svg-icons.html). Se puder notar, ele está comprimido em apenas uma linha, ficando assim bastante leve, mas esse será um assunto para outro post.

Abaixo segue um dos ícones separados na nossa `defs`:

```html
<symbol id="icon-paperplane" viewBox="0 0 1024 1024">
  <title>paperplane</title>
  <path
    class="path1"
    d="M1009.376 5.12c-5.312-3.424-11.36-5.12-17.376-5.12-6.176 0-12.384 1.76-17.76 5.376l-960 640c-9.888 6.56-15.328 18.112-14.048 29.952 1.216 11.808 8.896 22.016 19.936 26.368l250.368 100.192 117.728 206.016c5.632 9.888 16.096 16 27.424 16.128 0.128 0 0.224 0 0.352 0 11.232 0 21.664-5.952 27.424-15.552l66.464-110.816 310.24 124.064c3.808 1.536 7.808 2.272 11.872 2.272 5.44 0 10.816-1.376 15.68-4.128 8.448-4.736 14.24-13.056 15.872-22.624l160-960c2.080-12.576-3.488-25.184-14.176-32.128zM100.352 664.864l741.6-494.432-539.2 577.184c-2.848-1.696-5.376-3.936-8.512-5.184l-193.888-77.568zM326.048 770.112c-0.064-0.128-0.16-0.192-0.224-0.32l606.176-648.8-516.768 805.184-89.184-156.064zM806.944 947.488l-273.312-109.312c-6.496-2.56-13.248-3.424-19.936-3.808l420.864-652.416-127.616 765.536z"
  ></path>
</symbol>
```

Se notar ele possui um `id`, que será importante para identificá-lo e poder fazer a chamada do mesmo. Ele possui também um `title`, que vai permitir acessibilidade a nossa imagem, facilitando com que cegos consigam entender o que está sendo mostrado. E a `path`, que nada mais é que o desenho em si.

Após definidos os ícones, basta chamá-los onde deseja, a partir do elemento `use`.

```html
<svg class="icon icon-paperplane">
  <use xlink:href="#icon-paperplane"></use>
</svg>
```

A classe dentro da tag `svg` irá servir para auxiliar e modificar propriedades do ícone, como tamanho, cor e etc. E dentro do elemento `use`, iremos fazer uma chamada através do seu link simbólico, onde iremos chamar o ícone pelo seu `id`.

Segue abaixo o nosso exemplo, bastante fácil e prático.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qEMqVK" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/qEMqVK">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Espero que todos tenham entendido, é um processo bem simples, mas que faz todo diferença no trabalho final, vamos sempre lembrar que quanto mais qualidade o nosso projeto tiver, melhor! =)

Se quiser mais links sobre ícones em SVG, veja na [awesome-svg](https://github.com/willianjusten/awesome-svg/blob/master/topics/Icons.md).

Nos próximos posts irei ensinar como estilizar esse ícones, animá-los e fazer várias outras brincadeiras. Se curtiu, compartilha ae! =)
