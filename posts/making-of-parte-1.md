---
layout: post
title: 'Making of - Parte 1'
date: 2015-01-03 05:54:23
description: 'Quais ferramentas foram utilizadas para montar esse blog e o porquê de ter escolhido cada uma delas.'
main-class: 'jekyll'
color: '#B31917'
tags:
  - jekyll
  - gulp
  - stylus
  - svg
twitter_text: 'Making of parte 1'
introduction: 'Uma explicação básica de cada uma das tecnologias empregadas e os motivos de ter escolhido elas para a criação desse meu lindo blog.'
---

Existe uma continuação desse post em [Making of - parte 2](https://willianjusten.com.br/making-of-parte-2/).

## Antes de qualquer coisa...

Bom, antes de começar explicando como criei esse blog, algumas ideias e o que aconteceu durante o processo, é melhor eu me apresentar né?

Meu nome é Willian Justen de Vasconcellos, tenho 24 anos (nada de piadinhas...) e sou Desenvolvedor Front End no [Queremos!](https://queremos.com.br)/[WeDemand](https://wedemand.com). Trabalho há cerca de 3 anos na área de web, tendo finalizado meu curso de Tecnologia da Informação na Faeterj-Petrópolis no ano de 2014. Mas curiosamente essa não foi minha primeira faculdade, eu também fiz **Química Industrial** na Uff, sim, você leu certo, eu realmente fiz Química...
E por que eu trabalho com web agora? Ah...porque web é incrível e a facilidade em aprender cada dia mais, me deixa mais feliz com a escolha que fiz.

Eu pretendo escrever o máximo que der e sobre tudo, desde o avançado até dicas rápidas para iniciantes. O foco principal será em tecnologias Front End, mas isso não impede que um dia escreva sobre Python ou alguma técnica de estudo. Espero que gostem do blog e todo feedback é bem vindo =)

## Tecnologias utilizadas

Eu sou um cara muito curioso e gosto sempre de coisas novas, então eu utilizei:

- [Jekyll](http://jekyllrb.com/) - como a base de todo o blog, sendo meu gerador de páginas estáticas.
- [GulpJS](http://gulpjs.com/) - meu automatizador favorito, que utilizo para basicamente todas as tarefas tediosas do frontend.
- [SVG](http://pt.wikipedia.org/wiki/SVG) - ícones escaláveis, fáceis de utilizar e muito leves.
- [Stylus](http://learnboost.github.io/stylus/) - tem pre-processador css mais bonito que stylus? Totalmente flexível, completo e o mais importante, totalmente em Javascript =)
- [Jeet](http://jeet.gs) - sistema de grid feito em stylus.
- [Kouto Swiss](http://kouto-swiss.io/) - um framework para stylus.
- [Rupture](http://jescalan.github.io/rupture/) - uma ferramenta para facilitar o trabalho com media queries no stylus.
- [Github Pages](https://pages.github.com/) - onde está hospedado esse lindo blog (se você não achou bonito, se retire! Brincadeira, pode continuar, só me manda um feedback do que não gostou).

### Por que de cada uma dessas tecnologias?

Eu acho bastante interessante quando o desenvolvedor explica o porquê dele ter usado tal ferramenta/tecnologia ao invés de outra mais famosa ou mais leve, etc... Por isso, vou explicar rapidamente cada escolha minha. Talvez eu crie posts mais detalhados de algumas dessas tecnologias.

#### Jekyll

Apesar de eu trabalhar atualmente com JS, eu acabei optando pelo Jekyll pela facilidade de iniciar um blog e fazer o deploy no github pages, que inclusive compila os arquivos lá mesmo se eu quiser. Outro fator de ter escolhido o Jekyll foi a sua comunidade, ele atualmente é o gerador estático com maior número de stars(dobro do segundo que é inspirado nele, o Octopress) e também o com maior número de forks, tudo isso você pode olhar nessa [listinha aqui](https://www.staticgen.com/).

E para iniciar o blog, basta ter o ruby instalado na máquina, se você é usuário Mac já vem instalado por padrão (mas aconselho fortemente a atualizar), se você é usuário Linux, algumas distribuições já vem por padrão e outras é só instalar via gerenciador de pacotes. Agora, se você é usuário Windows, muda essa bosta (brincadeirinha xD), mas vai ter algumas dores de cabeça para fazer tudo funcionar... Eu não deveria, mas vou te ajudar usuário Windows, segue o link desse cara que vai resolver o seu problema [Jekyll Windows - Juthilo](http://jekyll-windows.juthilo.com/)

Durante a criação desse blog, eu cheguei a falar sobre ele para alguns amigos, quando disse que estava utilizando Jekyll, alguns me pediram dicas de como usar e outras coisas mais. Então eu vou criar um post mais completo, explicando não só o passo a passo para instalar, mas como ele funciona, ferramentas para se trabalhar melhor com ele e outras coisinhas mais. Se você tem interesse em saber mais sobre o Jekyll, aguarda que logo logo tem post sobre ele.

#### GulpJS

Definitivamente meu automatizador favorito, seja pela velocidade, seja pela facilidade com que é de se escrever para ele. Junto com ele utilizei os seguintes plugins:

- [Browser Sync](https://browsersync.io/docs/gulp) - permite sincronizar todos os meus aparelhos e ainda fazer livereloading, depois que conheci essa ferramenta me apaixonei, se você não conhece, corre para olhar, é fantástica.
- [Gulp-stylus](https://www.npmjs.com/package/gulp-stylus) - para compilar meu lindo Stylus
- [Gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - minificar o js
- [Gulp-concat](https://www.npmjs.com/package/gulp-concat) - concatenar os arquivos
- [Gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - minificar todas as minhas imagens

Se quiser entender melhor como eu fiz toda essa bagunça funcionar, só abrir o meu [Gulpfile.js](https://github.com/willianjusten/will-jekyll-template/blob/gh-pages/gulpfile.js)

#### SVG

Para os que me conhecem, sabem que sou apaixonado por SVG e por isso criei a [awesome-svg](https://github.com/willianjusten/awesome-svg), que é um conjunto de informações relacionadas a SVG, desde seu uso básico até opções mais avançadas, se você quer aprender SVG, te aconselho fortemente a ler.

Para esse blog, eu não poderia deixar de usar SVG, sendo assim, todos os ícones utilizados no blog são feitos em svg. Para tal, eu criei uma partial do Jekyll contendo as `defs` de todos os ícones e então chamei cada ícone que eu desejava usando o `use`, conforme exemplo abaixo:

```html
<svg class="icon icon-rss"><use xlink:href="#icon-rss"></use></svg>
```

Eu poderia ficar um post inteiro explicando os motivos de se utilizar SVG, mas os motivos para utilizar SVG no blog foram:

1- Mais leve, segue o arquivo SVG minificado utilizado, tendo somente 6.52kb, [svg-icons.html](https://github.com/willianjusten/will-jekyll-template/blob/gh-pages/_includes/svg-icons.html)

2- [Funciona bem na maioria dos navegadores](http://caniuse.com/#search=svg) (ao menos os que desejo alcançar) e não tem erros bizarros quando demora para carregar, como os font-icons. Segue uma imagem com um bug bem comum dos font-icons.

![Imagem mostrando o Bug que o font-icon tem quando demora a carregar ou não é compatível](https://i.stack.imgur.com/vZhku.png)

#### Stylus

Praticamente o pre-processador mais desconhecido entre os grandes e na minha opinião o melhor deles também. Versátil, com centenas de opções e ainda fácil para quem já escreve seguindo indentação, como feito em Python, Ruby, Jade. Fui conhecer essa belezura ano passado através de um post da Ju Gonçalves, ela se não me engano foi uma primeiras pessoas que eu vi falando sobre Stylus no Brasil, aqui fica meu obrigado por ter me mostrado <3

Junto ao Stylus eu utilizo o Jeet, Rupture e Kouto Swiss, como eu disse lá em cima. O Jeet por ser um grid semântico (lê-se nada de col-md-xs-lg-motherfucker). O Rupture, para evitar de escrever @media direto e o Kouto Swiss, que possui várias e várias funções bem legais para trabalhar. Segue abaixo um exemplo de um trecho utilizando o poder desses 3 em conjunto:

```css
.datetime
  col(1/6)
  text-align
  center
  + below(cut)
  stack()
  .day
  mainFont(800)
  color
  main
  font-size
  rem(80px)
  line-height
  1.6
  + below(cut)
  stack()
  .month-year
  color
  black
  font-size
  rem(18px)
  .content
  col(5/6)
  + below
  + below(cut)
  stack();
```

A linha `2` mostra um dos poderes do Jeet, onde eu defino que o elemento `.datetime` irá ocupar cerca `1/6` de todo o `container`. Se estivéssemos trabalhando com o bootstrap seria similar a classe `.col-md-2`, que representa `2` colunas num total de `12`. As linhas `5`, `12` e `20` também são do Jeet e esse `stack`, quer dizer que os elementos devem ser empilhados e o elemento que recebe essa função passa a receber um `width: 100%`.

As linhas `4`, `11` e `19` mostram a utilização do Rupture, onde o `+below(cut)` é compilado para `@media only screen and (max-width:37.5rem)`, onde `37.5rem` é o valor da variável `cut`. O Rupture permite utilizar palavras como `below`, `above`, `between`, `at`, o que é muito mais fácil de se escrever e entender do que ficar colocando várias medias queries.

As linhas `9` e `15` mostram uma das funções do Kouto Swiss, que é a conversão de `px` para `rem`, que é uma unidade de medida mais adaptável, se você nunca ouviu falar, dá uma lidinha nesse artigo do Tableless [Qual unidade utilizar – Pixel, EM ou REM ](https://tableless.com.br/unidade-pixels-em-rem/).

#### Github Pages

Eu não queria ter problemas com servidor, seja para configurá-lo, seja por problemas dos provedores. Então, a primeira coisa que me veio a cabeça foi o Github Pages, ele é simples, fácil, serve perfeitamente para os meus propósitos e o e melhor, ainda é de graça! O Pages hospeda sites estáticos, ou seja, só arquivos html, se você estava pensando em passar todos os seus clientes com site php para lá, vai tirando o cavalinho da chuva.

O Pages te dá duas opções, criar páginas pessoais, a partir de um repositório com o seu nome, exemplo: `willianjusten.github.io` ou através de um branch `gh-pages` num repositório de um projeto qualquer. Além disso, ele também permite configurar um domínio próprio a partir do CNAME.

## Concluindo essa primeira parte

Bom, essa foi uma explicação básica de cada uma das tecnologias empregadas e os motivos de ter escolhido, é importante lembrar que foram escolhas minhas e dentro de um projeto específico. Não vá pensando que essa é a combinação perfeita para tudo, porque não é. Se tiverem alguma dúvida quanto a algo que eu falei, só mandar um comentário aqui embaixo ou se estiver muito tímido, pode mandar uma DM no meu twitter [@willian_justen](https://twitter.com/willian_justen) ou um email para [willianjustenqui@gmail.com](mailto:willianjustenqui@gmail.com). Na segunda parte eu irei falar um pouco das técnicas que utilizei e até algumas descobertas que fiz pelo caminho. Se não quiser perder nenhum post, só assinar o [RSS](https://willianjusten.com.br/sitemap.xml).
