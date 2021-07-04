---
layout: post
title: 'Criando botao animado com CSS e SVG'
date: 2017-08-14 18:14:48
image: '/assets/img/loader-button/main.png'
description: 'Aprenda a criar uma interação mais bonita para os botões de sua aplicação.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - svg
  - frontend
categories:
twitter_text: 'Aprenda a criar uma interação mais bonita para os botões de sua aplicação.'
introduction: 'Aprenda a criar uma interação mais bonita para os botões de sua aplicação.'
---

## Introdução

Faaala pessoal, tentando manter a promessa de sempre ter um post por semana, lá vamos nós para mais um post. Eu achei esse botão lá no meu codepen e acho que é interessante de ensinar, é extremamente simples, mas bem legalzinho.

Neste post iremos utilizar animações com o famoso [Keyframes do CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Animations/Usando_anima%C3%A7%C3%B5es_CSS) e o efeitinho de [desenhar em SVG](https://willianjusten.com.br/efeito-de-desenhar-com-svg/) que usa `stroke-dashoffset` e `stroke-dasharray`.

Enquanto vou escrevendo esse post, eu vou ouvindo a trilha sonora de [Hellblade Senua's Sacrifice](https://willianjusten.com.br/efeito-de-desenhar-com-svg/), na minha opinião um dos melhores jogos do ano, a trilha sonora mistura sons nórdicos e celtas, vale bastante a pena ouvir e também vale procurar por esse jogo =)

## Criando o botão

Para quem gosta de ver o exemplo já funcionando antes, já vou deixando aqui embaixo a demo do Codepen.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RaYvrr" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/RaYvrr">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

A ideia desse botão é basicamente para processos em que nós enviamos uma chamada para alguma API e esperamos um resultado para jogar um feedback para o usuário. No exemplo, eu vou colocar só o feedback de `success`, mas vocês estão mais do que livres de criar o `error`, `warning` e o que mais desejarem.

Vamos as etapas:

### Antes do Envio

O primeiro de tudo é criar nosso botão limpo, ou seja, o estado `antes do envio`. Que vai ter o seguinte html e css:

```html
<button id="send" class="send">Send</button>
```

Já estou adicionando o `id` pois ele será utilizado futuramente em nosso Javascript. E a classe será para adicionarmos os estilos, que serão:

```css
.send {
  background: none;
  color: white;
  border: 1px solid #45981b;
  border-radius: 70px;
  cursor: pointer;
  font-size: 20px;
  outline: none;
  padding: 15px 70px;
}
```

Com isso, vamos ter nosso botão hiper mega simples na tela. Se você estiver partindo do zero, lembre-se de adicionar um `background` no body e alinhamentos/resets se desejar. Adicionei os seguintes detalhes:

```css
* {
  margin: 0;
  padding: 0;
}

body {
  align-items: center;
  background: #333;
  display: flex;
  height: 100vh;
  justify-content: center;
}
```

### Estado de Loading

Para o estado de loading, queremos fazer um efeito do botão diminuindo para ficar do tamanho de uma bola e criar um efeito como se estivesse "pulsando". E para isso farei o seguinte, irei encapsular o texto de send num `spam`, que assim posso adicionar um `display: none` nesse estado de loading. Outra coisa que irei fazer é diminuir o padding desse botão, transformando ele num círculo e vou utilizar o `transition` para que está mudança de tamanho seja suave.

```html
<button id="send" class="send">
  <span>Send</span>
</button>
```

Acima é o nosso html e assim vai ficar o nosso css, utilizando uma classe `.is-loading` para indicar que está carregando/enviando o dado.

```css
.send {
  // outras propriedades
  transition: padding 500ms ease-in-out;
}

.send.is-loading {
  padding: 15px 17px;
}

.is-loading span {
  display: none;
}
```

### Adicionando a trigger

Como aqui já temos dois estados o `normal` e o `is-loading` eu vou adicionar já uma trigger para que quando eu clique no botão, ele adicione a classe `is-loading`, assim já vamos conseguir ser capazes de ver a mudança do botão para o círculo.

Para isso é bem simples, vou buscar o elemento e usar o `addEventListener` para verificar o `click` e usarei o `classList.add` para adicionar a nossa classe, ficando assim:

```js
const btn = document.getElementById('send')

btn.addEventListener('click', () => {
  btn.classList.add('is-loading')
})
```

Feito isso, já podemos clicar no botão e veremos a animação simples de diminuir. Agora vamos fazer o pulse!

### Criando o efeito de Pulse

Para fazer esse efeito, iremos utilizar o `animation` com o `keyframes`. Precisamos aumentar/diminuir o botão e para isso vamos usar o `scale` e o efeito da sombra expandida será feita com o `box-shadow`, o conjunto pronto então será:

```css
.send {
  // outras propriedades
  box-shadow: 0 0 0 0 rgba(69, 152, 27, 0.5);
}

.send.is-loading {
  // outras propriedades
  animation: pulse 1.5s infinite;
}

// nossa animacao
@keyframes pulse {
  0% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 50px rgba(69, 152, 27, 0);
  }
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(69, 152, 27, 0);
  }
}
```

Eu adicionei no estado `0%` que é o `.send` puro um `box-shadow` sem mover nenhuma posição da cor verde e eu então criei 3 diferentes etapas na nossa animação. No primeiro momento, que é o `0%`, eu diminuo a bolinha. Depois um pouco mais da metade da animação, em `70%`, eu volto ao tamanho normal e crio a expansão do `box-shadow` mudando o `blur` (que é a última propriedade do box-shadow) para `50px` e por fim, aos `100%` eu volto o blur para zero e diminuo o botão. Isso com a opção de `infinite` na animação, faz com que o botão fique aumentando/diminuindo com a sombra até que eu remova essa classe.

### Criando trigger para o Success

Como aqui é só exemplo, para que a gente possa simular um `success` vamos utilizar o `setTimeout` que vai adicionar a classe `is-success` e remover a `is-loading` depois de um tempo. Ficando assim:

```js
const btn = document.getElementById('send')

btn.addEventListener('click', () => {
  btn.classList.add('is-loading')

  // fake API call
  setTimeout(() => {
    btn.classList.add('is-success')
    btn.classList.remove('is-loading')
  }, 4000)
})
```

Reparem que com esse código, ao final de `4s` ou `4000ms`, o botão vai voltar ao estado inicial, pois estaremos removendo a classe `is-loading` e ainda não temos estilos para o `is-sucess`, vamos fazê-lo então.

### Criando o estado de Success

Para finalizar nosso botão, a classe `is-success` vai mudar o `background` para ter a cor sólida e vai permanecer também no mesmo formato de círculo que o `is-loading`, para isso vamos adicionar o `background` dentro da `transition` do nosso botão e adicionar os estilos do `is-success` ficando assim:

```css
.send {
  // outras propriedades
  transition: background, padding 500ms ease-in-out;
}

.send.is-success {
  background: #45981b;
  padding: 15px 17px;
}

.is-success span {
  display: none;
}
```

Depois disso, vamos fazer o pequeno detalhe do sinal de ok/certo com SVG, para isso vamos adicionar o seguinte SVG dentro do nosso botão.

```html
<button id="send" class="send">
  <svg viewBox="0 0 90.594 59.714">
    <polyline
      class="check"
      fill="none"
      stroke="#FFFFFF"
      stroke-width="10"
      stroke-miterlimit="10"
      points="1.768,23.532 34.415,56.179 88.826,1.768"
    />
  </svg>
  <span>Send</span>
</button>
```

E vamos fazer também uma edição no CSS para ele sumir/aparecer com o `is-sucess`.

```css
svg {
  width: 0;
  height: 0;
}

.is-success svg {
  height: 30px;
  width: 30px;
}
```

Agora está faltando só fazer o efeito de desenhar, para isso, já temos uma classe `check` lá no nosso SVG, para que possamos fazer essa animação, que vai ser baseada em `stroke-dashoffset` e `stroke-dasharray`, que você pode ler [melhor sobre aqui](https://willianjusten.com.br/efeito-de-desenhar-com-svg/). O CSS dessa parte ficará:

```css
.check {
  stroke-dasharray: 130px 130px;
  stroke-dashoffset: 130px;
  transition: stroke-dashoffset 500ms ease-in-out;
}

.is-success .check {
  stroke-dashoffset: 0px;
}
```

Reparem que inicialmente eu to movendo o meu desenho todo para fora de visão e no `.is-success .check` eu retorno para o zero, através de uma `transition`, criando o efeito final que queríamos, que é o símbolo ser desenhado na tela. Segue então nosso resultado final:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RaYvrr" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/RaYvrr">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Conclusão

Bom pessoal, foi um post bem simples, mas que pega alguns conceitos bacaninhas para criar um pequeno detalhe na interface, mas que faz a diferença. Espero que tenham gostado do post e estejam a vontade para criar edições do botão e mandar nos comentários =)
