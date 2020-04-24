---
layout: post
title: "Making of Parte 2"
date: 2015-01-04 22:21:31
description: "Aqui vou mostrar o passo a passo de como criei o blog em Jekyll, usando Gulp e Stylus e coloquei para funcionar no Github Pages."
image: "/assets/img/making-of-parte-2/imagem-principal.png"
main-class: 'jekyll'
color: '#B31917'
tags:
- jekyll
- gulp
- stylus
- github pages
twitter_text: "Making of parte 2"
introduction: "Uma continuação sobre a criação do meu blog, mostrando um passo a passo de como criar um blog em Jekyll usando Gulp e Stylus e fazendo funcionar no Github Pages."
---

## Introdução

Na primeira parte eu passei as tecnologias que eu utilizei e o porquê delas, nessa segunda parte eu vou mostrar o passo a passo para montar o ambiente e criar o seu projeto a partir do zero.

Se você quiser pular todo o blá blá blá e ver só o [código fonte](https://github.com/willianjusten/will-jekyll-template/)

**Aviso! Este post é bastante extenso, vai lá pegar seu café esperto e volta!**

![Uma xícara de café com a espuma fazendo um desenho de um gato fofinho](/assets/img/making-of-parte-2/cafe-de-gato.jpg)

### Instalando o Jekyll

Primeiro de tudo foi necessário criar a base, como disse preferi usar o `Jekyll`, mesmo ele sendo em `Ruby`. Como utilizo Mac OS, ele já possuía o ruby instalado por padrão no meu Yosemite, mas como era uma versão mais velha e lenta, preferi atualizar. Vou dar aqui o passo considerando um Mac novo, se algumas dessas etapas você já tiver feito, só passar para a próxima. Caso utilize Linux segue esses passo [aqui](http://michaelchelen.net/81fa/install-jekyll-2-ubuntu-14-04/) e caso use Windows tem [aquele guia que passei](http://jekyll-windows.juthilo.com/)

**Passo 1:** Instalar o [Homebrew](http://brew.sh/)
```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**Passo 2:** Instalando o [Ruby 2.2](https://www.ruby-lang.org/)

Iremos utilizar o [rbenv](https://github.com/sstephenson/rbenv) que permite trabalhar com diferentes ambientes de Ruby.

```bash
brew install rbenv ruby-build

# Adicionando o rbenv ao bash para que seja carregado toda vez que abrir o terminal
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile

# Instalando o Ruby 2.2.0 e definindo como versão padrão
rbenv install 2.2.0
rbenv global 2.2.0

ruby -v
# ruby 2.2.0
```

**Passo 3:** Após instalado o ruby, é chegada a vez do Jekyll de fato, o processo é fácil e rápido. Se demorar um pouco e nada acontecer na tela, espere mais um pouco, o ruby infelizmente não dá um feedback durante as instalações e aí acaba dando impressão de travado mesmo...

```bash
# Instalando o Jekyll
gem install jekyll

# Iniciando um projeto com ele
jekyll new meu-blog-lindo
```

Com esses comandos já temos toda a estrutura de pastas do jekyll, de acordo com a imagem abaixo.

![Estrutura de pastas do Jekyll](/assets/img/making-of-parte-2/pastas-jekyll.png)

### Organizando as pastas

Como podemos notar, o Jekyll já cria uma estrutura bem legal e organizada. Vou explicar resumidamente o que é cada uma e como funciona, mas se quiser algo ainda mais detalhado, só ver a [Documentação](http://jekyllrb.com/docs/home/).

* `_includes`: são trechos que se repetem ao longo do site e podem ser incluídos sem ter que digitar tudo.
* `_layouts`: como o nome já diz, é a estrutura básica das páginas, em geral são 3 tipos: `default` para a página de inicial ou listagem de posts. A `page` que serve para criação de páginas diferenciadas com qualquer conteúdo e `post`, que é a página de posts.
* `_posts`: onde iremos escrever nossos posts, o padrão para escrever é em [Markdown](http://daringfireball.net/projects/markdown/syntax)
* `_sass`: os arquivos que geram o css, se você preferir trabalhar em [sass](http://sass-lang.com/), o próprio jekyll compila para você.
* `css`: pasta para onde vão os arquivos gerados pelo sass.
* `_config.yml`: o arquivo de configurações do seu blog, qualquer dado universal ao blog, deve ser colocado lá. Assim como outras definições, como qual tipo de markdown usar, excludes e etc.
* `about.md`: um arquivo do tipo `page` que irá gerenciar uma página /about
* `feed.xml`: arquivo para gerar o feed para o seu blog, essencial para que as pessoas possam seguir seu blog com mais facilidade.
* `index.html`: A página inicial do seu blog

Quando você compila estes arquivos com o Jekyll, ele gerá uma nova pasta `_site`, que irá conter todos os arquivos do site já gerados e estáticos. Pastas iniciadas pelo *underline* não são compiladas e passadas para a pasta `_site`. Outra forma de excluir arquivos é adicionando no `_config.xml`. É muito importante adicionar a pasta `node_modules` nesse exclude, senão o jekyll irá pensar que precisa copiar todo o conteúdo, o que estragaria muito com o desempenho.

```ruby
exclude: ['package.json', 'src', 'node_modules']
```

Como eu também precisei trabalhar com javascript, stylus e também adicionar imagens. Criei uma pasta `src` contendo as pastas `js`, `styl` e `img`. Durante a compilação esses arquivos e pastas são jogados para uma pasta `assets`.

### Usando o GulpJS

Para fazer a compilação do meu Stylus, concatenar meu javascript, minificar imagens, fazer livereloading, enfim, todas as tarefas básicas, resolvi utilizar o [GulpJS](http://gulpjs.com/). Ele funciona com o [NodeJS](http://nodejs.org/), se você não tem na sua máquina <s>se mata</s>, só baixar e instalar.

Tendo o NodeJS já instalado, basta ir no terminal e iniciar o projeto:

```bash
npm init
```

Ele vai te fazer umas perguntas, vai seguindo os passos e no final é só confirmar e isso irá gerar um arquivo `package.json` com os dados preenchidos. Depois basta instalar os plugins necessários, que eu já falei no [post anterior](https://willianjusten.com.br/making-of-parte-1/).

```bash
npm install --save-dev gulp gulp-uglify gulp-concat gulp-stylus autoprefixer-stylus browser-sync gulp-imagemin gulp-plumber jeet kouto-swiss rupture
```

Depois de tudo instalado precisamos fazer nosso `Gulpfile.js`, que irá ter todas as tasks para automatizar o nosso sistema.

Para ser expert em Gulp, basta saber suas funções principais e que ele trabalha com pipes. Sabendo isso, você consegue criar qualquer tarefa.

* `gulp.task(nome, fn)`: registra uma tarefa com um nome.
* `gulp.run(tarefas)`: executa todas as tarefas sequenciamente
* `gulp.watch(tipo de arquivo, fn)`: fica vigiando o arquivo e roda a função caso ele se modifique
* `gulp.src(pasta ou arquivo)`: indica qual pasta ou arquivo será lido para a tarefa
* `gulp.dest(pasta)`: diz para onde o arquivo final precisa ir

#### Parabéns! Você é um expert em Gulp!

![Cara de Gato espantado com a frase Como Assim?](/assets/img/making-of-parte-2/como-assim.jpg)

Isso mesmo! É só isso que você precisa saber, sabendo disso, mão na massa!

#### Primeiro definir as variáveis e chamar as dependências

```js
var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    stylus      = require('gulp-stylus'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    jeet        = require('jeet'),
    rupture     = require('rupture'),
    koutoSwiss  = require('kouto-swiss'),
    prefixer    = require('autoprefixer-stylus'),
    imagemin    = require('gulp-imagemin'),
    cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
```

#### Definir as tasks do jekyll para dar build e rebuild a cada arquivo atualizado

```js
/**
 * Monta o site do Jekyll
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Refaz o site e atualiza a página
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Espera até que o jekyll-build seja executado e então levanta o
 * servidor utilizando o _site como pasta raiz
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});
```

#### Compilar o Stylus

Aqui ficam dois detalhes **muito importantes**, na linha `3`, eu utilizo o `.pipe(plumber())`, essa função serve para receber os erros, mas não matar o processo do Gulp. O Gulp infelizmente fecha caso alguma tarefa dê erro e isso pode ser frustrante quando você ainda está digitando e ele acusa erro. Para evitar isso, utilizamos o `gulp-plumber`, que é uma mão na roda.

E na linha `5`, eu faço as chamadas dos componentes do stylus, assim fica mais fácil de chamar no arquivo stylus, ao invés de colocar chamada para `node_modules` eu simplesmente coloco `@import "jeet"`.

```js
gulp.task('stylus', function(){
        gulp.src('src/styl/main.styl')
        .pipe(plumber())
        .pipe(stylus({
            use:[koutoSwiss(), prefixer(), jeet(),rupture()],
            compress: true
        }))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'))
});
```

#### Minificar e concatenar o JS

Não podemos confundir a ordem aqui, primeiro devemos concatenar todos os arquivos e só depois minificar. O processo de `uglify` além de deixar tudo em uma linha só, muda também o nome de varíaveis e funções para diminuir ainda mais o arquivo. Se você minificar tudo primeiro e depois concatenar, as vezes pode correr o risco de haver conflito. Outro detalhe importante, a concatenação é feita em ordem alfabética, se você tiver um arquivo `a` que depende de `z`, melhor modificar seus arquivos para nomes numerados para que o Gulp concatene na ordem que você deseja. Caso contrário, pode dar erro de dependência. Um erro comum é um plugin que precisa de Jquery estar acima dele e acusar que a variável `$` não foi definida.

```js
gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
});
```

#### Otimizar imagens

```js
gulp.task('imagemin', function() {
    return gulp.src('src/img/**/*')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img/'));
});
```

#### Vigiar todos os arquivos e Tarefa default

A tarefa `default` é determinada para que quando se digite somente `gulp` no terminal, rode a sequência de funções desejadas, neste caso fazemos a compilação de nossos assets primeiro, depois disparamos o server e por último ficamos assintindo para possíveis mudanças.

```js
gulp.task('watch', function () {
    gulp.watch('src/styl/**/*.styl', ['stylus']);
    gulp.watch('src/js/**/*.js', ['js']);
     gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
    gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['js', 'stylus', 'imagemin', 'browser-sync', 'watch']);
```

Prontinho, agora basta digitar `gulp` no seu terminal e ele irá rodar todas as tarefas e levantar o servidor em `localhost:3000`, conforme a imagem abaixo.

![Imagem mostrando o processo do Gulp no terminal](/assets/img/making-of-parte-2/terminal-gulp.png)

Depois disso, basta ter criatividade e montar seu blog com o layout mais legal possível e vai ficar faltando somente a última etapa.

### Subindo para o Github Pages

Para subir os arquivos para o Github é bastante simples, mas para isso você precisa ter o [Git](http://git-scm.com/) instalado na sua máquina. Teste o comando `git` na sua máquina, se ele disser que o comando não existe, faça o download e instale, se ele mostrar a possibilidade de comandos, quer dizer que está instalado =)

Outra dependência é que você cadastre uma conta no [Github](https://github.com/). Tendo isso pronto, é só seguir os seguintes passos:

#### Passo 1: Crie um repositório

![Imagem mostrando como se cria um repositório](/assets/img/making-of-parte-2/criar-repo.png)

Para que funcione no branch `master`, você precisa criar utilizando o `seunomedeusuario.github.io`, no meu caso ficou `willianjusten.github.io`.

![Imagem mostrando como se cria um repositório](/assets/img/making-of-parte-2/nome-repo.png)

#### Passo Final:

```bash
# Iniciar um repositório git na pasta do projeto
git init

# Adicionar todos os arquivos
git add -A

# Commitar os arquivos
git commit -m "Commit Inicial"

# Adicionar o repositório remoto
git remote add origin https://github.com/seunomedeusuario/seunomedeusuario.github.io.git

# Subir seu lindo blog
git push -u origin master
```

Com esses passos o seu Blog já está no Github Pages e se tudo estiver certinho em 20-30 minutos você já pode acessar através da url `seunomedeusuario.github.io`.

## Conclusão

Uffa, esse foi um post gigante, mas até o mais leigo se seguir esses passos direitinhos irá conseguir construir seu próprio blog em Jekyll. Se estiver faltando algum detalhe ou algum erro no texto ou código, por favor digam nos comentários, para que eu possa corrigir o mais rápido possível. Se quiserem saber sobre algum determinado assunto, só mandar sugestões =)
