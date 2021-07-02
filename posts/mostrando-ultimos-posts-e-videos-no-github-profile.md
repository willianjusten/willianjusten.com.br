---
layout: post
date: 2020-08-10 08:44:05
image: /assets/img/github-profile-cover.png
title: Mostrando últimos posts e vídeos no Github Profile
description: Como utilizar o Github Actions para manter seu profile atualizado e bonito.
introduction: Como utilizar o Github Actions para manter seu profile atualizado e bonito.
twitter_text: Como utilizar o Github Actions para manter seu profile atualizado e bonito.
main-class: misc
color: "#7AAB13"
tags:
  - git
  - github
---
## Introdução

Fala pessoal, mantendo a ideia de ter vídeo, mas também ter post escrito, hoje eu vou falar sobre um vídeo que fiz recentemente que é o [Mostrando últimos posts e vídeos no Github Profile](https://youtu.be/tGYyamj4gTA).

O Github lançou essa atualização deve ter aí, por volta de 1 mês, mas ainda tem muita gente que não sabe como fazer e outros que gostariam de fazer um "algo a mais", como, por exemplo, mostrar os últimos posts escritos e coisas do gênero, então vamos aprender como faz isso.

## Versão em vídeo

Para quem quiser assistir a versão em vídeo desse post, segue aí:

<iframe width="560" height="315" src="https://www.youtube.com/embed/tGYyamj4gTA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Sobre o Github Profile

O Github Profile, é aquela caixa de informações que aparece no perfil de algum usuário no Github, abaixo segue um print de como é o meu [perfil no Github](https://github.com/willianjusten).

![Foto da interface do Github com minha foto a esquerda e uma lista de informações a direita.](/assets/img/github-profile.png)

Existem de diferentes formas, algumas super criativas, outras mais simples, segue abaixo uma lista de alguns:

* [@sindresorhus](https://github.com/sindresorhus)
* [@ABSphreak](https://github.com/ABSphreak)
* [@AVS1508](https://github.com/AVS1508)
* [@afc163](https://github.com/afc163)

E se você quiser mais ideias, tem essa [lista cheia de inspirações](https://github.com/coderjojo/creative-profile-readme).

## Criando o repositório e configurando

Para poder criar esse perfil especial, basta que você crie um repositório com o mesmo nome do seu usuário, o meu por exemplo é [willianjusten/willianjusten](https://github.com/willianjusten/willianjusten), e no momento que você estiver criando o repositório, irá aparecer parecido com a imagem abaixo:

![Uma mensagem dizendo que você encontrou um segredo, que o repositório é um perfil especial.](/assets/img/github-profile-2.png)

Agora com o repositório criado, basta montar um arquivo `README.md` com as informações que você desejar, no meu caso, de início ficou:

```md
### <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="30px"> Hello, I'm Willian!

💻 Software Engineer and Instructor at [Willian Justen Cursos](https://willianjusten.com.br/cursos) <br>
🏡 Brazilian, Based in Petrópolis, RJ - but most of the time traveling around the world 🌎

### You can find me on

📺 [Youtube](https://www.youtube.com/WillianJustenCursos/?sub_confirmation=1) <br>
🐦 [Twitter](https://twitter.com/Willian_justen) <br>
📷 [Unsplash](https://unsplash.com/@willianjusten) <br>
⚛️ [My site](https://willianjusten.com.br) <br>

```

## Criando a Github Action

Com o `README.md` feito acima, nós já teríamos algumas informações para o nosso profile, mas eu queria ir um pouco além e colocar uma lista com meus últimos posts aqui do blog e também os últimos vídeos lá do [meu YouTube](https://www.youtube.com/WillianJustenCursos/?sub_confirmation=1).

Para fazer isso, eu utilizei essa [Github Action](https://github.com/gautamkrishnar/blog-post-workflow), que busca dados baseados em feed RSS. Na documentação ele explica o passo-a-passo e mais alguns detalhes, e no meu ficou assim:

```yml
name: Latest blog post workflow
on:
  push:
  schedule:
    # Runs every hour
    - cron: "0 * * * *"

jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest blog posts
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: gautamkrishnar/blog-post-workflow@master
        with:
          comment_tag_name: BLOG
          feed_list: "https://willianjusten.com.br/feed.xml"

      - uses: gautamkrishnar/blog-post-workflow@master
        with:
          comment_tag_name: YOUTUBE
          feed_list: "https://www.youtube.com/feeds/videos.xml?channel_id=UCa12brLWzCqnxN0KOyjfmJQ"
```

Ali no `on` eu digo que quero que a action rode em todo `push` e também programo para rodar de hora em hora.

Depois eu defino as 2 `steps` do meu `job` principal, cada uma irá pegar as informações de um local. É importante notar, que eu utilizei o `comment_tag_name`, pois eu vou precisar desses nomes para a próxima etapa.

Ali na parte de blog, basta que você passe um link de feed válido, o meu no caso é o [feed.xml](https://willianjusten.com.br/feed.xml). E para o Youtube, é só passar modificando para o id do seu canal.

Com essa configuração feita, nós só precisamos editar o `README.md` para que a action saiba onde inserir os links:

```md
### 📕 Latest Blog Posts

<!-- BLOG:START -->
<!-- BLOG:END -->

### 📺 Latest Videos on YouTube

<!-- YOUTUBE:START -->
<!-- YOUTUBE:END -->
```

Repare que eu utilizo a regra de passar `COMMENT_TAG:START` e `COMMENT_TAG:END`, essa `comment_tag` é exatamente a que definimos lá na nossa action.

Depois disso, basta subir no Github e a action irá rodar para você e buscar as informações! =D

## Conclusão

Espero que tenham gostado dessa dica, é bem simples, mas vai permitir que você "sobressaia" com seu Github, sem contar que vai ajudar a divulgar alguns dos seus links de uma forma bem simples! =D