---
layout: post
title: "Criando apresentações e hospedando no github"
date: 2015-10-04 18:36:35
image: '/assets/img/reveal/main.png'
description: "Aprenda a criar slides para suas apresentações e hospedá-las online no github pages."
main-class: 'dev'
color: '#637a91'
tags:
- js
- github
categories:
twitter_text: "Aprenda a criar slides para suas apresentações e hospedá-las online no github."
introduction: "Um tutorial de como criar slides para suas apresentações com o RevealJS e hospedá-las online no github pages."
---

## Introdução

Caramba, como fazia tempo que eu não postava nada aqui. O mês passado foi muito apertado, participei de vários eventos, tanto palestrando como assistindo e por isso não conseguia muito tempo para escrever. Um pouco também foi devido a preguiça...pois é, vergonha né? =/

Bom, para não perder o costume, hoje estou ouvindo uma playlist bem calminha e legal que se chama [Your favorite Coffeehouse](https://open.spotify.com/playlist/37i9dQZF1DX6ziVCJnEm59?si=90_msHLtR3S1YBlx-2vlLA), já tinha passado o olho nela, mas resolvi aproveitar o climinha de Petrópolis para ouvir.

O post de hoje será bem simples, mas que me salvou bastante nesse mês, que como eu disse, precisei fazer várias apresentações.

### Por que não usar o Keynote, PowerPoint ou outro similar?

Bom, eu não tenho as melhores aptidões em design e confesso que ver aquele monte de opções escondidas não me deixa muito confortável. Outra questão é que eu queria poder fazer meus slides em qualquer computador e de qualquer lugar, se eu usasse um desses programas, eu seria obrigado a escrever só em máquinas que tivessem esses programas...

Sempre que eu vou a eventos, me interesso em ter os slides depois para poder ler com mais calma e até mesmo fazer testes quando são códigos expostos ali. Então eu queria disponibilizar meus slides de forma fácil também, sendo assim, eu vi que realmente precisava de algo web.

Eu já havia visto um padrão de algumas palestras e todas elas eram web, fui caçar melhor e então encontrei o amado [RevealJS](https://lab.hakim.se/reveal-js/). Junto com ele achei alguns outros, como o [Slides](http://slides.com/), que é mantido pela galera do RevealJS, só que possui uma UI para poder montar os slides. Também encontrei o [Spectable](http://spectacle.surge.sh/#/), que foi baseado no RevealJS, mas feito todo em React <3 (preciso testá-lo depois!)

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

```html
<div class="reveal">
    <div class="slides">
        <section>Slide Horizontal Simples</section>
        <section>
            <section>Slide Veritical 1</section>
            <section>Slide Veritical 2</section>
        </section>
    </div>
</div>
```

Para iniciar uma apresentação, precisamos de uma `div` com a classe `reveal`, que deverá englobar todos os slides. A seção de slides deverá ficar dentro de uma `div` com a classe `slides`. Agora cada `section` dentro dessa organização já será um slide.

### Slide backgrounds

O legalzão do RevealJS é que eu posso colocar qualquer coisa como fundo do meu slide, vídeos, sites, cores e **GIFS**! E é fácil fácil de fazer funcionar:

```html
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
```

### Slide transitions

Podemos fazer diferentes transições entre os slides e para isso, usamos a propriedade `data-transition` dentro da nossa `section`, que é o nosso slide.

```html
<!-- Essa transição irá ser passada como um zoom. -->
<section data-transition="zoom"></section>

<!-- Escolha a velocidade do slide entre: default, fast or slow! -->
<section data-transition-speed="fast"></section>
```

Podemos usar também as transições de entrada e saída de cada slide:

```html
<!-- Transição padrão de deslizar para o lado. -->
<section data-transition="slide"></section>

<!-- Desliza quando entra (slide-in) e esmaece quando sai. (fade-out) -->
<section data-transition="slide-in fade-out"></section>

<!-- Esmaece quando entra (fade-in) e desliza quando sai. (slide-out) -->
<section data-transition="fade-in slide-out"></section>
```

### Transições dentro do slide

Digamos que queremos ir passando item por item de uma lista, sem mostrar ela toda, para isso, basta usarmos `class='fragment'` e esse só será mostrado ao pressionar a tecla de próximo.

```html
<section>
    <p class="fragment grow">grow</p>
    <p class="fragment shrink">shrink</p>
    <p class="fragment fade-out">fade-out</p>
    <p class="fragment current-visible">visible only once</p>
    <p class="fragment highlight-current-blue">blue only once</p>
    <p class="fragment highlight-red">highlight-red</p>
    <p class="fragment highlight-green">highlight-green</p>
    <p class="fragment highlight-blue">highlight-blue</p>
</section>
```

### Configurações

O RevealJS te permite fazer várias configurações para iniciar a apresentação, como são muitas, prefiro passar [esse link](https://github.com/hakimel/reveal.js#configuration) que diz todas e ainda explica um pouco sobre cada opção.

## Passos para criar uma apresentação do zero!

#### 1 - Baixe os arquivos no github

Só ir no [github deles](https://github.com/hakimel/reveal.js) e mandar baixar, lá já terão os arquivos necessários para criar a apresentação.

#### 2 - Monte um html básico

```html
!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
</head>
<body>
</body>
</html>
```

#### 3 - Adicione o css e o tema no head

```html
<head>
    <meta charset="utf-8">
    <title>Reveal.js Slide Demo</title>
    <link rel="stylesheet" href="css/reveal.css">
    <link rel="stylesheet" href="css/theme/default.css" id="theme">
</head>
```

Existem diferentes temas, basta escolher dentro da pasta de "themes".

#### 4 - Crie o Markup básico

Como dito um pouco mais acima, precisamos ter um markup com as classes `reveal` e `slides` para tudo passar a funcionar direitinho.

```html
<div class="reveal">
    <div class="slides">
        <section>Slide Horizontal Simples</section>
        <section>
            <section>Slide Veritical 1</section>
            <section>Slide Veritical 2</section>
        </section>
    </div>
</div>
```

#### 5 - Carregue o Javascript no fim do html

```html
<script src="lib/js/head.min.js"></script>
<script src="js/reveal.min.js"></script>
```

#### 6 - Inicialize o RevealJS e configure

Não adianta só colocar o `js` no final do arquivo, precisamos inicializar para que a mágica aconteça!

```js
// Veja todas as configurações em:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true, // mostra as setinhas na parte inferior
    progress: true, // mostra uma barra de progresso
    center: true, // centraliza os slides
    transition: 'slide' // none/fade/slide/convex/concave/zoom
});
```

#### 8 - Hospedando no Github

Como sabemos, o Github tem um sisteminha legal chamado [Github Pages](https://pages.github.com/), que permite hospedar páginas estáticas nele. Para hospedarmos algo lá, basta criarmos um projetinho com o nome que desejarmos e ao invés de usar a branch master, usarmos a branch `gh-pages`. Após isso, o projeto vai ficar hospedado em `nomedousuario.github.io/nome-do-projeto`, caso você tenha um domínio configurado, ele ficará como `dominio/nome-do-projeto`. Segue um exemplo de uma das minhas últimas apresentações [Frontend Carioca 2015](https://willianjusten.com.br/frontend-carioca-2015/).

---

### Pow, legal, mas não tem nada mais prático não?

![Qualy Presenter](https://raw.githubusercontent.com/Qualy-org/qualy-presenter/master/src/img/qualy-presenter.png)

Eu sou a preguiça em pessoa e sempre que eu puder, vou tentar fazer algo para agilizar e organizar minhas coisas. Pensando nisso, eu criei o [Qualy Presenter](https://github.com/Qualy-org/qualy-presenter), que além de já ter tudo do RevealJS, inclui algumas coisas legais para o meu desenvolvimento.

Eu uso o [Jade](http://jade-lang.com/) para escrever meus slides separados de forma mais organizada. Tem também o [Stylus](http://learnboost.github.io/stylus/), que é o pre-processador mais lindinho de todos. E para rodar tudo, compilar e fazer todas as outras mágicas, eu tenho o [GulpJS](http://gulpjs.com/).

### Como funciona o Boilerplate?

#### 1 - Estrutura

Todos os arquivos importantes ficam dentro da pasta [src](https://github.com/Qualy-org/qualy-presenter/tree/master/src), que é onde ficam os arquivos ainda não compilados.

A pasta [src/templates](https://github.com/Qualy-org/qualy-presenter/tree/master/src/templates) é onde ficam os [includes](https://github.com/Qualy-org/qualy-presenter/tree/master/src/templates/inc), estes são responsáveis pela inclusão dos scripts, arquivos de css, descrições, meta-tag e etc.

E o arquivo [src/templates/index.pug](https://github.com/Qualy-org/qualy-presenter/blob/master/src/templates/index.pug) é onde eu monto e faço a chamada dos meus slides.

Cada slide fica separado na pasta [src/slides](https://github.com/Qualy-org/qualy-presenter/tree/master/src/slides) e pode ser chamado nessa index na ordem que eu desejar, assim fica tudo mais arrumadinho e me facilita a deletar/chamar ou não um slide =)

Os slides podem ser escritos usando a sintaxe do Pug ou tambem em html normal, então se você não souber escrever em Pug, não se preocupe, escreva em html e tudo irá funcionar igual, basta lembrar de quando for incluir um slide na `index.pug`, coloque a extensão `.html` no final do arquivo. Segue exemplo:

```pug
doctype html
html
    include inc/head
    body
        .reveal
            .slides
                include ../slides/slide-1.html
                include ../slides/slide-2.html
        include inc/scripts
```

Quando o arquivo for compilado, ele irá ler normalmente e juntar tudo para você em um só arquivo.

#### 2 - Baixando o Boilerplate e instalando

Basta ir em [Qualy Presenter](https://github.com/Qualy-org/qualy-presenter/), clonar ou baixar os arquivos na sua máquina.

Depois basta criar um repositório no seu github com os arquivos iniciais. Segue os passos básicos:

Vá em `Create new repository` na parte superior do github e preencha os dados corretamente:

![Imagem de criação de um novo repositório no Github](/assets/img/reveal/github-repo.png)

```bash
// inicializando um repositório git no seu local
git init

// adicionando todos os arquivos
git add .

// commitando tudo
git commit -m "initial commit"

// adicionando o repositório remoto do github
git remote add origin git@github.com:seu-usuario/seus-slides-lindos.git

// fazendo o primeiro deploy na mão para ligar os repositórios
git push -u origin master
```

#### 3 - Rodando, compilando e fazendo deploy

Como eu disse, uso o Gulp para fazer as mágicas, então a primeira coisa a se fazer é instalar as dependências do `package.json`, para isso é só rodar:

```bash
npm install
```

Depois de tudo instalado, é só rodar `npm start`. Ele possui alguns comandos separados, mas em geral o comando principal utilizado será só `npm start`, que é responsável por fazer todas as compilações necessárias e levantar um servidor com livereload em `localhost:3000`. Os arquivos compilados irão para uma pasta `build`, que irá conter só os arquivos finais que são as pastas: `css`, `js`, `images` e `index.html`.

Depois de tudo feito e compilado, só precisamos fazer o deploy para o github, para isso temos o seguinte comando:

- `npm run deploy`: faz deploy dos arquivos de `build` para o branch `gh-pages`.


## Conclusão

Bom, é só isso pessoal, espero que esse post ajude e que passem a criar mais apresentações direto no browser ao invés de usarem softwares proprietários. E é claro, quem quiser contribuir no meu [boilerplate](https://github.com/Qualy-org/qualy-presenter/), ficarei eternamente grato! Não sabe o que pode melhorar? Fala comigo que eu com certeza tenho uma lista de desejos, que inclusive deveria colocar lá nas issues, mas estou com preguiça, me pergunta que eu falo e você preenche para mim pelo menos, já vai estar ajudando ahuahuahua
