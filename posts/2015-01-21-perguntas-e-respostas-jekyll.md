---
layout: post
title: "Perguntas e Respostas - Jekyll"
date: 2015-01-21 06:15:41
image: '/assets/img/perguntas-jekyll/perguntas-jekyll.png'
description: "Algumas dúvidas comuns sobre o Jekyll. Entenda melhor como funciona esse gerador estático."
main-class: 'jekyll'
color: '#B31917'
tags:
- jekyll
categories:
twitter_text: "Perguntas e Respostas sobre Jekyll"
introduction: "FAQ: Algumas dúvidas comuns sobre o Jekyll. Entenda melhor como funciona esse gerador estático e já saia usando."
---

## Introdução

Desde a criação do meu blog e dos posts [making of - parte 1](https://willianjusten.com.br/making-of-parte-1/) e [making of - parte 2](https://willianjusten.com.br/making-of-parte-2/), apareceu um grande número de pessoas mais interessadas em Jekyll e o modelo de gerador estático.

É claro que com esse interesse, surgiram várias dúvidas, que não puderam ser explicadas somente com os dois posts. Tiveram várias pessoas que vieram me perguntar alguns detalhes em particular e o [William Goulart](https://github.com/wgoulart) colocou [essa issue](https://github.com/felipefialho/1-post-por-dia/issues/20) no nosso [repositório destinado a dúvidas e pedidos de posts](https://github.com/felipefialho/1-post-por-dia/), que o grande [Luiz Felipe](https://github.com/felipefialho) criou.

Resolvi pegar todas essas perguntas e respondê-las aqui, assim todo mundo terá acesso a essas dúvidas comuns. <s>Esse post deu um trabalho do caramba, faça o favor de ler! =)</s>

## Índice

* [Jekyll serve só para Blog?](#soblog)
* [Como funciona exatamente?](#comofunciona)
* [Quais comandos que o Jekyll tem?](#rodar)
* [O que é esse tal de Front Matter?](#frontmatter)
* [O que são variáveis globais?](#globais)
* [Existem mais variáveis?](#outras)
* [Como usar as variáveis?](#variaveis)
* [Quais funções/comandos temos no Jekyll?](#funcoes)
* [Como crio um post?](#post)
* [Como crio uma página?](#pagina)
* [Meu css e imagens não estão pegando! O que faço?](#arquivos)
* [O que eu tenho que subir para o servidor?](#servidor)
* [Como compilar o Sass?](#sass)
* [Como faço para mostrar código colorido?](#highlight)
* [Como usar esse sistema de comentários?](#disqus)
* [Como crio as urls amigáveis? (permalink)](#permalink)

<h3 id="soblog">Jekyll serve só para blog?</h3>

Não, ele pode ser utilizado para gerar qualquer tipo de site estático, seja ele um blog, um site institucional ou o que você quiser criar. Se quiser, tem essa "pequena" [lista de sites usando jekyll](https://github.com/jekyll/jekyll/wiki/Sites).

<h3 id="comofunciona">Como funciona exatamente?</h3>

Outra dúvida bastante comum é como funciona o Jekyll, o que ele faz, etc. Quando iniciamos um novo projeto, com o comando `jekyll new novo-projeto`.

Ele cria um conjunto de pastas básicas:

* `_includes`: são trechos que se repetem ao longo do site e podem ser incluídos sem ter que digitar tudo.
* `_layouts`: como o nome já diz, é a estrutura básica das páginas, em geral são 3 tipos: `default` para a página de inicial ou listagem de posts. A `page` que serve para criação de páginas diferenciadas com qualquer conteúdo e `post`, que é a página de posts.
* `_posts`: onde iremos escrever nossos posts, o padrão para escrever é em [Markdown](http://daringfireball.net/projects/markdown/syntax)
* `_sass`: os arquivos que geram o css, se você preferir trabalhar em [sass](http://sass-lang.com/), o próprio jekyll compila para você.
* `css`: pasta para onde vão os arquivos gerados pelo sass.
* `_config.xml`: o arquivo de configurações do seu blog, qualquer dado universal ao blog, deve ser colocado lá. Assim como outras definições, como qual tipo de markdown usar, excludes e etc.
* `about.md`: um arquivo do tipo `page` que irá gerenciar uma página /about
* `feed.xml`: arquivo para gerar o feed para o seu blog, essencial para que as pessoas possam seguir seu blog com mais facilidade.
* `index.html`: A página inicial do seu blog

E quando mandamos compilar os arquivos usando o comando `jekyll build` ou `jekyll serve` ele irá criar uma pasta chamada `_site`, que irá conter toda a parte estática do seu site. Essa parte estática é criada com base em todos os arquivos e pastas do projeto, pastas e arquivos que iniciam com `_` não serão recriados dentro da pasta `site`, todo o resto será jogado lá de forma já compilada.

<h3 id="rodar">Quais comandos que o Jekyll tem?</h3>

O Jekyll é bastante simples, então possui basicamente 3 comandos:

* `jekyll new nome-do-projeto` : comando utilizado para criar um novo projeto.
* `jekyll serve` : serve para iniciar um servidor (na porta 4000 por padrão) e ficar assistindo os arquivos.
* `jekyll build` : para gerar os arquivos estáticos

<h3 id="frontmatter">O que é esse tal de Front Matter?</h3>

O Jekyll utiliza o [YAML](http://yaml.org/) e para guardar e organizar informações, ele utiliza o Front Matter, que deve ser a primeira coisa a ser escrita no arquivo e as informações devem ser escritas entre o par de três traços, conforme a sintaxe do YAML, segue abaixo um exemplo:

```yaml
---
layout: default
title: Um nome legal para o meu Blog
---
```

De acordo com a sintaxe, colocamos o nome da variável seguido de 2 pontos e o valor para a variável, que pode ser qualquer valor ou conjunto de valores. Segue alguns exemplos abaixo:

```yaml
---
layout: post
title: "Perguntas e Respostas - Jekyll"
date: 2015-01-21 06:15:41
image: '/assets/img/perguntas-jekyll/img-share.png'
description: "Algumas dúvidas comuns sobre o Jekyll. Entenda melhor como funciona esse gerador estático."
tags:
- jekyll
- frontend
---
```

<h3 id="globais">O que são variáveis globais?</h3>

Existe um arquivo YAML que será lido inteiramente pelo projeto, que é o `_config.yml`. Portanto, qualquer variável colocada naquele arquivo, poderá ser chamada em qualquer parte do projeto. Existem umas variáveis pré-definidas:

* `layout` : serve para definir qual arquivo dentro da pasta `_layouts` irá utilizar.
* `permalink` : serve para definir como será criado o link - [veja mais sobre](#permalink).
* `published` : para definir se o arquivo poderá ser gerado ou não, o padrão é `true`.
* `category ou categories` : como o nome já diz, define uma categoria ou conjunto delas para o post.
* `tags` : serve para definir um conjunto de tags para o post, acima temos um exemplo.

<h3 id="outras">Existem mais variáveis?</h3>

Além das variáveis globais, as páginas e o site também possuem um conjunto de variáveis. Vou listar aqui as mais importantes de cada, caso queira saber alguma bem específica, tem sempre a [documentação](http://jekyllrb.com/docs/variables/).

#### Variáveis do site

* `site.pages` : uma lista de todas as páginas do site.
* `site.posts` : uma lista de todos os posts do site.
* `site.categories.CATEGORIA` : uma lista de todos os posts daquela categoria.
* `site.tags.TAG` : uma lista de todas os posts daquela tag.

#### Variáveis da página

* `page.content` : o conteúdo da página.
* `page.title` : o título da página.
* `page.url` : a url da página em questão.
* `page.date` : a data da página, tendo a estrutura `YYYY-MM-DD HH:MM:SS +/-TTTT`
* `page.tags` : mostra quais tags que a página pertence.

<h3 id="variaveis">Como usar as variáveis?</h3>

Depois de a variável criada, basta chamá-la utilizando a sintaxe de moustache, `{ {` variável `} }`. Se a variável for específica de um front matter, devemos especificar, abaixo seguem exemplos. **Aviso: não existem espaços entre as chaves, tive de colocar senão não daria para mostrar xD**

```html

<!-- variável da página -->
<title>{ { page.title } }</title>

<!-- variável do post -->
<h2>{ { post.title } }</h2>

<!-- variável global -->
<title>{ { title } }</title>
```


<h3 id="funcoes">Quais funções/comandos temos no Jekyll?</h3>

Como o Jekyll é feito em Ruby, temos a nossa disposição uma base de comandos de ruby e seu modelo de templates. **Lembrando que não devem existir espaços entre as chaves**

Podemos incluir arquivos utilizando o comando `{ % include % }`, segue abaixo o código do meu layout `default`.

```html
<!DOCTYPE html>
<html lang="pt-br">
    { % include head.html % }
    <body>
        { % include svg-icons.html % }
        { % include header-default.html % }
            <section class="content">
                { { content } }
            </section>
        { % include footer.html % }
    </body>
</html>
```

Podemos iterar uma lista de posts utilizando o comando `{ % for variavel in conteudo % }`, segue abaixo o loop que utilizo para mostrar as tags de um post:

```html
<div class="tags">
    { % for tag in post.tags % }
        <a href="/tags/#{ {tag} }">{ { tag } }</a>
    { % endfor % }
</div>
```

Temos também a possibilidade de utilizar as condicionais `if`, `else if`, `else`. Segue um exemplo abaixo, que utilizo para setar uma imagem default para a og:image. Aproveitando, já mostro uma outra função no Jekyll, que é a possibilidade de usar pipes `|` para encadear comandos ou criar filtros, no caso abaixo, utilizo para adicionar a url base do site na frente do caminho para a imagem.

```html
{ % if page.image % }
    <meta property="og:image" content="{ { site.url } }{ {page.image } }">
{ % else % }
    <meta property="og:image" content="{ { "/assets/img/blog-image.png" | prepend: site.url } }">
{ % endif % }
```

<h3 id="post">Como crio um post?</h3>

Para criar um post, basta um arquivo dentro da pasta `_posts` na seguinte formatação `ANO-MES-DIA-titulo.MARKUP`. Onde o markup padrão é `.markdown` ou `.md`, podendo utilizar outros, caso desejar.

<h3 id="pagina">Como crio uma página?</h3>

Basta criar um arquivo `html` na raiz do sistema e ela será gerada na pasta `_site` como `nomedoarquivo/index.html`. E com isso a url será `nomedosite.com.br/blog/nomedoarquivo/`.

<h3 id="arquivos">Meu css e imagens não estão pegando! O que faço?</h3>

Uma das perguntas que mais me fizeram, mas é uma coisa bastante simples, só precisa de um cuidado na hora de fazer as chamadas. Existem as urls relativas e as absolutas, exemplo:

* `/assets/img/imagem.png` : url relativa
* `http://meusite.com.br/blog/assets/img/imagem.png` : url absoluta

Quando for fazer as chamadas, dê preferência por apendar a url base do seu site, assim evita que ele busque de um diretório não existente.

<h3 id="servidor">O que eu tenho que subir para o servidor?</h3>

Depende. Se você estiver utilizando o github pages, suba somente as pastas base, sem a pasta `_site`, pois ele irá gerar o conteúdo para você diretamente do servidor deles. Se você estiver utilizando um servidor próprio, suba somente o conteúdo dentro da pasta `_site`, que são os arquivos estáticos.

<h3 id="sass">Como compilar o Sass?</h3>

O próprio Jekyll já compila o Sass, o único passo importante é adicionar o front matter no arquivo principal do sass. Pode adicionar só os traços, que são o suficiente. Exemplo:

```css
---
---

@import "base"
@import "functions"
```

<h3 id="highlight">Como faço para mostrar código colorido?</h3>

O próprio jekyll usa por padrão o [pygments](http://pygments.org/) para poder marcar os códigos. Basta definir no `_config.yml`:

```yaml
highlighter: pygments
```

E então adicionar o seu código dessa forma:

```html

{ % highlight linguagem % }
código a ser mostrado
{ % endhightlight % }
```

<h3 id="disqus">Como usar esse sistema de comentários?</h3>

O sistema que eu utilizo para comentários é o [Disqus](https://disqus.com/) e é bastante fácil fazê-lo funcionar. Basta [criar uma conta](https://disqus.com/profile/signup/) no Disqus, solicitar um token para o seu site e então adicionar ao seu site no footer. O script do meu site ficou assim:

```js
var disqus_loaded = false;

function load_disqus()
{
    disqus_loaded = true;
    var disqus_shortname = 'willianjusten';
    var disqus_title = '{{page.title}}';
    var disqus_url = '{{page.url}}';
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    var ldr = document.getElementById('disqus_loader');
};
window.onscroll = function(e) {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800)) {
        //hit bottom of page
        if (disqus_loaded==false)
            load_disqus()
    }
};
```

Um detalhe que acho interessante, é não carregar o Disqus logo que o blog é aberto, afinal de contas, a pessoa não vai direto para os comentários. Assim a gente melhora a performance e carregamento de nosso blog. Um esquema que eu faço é analisar o tamanho da página e um pouco antes da página finalizar, eu disparo uma trigger que carrega o disqus.

Enquanto a pessoa vai lendo e descendo, eu faço o carregamento, quando o usuário chega nos comentários, já está carregado e ela não sofreu nenhum problema com isso, **usabilidade sempre!**

<h3 id="permalink">Como crio as urls amigáveis? (permalink)</h3>

Criar permalinks é a coisa mais fácil do mundo no Jekyll e isso é lindo demais =)
Basta definir no `_config.yml` como você quer que seja o link, seguem exemplos abaixo:

```yaml
# comportamento default
permalink: /:categories/:year/:month/:day/:title.html

# mostrando a categoria/titulo
permalink: /:category/:title

# mostrando somente o título
permalink: /:title/
```

Se quiser saber de mais alguns tipos, só olhar [aqui](http://jekyllrb.com/docs/permalinks/).

## Conclusão

Boooom, foi um post meio grandinho, mas com bastante coisa interessante para quem está querendo se aprofundar melhor em Jekyll. Sua dúvida foi solucionada com o post? Agradeça nos comentários =)
Não foi solucionada? Pergunta nos comentários e eu atualizarei constantemente com a resposta.
