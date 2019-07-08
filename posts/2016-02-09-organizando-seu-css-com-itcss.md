---
layout: post
title: "Organizando seu CSS com ITCSS"
date: 2016-02-09 14:08:54
image: '/assets/img/itcss/itcss-cover.png'
description: 'Organizar CSS em larga escala é difícil, mas não precisa ser tão assim. Aprenda uma arquitetura para te auxiliar nisso.'
main-class: 'css'
color: '#2DA0C3'
tags:
- css
- metodologia
- frontend
categories:
twitter_text: 'Aprenda a organizar seu CSS de uma forma fácil e prática'
introduction: 'Organizar CSS em larga escala é difícil, mas não precisa ser tão assim. Aprenda uma arquitetura para te auxiliar nisso.'
---

## Introdução

Fala aí pessoal, no [último post](https://willianjusten.com.br/falando-sobre-rscss/) falei um pouco de uma metodologia para nomear componentes e como escrever suas propriedades. Mas só isso não serve para manter um projeto em larga escala. Precisamos de uma arquitetura para organizar melhor todos os outros arquivos, que não são necessariamente componentes.

Para escrever esse post, estou ouvindo uma playlist bem calminha chamada [Tarde Acústica](https://open.spotify.com/playlist/6w7C5ACMfEW4nudQuVfKPC?si=zmq5uL4iRJmijlsnNVV06Q), acho que o Spotify me recomenda essa lista há milênios, já ouvi umas vezes, mas tá com umas músicas novas legais. No meio do post eu cansei, tava me deixando mais lento, então resolvi trocar para [Eminem](https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR), que fazia um tempo que não ouvia, olha, te falar que rendeu mais xD

Prometo que o post de hoje será menor que o passado, mas não menos importante. A intenção de escrever esse post é unir as duas metodologias aqui no meu blog, assim fica fácil até para eu buscar mais informações depois. Ele será fortemente baseado na [apresentação do criador do itcss](https://speakerdeck.com/dafed/managing-css-projects-with-itcss).

**Obs.:** devido a muitos pedidos e insistências, fiz uma atualização no blog, adicionando um `target="_blank"` em todos os links externos, agora você não vai correr o risco de sair do blog enquanto estiver lendo.

## Problemas comuns do CSS

O CSS é uma linguagem declarativa, que trabalha num escopo global e não possui muitas lógicas e controles de fluxo. Isso significa que podem haver vários e vários conflitos de acordo com a forma que você escreve. Na maioria das vezes, alguma propriedade já foi atribuída numa outra regra e o que você faz é aumentar a especificidade para poder mandar naquela regra. Isso não é legal, pois pode acabar engessando muito o projeto, tendo que aumentar mais e mais as especificidades das regras, cada vez que bater num conflito.

![Gráfico mostrando os problemas do css como especificidade](/assets/img/itcss/css-problemas.png)

Você pode chegar e falar "Ah, mas ontem você mostrou o RSCSS, resolve tudo isso!". Então meu jovem, de fato ele vai te ajudar com os componentes, mas e as propriedades mais globais e distribuídas? E como você vai organizar as variáveis? Onde vai colocar os mixins e placeholders? Isso mesmo, para resolver essas coisas, é necessário algo um pouco mais abstrato para organizar a arquitetura de fato.

## Nasce o ITCSS

A ideia do ITCSS é você montar uma arquitetura que consiga mitigar esses pequenos problemas do CSS. Seu nome por extenso é **I**nverted **T**riangle **CSS**. Que envolve basicamente visualizar todo o CSS em camadas, que montadas formam um triângulo de cabeça para baixo. Essa organização hierárquica ajuda a organizar o CSS da forma mais efetiva, diminuindo conflitos e sobrescritas.

Pensando inicialmente no gráfico acima, a ideia é que as mudanças de especificidade sejam mais suaves e com menor número de picos, ficando assim:

![Gráfico mostrando a especificidade usando ITCSS](/assets/img/itcss/itcss.png)

Conforme você pode ver no gráfico acima, já temos as divisões, que são a base do ITCSS. Transportando isso para o triângulo invertido, vamos colocar os elementos de mais baixa especificidade na parte superior e quanto maior a especificidade, na parte inferior.

![Triângulo do ITCSS](/assets/img/itcss/triangle.png)

## Mas o que são essas divisões?

Essas camadas são organizadas da mais genérica até a mais específica. E estas são:

### Settings

Essas são as configurações básicas da sua arquitetura. Em geral, são as variáveis globais que vão definir cores, espaçamentos e outras configurações desejadas para o funcionamento do seu framework em si. Perceba que nada aqui será gerado como CSS final, sendo somente utilizado na criação.

```scss
$color-ui: #BADA55;
$spacing-unit: 10px;
```

### Tools

É o lugar onde você vai guardar seus mixins e funções necessárias para a construção de seus layouts. Pode ser qualquer coisa, desde mixins de font-face, até mixins de animações, etc. Repare que aqui, nada é gerado diretamente como CSS final também.

```scss
@mixin font-brand() {
    fotn-family: "UI font", sans-serif;
    font-weigth: 400;
}
```

### Generic

Essa é a primeira camada que vai de fato aplicar CSS final e ela é destinada para as propriedades mais genéricas e com a menor especificidade possível. Em geral, é onde colocamos resets, `box-sizing`, etc.

```scss
* {
    box-sizing: border-box;
}
```

### Base

Aqui ficarão as estilizações básicas, a última camada que veremos seletores em tags diretamente. Portanto aqui ficarão estilos para os headings `h1-h6`, `blockquotes`, `a`, `buttons`, etc. **Mas lembre-se são estilizações BÁSICAS**, nada de estilizar tudo aqui!

```css
ul {
    list-style: square outside;
}
```

### Objects

Seguindo os princípios de OOCSS (CSS Orientado a Objetos), aqui é onde iremos ter nossos pequenos "objetos", que nada mais são que pequenos pedaços da interface, em geral, padrões que se repetem por todo o site e que podem ter ou não uma camada visual por cima.

Aqui é onde fazemos os padrões de botões, listas, paineis, etc. Nesse momento, só é permitido também o uso de classes. Seguindo o padrão do RSCSS, teríamos algo assim:

```scss
.base-list {
    margin: 0;
    padding: 0;
    list-style: none;

    > .item {
        padding: $spacing-unit;
    }
}
```

### Components

Aqui como o nome já diz, teremos nossos componentes já mais específicos. De acordo com o RSCSS, aqui que vamos jogar todos aqueles componentes/elementos criados. Enquanto nos objetos nós tentamos abstrair o máximo possível, para ter muitos objetos reutilizáveis e genéricos, aqui nós vamos ser específicos ao criar os componentes, mas respeitando as regras do RSCSS de especificidade e também não colocando positions ou outras propriedades que engessem muito o componente a ponto dele não ser reutilizável.

Normalmente, aqui ficarão listas específicas como de produtos, cards específicos como aqueles incluindo imagens, etc. Seguindo o RSCSS, teríamos algo como:

```scss
.products-list {
    @extend font-brand();
    border-top: 1px solid $color-ui;

    > .item {
        border-bottom: 1px solid $color-ui;
    }
}
```

### Trumps

Por final temos Trumps, que no RSCSS também são chamados de Helpers. Essa camada é a responsável pela maior especificidade de todas, tendo seus componentes até com `!important`. Mas não se engane e já comece a me xingar falando "ahhhh, ele usa important, que nojo.", calma. A ideia dos trumps é que eles sejam usados para classes reativas, comumente aquelas que queremos que aconteça não importa o que aconteça, o clássico `.hidden`. Faz todo sentido que para esses casos, o `!important` seja utilizado.

É importante que você não confunda a existência dessa camada e saia colocando tudo aqui, essa camada somente deverá ser utilizada em casos que não vá afetar a estrutura da página.

```css
.hidden {
    display: none !important;
}
```

## Coisas para se prestar atenção

Depois de tudo isso, tem algumas coisas que você deve prestar atenção na arquitetura, como:

- A especificidade vai crescendo linearmente e lentamente de camada a camada.
- Progressivamente adicionamos estilos, **nunca removemos**.
- Cada camada é mais detalhada e explícita que a anterior.
- Se você cria um objeto genérico, ele pode ser extendido/reutilizado, aproveite isso.
- Tudo que você cria tem um lugar específico para ficar.
- Trabalhando assim, diga adeus aos problemas de especificidade.

## Extra

Se você quer fazer um teste rápido de alguma coisa, seja uma nova cor para os elementos ou etc, você pode criar uma camada entre `components` e `trumps`.

![Triângulo do ITCSS](/assets/img/itcss/theme.png)

Colocando ali, você garante que ele será lido por último no CSS e consequentemente será o mandatório nas modificações. Essa técnica é bastante utilizada na [Booking.com](http://www.booking.com/), que é famosa por fazer muitos testes A/B.

## Conclusão

Bom galera, com isso eu fecho o básico para termos um bom padrão de escrita e arquitetura de nosso CSS. Espero que tenha sido útil para vocês, assim como foi para mim (sim, eu estudei bastante junto). Qualquer dúvida ou comentário, não deixem de fazer aqui ou nas redes sociais.
