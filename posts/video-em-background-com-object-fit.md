---
layout: post
title: 'Video em Background com Object-fit'
date: 2016-06-13 13:01:32
image: '/assets/img/video-bg/main-video.png'
description: 'Como criar os famosos heros com vídeos full em background usando o object-fit.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - frontend
categories:
twitter_text: 'Como criar os famosos heros com vídeos usando o object-fit.'
introduction: 'Como criar os famosos heros com vídeos full em background usando o object-fit.'
---

## Introdução

Você com certeza já deve ter acessado algum site que tinha um header gigante com um vídeo tocando por trás, essa é uma das maiores tendências dos últimos tempos. Você pode ver em alguns sites como [airbnb](https://www.airbnb.com.br/), [designhotels](https://www.designhotels.com/original-experiences), [eva](http://www.eva.co/) e outros vários por aí.

Enquanto vou escrevendo esse post, vou ouvindo uma das bandas brasileiras que mais tenho ouvido e que tem feito bastante sucesso lá fora. Se você chutou [Far From Alaska](https://open.spotify.com/artist/1ztNPX8z169arfAY0TWFLB), ponto para você!

## Demo

Se você quer pular tudo e só quer ver como a Demo ficou, só abrir [esse link aqui](https://labs.willianjusten.com.br/video-background/).

## Técnica com Object-fit

Uma propriedade que eu sempre achei muito legal era a `background-size: cover`, em que eu faço um background preencher todo o container que eu quero. Essa propriedade é super legal, mas só se aplica em `background` e eu queria usar em tudo. Para isso veio o `object-fit`!

Com o `object-fit` eu consigo usar também em imagens e **vídeos**, fazendo esses elementos preencherem todo o container que eu definir e ainda mantendo o `aspect ratio`. E como faço isso?

Primeiro criaremos nosso markup, bem simples, contendo só o `wrapper` que é onde queremos que o vídeo preencha todo e a nossa tag de vídeo.

```html
<div class="wrapper">
  <video autoplay loop poster="img/bg-course.png">
    <source src="video-full.mp4" />
  </video>
</div>
```

As opções em vídeo são `autoplay` para que o vídeo inicie sozinho, `loop` para que ele fique repetindo e `poster` onde defino uma imagem padrão, para os momentos que o vídeo ainda não foi carregado ou que deu erro. Dentro de `source`, podemos colocar o vídeo em diferentes formatos, veja a [tabela de compatibilidade](http://caniuse.com/#search=video) para ver quais formatos você vai precisar utilizar.

Depois de criado o markup, vamos definir nossos estilos. Criamos um `wrapper` onde o nosso vídeo vai ficar, eu estou usando as famosas [viewport units](http://desenvolvimentoparaweb.com/css/unidades-css-rem-vh-vw-vmin-vmax-ex-ch/), para poder definir a altura toda da tela. Também coloco um `overflow: hidden` para evitar que algo passe para fora do container.

```css
.wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
```

E aí para o vídeo, para que ele ocupe toda a tela, vamos colocar:

```css
.wrapper video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```

O `object-fit: cover` fará com que o vídeo preencha a tela sem perder o seu aspecto. Dentro de `object-fit` temos outras opções também como `contain`, que fará com que o vídeo caiba dentro do espaço sem distorcer, mas podendo ter espaços vazios. E a opção `fill`, que irá preencher tudo, mas irá distorcer a imagem/vídeo.

Feito isso, podemos criar outras coisas, como um conteúdo na parte inferior, colocar chamadas na frente do vídeo, filtros, enfim, aí vai da sua criatividade =)

Se ainda não viu a [demo](https://labs.willianjusten.com.br/video-background/)

## Conclusão

Post bem curtinho, mas mostrando uma tendência bastante utilizada, espero que tenham gostado. Você já fez algum site com esse tipo de ideia? Coloca nos comentários aí. Tem alguma dúvida? Manda aqui também. E se puder compartilhe ali abaixo, ajuda bastante =D
