---
layout: post
date: '2018-05-28 03:20:42'
image: /assets/img/cover.png
title: Criando um Codepen simples em poucas linhas
description: Aprenda a criar um live editor na web com poucas linhas de código.
introduction: Aprenda a criar um live editor na web com poucas linhas de código.
twitter_text: Aprenda a criar um live editor na web com poucas linhas de código.
main-class: js
color: '#D6BA32'
tags:
  - editor
  - js
---
## Introdução

Fala pessoal, faz um bom tempinho que não escrevo no blog e menos ainda sobre coisinhas técnicas. Então resolvi fazer um post simples de uma bobeirinha que fiz para uma palestra lá em [São Carlos](http://2018.devconf.opensanca.com.br/).

Eu queria muito fazer um live-coding, mas imaginei que não fosse ter internet e por isso o Codepen não iria funcionar. E aí o que eu pensei? Vou fazer um Codepen meu! Porque claro, eu tinha feito uma viagem de 11h de ônibus já era 1h da manhã, mas eu tinha que inventar besteira... No final deu tudo certo e umas pessoas até me perguntaram como funcionava e é tão idiota que tenho vergonha de mostrar, mas funciona xD

Como de costume, vou ouvindo música enquanto escrevo, hoje estou ouvindo vários remixes do [Neelix](https://www.youtube.com/watch?v=3TCTJ_Rqyf4&start_radio=1&list=RD3TCTJ_Rqyf4).

## Sobre o Editor

![Screenshot do editor](/assets/img/cover.png)

Assim como o codepen, ele basicamente tem 3 `textareas`, para html, css e js. E, claro, um live preview do que está acontecendo.

Se quiser ver funcionando, só [acessar aqui!](https://willianjusten.com.br/dumb-codepen/)

**Lembrando que é só um experimento e com isso não tem objetivo de ter o melhor código do mundo ou funcionar em todos os browsers.**

## Criando a estrutura

A primeira coisa que precisamos fazer é um `index.html` que vai ter os componentes necessários para funcionar:

```html
  <!-- Preview -->
  <iframe id="preview"></iframe>

  <!-- Editor -->
  <div class="editor">
    <textarea id="html" placeholder="HTML"></textarea>
    <textarea id="css" placeholder="CSS"></textarea>
    <textarea id="js" placeholder="JS"></textarea>
  </div>
```

É necessário ser um `iframe`, pois é nele que vamos jogar o código gerado dos 3 `textarea`. Tendo feito isso, vamos dar uma organizada na tela para ficar mais apresentável. Vamos criar um `style.css` e dentro dele vamos colocar:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

iframe {
  width: 100%;
  height: 50vh;
  border: none;
}

.editor {
  display: flex;
}

.editor textarea {
  background: #1E1F20;
  border: 1px solid #d3d3d3;
  color: #d3d3d3;
  flex: 1;
  font-size: 16px;
  height: 50vh;
}
```

## Fazendo funcionar

Agora nós precisamos fazer esse código funcionar né? E para isso, vamos criar um arquivo `app.js` que vai conter toda a lógica do nosso editor. Vou colocar todo o código abaixo e aí vou explicando os detalhes, que são bem simples na realidade.

```js
const htmlField = document.getElementById("html");
const cssField = document.getElementById("css");
const jsField = document.getElementById("js");
const preview = document.getElementById("preview");

function render() {
  let iframeComponent = preview.contentWindow.document;

  iframeComponent.open();

  iframeComponent.writeln(`
    ${htmlField.value}
    <style>${cssField.value}</style>
    <script>${jsField.value}</script>`);

  iframeComponent.close();
}

function compile() {
  document.addEventListener('keyup', function() {
    render();
  });
};

compile();
render();
```

Sim, todo o código necessário para criar esse editor está aí. Então vamos por partes. 

Primeiro é necessário criar os seletores para todos os nossos campos, que são criados nas linhas `1-4`.

Depois temos a função que faz a mágica acontecer, que é a `render()`, ela eu vou separar um pouquinho para explicar. 

A primeira coisa que precisamos fazer é pegar o iframe para poder editá-lo, por isso eu uso o [contentWindow.document](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow) que vai me liberar a API do `#document` do iframe, me permitindo assim editar todo o seu conteúdo.

Após isso, eu uso o `.open()` para abrir a edição e utilizo o [writeln](https://developer.mozilla.org/en-US/docs/Web/API/Document/writeln), que nada mais é que um processo de escrita. E aí, se você reparar, eu uso [Template String](https://willianjusten.com.br/criando-componentes-usando-so-es6/) para poder criar o conteúdo que vou adicionar. Que é o valor do html, o css que eu deixo inline encapsulado na tag `<style>` e o js que eu encapsulo na tag `<script>`. Feita essa adição eu fecho com o `.close()`.

Tendo isso, eu já consigo renderizar qualquer conteúdo dentro do iframe, mas como fazer para tornar isso automático? Ou seja, para cada edição, ele atualizar o iframe.

Isso fica a cargo do método `compile()`, onde eu crio um listener que a cada vez que uma tecla é levantada depois de digitar (`keyup`), eu chamo o método de `render()`.

Com essas duas funções, já está praticamente pronto. Eu só preciso chamar as funções ao final, uma para criar o listener e a de render para renderizar na tela, caso já tenha algum conteúdo no textarea (isso é útil para quando já deixamos um código preparado já no html).

## Deixando ainda mais legal

Como você pode ver, depois disso, o nosso editor já está funcionando, yey! Só que eu queria deixar ele mais bonitinho, adicionando, por exemplo, um `syntax highlight` para cada caixa do editor, assim fica mais legal de codar. 

Pensando nisso, eu resolvi usar o [Prism](http://prismjs.com/), que inclusive é o mesmo que uso aqui no blog para mostrar os códigos.

E para funcionar, algumas pequenas mudanças precisaram ser feitas, primeiro no `index.html`, eu adicionei para cada `textarea` a linguagem e também removi o placeholder (explico mais a frente o porquê), ficando assim:

```html
<!-- Estilos do editor -->
<link rel="stylesheet" href="css/prism.css">
<link rel="stylesheet" href="css/style.css">

<iframe id="preview"></iframe>

<div class="editor">
  <textarea id="html" class="language-html"></textarea>
  <textarea id="css" class="language-css"></textarea>
  <textarea id="js" class="language-js"></textarea>
</div>

<!-- Arquivos do editor e highlight -->
<script src="js/prism.js"></script>
<script src="js/prism-highlight.js"></script>
<script src="js/app.js"></script>
```

Também adicionei os scripts do [prism.js](https://github.com/willianjusten/dumb-codepen/blob/master/js/prism.js), [prism.css](https://github.com/willianjusten/dumb-codepen/blob/master/css/prism.css) e o [prism-highlight](https://github.com/willianjusten/dumb-codepen/blob/master/js/prism-highlight.js).

Uma mágica que o `prism-highlight` faz é transformar os `textarea` em `pre` com o `contenteditable` para poder digitar normalmente, mas ele poder adicionar as tags que fazem as cores da sintaxe. Desta forma, nós precisamos fazer uma pequena alteração em nosso `app.js`, pois estávamos pegando os valores usando o `value` e agora vamos ter que usar o `innerText`, fazendo o código ficar assim:

```js
iframeComponent.writeln(`
  ${htmlField.innerText}
  <style>${cssField.innerText}</style>
  <script>${jsField.innerText}</script>`);
```

Com essas mudanças, nosso editor já tem um syntax highlight lindão e o resto todo funcionando! =)

Como eu tirei o placeholder, já que agora é um `pre`, eu resolvi no css adicionar as seguintes linhas para deixar bonitinho uma label para cada campo e também precisei renomear onde era `textarea` para `pre`, ficando assim:

```css
.editor pre {
  background: #1E1F20;
  border: 1px solid rgb(211, 211, 211);
  color: rgb(211, 211, 211);
  flex: 1;
  font-size: 16px;
  height: 50vh;
  padding: 30px 10px;
  margin: 0;
  position: relative;
}

.editor pre:before {
  display: block;
  font-size: 12px;
  position: absolute;
  top: 10px;
  left: 10px;
}

#html:before {
  content: 'HTML';
}

#css:before {
  content: 'CSS';
}

#js:before {
  content: 'JS';
}
```

Se você quiser ver o código inteiro, segue o [repositório no Github](https://github.com/willianjusten/dumb-codepen), inclusive, se você quiser sugerir melhorias e inclusive falar que tá uma merda e refazer, sinta-se a vontade! =D

## Conclusão

Bom pessoal, é só isso, espero que tenham gostado do post e achado interessante e útil de alguma forma. O objetivo desse post é mostrar que por mais que já exista algo e, na maioria vezes, muito superior, você sempre pode criar seus próprios projetinhos e não há nada de errado nisso. É sempre bom exercitar seus conhecimentos e subir isso no Github, além de você estar [contribuindo com o Open Source](https://willianjusten.com.br/guia-como-contribuir-em-open-source/), você está aprendendo e se divertindo.
 
 
