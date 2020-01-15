---
layout: post
date: '2018-03-21 04:55:37'
image: /assets/img/cover-critical.jpg
title: 'Perfomance Web: Critical CSS e Jekyll'
description: >-
  A web é lenta, mas sempre podemos deixar mais rápido, mais uma dica simples
  para melhorar seus sites.
introduction: >-
  A web é lenta, mas sempre podemos deixar mais rápido, mais uma dica simples
  para melhorar seus sites.
twitter_text: >-
  A web é lenta, mas sempre podemos deixar mais rápido, mais uma dica simples
  para melhorar seus sites.
main-class: dev
color: '#637a91'
tags:
  - performance
  - css
  - jekyll
categories:
  - Performance Web
---
## Introdução

Olá galera, continuando com os [posts sobre performance](https://willianjusten.com.br/series/#performance-web), hoje vamos falar sobre uma técnica bem interessante e importante para que possamos entregar nosso site de forma mais eficiente.

Enquanto vou escrevendo esse post, vou ouvindo [Kishi Bashi](https://open.spotify.com/artist/3LVPGE5jPPwtbGslx07YR0?si=6_TVym1hRf60MBJaNh-3tg), um multi-instrumentista fantástico!

## Render Blocking

Se você usou o Lighthouse que falamos [post sobre a ferramenta](https://willianjusten.com.br/medindo-performance-do-seu-site-com-lighthouse/), talvez tenha visto algo como mostrado na imagem abaixo:

![Imagem mostrando sobre o render blocking](/assets/img/screen shot 2018-03-20 at 20.42.21.png)

Ele diz que estilos carregados externamente bloqueiam a renderização da página e diz para considerar usar o CSS crítico via `<style>` e carregar o não-crítico depois. Mas o que isso significa? De acordo com o Google:

> Por padrão, o CSS é tratado como um recurso bloqueador de renderização, o que significa que o navegador não renderiza nenhum conteúdo processado até que o CSSOM seja construído. Certifique-se de manter o seu CSS enxuto, entregá-lo o mais rápido possível e usar tipos e consultas de mídia para desbloquear a renderização.

Ou seja, na hora da renderização, o mínimo para poder gerar a página é que o DOM  (formado pelo HTML) e CSSOM sejam montados, só então a página vai começar a aparecer/renderizar para o usuário. Abaixo segue um print de como o Chrome mostra o processo de renderização do meu blog. Repare que com exceção dos cards (que eu faço uma animação), o blog já renderiza a página quase no mesmo instante que a página é requisitada.

![Imagem da renderização do blog](/assets/img/rendering.png)

Tendo isso em mente, já sabemos então, que o CSS precisa ser carregado logo no início e é por essa razão, que sempre nos foi aconselhado a colocar a requisição logo no `<head>`. Só que o problema de ser um arquivo externo é que primeiro o browser faz uma requisição ao site, que recebe o html, começa a ler e vê que precisa carregar o css e aí faz a requisição, todo o tempo que isso está ocorrendo, o usuário está vendo uma página em branco, o que não é legal né...

## Mas então o que é Critical CSS?

O `Critical CSS` é o CSS mínimo possível necessário para renderizar a "primeira dobra" de uma página. Quando um usuário abre sua página, antes dele começar a rolar a página, essa é considerada "primeira dobra". Um exemplo pegando uma página minha:

![Exemplo cortando a primeira dobra](/assets/img/critical.png)

Como pode ver, o css necessário é do header, hero e tipografia. Não preciso, por exemplo, do css usado na home, outras páginas e coisas mais abaixo desse retângulo vermelho.

## Mas e como fazer isso?

Bom, depende muito da estrutura do seu site, mas existem ferramentas que auxiliam na criação desse CSS. Uma das ferramentas mais famosas é a [Critical](https://github.com/addyosmani/critical) criada pelo grande Addy Osmani, um dos engenheiros mais preocupados com performance na Google.

Não vou entrar muito na explicação da ferramenta, pois a documentação já tem tudo de forma bem completa. Mas, primeiro você instala a ferramenta rodando `npm install --save critical` e um exemplo de como usar é:

```js
critical.generate({
    base: 'test/',
    src: 'index.html',
    dest: 'styles/main.css',
    width: 1300,
    height: 900
});
```

Veja que você define qual a página a ser testada, no caso o `index.html` e quais as dimensões, que no caso é `1300x900`. Você pode usar a ferramenta de forma independente como mostrado acima, mas também tem plugin para todos os bundlers:

- [Webpack Plugin Critical](https://www.npmjs.com/package/webpack-plugin-critical)
- [Gulp](https://github.com/addyosmani/critical-path-css-demo#tutorial)
- [Grunt Critical CSS](https://github.com/filamentgroup/grunt-criticalcss)

Como eu disse, cada site/plataforma vai exigir um cuidado diferente e um jeito diferente de se criar esse CSS crítico. Se você não conseguir utilizar a ferramenta por certas limitações, aqui vão minhas dicas. Se você usar um pre-processador, crie folhas de estilo separadas de acordo com a página que você tiver e tente separar para gerar o que você imagina que vá ser a primeira dobra nos seus testes. E aí tente incluir de forma inline nos seus templates. Abaixo eu vou contar meu processo no meu blog.

## Como fazer no Jekyll?

Como sabem, meu blog é feito em Jekyll desde o primeiro dia e eu escrevi como fiz o blog nessa [parte 1](https://willianjusten.com.br/making-of-parte-1/) e [parte 2](https://willianjusten.com.br/making-of-parte-2/). Em resumo, eu utilizo o Gulp+Stylus para gerar meu CSS e o resto da compilação. Como eu já fazia esse processo, bastou eu pensar numa forma de separar o css para dividir em 3 partes:

- Home.css (necessário para minha home)
- Post.css (necessário para a página de posts)
- Minimal.css (necessário para as páginas de about/tags/series)

Se você utilizar o Sass padrão no Jekyll, também é bem simples, basta criar os arquivos separados e importar os partials, que são iniciados com o `_` como `_cards.sass`. O importante é que você precisa mandar gerar os arquivos css finais dentro da pasta `includes`, pois assim, você consegue incluir o css como se fosse um arquivo de texto comum, ou seja, um inline css. Você pode olhar minha [pasta de includes](https://github.com/willianjusten/willianjusten.com.br/tree/ecde3bd2481c24889932e1abaa5900a68cdc7769/_includes) do blog, que verá os arquivos de css lá.

Depois dos arquivos já no `includes`, você vai adicionar o css nos templates, exemplo:

```html

<!-- _layouts/default.html -->

<style type="text/css">
    { % include home.css % }
</style>
```

Você pode ver o [exemplo do meu blog aqui](https://github.com/willianjusten/willianjusten.com.br/blob/ecde3bd2481c24889932e1abaa5900a68cdc7769/_layouts/default.html#L10-L12). Com isso, a página irá ter somente o css de forma `inline`, além de evitar um block rendering, você vai evitar uma requisição extra, yey!

## Conclusão

Espero que tenham entendido a importância do CSS crítico e que eu tenha gerado boas ideias para vocês. Para quem estiver usando Jekyll ou outro gerador estático, deu para ver que é bem fácil de fazer. Rumo a uma web mais rápida! \o/
