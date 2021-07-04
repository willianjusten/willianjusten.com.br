---
layout: post
date: 2017-07-07T13:09:11.000Z
image: /assets/img/componentes-es6/componentes.png
title: Criando componentes usando só ES6
description: Muita gente usa React, outros usam Vue e outros Angular. Por que não só ES6?
introduction: Muita gente usa React, outros usam Vue e outros Angular. Por que não só ES6?
twitter_text: Muita gente usa React, outros usam Vue, etc. Por que não só ES6?
main-class: js
color: "#D6BA32"
tags:
  - js
  - es6
---
## Introdução

Faaaaala pessoal, hoje eu venho trazendo um post bem legal, que sempre acabo me perguntando. Será que precisamos usar React/Vue/Angular para criar componentes sempre? Se for algo simples, por que não usar ES6 puro?

Esse post está sendo feito para comemorar o lançamento do meu mais novo curso que é o [Curso Completo de JavaScript Moderno - ES6](https://www.udemy.com/curso-completo-de-javascript-moderno-es6/?couponCode=LANCAMENTO50), aproveite que ele tá com um cupom de desconto que deixa o valor final em **R$ 50,00**! Basta clicar no link ali, mas seja rápido, os cupons já estão acabando! =D

Nesse post irei falar sobre uma propriedade do ES6 que curto muito que é a [Template Strings](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings).

E durante esse post eu vou ouvindo a trilha sonora de um dos mais belos jogos desse ano [Horizon Zero Dawn](https://open.spotify.com/album/5ZAaYcFudS0BtKhWJqeMCH), o jogo é incrível e a trilha sonora é ainda melhor, bota para ouvir, garanto que não vai se decepcionar!

## Trabalhando com Strings no passado

As `strings` são representadas no JavaScript utilizando as aspas simples `'minha string'` ou aspas duplas `"minha string"`. Mas para algumas tarefas em JS, trabalhar com strings era bem chatinho, como, por exemplo, para trabalhar com múltiplas linhas, o código precisava ser assim:

```js
const text = 'Minha primeira linha\n' +
             'Minha segunda linha\n' +
             'Minha terceira linha.';

console.log(text);

// > Minha primeira linha
//   Minha segunda linha
//   Minha terceira linha
```

Repare que precisávamos utilizar o operador `+` para concatenar as strings e não só isso, precisávamos também utilizar o `\n` para indicar uma quebra de linha.

Outro caso em que era bem chatinho trabalhar com strings era essa parte da concatenação, onde precisávamos quebrar a string e usar o `+` para juntar com nossa variável. Dessa forma:

```js
const name = 'Willian';

console.log('Hello ' + name + '!');

// > Hello Willian!
```

Precisávamos inclusive prestar atenção para não esquecer o espaço depois da palavra, porque senão juntava com a variável e ficava tudo horrível.

## Trabalhando com Strings no ES6

Com a chegada do ES6, veio essa coisa maravilhosa que é o Template String. Agora basta utilizarmos o símbolo de crase **`** na string e conseguimos criar interpolações e concatenar muito mais facilmente.

Para trabalhar com múltiplas linhas ficaria assim:

```js
const text = `Minha primeira linha
              Minha segunda linha
              Minha terceira linha.`;

console.log(text);

// > Minha primeira linha
//   Minha segunda linha
//   Minha terceira linha
```

E para trabalhar com interpolação, podemos utilizar a sintaxe `${variavel}` dentro da string, desse forma:

```js
const name = 'Willian';

console.log(`Hello ${name}!`);

// > Hello Willian!
```

Outra coisa legal é que podemos adicionar funções dentro dessas strings para rodar, um exemplo:

```js
function sum(a, b) {
    return a + b;
}

console.log(`2 + 2 = ${sum(2, 2)}`);

// > 2 + 2 = 4
```

Isso abre diversas possibilidades e facilita demais na escrita e leitura do nosso código.

## Criando templates

Aí você vem e pergunta: "Tá Willian, mas o que isso tem a ver com componentes?". E eu respondo, tem tudo! Antigamente nós utilizávamos coisas como [Handlebars](http://handlebarsjs.com/) e outros mais para poder criar templates e assim formar componentes. Mas agora com o Template String, nós podemos usar esse poder para criar nossos próprios componentes! =D

Se você quiser já ver o que vamos criar direto, só acessar esse [link do codepen](https://codepen.io/willianjusten/pen/ZyMMbd).

### Criando método para montar o markup

O primeiro componente que iremos criar será o componente onde mostra as informações do album, conforme a imagem abaixo:

![Imagem mostrando capa do album, o nome do mesmo e a quantidade de músicas](/assets/img/componentes-es6/album-info.png)

Para isso teríamos um Markup da seguinte forma:

```html
    <img class="album-image" src="..." alt="Ten">
    <p class="album-title">Ten</p>
    <p class="album-artist">Pearl Jam</p>
    <p class="album-counter">11 Músicas</p>
```

E transformando isso para o nosso lindo ES6, ficaria assim então:

```js
function createMarkupAlbum(data) {
  return (`
    <img class="album-image" src="${data.images}" alt="${data.name}">
    <p class="album-title">${data.name}</p>
    <p class="album-artist">${data.artists}</p>
    <p class="album-counter">${data.tracks.length} Músicas</p>
  `);
}
```

Onde o `data` é a informação que pode vir de uma `API`, `json` ou até mesmo uma `variável`, como utilizada no exemplo.

### Criando método para renderizar o markup

Depois de criada o método de montar o markup, precisamos renderizar na tela e para isso é bastante simples. Precisamos basicamente selecionar um elemento do DOM e usar o `innerHTML` para apendar o nosso markup criado, que nada mais é que uma string =D

```js
function renderAlbumInfo(data, element) {
  const markup = createMarkupAlbum(data);
  element.innerHTML = markup;
};
```

Repare que o meu método chama internamente o `createMarkupAlbum` que vai montar o nosso markup recebendo a informação do nosso `data` passado e depois disso, apenderemos o markup no `element` definido.

### Chamando o método e pintando na tela

Com os nossos métodos criados, precisamos só então criar um elemento no html para apendar nosso componente na tela e chamar o método para fazê-lo.

```js
const album = document.getElementById('album');
renderAlbumInfo(data, album);
```

### Criando markups mais complexos e utilizando funções

Com o código feito acima, já temos as informações do album, mas ainda faltam as músicas ao lado. Conforme a imagem abaixo:

![Lista de músicas do album](/assets/img/componentes-es6/album-list.png)

Se vocês repararem, dentro dessa lista temos um padrão básico, que é sempre: `Número da Música - Nome da Música - Tempo`. O que podemos fazer então é criar um loop para criar música depois de música e então apendar a lista inteira.

Nosso conjunto de dados para as `tracks` é um array da seguinte forma:

```js
"tracks" : [
    {
      "duration_ms" : 231367,
      "spotify" : "https://open.spotify.com/track/4nRyBgsqXEP2oPfzaMeZr7",
      "name" : "Once",
      "track_number" : 1
    }, {
      "duration_ms" : 292580,
      "spotify" : "https://open.spotify.com/track/6QewNVIDKdSl8Y3ycuHIei",
      "name" : "Even Flow",
      "track_number" : 2
    }...
]
```

Para isso podemos utilizar o método `map` que vai iterar cada item dessa lista e vai criar o markup para nós. Ao final de cada iteração vamos usar o método `join('')` para unir as strings criando a lista completa. O código fica assim:

```js
function createMarkupTracks(tracks) {
  return tracks.map(track => `
    <div class="music">
      <p class="music-number">${track.track_number}</p>
      <p class="music-title">${track.name}</p>
      <p class="music-duration">${convertToHumanTime(track.duration_ms)}</p>
    </div>`).join('');
}
```

Repare que ali eu ainda tenho uma função `convertToHumanTime`, ela é necessária pois no meu array eu estou recebendo o tempo em `ms`, que não é tão legível para nós. Então como eu posso utilizar funções dentro dos meus templates, eu crio essa função do lado de fora, que fica desse jeito:

```js
function convertToHumanTime(duration) {
  let s = parseInt((duration / 1000) % 60, 10);
  const m = parseInt((duration / (1000 * 60)) % 60, 10);

  s = (s < 10) ? `0${s}` : s;

  return `${m}:${s}`;
}
```

Depois disso é só criar a função para apendar esse markup igual feito anteriormente:

```js
function renderAlbumTracks(data, element) {
  const markup = createMarkupTracks(data);
  element.innerHTML = markup;
}

const list = document.getElementById('list');
renderAlbumTracks(data.tracks, list);
```

E é isso gente! Nosso componente está prontinho e renderizado na tela! =D

Para ver o código completo, só ir lá no [link do codepen](https://codepen.io/willianjusten/pen/ZyMMbd).

### Separando em diferentes arquivos e usando import/export

Só para complementar o código, podemos separar esses métodos e importá-los num arquivo `main` que será responsável por fazer tudo isso. Um exemplo seria:

```js
function createMarkup(data) {
  return (`
    <img class="album-image" src="${data.images[0].url}" alt="${data.name}">
    <p class="album-title">${data.name}</p>
    <p class="album-artist">${data.artists[0].name}</p>
    <p class="album-counter">${data.tracks.total} Músicas</p>
  `);
}

export default function renderAlbumInfo(data, element) {
  const markup = createMarkup(data);
  element.innerHTML = markup;

  return data;
};
```

Repare que eu estou exportando somente a função `renderAlbumInfo`, deixando assim o método `createMarkup` como privado, assim não corro o risco da criação do meu markup ser poluído por outro código.

E aí no meu arquivo `main` eu teria algo como:

```js
import renderAlbumInfo from './AlbumInfo';

const albumInfo = document.getElementById('album-info');

spotify.album.getAlbum(albumId)
    .then(data => renderAlbumInfo(data, albumInfo))
```

Onde o meu `data` está sendo extraído da própria API do Spotify e alimentando o meu método `renderAlbumInfo`.

## Conclusão

É isso galera, sei que o React/Vue/Angular fazem muito mais do que isso, mas as vezes nem precisamos deles se quisermos criar componentes básicos e as vezes até complexos xD