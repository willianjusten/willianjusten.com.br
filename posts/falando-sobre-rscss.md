---
layout: post
title: 'Falando sobre RSCSS'
date: 2016-02-07 18:48:16
image: '/assets/img/rscss/rscss.png'
description: 'Escrevendo CSS sem perder a sanidade. Aprenda uma metodologia que pode salvar muitas dores de cabeça.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - metodologia
  - frontend
categories:
twitter_text: 'Escrevendo CSS sem perder a sanidade.'
introduction: 'Escrevendo CSS sem perder a sanidade. Com essa introdução, Rico St. Cruz o criador chama a atenção de todos sobre uma metodologia melhor para se escrever CSS.'
---

## Índice

- [Introdução](#intro)
- [O que vem a ser o RSCSS?](#oq-vem)
- [Por que usar metodologias?](#por-que)
- [Escrevendo CSS](#escrevendo)
- [Tentando melhorar...](#tentando)
- [E se existisse uma maneira de ter os dois limpos?](#e-se)
- [Trabalhando com RSCSS](#trab-rscss)
  - [1. Tudo é um componente ](#comp)
    - [1.1 Nomeando Componentes](#comp-name)
  - [2. Elementos](#elementos)
    - [2.1 Nomeando elementos](#elementos-name)
    - [2.2 Elementos seletores](#elementos-seletores)
    - [2.3 Múltiplas palavras](#elementos-multiplas-palavras)
    - [2.4 Evite usar tags como seletores](#elementos-evite-tags)
  - [3. Variações](#variacoes)
    - [3.1 Nomeando variações](#variacoes-name)
    - [3.2 Variações nos elementos](#variacoes-elementos)
    - [3.3 Por que usar prefixos com traço?](#variacoes-tracos)
  - [4. Componentes aninhados (nested)](#componentes-nested)
    - [4.1 Variações](#nested-variacoes)
    - [4.2 Simplifique componentes internos](#nested-simplifique)
  - [5. Layouts](#layouts)
    - [5.1 Evite propriedades de posicionamento](#layouts-evite)
    - [5.2 Defina posicionamento nos pais](#layouts-posicionamento)
  - [6. Helpers](#helpers)
  - [7. Estrutura CSS](#estrutura-css)
- [Exemplo](#exemplo)
- [Conclusão](#conclusao)

<h2 id="intro">Introdução</h2>

Hey Hey pessoal! Para não perder o ritmo de carnaval, vamos a mais um post! Como alguns reclamaram que não teve playlist no post antigo, já vou deixando aqui a playlist que estou ouvindo agora [Trabalhando até Tarde](https://open.spotify.com/user/h36xa8q6jlmht02o8i7obn90y/playlist/1ko8oEe7Nhi8PzfWdypZbZ?si=L6g3IJv6Q0qltG4W4n3Vxg), e nossa, que playlist foda demais! Várias músicas mesclando um eletro, chill, house, etc.

O post de hoje vai ser relacionado a uma metodologia CSS que eu não conhecia e passei a conhecer lá na HUGE. Confesso que a primeira, segunda, terceira e até a quarta vez que eu vi, achei bem ruinzinha. Mas há uns dias eu peguei para ler, fazer uns testes e até assistir uns vídeos e bom, fui convertido!

Resolvi fazer esse post por alguns motivos e eles foram:

- Fixar um pouco da metodologia (sim! eu uso meu blog para estudar, você deveria também =p)
- Não achei NADA em português!
- Por que não fazer? xD

O post será fortemente baseado na [ÓTIMA documentação do RSCSS](https://rscss.io/), se você não gostar da forma com que escrevo ou quiser simplesmente partir para o original, só clicar ali =)

Eu irei escrever os exemplos em **SCSS**, porém eles podem ser portados para qualquer pre-processador e até mesmo CSS puro <s>tem maluco para tudo.</s>

<h2 id="oq-vem">O que vem a ser o RSCSS?</h2>

Quanto maior o projeto vai ficando, mais elementos são criados e mais CSS é criado. Isso pode acarretar em linhas e mais linhas de CSS, que se não forem bem cuidadas, poderão causar várias confusões. Você já se pegou fazendo as seguintes perguntas:

- O que essa classe significa?
- Essa classe está sendo utilizada?
- Se eu fizer uma classe X, será que ela vai dar conflito?

O **RSCSS** é uma tentativa de fazer essas coisas terem sentido. Ele não é um framework, é simplesmente um conjunto de ideias para orientar o seu processo de construção de CSS sustentável para qualquer site ou aplicação.

<h2 id="por-que">Por que usar metodologias?</h2>

O CSS pode parecer complicado, principalmente quando você escreve de qualquer maneira. Mas ele não precisa ser assim. Se você cria um padrão de escrita, que pode ser passado a outros do time e que você mesmo entenda como funciona, todo o resto acaba se tornando bem simples.

Existem várias metodologias de escrita, temos a metodologia [BEM](https://en.bem.info/method/) que é bastante famosa, temos também o [OSCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/), [SuitCSS](https://suitcss.github.io/), dentre outras...

<h2 id="escrevendo">Escrevendo CSS</h2>

O CSS de hoje em dia nos permite componentizar tudo muito facilmente, ainda mais com os Pre-processadores nos ajudando bastante ali por trás. O problema é que da mesma forma que os pre-processadores nos ajudam, eles também podem nos atrapalhar bastante.

Atire a primeira pedra quem nunca fez um grande uso de nesting como:

```scss
.nav {
    ul {
        li {
            a {
                ...
            }
        }
    }
}
```

O problema de se fazer isso ali, é que quando temos um grande número de propriedades, a leitura já começa a ficar dificultada, como:

```scss
.nav {
  width: 100%;
  padding: 10px 25px;
  position: fixed;

  ul {
    max-width: 940px;
    li {
      display: inline-block;
      border: 1px solid #ccc;
      padding: 10px 50px;

      a {
        color: #333;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
```

Sem contar a dificuldade de leitura daquilo ali, ainda estamos gerando um código assim:

```css
.nav ul li a {
  ...;
}
```

Isso é horrível, pois aumenta bastante a especificidade e se eu num futuro quiser mudar um pouco das propriedades, vou ter que criar algo para sobrescrever isso, o que vai acabar sujando ainda mais o meu código.

Outro problema de se utilizar tags diretas como `ul`, `li`, `a`, é que podemos acabar sem querer modificando a aparência desse elemento em algum outro lugar que cumpra as mesmas regras.

Pensando no exemplo de um card, usando esse tipo de abordagem de nesting, acabaríamos criando algo mais ou menos assim:

![Abordagem de nesting na criação de um card](/assets/img/rscss/nesting-card.png)

<h2 id="tentando">Tentando melhorar...</h2>

Tentando evitar esse tipo de coisa, vieram metodologias em que são utilizadas classes para todos os elementos do css, que é o caso do BEM. Onde você escreve o CSS na forma **B**lock, **E**lement, **M**odifier. Para o mesmo exemplo do card, teríamos algo assim:

![Abordagem utilizando BEM](/assets/img/rscss/bem-css.png)

O problema dessa abordagem, é que apesar de no CSS evitar muitos problemas, ela suja e muito o HTML. Essa abordagem tem outro side-effect bem ruim, se vamos escrever classes gigantescas tanto do lado do css, quanto do lado do html, acabamos aumentando o tamanho final dos arquivos, que é algo que não queremos também.

![Dirty HTML usando BEM](/assets/img/rscss/dirty-html.png)

Olhando a abordagem inicial de css nativo (nesting) e essa abordagem do BEM, podemos ter um gráfico assim:

![Gráfico mostrando como funciona com BEM e CSS puro](/assets/img/rscss/css-cleanliness-chart.png)

Se temos o markup limpo, colocando só classes base e usando nesting, acabamos tendo um css sujo e difícil de ler. Porém se escrevemos um CSS mais organizado, tendo classes para cada elemento, acabamos tendo um html sujo.

<h2 id="e-se">E se existisse uma maneira de ter os dois limpos?</h2>

Dessa forma nasceu o [RSCSS](https://rscss.io/)! A ideia principal dele é criar um componente pai, que irá governar os elementos internos a partir do `child selector >`, também chamado de seletor filho ou descendente. Se você não conhece esse seletor, aconselho ler esse post [seletores css importantes para aprender](https://willianjusten.com.br/alguns-seletores-css-importantes-para-aprender/), que eu fiz no ano passado.

O mesmo exemplo do card usando essa metodologia ficaria:

![Abordagem do RSCSS](/assets/img/rscss/rscss.png)

<h2 id="trab-rscss">Trabalhando com RSCSS</h2>

<h3 id="comp">1. Tudo é um componente </h3>

A primeira coisa que você deve fazer é pensar em tudo como se fossem componentes. Considere cada pedaço de sua interface como um componente individual. Segue exemplo de um form dentro de uma navbar:

![Search Form dentro de uma navbar](/assets/img/rscss/component-example.png)

<h4 id="comp-name">1.1 Nomeando Componentes</h4>

Os componentes deverão ter **pelo menos duas palavras**, separadas por um traço. Exemplos:

- Um botão de like (.like-button)
- Um form de busca (.search-form)
- Um card de artigo (.article-card)

<h3 id="elementos">2. Elementos</h3>

Elementos são coisas dentro do seu componente:

![Elementos dentro do search-form](/assets/img/rscss/component-elements.png)

<h4 id="elementos-name">2.1 Nomeando elementos</h4>

Cada componente deve ter elementos. E eles devem ter classes com **somente uma palavra**.

```scss
.search-form {
    > .field {...}
    > .action {...}
}
```

<h4 id="elementos-seletores">2.2 Elementos seletores</h4>

Prefira usar o seletor filho `>` sempre que possível. Isso previne que a propriedade passe para componentes internos indesejados, e também performa melhor que seletores descendentes.

```scss
.article-card {
  .title {
    /* bom */
  }
  > .author {
    /* melhor ainda */
  }
}
```

<h4 id="elementos-multiplas-palavras">2.3 Múltiplas palavras</h4>

Para aqueles elementos que precisam de uma ou mais palavras, concatene elas sem traços ou underscore.

```scss
.profile-box {
  > .firstname {
    /* ... */
  }
  > .lastname {
    /* ... */
  }
  > .avatar {
    /* ... */
  }
}
```

<h4 id="elementos-evite-tags">2.4 Evite usar tags como seletores</h4>

Use classe sempre que possível. Tags são ok, mas podem vir com uma pequena perda de performance por não serem muito específicas e também podem não ser tão descritivas.

```scss
.article-card {
  > h3 {
    /* ✗ evite */
  }
  > .name {
    /* ✓ melhor */
  }
}
```

<h3 id="variacoes">3. Variações</h3>

Componentes podem ter variações, assim como os elementos também.

![Exemplo de variações](/assets/img/rscss/component-modifiers.png)

<h4 id="variacoes-name">3.1 Nomeando variações</h4>

As classes de variações devem ser prefixadas por um traço. É legal pensar nisso como forma de comandos no terminal, onde a gente tem o comando principal e podemos passar opções sempre como `-algumaCoisa`.

```scss
.like-button {
  &.-wide {
    /* ... */
  }
  &.-short {
    /* ... */
  }
  &.-disabled {
    /* ... */
  }
}
```

<h4 id="variacoes-elementos">3.2 Variações nos elementos</h4>

Assim como os componentes, podemos querer variar os elementos. Preste atenção, essa variação é específica daquele elemento (classe), portanto, não há problemas em colocá-lo adjacente, como mostrado abaixo.

```scss
.shopping-card {
  > .title {
    /* ... */
  }
  > .title.-small {
    /* ... */
  }
}
```

<h4 id="variacoes-tracos">3.3 Por que usar prefixos com traço?</h4>

Alguns dos motivos de se usar são:

- Previne ambiguidade com elementos, já que ambos são escritos com um só nome.
- O traço é mais rápido de digitar, só uma tecla. Além de ser mais fácil de selecionar palavras pelo teclado.
- Lembra a forma de se passar comandos no terminal UNIX.

<h3 id="componentes-nested">4. Componentes aninhados (nested)</h3>

![Componentes aninhados](/assets/img/rscss/component-nesting.png)

```html
<div class="article-link">
  <div class="vote-box">...</div>
  <h3 class="title">...</h3>
  <p class="meta">...</p>
</div>
```

Algumas vezes precisamos ter componentes dentro de componentes. Aqui vão algumas dicas de como se fazer:

<h4 id="nested-variacoes">4.1 Variações</h4>

Evite modificar o componente interno através do commponente principal.

```scss
.article-header {
  > .vote-box > .up {
    /* ✗ evite isso */
  }
}
```

Ao invés disso, prefira adicionar uma variação ao componente interno e aplicar a partir dele.

```html
<div class="article-header">
  <div class="vote-box -highlight">...</div>
  ...
</div>
```

```scss
.vote-box {
  &.-highlight > .up {
    /* ... */
  }
}
```

<h4 id="nested-simplifique">4.2 Simplifique componentes internos</h4>

As vezes, quando usando componentes aninhados, seu markup pode ficar um pouco sujo:

```html
<div class="search-form">
  <input class="input" type="text" />
  <button class="search-button -red -large"></button>
</div>
```

Você pode simplificar isso, utilizando a propriedade de `@extend` de seu pre-processador:

```html
<div class="search-form">
  <input class="input" type="text" />
  <button class="submit"></button>
</div>
```

```scss
.search-form {
  > .submit {
    @extend .search-button;
    @extend .search-button.-red;
    @extend .search-button.-large;
  }
}
```

Assim, seu elemento `.submit` irá receber todas as propriedades que precisa, de uma forma que não fique com um markup sujo.

<h3 id="layouts">5. Layouts</h3>

![Exemplo de cards em layouts](/assets/img/rscss/layouts.png)

<h4 id="layouts-evite">5.1 Evite propriedades de posicionamento</h4>

Componentes devem ser criados de uma forma que possam ser reutilizados em diferentes contextos. Evite colocar essas propriedades nos componentes:

- Posicionamento (position, top, left, right, bottom)
- Floats (float, clear)
- Margens (margin)
- Dimensões fixas (width, height) \* com exceção de elementos que precisam ter tamanhos fixos mesmo.

<h4 id="layouts-posicionamento">5.2 Defina posicionamento nos pais</h4>

Se você realmente precisa definir algum tipo de posicionamento no componente, faça isso no componente pai que irá contê-lo. No exemplo abaixo, note que a largura e float são aplicadas no contexto do componente `list`, não no componente em si.

```scss
.article-list {
  & {
    @include clearfix;
  }

  > .article-card {
    width: 33.3%;
    float: left;
  }
}

.article-card {
  & {
    /* ... */
  }
  > .image {
    /* ... */
  }
  > .title {
    /* ... */
  }
  > .category {
    /* ... */
  }
}
```

<h3 id="helpers">6. Helpers</h3>

Essas classes tem como uso principal, sobrescrever valores, coloque-as em arquivos separados e as nomeie com underscore. Essas classes, em geral, são marcadas com `!important`. Portanto, use com muita cautela e as evite o máximo possível.

```scss
._unmargin {
  margin: 0 !important;
}
._center {
  text-align: center !important;
}
._pull-left {
  float: left !important;
}
._pull-right {
  float: right !important;
}
```

<h3 id="estrutura-css">7. Estrutura CSS</h3>

O RSCSS não tem uma premissa forte para estrutura não, tendo somente como único conselho, colocar um componente por arquivo.

```scss
/* css/components/search-form.scss */
.search-form {
  > .button {
    /* ... */
  }
  > .field {
    /* ... */
  }
  > .label {
    /* ... */
  }

  // variants
  &.-small {
    /* ... */
  }
  &.-wide {
    /* ... */
  }
}
```

E, então chamar esses componentes usando o glob matching:

```scss
@import 'components/*';
```

<h3 id="exemplo">Exemplo</h3>

Para quem gosta de aprender com exemplo, segue abaixo o exemplo de um card implementado seguindo a metodologia do RSCSS:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gPBJWq" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/gPBJWq">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Repare que o nesting de só até dois elementos foi respeitado, que o componente principal tem duas palavras (`photo-card`) e que os elementos possuem somente um nome.

<h2 id="conclusao">Conclusão</h2>

Bom galera, sei que o post ficou grandinho, eu mesmo não esperava fazer tão grande, acabou que eu basicamente traduzi toda a documentação e falei um pouquinho mais até. Entenda que assim como toda metodologia, ela pode funcionar ou não para você, a ideia aqui é passar mais uma opção para que você escolha a que melhor se adaptar. Eu não gostei muito quando vi, hoje já estou achando bastante simples e eficiente.
Outro ponto importante é, se você trabalha com uma equipe, não saia mudando tudo sem avisar, comunique a todos, mostre os pontos e, caso tenha um consenso, sigam todos o mesmo padrão.
