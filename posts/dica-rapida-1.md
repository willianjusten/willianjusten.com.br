---
layout: post
date: 2015-01-07T23:31:05.000Z
title: "Dica rápida #1"
description: Detalhes fazem a diferença, vamos falar sobre Favicons, Touch Icons
  e Tile Icons e como eles fazem a diferença.
main-class: dev
tags:
  - dicarapida
---

Já que estou participando da campanha do [Fernando Daciuk](http://blog.da2k.com.br/) que é o **#1postperday**, resolvi criar uma outra hashtag, que será a **#dicarapida**. Como o próprio nome diz, serão dicas rápidas, mas que as vezes a gente não faz ou esquece ou ninguém falou por ser "bobo".

A minha ideia também será postar coisas em um nível também iniciante, assim ajuda uma galera nova, que está começando agora.

## Favicons

![Favicons](/assets/img/dica-rapida-1/favicons.png)

Pequenos e bastante simples, mas que já ajudam a identificar um site sem necessidade de mais nenhuma informação. Aposto que você sabe todos os sites que estão abertos na imagem acima =)

Antigamente os favicons eram somente na extensão `.ico` e possuiam um tamanho padrão de `16x16`. E a partir da windows 7, com a possibilidade de se adicionar sites na barra de tarefas o tamanho foi passado para 3 versões:

- `16x16`: tamanho na barra de endereço
- `32x32`: ícone na barra de tarefas ou atalhos
- `24x24`: favorito no browser

Mas se você acha que irá precisar criar então 3 arquivos diferentes, se enganou, a extensão `.ico` permite ter várias dimensões em um mesmo arquivo. E se você quiser gerar automático, tem esse [site aqui](http://www.favicomatic.com/).

### E como faço isso funcionar?

Basta adicionar a seguinte `meta tag` no `head`:

```html
<link rel="shortcut icon" href="/img/icons/favicon.ico" type="image/x-icon" />
```

Algumas pessoas apoiam utilizar um formato mais adaptável que é o `png` usando as novas meta tags com size, como mostrado no código abaixo:

```html
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
```

### Mas se pode usar png, por que você vem me falar para usar o formato .ico que é velho??

Simples! Nesse caso, eu digo que em time que se está ganhando não se mexe. É utilizado já deve ter uns 10 anos e funciona com suporte para browser novo, velho, ATÉ NO IE FUNCIONA! Então deixa eles felizes com um ícone pelo menos.

## Touch Icons

Com o advento dos devices da apple, ela decidiu criar meta-tags para lerem ícones de diferentes tamanhos e formatos, possibilitando uma qualidade maior quando o ícone fosse colocado na _home screen_ ou favoritado no safari.

De acordo com as versões do iOS e o aparelho, temos os seguintes tamanhos:

![Tabela de tamanhos dos ícones da Apple](/assets/img/dica-rapida-1/favicons-table.png)

####JESUS, MARIA, JOSÉ, É IMAGEM PARA CARAMBA! NÃO VOU FAZER ISSO!

Relaxa amigo, existem geradores na net, esses dois abaixo são muito bons:

- [Real Favicon Generator](http://realfavicongenerator.net/)
- [Iconogen](http://iconogen.com/)

E como faço para os apps lerem isso aí?

```html
<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
<link
  rel="apple-touch-icon"
  sizes="114x114"
  href="/apple-touch-icon-114x114.png"
/>
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
<link
  rel="apple-touch-icon"
  sizes="144x144"
  href="/apple-touch-icon-144x144.png"
/>
<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
<link
  rel="apple-touch-icon"
  sizes="120x120"
  href="/apple-touch-icon-120x120.png"
/>
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
<link
  rel="apple-touch-icon"
  sizes="152x152"
  href="/apple-touch-icon-152x152.png"
/>
```

E prontinho, olha que legal, já funciona!!

![Imagem em um ipad](/assets/img/dica-rapida-1/icon-apple-circle.png)

## Tile Icons

Com o desenvolvimento do windows 8 e do surface, agora temos aquela interface flat e os ícones também mudaram. Para se adaptar a isso, a M\$ também resolveu criar suas meta tags e passou a definí-las como `tiles`.

Para fazer funcionar, basta adicionar as seguintes linhas no head:

```html
<meta name="msapplication-TileColor" content="#0562DC" />
<meta name="msapplication-TileImage" content="/mstile-144x144.png" />
```

## Conclusão

Pequenos detalhes fazem grandes diferenças e passam de simples sites feitos por sobrinhos, para sites profissionais. Se liga, faz um trabalho legal e será recompensado.

Fica aqui a primeira #dicarapida, quer que eu fale de algum assunto? Manda para [@willian_justen](https://twitter.com/Willian_justen) com a hashtag ou comenta aqui embaixo.
