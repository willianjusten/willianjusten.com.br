---
layout: post
title: "Ano novo, blog novo"
date: 2016-01-01 14:00:59
image: '/assets/img/blog-novo/home-new.png'
description: 'Nada melhor que começar o ano com novidades né? Para isso, preparei um novo visual para blog, espero que gostem e todo feedback é bem vindo!'
main-class: 'misc'
color: '#7AAB13'
tags:
- frontend
- dev
- theme
- jekyll
categories:
twitter_text: 'Ano novo, blog novo! Veja o que achou do novo visual!'
introduction: 'Nada melhor que começar o ano com novidades né? Para isso, preparei um novo visual para blog, espero que gostem e todo feedback é bem vindo!'
---

## Introdução

Faaaaaaaala pessoal, primeiro de tudo, um Feliz 2016 para todos! Que grandes coisas aconteçam para todos e que seja um ano de muitos projetos, crescimentos pessoais e profissionais. Queria também agradecer o carinho de vários de vocês =)

Vou ouvindo uma playlist super super calma chamada [ChillStep](https://open.spotify.com/user/kent1337/playlist/6IjDl5eRczFdgZkKYXhuHZ) enquanto escrevo esse post, mas na criação desse novo visual, eu ouvi muito as [playlists comemorativas de Star Wars](https://open.spotify.com/user/official_star_wars), em especial a do [Finn](https://open.spotify.com/user/official_star_wars/playlist/6v62GOY5tiFfIwkhOHMwS5), que é composta de Indies, minha paixão <3

Bom, como eu havia falado no [post passado](https://willianjusten.com.br/meu-ano-de-2015/), eu estava preparando um visual novo para o site e esse post vai servir para falar um pouco desse processo, minhas viagens em busca do novo visual, algumas coisas que necessariamente precisavam ter, outras que eu queria manter, enfim, uma salada mista de inspirações e a concepção de fato.

Eu sempre fui uma pessoa muito curiosa para saber como certos designs foram pensados e criados, então acho que esse meu post vai servir para essas pessoas curiosas assim como eu.

## Blog antigo

O Blog anterior se destacava pela simplicidade nos elementos e cores, tendo como o maior destaque o `azulão` escolhido para estampar os grandes headers do blog. O azul ficou tão "forte" na cabeça de algumas pessoas, que teve gente que chamava até de "garoto do blog azul" né ahuahua

![Home do Blog antigo](/assets/img/blog-novo/home-old.png)

E os posts também ocupavam uma área relativamente grande, com a data num destaque muito grande.

![Posts do Blog antigo](/assets/img/blog-novo/posts-old.png)

### Características Básicas

- Usava fonte [Open Sans](https://www.google.com/fonts/specimen/Open+Sans) bold para títulos e light para os textos
- As cores eram azul(`#0562DC`), branco para elementos em contraste com o azul e para os textos um cinza grafite(`#333333`)
- Minimalismo acima de tudo, então pouca coisa na tela
- Mobile-first
- Bastante leve, **menos de 80Kb** no primeiro load!
- Site estático escrito em [Jekyll](https://jekyllrb.com/) e hospedado no [Github Pages](https://pages.github.com/)
- Css feito usando [Stylus](http://stylus-lang.com/) `<3`
- Gulp para fazer processamento dos assets, livereload e build

Se quiser saber um pouco mais da construção dele, tem os posts [Making of - Parte 1](https://willianjusten.com.br/making-of-parte-1/) e [Making of - Parte 2](https://willianjusten.com.br/making-of-parte-2/)

## Blog Novo

Tendo já as características do blog antigo, algumas coisas eu decidi permanecer, como o uso do Jekyll, Gulp e Stylus. Ele agora tinha de seguir as seguintes regras também:

- Continuar sendo leve
- Clean e com cores mais flat (o azul era legal, mas muito intenso)
- Fácil de achar os artigos
- Entregar mais informação já de primeira
- Mais organizado

### Desenhos!

Tendo mais ou menos uma ideia das características, eu sempre faço uns rabiscos bem vagabundos disso, eu ainda sou daqueles que funciona bem colocando coisas no papel e no quadro.

**Ps.:** não sou designer, então não espere nada bom ahuahuahua

![Rabiscos do novo blog](/assets/img/blog-novo/rabiscos.jpg)

Meu processo de desenvolvimento é fazer os wireframes no papel e já converter em código, nada de Photoshop, Illustrator ou etc. Até porque não tenho paciência... Então, em posse de alguns desenhos, eu comecei já a desenvolver os componentes.

Como você pode ver pelos desenhos e pelo oficial, muita coisa mudou! E é para ser assim mesmo, experimentações são importantes. Eu vou detalhar os novos elementos e o que eu pensei para cada um deles nascer.

### Criação de Tarefas

![Board de tarefas](/assets/img/blog-novo/board.jpg)

Para otimizar meu tempo e organizar as ideias da cabeça, eu gosto de trabalhar com método de Kanban, tendo pequenas tarefinhas a fazer. Então a primeira coisa que eu fiz depois de pensar no layout, foi separar tarefa por tarefa. Com as tarefas em mãos, comecei o trabalho nos componentes!

### Header Fixo

Como um dos objetivos era já mostrar informação desde o início, não cabia mais ter um header enorme só com meu nome. Para isso, imaginei um header/navbar bem simples, em que contivesse meu nome e os elementos de menu e search. Só que como meu nome é relativamente grande, para que nada quebrasse em dispositivos mobiles, eu resolvi usar só as iniciais do meu nome em resoluções menores, ficando assim:

![Header do novo blog](/assets/img/blog-novo/header-new.gif)

Para fazer isso foi bastante simples, eu usei o seletor `:after` no meu link `a`, para adicionar conteúdos diferentes de acordo com a resolução.

```stylus
&:after
    transition all .4s
    content '</> WJ'
    +above(cut)
        content '</> Willian Justen'
```

O código está em `Stylus` e aquele comando `+above(cut)` é uma feature do [Rupture](https://jescalan.github.io/rupture/), que ajuda bastante para trabalhar com media-queries sem ter que escrever muita coisa.

### Cards de Post

![Cards do novo blog](/assets/img/blog-novo/cards-new.png)

Como o objetivo era entregar mais conteúdo de uma vez só e ter mais organização, resolvi remover aquela lista, que entregava só 3 posts numa tela com resolução alta, por cards de 3 em 3, assim, no mesmo espaço de tela, eu consigo entregar **9 posts!**

#### Anotomia do Card

![Cards do novo blog](/assets/img/blog-novo/card.png)

Talvez um dos elementos que eu mais fui modificando com o tempo, mas que curti o resultado final. Dentro do card temos o básico, que são `data`, `título`, `descrição` e `tags`. Mas para facilitar a organização das coisas, resolvi criar a `categoria principal`, que no caso do card acima é `Miscelânia`. Cada categoria também tem sua cor principal, que é responsável por mudar **TODOS** os elementos do site para a cor em questão.

Exato, se você entrou no blog por essa página, você está vendo tudo `verde`, devido a categoria em que o post está, mas se fosse um post de outra categoria, todas as cores também iriam mudar.

#### Mobile-first para os cards

Desde o primeiro blog, o objetivo foi entregar a melhor experiência para qualquer tipo de tela, com isso, tudo foi pensado no Mobile-first. Para isso, eu utilizei `flexbox` na construção dos cards, para que eles ficassem assim:

![Cards do novo blog](/assets/img/blog-novo/cards-responsive.gif)

Para ter isso, foi tão fácil, que tenho até vergonha de falar, já que eu pensava que `flexbox` era mais difícil e talz. Mas as linhas foram:

```stylus
.flex-grid
    display flex
    flex-flow row wrap

.box-item
    flex 1 0 300px
```

O `.flex-grid` foi responsável só para ser o container `flex` dos cards, utilizando a propriedade `display flex`. Já o `flex-flow row wrap`, serve para dizer a `direction` dos elementos, no caso em coluna e o `wrap` para dizer como eles vão se comportar empilhando e diminuindo/aumentando.

Já no `.box-item`, eu defino que eles terão o `flex-basis` no valor de `300px`, o valor `1` é para o `flex-grow`, assim eu digo para que os elementos ocupem todo os espaço que puderem e se comportem igualitariamente.

Se você quiser entender mais de `flexbox`, acesse os seguintes links:

- [A guide to Flexbox by Css-tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Awesome Flexbox by Afonse Pacifer](https://github.com/afonsopacifer/awesome-flexbox)
- [Flexbox Froggy](http://flexboxfroggy.com/)

#### Interação no Scroll

Para os cards não aparecem "duros" no scroll, eu resolvi aplicar uma leve animação neles. Essa animação foi inspirada nesse [post do Codrops](http://tympanus.net/codrops/2013/07/02/loading-effects-for-grid-items-with-css-animations/), lá eles utilizam o Masonry e coisinhas a mais, o que eu precisava era só a interação no scroll, então fiz minhas devidas modificações.

Eu ia fazer um gif mostrando a animação, mas acho que é melhor você testar por si, vai lá na [Home](https://willianjusten.com.br), faça o scroll e veja por si mesmo =p

### Organização

Uma das tarefas era essa, organizar mais o meu blog, para que tantos os novatos do blog, quanto os mais antigos, conseguissem saber logo de cara qual seria o assunto em destaque abordado e também para que pudesse filtrar por aquilo que realmente lhe interessam.

Pensando nisso, eu criei algumas categorias como:

- `jekyll`: como esse post é feito nele e eu já comentei algumas dele, nada mais justo que ter sua categoria própria. A cor dele é vermelho.
- `css`: que blog de frontend seria sem o css? Sua cor é um azul esverdeado.
- `svg`: preciso dizer algo sobre? Sua cor é roxo
- `js`: outro tópico indispensável para front, sua cor é o amarelo da linguagem.
- `html`: para falar sobre coisas mais simples, como estrutura, semântica, a API do html5, entre outros. Sua cor é o laranja.
- `dev`: essa categoria é para abordar temas mais abertos de programação como ter domínio próprio em github, testes, etc. Sua cor é o cinza.
- `misc`: miscelânia, como o nome já diz, é um conjunto de tudo, que pode abordar tanto coisas de programação, como links da semana, novidades do blog, coisas off-topic, enfim, todo o resto. Sua cor é o verde.

Para acessar qualquer uma das categorias em específico, basta clicar no `ribbon` no canto superior do card, segue exemplo da [página de js](https://willianjusten.com.br/category/js).

### Página de Post

Talvez a página que menos mudou, mas também mudou! Ela agora possui o header fixo que vem da home, já com as cores devidamente modificadas. O header ganha a cor de sua categoria principal e a fonte agora possui uma leve sombra flat e já não é mais Uppercase.

![Home Post do novo blog](/assets/img/blog-novo/home-post-new.png)

Todas os destaques de texto também passam a receber a cor da categoria, além dos links mudarem para agora uma borda `dashed`, com um hover background suave.

![Post do novo blog](/assets/img/blog-novo/post-new.png)

## Cores (Update)

Para que as categorias tivessem suas respectivas cores, eu fiz o seguinte, separei todos os elementos de cor num arquivo chamado [_theme-colors.styl](https://github.com/willianjusten/willianjusten.github.io/blob/master/src/styl/_theme-colors.styl), criei um objeto tendo `categoria-cor` e então iterei a partir de um elemento pai, para que ele fosse modificando todas as cores.
Segue um trecho do arquivo de cores:

```stylus
/* Aqui eu defino os temas e cores */
themes = {
    post-jekyll: #B31917,
    post-css: #2DA0C3,
    post-js: #D6BA32,
    post-html: #EB7728,
    post-svg: #7D669E,
    post-dev: #637a91,
    post-misc: #7AAB13
}

/* aqui eu faço a iteração, tendo o elemento pai
 o nome do tema */
for theme, category-color in themes
    .{theme}
        .title-category
            color category-color
        .post-content
            h1,h2,h3,h4
                color category-color
            a
                color category-color
                border-bottom 2px dashed category-color
                &:hover
                    background-color category-color
                    color #fff
            strong
                color category-color
            p,
            li
                code
                    color category-color
            blockquote
                border-left .313rem solid category-color

```

## Conclusão

Bom pessoal, esse é o visual do Blog 2016, espero que tenham gostado, peço feedback de todos para saber o que posso melhorar ou até se odiaram o novo visual e querem que eu volte para o antigo <s>mas eu não volto não =p</s>
