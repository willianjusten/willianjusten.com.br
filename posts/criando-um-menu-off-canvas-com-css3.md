---
layout: post
title: 'Criando um menu Off Canvas com CSS3'
date: 2015-11-01 13:01:02
image: '/assets/img/off-canvas/main.png'
description: 'Aprenda a criar um menu off canvas usando CSS3 Transitions e Transforms.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - frontend
  - tutorial
categories:
twitter_text: 'Aprenda a criar um menu off canvas usando CSS3.'
introduction: 'Aprenda a criar um menu off canvas usando CSS3 Transitions e Transforms e um pouquinho de javascript.'
---

## Introdução

Como eu disse no post anterior, vou tentar voltar a escrever um pouquinho mais e para isso escolhi uma coisa que há muito tempo já haviam me perguntado, que era, como criar um menu off canvas como eu uso nesse blog. A trilha sonora de hoje vai ser [Forever Alone](https://open.spotify.com/playlist/5ngzYTyvT5UnRSoTj0rUPC?si=yZfinALfRiShVsb2cKKICQ) (que minha namorada não leia isso =o).

## Off Canvas

Esse menu passou a ser mais famoso com o uso de dispositivos mobile, onde não possuímos tanto espaço em tela para poder ter um menu lateral. Então nada melhor do que esconder e mostrar só quando necessário né?

Se você é daqueles que gosta de ver funcionando primeiro, segue a [DEMO](https://labs.willianjusten.com.br/menu-off-canvas/#).

**O exemplo mostrado aqui abaixo está bem simplificado sem o uso de prefixos para os browsers e pode ser instável em certas versões. Por favor, utilize um auto-prefixer para que tudo fique correto =)**

## Funcionamento

O funcionamento é bem básico e consiste de trabalhar com camadas deslocadas. Vamos imaginar os seguintes elementos:

- `Wrapper`: elemento do tamanho da viewport da tela.
- `Canvas`: área onde teremos nosso conteúdo de fato.
- `Menu`: nosso menu.

Em seu primeiro momento, teremos o menu totalmente fora do `wrapper` e o canvas ocupando toda a tela, conforme imagem abaixo:

![Menu Off Canvas do lado de fora](/assets/img/off-canvas/layer-1.png)

Para que o menu apareça na tela, o que fazemos é deslocar tudo para o lado direito, ou seja, no `eixo X` e assim o menu passa a aparecer e um pedaço do nosso canvas sai da tela, conforme imagem abaixo:

![Menu Off Canvas do lado de dentro](/assets/img/off-canvas/layer-2.png)

## HTML

Bom, vamos começar a mão na massa, porque isso é tão fácil de fazer e já estou enrolando muito. Primeiro de tudo, vamos montar nossa estrutura, que vai seguir basicamente aquelas 3 camadas ditas acima.

```html
<body>
  <div class="wrapper">
    <div class="canvas">
      <div class="menu"></div>
    </div>
  </div>
</body>
```

Dentro dessas camadas, vamos colocar algum conteúdo, só para não ficar muito vazio.

```html
<body>
  <div class="wrapper">
    <div class="canvas">
      <!-- Aqui fica o menu escondido -->
      <div class="menu">
        <a href="#" class="toggle-menu btn">Fechar o menu</a>
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
        </ul>
      </div>
      <!-- Aqui fica o conteúdo do site -->
      <div class="conteudo">
        <a href="#" class="toggle-menu">Abrir o menu</a>
        <h1>Menu Off Canvas!!</h1>
        <p>Uma simples demo mostrando como funciona o menu off canvas.</p>
        <p>
          Tutorial em
          <a
            href="https://willianjusten.com.br/criando-um-menu-off-canvas-com-css3/"
            >willianjusten.com.br</a
          >
        </p>
      </div>
    </div>
  </div>
</body>
```

Note também, que eu criei um botão com a seguinte classe `toggle-menu`, que vai ser responsável por fazer a mágica de abrir e fechar o menu.

## CSS

### Wrapper

Depois de montada a estrutura, precisamos deixar um pouco bonitinho e fazer a mágica acontecer. Primeiro vamos montar nosso `wrapper`, ele é o responsável por segurar o conteúdo de nosso site e "esconder" as coisas que estiverem por fora dele, por esse motivo iremos utilizar a propriedade `overflow: hidden`, que vai esconder essas coisinhas.

```css
.wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 3000px; /* só para deixar a página grande*/
}
```

### Canvas

O canvas nada mais é que nossa tela e que será responsável por se mover pelas laterais junto com o menu, ou seja, movimentos no `eixo X`. Em seu estado inicial, ele deverá assumir que `x é igual a 0`, visto que ainda não se moveu. Coloquei também uma `transition` só para que o efeito seja suave e bonitinho <3

```css
.canvas {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateX(0);
  transition: 0.3s ease all;
}
```

### Menu

Nosso menu inicialmente precisa estar do lado de fora do wrapper e para isso terá um valor negativo de X. As outras propriedades são somente para dar um pouco de estilo ao mesmo.

```css
.menu {
  height: 100%;
  position: absolute;
  transform: translateX(-300px);
  width: 300px;
  background: #bf0000;
  padding: 5rem;
}
```

### Animação

Depois de feitas essas adições de CSS, nosso menu já se encontra do lado de fora escondido, nosso canvas já está aparecendo, mas e como será o efeito para tudo funcionar? Simples, precisamos mover o nosso canvas para o lado direito, no tamanho exato que o menu foi deslocado, ou seja `300px`.

```css
.wrapper.show-menu .canvas {
  transform: translateX(300px);
}
```

## Javascript

Para funcionar o menu, só falta criarmos alguma trigger que será responsável por adicionar e remover a classe `.show-menu` do nosso `wrapper`. Podemos fazer isso usando Javascript puro, jQuery ou podemos até fazer sem o uso de classes e sim esquema de `:checked` de inputs e aí nem usar JS, enfim, fica a seu critério. Aqui segue um exemplo bem simples com JS Puro.

```js
// elementos auxiliares
var toogleMenu = document.querySelectorAll('.toggle-menu'),
  wrapper = document.querySelector('.wrapper')

// criando evento de click para abrir o menu
for (var i = 0; i < toogleMenu.length; i++) {
  toogleMenu[i].addEventListener('click', menuAction)
}

// função auxiliar que abre e fecha o menu
function menuAction() {
  if (wrapper.classList.contains('show-menu')) {
    wrapper.classList.remove('show-menu')
  } else {
    wrapper.classList.add('show-menu')
  }
}
```

O código acima usa o `classList` para verificar se já existe a classe e adicionar ou então remover, fazendo assim a animação funcionar.

E o resultado fica assim:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RWJmoB" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/RWJmoB">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Melhorias

### Performance com uso da GPU

Um truque bem famoso que podemos usar para otimizar a animação é forçar o uso da aceleração via hardware do computador, definindo as transições em `3D`. A mudança pode ser bem pequena e quase imperceptível para a maioria das máquinas, mas já é um ganho, no caso, faríamos assim, substituimos o `translateX()` pelo `translate3d()`.

```css
/* Antes */
.canvas {
  transform: translateX(0);
}
.show-menu .canvas {
  transform: translateX(300px);
}

/* Novo */
.canvas {
  transform: translate3d(0);
}
.show-menu .canvas {
  transform: translate3d(300px, 0, 0);
}
```

### Fechar o menu com a tecla ESC

Uma coisa que já é quase intuitivo é fechar as coisas usando a tecla `ESC`, então por que não criar um evento para isso no nosso menu? Em Javascript Puro ficaria assim

```js
// Adicionando evento para fechar o menu ao pressionar a tecla ESC
document.addEventListener('keyup', function (e) {
  if (e.keyCode == 27) {
    if (wrapper.classList.contains('show-menu')) {
      menuAction()
    }
  }
})
```

## Conclusão

É basicamente isso pessoal, existem várias coisas que vocês podem brincar, como tipos diferentes de animação e velocidades de transição. Também podem brincar com novas posições, com menus vindo de cima, da direita, enfim...
Quem fizer uma brincadeira nova, posta aí nos comentários.
