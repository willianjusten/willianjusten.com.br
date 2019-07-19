---
layout: post
title: 'Adicionando Night Mode no seu site'
date: 2018-03-27 00:35:52
image: '/assets/img/night-mode.png'
description: 'Aprenda como criar um botão para mudar as cores do seu site com JS puro.'
main-class: 'js'
color: '#D6BA32'
tags:
  - js
  - theme
categories:
twitter_text: 'Aprenda como criar um botão para mudar as cores do seu site com JS puro.'
introduction: 'Aprenda como criar um botão para mudar as cores do seu site com JS puro.'
---

## Introdução

Fala pessoal, o post de hoje faz parte de um conjunto de mudanças e melhorias que venho fazendo no blog. E no caso, esse pedido foi feito por não **um**, mas vários usuários do blog.

> Pelo amor de deus, bota um modo noturno no seu blog, esses posts gigantes cansam demais os olhos depois de um tempo. - Usuário Amado

Pensando nisso, eu venho anunciar que eu fiz o modo! E você já pode clicar na lâmpada ali para mudar entre um modo e outro. E vou descrever muito muito rapidinho o que eu fiz para mudar. É uma base super simples, então você não tem como se perder.

## Como funciona a mudança de cores?

Basicamente o que você precisa fazer é alterar as cores das fontes/fundo no CSS. E para isso, você precisa criar um `modificador` que vai sobrepôr as cores do tema "light", que é o tema claro. Você pode ver no meu [_night-mode.styl](https://github.com/willianjusten/willianjusten.com.br/blob/ecde3bd2481c24889932e1abaa5900a68cdc7769/src/styl/_night-mode.styl), que eu basicamente tenho uma classe `.night-mode` que é responsável por fazer esse `overwriting` das propriedades. E lá eu defini as duas cores principais para o texto (`text-color`) e para o fundo (`bg-color`), então foi bem simples ir passando essas variáveis em tudo.

## E para ativar os modos?

Para ativar os modos, nós vamos usar nosso lindo Javascript, que nos permite tudo! Primeiramente nós precisamos criar um input/botão que vai ser onde iremos clicar para ficar mudando entre um e outro.

```html
<input id="night-mode" class="lamp" type="checkbox" aria-label="night-mode" />
```

Repare que eu coloco um id ali que é `#night-mode`, pois é ele que eu vou usar para ativar/desativar o nosso querido night mode. Como disse na primeira etapa, nós precisamos adicionar o modificador ao html, para que ele comece a fazer a troca de cores certo? Então no Javascript podemos fazer assim:

```js
const nightMode = document.querySelector('#night-mode')

// ao clicar mudaremos as cores
nightMode.addEventListener('click', () => {
  // adiciona a classe `night-mode` ao html
  document.documentElement.classList.toggle('night-mode')
})
```

E prontinho, só com isso, a gente já fez o night mode ativar e desativar, toda vez que clicamos nele! Mas podemos ir além!

## Salvando o estado do usuário

Depois que o usuário escolhe o tema, nós queremos que esse tema persista por todas as páginas, até que o usuário decida voltar ao outro tema. Para isso nós vamos usar o bom e velho `localStorage` para guardar esse dado para nós, assim a gente faz uma checagem e se tiver o night mode salvo, já habilitamos ele. O script vai ficar assim:

```js
// pegamos o valor no localStorage
const nightModeStorage = localStorage.getItem('gmtNightMode')
const nightMode = document.querySelector('#night-mode')

// caso tenha o valor no localStorage
if (nightModeStorage) {
  // ativa o night mode
  document.documentElement.classList.add('night-mode')

  // já deixa o input marcado como ativo
  nightMode.checked = true
}

// ao clicar mudaremos as cores
nightMode.addEventListener('click', () => {
  // adiciona a classe `night-mode` ao html
  document.documentElement.classList.toggle('night-mode')

  // se tiver a classe night-mode
  if (document.documentElement.classList.contains('night-mode')) {
    // salva o tema no localStorage
    localStorage.setItem('gmtNightMode', true)
    return
  }
  // senão remove
  localStorage.removeItem('gmtNightMode')
})
```

Show de bola! Agora o tema tá persistindo em todos os posts de forma bem legal!

## Mudando a cor na barra de navegação (Android)

Se você estiver usando um Android, vai notar que a barrinha superior vai mudando a cor de acordo com o post e não queremos isso no night mode, nós queremos que fique escuro para combinar com o tema, para isso, precisamos fazer um pequeno ajuste. E teremos o script final como o abaixo:

```js
// pegamos o valor no localStorage
const nightModeStorage = localStorage.getItem('gmtNightMode')
const nightMode = document.querySelector('#night-mode')
// pega o valor do meta tag
const metaThemeColor = document.querySelector('meta[name=theme-color]')

// caso tenha o valor no localStorage
if (nightModeStorage) {
  // ativa o night mode
  document.documentElement.classList.add('night-mode')
  // pinta o theme color na meta tag
  metaThemeColor.setAttribute('content', '#2b2b2b')
  // já deixa o input marcado como ativo
  nightMode.checked = true
}

// ao clicar mudaremos as cores
nightMode.addEventListener('click', () => {
  // adiciona a classe `night-mode` ao html
  document.documentElement.classList.toggle('night-mode')

  // se tiver a classe night-mode
  if (document.documentElement.classList.contains('night-mode')) {
    // salva o tema no localStorage
    localStorage.setItem('gmtNightMode', true)
    // pinta o theme color na meta tag
    metaThemeColor.setAttribute('content', '#2b2b2b')
    return
  }
  // senão remove
  localStorage.removeItem('gmtNightMode')
  // senão bota a cor original
  metaThemeColor.setAttribute('content', '#005f97')
})
```

## E o visual do input?

Vocês podem ver que no meu blog eu botei uma lâmpada, mas você podem fazer qualquer coisa e qualquer estilo. Eu criei um post ensinando como [Criar um switch button com CSS](https://willianjusten.com.br/criando-um-switch-button-com-css/), onde eu ensino essa técnica de usar o atributo `:checked` para mudar o css. Dá uma lida para aprender, mas é super super simples!

## Conclusão

Bom galera, esse é o post, espero que tenham gostado, foi bem simples e básico. A realidade é só que eu queria avisar a vocês que eu tinha adicionado essa feature e aí por isso resolvi criar esse post. Se curtiu, comenta/compartilha! E aceito críticas, sempre ajudam a melhorar o blog para vocês!
