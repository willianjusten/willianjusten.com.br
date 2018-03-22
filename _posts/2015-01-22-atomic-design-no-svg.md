---
layout: post
title: "#5 - Atomic Design no SVG - g, use, defs, symbol"
date: 2015-01-22 10:00:00
image: '/assets/img/atomic-svg/atomic-svg.png'
description: "Neste artigo iremos saber mais sobre a estruturação de um SVG, seus elementos, suas vantagens e um pouco de Atomic Design."
main-class: 'svg'
color: '#7D669E'
tags:
- svg
- tutorial
categories:
- "O mundo mágico do SVG"
twitter_text: "Atomic Design no SVG! Entendendo o conceito."
introduction: "Neste artigo iremos saber mais sobre a estruturação de um SVG, como usar groups, <use>, <defs> e mais para organizar os elementos, as vantagens disso e um pouco de Atomic Design."
---

## Índice da série

* [#1 - Por que usar SVG?](https://willianjusten.com.br/por-que-usar-svg/)
* [#2 - Como usar SVG](https://willianjusten.com.br/como-usar-svg/)
* [#3 - Onde Baixar SVG](https://willianjusten.com.br/onde-baixar-svg/)
* [#4 - A Estrutura do SVG](https://willianjusten.com.br/a-estrutura-do-svg/)

## Introdução

Primeiro de tudo, aviso que o início deste post será praticamente uma tradução adaptada desse [incrivel post](http://sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/) da [Sara Soueidan](https://sarasoueidan.com/about/), que escreveu tão bem essa parte, que não vi justificativas plausíveis para escrever de outra forma. Claro que tentarei ser um pouco mais simplista com as palavras, para facilitar o entendimento de todos.

Ps.: não é preguiça, é porque acho essa mulher incrível e sou mega fã das grandes contribuições em SVG que ela traz <3

Neste post iremos abordar os elementos que dão uma melhor estruturação ao SVG, nos permitindo agrupar e referenciar partes do SVG dentro do documento, conferindo um código mais limpo, de melhor manutenção e com um código mais legível. É muito importante que prestem atenção a este assunto, já que ele contém a base principal para tudo que será feito e utilizado depois. Começarei utilizando o artigo da Sara como base e finalizarei divagando sobre um conceito que eu venho pensado bastante.

## Agrupando com o elemento `<g>`

O `<g>` vem da palavra *group*. Esse elemento serve para agrupar um conjunto de outros elementos relacionados. Em termos de editores gráficos, como o Adobe Illustrator, o elemento `<g>` tem uma função similar a opção de agrupar objetos. Você também pode pensar no *group* num conceito similar a uma camada nos editores gráficos, visto que a camada é só um grupo de elementos.

O elemento `<g>` agrupa todos os seus descendentes em um só grupo, mesmo que exista outro elemento `<g>` interno a ele. É comum possuir uma `id` para dar nome a todo um grupo e qualquer estilo que for aplicado ao elemento `<g>` será aplicado em seus elementos internos. Isto torna fácil a adição de estilos, transformações, interatividades e até animações em um grupo inteiro de objetos.

Por exemplo, o seguinte pássaro é feito de algumas formas, como `<paths>` e `<circle>`.

![Um pássaro em SVG descontruido, mostrando suas formas basicas](/assets/img/atomic-svg/grouping-bird.svg)

Se você quiser mover o pássaro inteiro de um lugar para o outro no Illustrator, você também irá querer agrupar todos os elementos juntos, para não ter que selecionar cada parte toda vez que quiser mover.

![Agrupando no illustrator](/assets/img/atomic-svg/grouping-in-illustrator.png)

Agrupar elementos no SVG funcionam da mesma maneira. Neste exemplo, nós agrupamos os elementos do corpo, os elementos da cabeça e então unimos os dois grupos em um grupo com a `id` igual a `bird`.

```html
<svg width="1144.12px" height="400px" viewBox="0 0 572.06 200">
    <style>
        svg{background-color:white;}
        #wing{fill:#81CCAA;}
        #body{fill:#B8E4C2;}
        #pupil{fill:#1F2600;}
        #beak{fill:#F69C0D;}
        .eye-ball{fill:#F6FDC4;}
    </style>
    <g id="bird">
        <g id="body">
            <path d="M48.42,78.11c0-17.45,14.14-31.58,31.59-31.58s31.59,14.14,31.59,31.58c0,17.44-14.14,31.59-31.59,31.59
            S48.42,95.56,48.42,78.11"/>
            <path d="M109.19,69.88c0,0-8.5-27.33-42.51-18.53c-34.02,8.81-20.65,91.11,45.25,84.73
            c40.39-3.65,48.59-24.6,48.59-24.6S124.68,106.02,109.19,69.88"/>
            <path id="wing" d="M105.78,75.09c4.56,0,8.84,1.13,12.62,3.11c0,0,0.01-0.01,0.01-0.01l36.23,12.38c0,0-13.78,30.81-41.96,38.09
            c-1.51,0.39-2.82,0.59-3.99,0.62c-0.96,0.1-1.92,0.16-2.9,0.16c-15.01,0-27.17-12.17-27.17-27.17
            C78.61,87.26,90.78,75.09,105.78,75.09"/>
        </g>
        <g id="head">
            <path id="beak" d="M50.43,68.52c0,0-8.81,2.58-10.93,4.86l9.12,9.87C48.61,83.24,48.76,74.28,50.43,68.52"/>
            <path class="eye-ball" d="M60.53,71.68c0-6.33,5.13-11.46,11.46-11.46c6.33,0,11.46,5.13,11.46,11.46c0,6.33-5.13,11.46-11.46,11.46
                C65.66,83.14,60.53,78.01,60.53,71.68"/>
            <path id="pupil" d="M64.45,71.68c0-4.16,3.38-7.53,7.54-7.53c4.16,0,7.53,3.37,7.53,7.53c0,4.16-3.37,7.53-7.53,7.53
                C67.82,79.22,64.45,75.84,64.45,71.68"/>
            <path class="eye-ball" d="M72.39,74.39c0-2.73,2.22-4.95,4.95-4.95c2.73,0,4.95,2.21,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95
                C74.6,79.34,72.39,77.13,72.39,74.39"/>
        </g>
    </g>
</svg>
```

Se você muda a cor de preenchimento do grupo `#body`, a cor de preenchimento de todos os elementos dentro do grupos irão mudar para a cor escolhida. Isto é muito conveniente.

Agrupar elementos é muito útil, não só para própositos organizacionais ou estruturais. É particularmente útil quando você quer adicionar interatividade ou transformações em um gráfico SVG feito de muito elementos. Você pode associar estes elementos em um grupo e definir transformações para mover, redimensionar ou rotacionar todos os elementos juntos, dessa forma as relações espaciais de um para o outro se mantém.

Se você quiser redimensionar o pássaro para duas vezes o seu tamanho, você poderá fazer isso com uma linha de CSS se todos os elementos estiverem no mesmo grupo.

```css
#bird {
    transform: scale(2);
}
```

Agrupar faz a interatividade, em particular, mais conveniente. Você pode colocar eventos de mouse para todo o pássaro e ter a resposta a esses eventos em todo grupo.

O elemento `<g>` tem mais uma importante característica: ele pode ser o seu próprio `<title>` e `<desc>`, que ajudam na acessibilidade aos leitores de tela, e sobretudo faz o código mais legível para os humanos. Por exemplo:

```html

<g id="bird">
    <title>Pássaro</title>
    <desc>A imagem de um pequeno e fofo pássaro verde com o bico laranja.</desc>
    <!-- ... -->
</g>
```

## Reutilizando Elementos com o `<use>`

**Aviso:** preste bastante atenção a esse tópico, pois será um dos mais importantes e utilizados no resto da série.

Muitas vezes, existem elementos que são repetidos no desenho. Se você estiver trabalhando com o Illustrator e você quiser repetir algum elemento no desenho, você vai copiar o elemento e colar aonde quer que fique. Copiar e colar um elemento é muito mais conveniente do que precisar recriar o elemento do zero.

O elemento `<use>` permite você reutilizar elementos existentes, dando uma função similar ao *copia-cola* dos editores gráficos. Ele pode ser usado para reutilizar um elemento único ou um grupo de elementos definido pelo elemento `<g>`.

O elemento `<use>` pega os atributos x, y, altura e largura, e então referencia esse conteúdo utilizando o atributo `xlink:href`. Portanto se você tiver um grupo em algum lugar definido por uma `id` e você quiser reutilizá-lo em algum lugar, você irá colocar essa URI em um atributo `xlink:href` e especificar a posição x e y que o ponto (0,0) desse novo grupo deverá ser movido.

Por exemplo, se nós estivermos criando um outro pássaro no nosso SVG, nós poderemos reutilizar o pássaro existente, da seguinte forma:

```html
<use x="100" y="100" xlink:href="#bird" />
```

Perceba que você pode referenciar qualquer elemento SVG dentro do atributo `xlink:href`, até mesmo se o elemento for de um arquivo externo. O elemento referenciado ou grupo não precisa estar no mesmo arquivo. Essa é uma grande forma de organizar arquivos (por exemplo, você pode ter um arquivo para componentes reutilizáveis) **eu ouvi um Atomic Design irmão?**

Se o pássaro do nosso exemplo, estivesse em um arquivo separado chamado `animals.svg`, por exemplo, nós poderíamos referenciar da seguinte forma:

```html
<use x="100" y="100" xlink:href="pasta-do-arquivo/animals.svg#bird" />
```

Porém, referenciar SVG externo no `<use>` não funciona no IE <s>grandes novidades, browser de bosta</s>. Tem um [artigo](http://css-tricks.com/svg-use-external-source/) do Chris Coyier que fala em detalhes e mecanismos de fallback.

Alguns detalhes sobre o `<use>` que são importantes. Como dito anteriormente a movimentação do novo grupo é feita tomando como referência o ponto superior esquerdo (0,0), o que não foi dito é que essa relação é feita tomando como referência o ponto do objeto original. Como no exemplo abaixo:

```html
<use xlink:href="#bird" transform="translate(100, 100)" />
```

![A copia de um pássaro deslocado 100,100](/assets/img/atomic-svg/bird-reuse.jpg)

O fato de a movimentação ser feita tomando o elemento original como referência não é uma coisa muito boa. Outro pequeno problema é que o elemento copiado pelo `<use>` terá sempre os mesmos estilos que o elemento original, portanto, se rotaciornarmos o elemento original, o elemento copiado também irá rotacionar.

Isso acontece, pois o elemento `<use>` reutiliza um elemento **que já foi renderizado**. Mas e se quisermos definir um elemento sem mostrá-lo inicialmente e então desenhar somente nas posições que queremos e com diferentes estilos? Aí que nasce o mais importante companheiro do `<use>`, o elemento `<defs>`.

## Reutilizando Elementos guardados com o `<defs>`

O elemento `<defs>` pode ser usado para guardar conteúdo que não será diretamente mostrado. Em outras palavras, o elemento `<defs>` é usado para definir elementos sem renderizá-los. Ele guarda esse conteúdo escondido, que pode ser referenciado e mostrado por outros elementos do SVG, o que o torna ideal para conter desenhos reutilizáveis (**olha o Atomic Design sendo pensado novamente**).

Então, utilizando o `<defs>` nós podemos definir um elemento que queremos usar. Esse elemento pode ser qualquer coisa, um grupo de elementos como o pássaro anterior, um recorte, uma máscara ou um gradiente linear. Basicamente, qualquer coisa que queiramos definir e guardar para usar depois, pode ser definido dentro do elemento `<defs>`, e esse elemento irá servir como um *template* para uso futuro. Esse template nunca será renderizado, só as instâncias dele que serão mostrados.

O seguinte exemplo mostra um gradiente SVG sendo definido e então sendo utilizado como preenchimento de um retângulo:

```html
<svg>
    <defs>
        <linearGradient id="gradient">
            <stop offset="0%" style="stop-color: deepPink"></stop>
            <stop offset="100%" style="stop-color: #009966"></stop>
        </linearGradient>
    </defs>

    <rect stroke="#eee" stroke-width="5" fill="url(#gradient)"></rect>
</svg>
```

Definindo o gradiente linear dentro do elemento `<defs>` garante que o gradiente não será renderizado até que ele seja referenciado em algum lugar que seja necessário.

Na seção anterior nós mencionamos 2 problemas do elemento `<use>`:

* A posição do novo elemento ser relativa ao elemento original.
* Os estilos do elemento original não poderem ser modificados nas cópias individuais.

Isso, em adição ao fato que o elemento só pode ser reutilizado se o original já estiver renderizado.

Todos esses problemas podem ser evitados usando o elemento `<defs>`. Não só o objeto original não está renderizado, como quando você quiser reutilizar um elemento dentro do `<defs>`, a posição que você irá especificar será relativa a origem do sistema de coordenadas e não relativo ao elemento original (o que faz mais sentido, já que o elemento original nem está renderizado).

No exemplo seguinte temos uma árvore. A árvore é feita de um caule e um grupo de folhas. As folhas são agrupadas em um grupo com a `id="leaves"`, e então esse grupo é agrupado com o caule em um grupo com `id="tree"`.

```html
<svg width="500.79px" height="200px" viewBox="0 0 500.79 200">
    <style type="text/css">
        #leaves{fill:#8CC63F;}
        #bark{fill:#A27729;}
    </style>
    <g id="tree">
        <path id="bark" d="M91.33,165.51c0,0,4.18-27.65,1.73-35.82l-18.55-25.03l3.01-2.74l17.45,19.87l1.91-37.6h4.44l1.83,24.53
        l15.26-16.35l3.27,4.36l-16.07,19.34c0,0-2.72,0-1.09,19.34c1.63,19.34,3,29.7,3,29.7L91.33,165.51z"/>
        <g id="leaves">
            <path class="leaf" d="M96.97,79.07c0,0-14.92,4.34-23.52-14.05c0,0,19.4-7.98,24.37,11.9c0,0-9.68-3.57-13.07-6.73
                C84.75,70.2,91.82,77.99,96.97,79.07z"/>
            <path class="leaf" d="M74.07,100.91c0,0-15.94-1.51-17.2-22.39c0,0,21.62-0.27,18.83,20.66c0,0-7.92-7.1-9.97-11.41
                C65.73,87.77,69.55,97.92,74.07,100.91z"/>
            <!-- ... -->
        </g>
    </g>
</svg>
```

E teremos uma árvore igual a desenhada abaixo:

![Desenho de uma árvore simples](/assets/img/atomic-svg/defined-tree.jpg)

Se quisermos colocar esse grupo `#tree` em um elemento `<defs>`, a árvore não será mais renderizada.

```html
<svg width="500.79px" height="200px" viewBox="0 0 500.79 200">
    <style type="text/css">
        #leaves{fill:#8CC63F;}
        #bark{fill:#A27729;}
    </style>
    <defs>
        <g id="tree">
            <!-- ... -->
        </g>
    </defs>
</svg>
```

Agora a árvore serve como template. Nós podemos usá-la utilizando o elemento `<use>`, exatamente como faríamos com qualquer elemento. A única diferença nesse caso é que os atributos x e y agora são relativos ao sistema de coordenadas.

Por exemplo, se quisermos criar três cópias dessa árvore e posicioná-las no SVG, e assumindo neste caso que o sistema de coordenadas bate com a largura e altura da viewport, nós teremos o seguinte resultado com este código:

```html
<use xlink:href="#tree" x="50" y="100" />
<use xlink:href="#tree" x="200" y="100" />
<use xlink:href="#tree" x="350" y="100" />
```

![3 árvores identicas deslocadas](/assets/img/atomic-svg/tree.svg)

Como você pode ver na imagem acima, cada uma das árvores foi posicionada relativamente a origem do sistema de coordenadas, que nesse caso é o canto superior esquerdo do SVG.

Quando você usa o `<defs>` para reutilizar o elemento, você pode aplicar diferentes estilos e cores de preenchimento para cada árvore individualmente. Portanto, o `<defs>` é ótimo para criar um *template* mínimo, para que este seja estilizado depois, conforme necessário. **Olha a maravilha do nosso Atomic Design sendo descrito aqui.**

## Agrupando elementos com o `<symbol>`

O elemento `<symbol>` é similar ao elemento `<g>`, já que possibilita uma maneira de agrupar elementos. Porém, ele difere do grupo em duas coisas:

* O elemento `<symbol>` não é renderizado. Ele é similar ao `<defs>` dessa maneira. E só é renderizado quando utilizado.
* O elemento `< symbol>` pode ter sua própria viewBox e preserveAspectRatio. (Ainda não falei detalhadamente sobre eles, mas é importante saber que eles definem o espaço que irá ocupar e comportamento sobre a proporção tomada, respectivamente.)

O `<symbol>` é mais indicado para definir elementos reutilizáveis. E também serve como template para ser instanciado pelo elemento `<use>`. E tendo atributos individuais, como a `viewBox` e o `preserveAspectRatio`, ele pode dimensionar para qualquer local em que for instanciado, deixando ele ainda mais independente, ou seja, mais próximo do **Atomic Design**.

Leu tudo? Entendeu mais ou menos os conceitos de `<g>`, `<use>`, `<defs>` e `<symbol>`? Então como prêmio, veja esse lindo filhotinho, relaxa um pouco, se estiver cansado, levanta, pega um café, dá um andadinha e volta, porque ainda não acabou!! =)

![Cachorrinho filhote abaixado e olhando](/assets/img/atomic-svg/puppy_dog_eyes_cute.jpg)


### Mas como assim Atomic Design? O que é essa bosta? E por que você tanto fala disso?

O [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) é um conceito criado pelo [Brad Frost](https://twitter.com/brad_frost) fortemente influenciado por isso:

> "We're not designing pages, we're designing system of components." - Stephen Hay

Esse pensamento que faz o motor do Atomic Design funcionar, nós não estamos desenvolvendo páginas e sim um sistema de componentes. E esse sistema pode ser dividido em várias partes, de acordo com cada idealizador, o pensamento original possui:

* Átomos
* Moléculas
* Organismos
* Templates
* Páginas

Para entender ainda melhor sobre todos os conceitos, leia o [post do criador Brad Frost](http://bradfrost.com/blog/post/atomic-web-design/).

#### Mas voltando, por que eu estou falando disso no meio de um post sobre SVG?

Como pôde ver durante todo o post, eu bati na tecla da utilização de componentes reutilizáveis, o que o SVG já faz por natureza. Aqui eu vou fazer uma mini mini divagação de alguns conceitos sobre isso e em outros posts, eu vou começar a mostrar claramente esses conceitos.

#### Átomos

> Átomos são as partes básicas. Aplicando em SVG, seriam os elementos básicos como `<circle>`, `<path>`, `<rect>`.

#### Moléculas

> São nas moléculas q/ue as coisas ficam mais interessantes, quando combinamos alguns átomos para formar pequenos grupos. Seria como o grupo de folhas do exemplo da árvore.

#### Organismos

> As moléculas criam esses pequenos grupos, que podem se unir e formar organismos maiores, compostos de várias moléculas. Seria o grupo que contém toda a árvore, tendo como moléculas, o grupo das folhas e o grupo do caule.

#### Templates

> O template seria já a junção de todos os organismos para formar um componente reutilizável e customizável. Seria o nosso `<defs>` ou `<symbol>`,

#### Páginas

> São as instâncias dos templates, já possuindo sua aparência definida e informações reais. Seria o nosso `<use>` chamando um template do `<defs>` já com seus estilos definidos.

Bom, isso é só uma viagem minha, através de alguns conceitos que eu gosto e de algumas conversas que tenho com alguns desenvolvedores. Espero que tenham viajado um pouquinho comigo e curtido um pouco dessa ideia. Nos próximos posts já começarei a pôr tudo isso em prática e aí iremos ver cada vez mais como tudo funciona, parece difícil, mas é moleziiinha =)
