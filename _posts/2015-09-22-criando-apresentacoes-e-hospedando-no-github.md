---
layout: post
title: "Criando apresentações e hospedando no github"
date: 2015-09-22 13:36:35
image: '/assets/img/'
description: "Aprenda a criar slides para suas apresentações e hospedá-las online no github pages."
tags:
- js
- slides
- github
categories:
twitter_text: "Aprenda a criar slides para suas apresentações e hospedá-las online no github pages."
---

## Introdução

Caramba, como fazia tempo que eu não postava nada aqui. O mês passado foi muito apertado, participei de vários eventos, tanto palestrando como assistindo e por isso não conseguia muito tempo para escrever. Um pouco também foi devido a preguiça...pois é, vergonha né? =/

Bom, para não perder o costume, hoje estou ouvindo uma playlist bem calminha e legal que se chama [Your favorite Coffeehouse](https://open.spotify.com/user/spotify/playlist/4BKT5olNFqLB1FAa8OtC8k), já tinha passado o olho nela, mas resolvi aproveitar o climinha de Petrópolis para ouvir.

O post de hoje será bem simples, mas que me salvou bastante nesse mês, que como eu disse, precisei fazer várias apresentações.

### Por que não usar o Keynote, PowerPoint ou outro similar?

Bom, eu não tenho as melhores aptidões em design e confesso que ver aquele monte de opções escondidas não me deixa muito confortável. Outra questão é que eu queria poder fazer meus slides em qualquer computador e de qualquer lugar, se eu usasse um desses programas, eu seria obrigado a escrever só em máquinas que tivessem esses programas...

Sempre que eu vou a eventos, me interesso em ter os slides depois para poder ler com mais calma e até mesmo fazer testes quando são códigos expostos ali. Então eu queria disponibilizar meus slides de forma fácil também, sendo assim, eu vi que realmente precisava de algo web.

Eu já havia visto um padrão de algumas palestras e todas elas eram web, fui caçar melhor e então encontrei o amado [RevealJS](http://lab.hakim.se/reveal-js/). Junto com ele achei alguns outros, como o [Slides](http://slides.com/), que é mantido pela galera do RevealJS, só que possui uma UI para poder montar os slides. Também encontrei o [Spectable](http://spectacle.surge.sh/#/), que foi baseado no RevealJS, mas feito todo em React <3 (preciso testá-lo depois!)

## Coisas legais que o RevealJS tem!

Muitos me perguntavam, mas poxa, o Keynote tem várias coisas legais e você vai acabar perdendo... Só que não, o RevealJS tem tudo que o Keynote tem e ainda melhor! Vou colocar uma listinha de coisas muito maneiras que ele tem:

- Slides agrupados, tendo uma navegação vertical no mesmo assunto
- Suporte a Markdown (quem me conhece sabe que amo escrever assim)
- Permissão de exportar em PDF
- Notas do Editor em tela separada + countdown para saber o tempo que já passou
- Sintaxe colorida para código <3
- Vários e vários plugins! 

## Sobre o RevealJS

A documentação dele se encontra [aqui](https://github.com/hakimel/reveal.js) e é muito muito fácil de entender e usar. Eu vou passar por alguns detalhes importantes e básicos para construção dos slides.


### Markup

O Markup inicial precisa seguir um padrão, que é:

{% highlight html %}
<div class="reveal">
    <div class="slides">
        <section>Slide Horizontal Simples</section>
        <section>
            <section>Slide Veritical 1</section>
            <section>Slide Veritical 2</section>
        </section>
    </div>
</div>
{% endhighlight %}

Para iniciar uma apresentação, precisamos de uma `div` com a classe `reveal`, que deverá englobar todos os slides. A seção de slides deverá ficar dentro de uma `div` com a classe `slides`. Agora cada `section` dentro dessa organização já será um slide.

### Slide backgrounds

O legalzão do RevealJS é que eu posso colocar qualquer coisa como fundo do meu slide, vídeos, sites, cores e **GIFS**! E é fácil fácil de fazer funcionar:

{% highlight html %}
<!-- fundos com cores -->
<section data-background="#ff0000"></section>

<!-- fundos com imagens -->
<section data-background="image.png"></section>

<!-- fundos com imagens em tamanho definido e se repetindo -->
<section data-background="image.png" data-background-size="100px" data-background-repeat="repeat"></section>

<!-- vídeos em loop! -->
<section data-background-video="video" data-background-video-loop></section>

<!-- um site dentro do próprio slide! -->
<section data-background-iframe="https://willianjusten.com.br"></section>
{% endhighlight %}



