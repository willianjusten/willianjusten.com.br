---
layout: post
title: "Share Buttons sem dependências"
date: 2015-05-01 10:57:03
image: '/assets/img/share-buttons/main.png'
description: "Ser social é muito importante, então nada melhor do que fazer com que o seu usuário consiga compartilhar mais fácil seu conteúdo."
main-class: 'dev'
color: '#637a91'
tags:
- social
- tutorial
categories:
twitter_text: "Aprenda a criar social share buttons sem dependências para o seu site."
introduction: "Ser social é muito importante, então nada melhor do que fazer com que o seu usuário consiga compartilhar mais fácil seu conteúdo. Saiba como criar botões de share sem dependências."
---

## Introdução

Enquanto eu escrevo vou ouvindo um dos músicos que eu mais gosto e sou influenciado, grande [Bob Dylan](https://open.spotify.com/artist/74ASZWbe4lXaubB36ztrGX).

Faz um tempinho que não escrevo e nesse tempo recebi vários pedidos por email sobre alguns assuntos. Então resolvi que vou voltar a escrever e resolver email por email. E o primeiro email foi do Erick Alexandre:

> Olá Willian.
> Cara acompanho seu trabalho no site willianjusten.com.br já faz um tempo, e suas dicas sempre me ajudaram muito. Até por isso quero te agradecer, "Muito obrigado".
Mas hoje cara quero te pedir um favor, gostei muito dos seus botões addthis e queria te pedir pra me ensinar, como posso colocá-los no meu blog para compartilhamento.

Além de ensinar como fazer, eu vou explicar um pouquinho sobre essa prática, quais vantagens e desvantagens e como corrigir essas desvantagens.

## Facilidade de compartilhar

Com um simples clique, os visitantes de seu site podem dizer se gostaram e compartilhar com todas as redes sociais. Assim o seu conteúdo pode atravessar rapidamente pela internet, alcançando novos usuários. Se o seu objetivo envolver criar conteúdo para promover os seus produtos ou serviços, é natural que você queira que várias pessoas os vejam. Se for um blog, você vai querer que mais pessoas leiam sobre suas besteiras.

É claro que o usuário pode copiar a url e colar onde quer que seja para compartilhar, mas é muito mais fácil ele clicar num botão, que já o leva para a rede desejada e de quebra já coloca um textinho padrão para compartilhar.

### Sites com share buttons são linkados sete vezes mais no twitter

De acordo com uma [pesquisa da Entrepreneur](http://www.entrepreneur.com/article/220720#), os sites que já possuem share buttons são mais compartilhados, pela facilidade do usuário em compartilhar e também por mostrar indiretamente para o usuário, o que seria o próximo passo, compartilhar.

## Problemas de performance

O maior de todos os problemas desses botões é que eles carregam muitas coisas, que acabam prejudicando bastante a performance do seu site, além de poder correr o risco de bloquear a renderização de outras coisas.

Aqui abaixo coloco os links que as próprias redes sociais disponibilizam:

* [Facebook](https://developers.facebook.com/docs/plugins/share-button)
* [Twitter](https://publish.twitter.com/)

Criando cada um desses botões e adicionando somentes eles em uma página, temos cerca de 41 requests, dentre arquivos `js`, `json`, `png`...

## Como corrigir isso?

Cada uma dessas redes sociais possui uma url para share também, que nos facilita bastante, visto que basta utilizarmos e passarmos os parâmetros certos e nada externo será requisitado.

### Twitter

* URL: [https://twitter.com/intent/tweet](https://twitter.com/intent/tweet)
* Parâmetros: `url`, `text`, `via`, `related`, `hashtags`
* Ver mais em: [https://dev.twitter.com/docs/intents#tweet-intent](https://dev.twitter.com/web/tweet-button/web-intent)

#### Modo de uso

```html
<a aria-label="Compartilhe no Twitter" href="https://twitter.com/intent/tweet?url=seusite/&amp;text=seutexto&amp;via=seutwitter" onclick="window.open(this.href, 'twitter-share', 'width=550,height=235');return false;" title="Compartilhe no Twitter">Compartilhe no Twitter</a>
```

Exemplo de uso no meu blog, como utilizo Jekyll, eu deixo os dados serem gerados diretamente pelo meu "backend". Você pode fazer o mesmo usando a linguagem do seu backend.

```html
<a aria-label="Compartilhe no Twitter" href="https://twitter.com/intent/tweet?text=&quot;{{ page.twitter_text }}&quot;%20{{ site.url }}{{ page.url }}%20via%20&#64;{{ site.twitter_username }}&hashtags={% for tag in page.tags %}{{tag}},{% endfor %}"
    onclick="window.open(this.href, 'twitter-share', 'width=550,height=235');return false;" title="Compartilhe no Twitter">
        <svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>
    </a>
```

### Facebook

* URL: [https://www.facebook.com/sharer/sharer.php](https://www.facebook.com/sharer/sharer.php)
* Parâmetros: `u`

#### Modo de uso

```html
<a aria-label="Compartilhe no Facebook" href="https://www.facebook.com/sharer/sharer.php?u=linkdoseusite" onclick="window.open(this.href, 'facebook-share','width=580,height=296');return false;" title="Compartilhe no Facebook"> Compartilhe no Facebook</a>
```

Exemplo de uso no meu blog:

```html
  <a aria-label="Compartilhe no Facebook"href="https://www.facebook.com/sharer/sharer.php?u={{ site.url }}{{ page.url }}"
    onclick="window.open(this.href, 'facebook-share','width=580,height=296');return false;" title="Compartilhe no Facebook">
        <svg class="icon icon-facebook"><use xlink:href="#icon-facebook"></use></svg>
    </a>
```

## Detalhes

```js
 onclick="window.open(this.href, 'título da janela', 'width=490,height=530');return false;"
```

Se você notar, eu além de colocar os links, também coloquei uma função de `onclick`. Essa função servirá para criar uma nova janela, recebendo a url passada, um título e o tamanho da janela. Isso serve para que o usuário não saia do meu site enquanto compartilha.

## Extra

Meu amigo [Cleyson Leal](https://twitter.com/cleysonlb) me falou que quando precisa criar links rapidinhos utiliza o [Share Link Generator](http://www.sharelinkgenerator.com/), já utilizei também. Para quem não vai usar backend para nada e só precisa criar um link, também é uma boa pedida.

## Conclusão

Vimos que a função de share é importante e não precisamos mais depender de libs externas para fazer esse trabalho, com isso nossos sites carregam mais rápido e não perdem suas funcionalidades.

Com o exemplo acima, nós temos só a funcionalidade, mas nosso botão ainda está sem nenhum estilo, você pode se inspirar e criar várias coisinhas legais, desde o minimalista, como fiz no meu blog, até algo bastante detalhado e com mil efeitos. Segue aqui o [link do codepen](http://codepen.io/search?q=share&limit=all&depth=everything&show_forks=false), em que você pode se inspirar um pouquinho.

Você tem alguma dúvida e quer que ela seja explicada aqui? Basta falar comigo pelas redes sociais ou me mandar um email, ficarei super feliz de ajudar. Abraços e até mais!
