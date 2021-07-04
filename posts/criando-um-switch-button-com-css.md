---
layout: post
title: 'Criando um switch button com CSS'
date: 2015-12-06 20:42:25
image: '/assets/img/on-off/on-off-ios.jpg'
description: 'Aprenda a criar os famosos botões deslizantes de on/off usados no iOS, Android e WebApps.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - tutorial
categories:
twitter_text: 'Aprenda a criar os famosos botões de on/off usados no iOS, Android e WebApps.'
introduction: 'Aprenda a criar os famosos botões deslizantes de on/off usados no iOS, Android e WebApps. E deixe a usabilidade do seu sistema melhor.'
---

## Introdução

Fala pessoal, para não deixar a peteca cair, resolvi escrever hoje também! Para me animar enquanto escrevo, estou uma playlist perfeita para a época, [Best of Star Wars](https://open.spotify.com/playlist/37i9dQZF1DXaUaRhCgtpCo?si=hA6xkhVFTGW0Tv8ekL817w) <3

O post de hoje será bem simples, mas que eu precisei fazer há pouco tempo para um freela e achei que pudesse ser útil para mais pessoas, pois além de ser uma paradinha útil, também ajuda a entender mais conceitos de css e seletores.

## Botão de On/Off

![Vários botões de on/off do iphone](/assets/img/on-off/on-off-ios.jpg)

Muitas vezes, precisamos responder alguma pergunta com `Sim` ou `Não` ou ligar e desligar alguma coisa. E na web, acabamos utilizando `checkbox` ou `radio` inputs. Mas acaba que eles não tem nenhum apelo visual e nem uma usabilidade tão boa. Pensando nisso, foram desenvolvidos esses tipos de botões, que são constantemente utilizados no iphone e android, possuem um visual mais bonito e são bem mais indicativos, facilitando até mesmo o uso. Pensando nisso, por que não utilizar nos nossos webapps também?

## Organizando o Markup

Primeiro de tudo, como vamos trabalhar com um `checkbox`, nada mais justo que criar um né?

```html
<div class="switch__container">
  <input id="switch-shadow" class="switch switch--shadow" type="checkbox" />
  <label for="switch-shadow"></label>
</div>
```

A classe `switch__container` por fora vai servir só para se você quiser dar algum espaçamento e organizar melhor a combinação input + label. Por dentro, vamos criar um `input` e um `label` ligados, para isso, utilizamos o `id="switch-shadow"` e o `for="switch-shadow"`. Precisamos que a label tenha o `for` para o input, pois esse será o truque mais importante.

## Criando a base do CSS

Depois de criada a base, veremos simples inputs de checkbox, aqueles quadradinhos sem graça e bobos. Para não ficar assim, precisamos adicionar um css básico, para esconder esse checkbox feio e também já deixar preparada a "interface do clique".

**Atenção, todo o css usado aqui, foi sem prefixos, por favor, se desejar maior compatibilidade, use os prefixos, de preferência use um pre-processador para isso =)**

```css
.switch {
  position: absolute;
  margin-left: -9999px;
  visibility: hidden;
}

.switch + label {
  display: block;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
}
```

Usamos aqui o seletor `+`, conhecido como adjacente, que pega o primeiro elemento após o primeiro seletor. Se quiser ver mais sobre esse seletor, veja [esse meu post sobre alguns seletores css](https://willianjusten.com.br/alguns-seletores-css-importantes-para-aprender/).

As linhas `1-5` servem somente para esconder o checkbox feio e jogá-lo para fora da tela, garantindo assim, que ele não seja clicável. Enquanto as linhas `5-13` serão responsáveis por deixar o elemento ali "clicável" usando a propriedade `cursor: pointer`, também remove a opção de selecionar a label com o `user-select: none` e deixa ele como um elemento de bloco, para que possamos botar tamanho e estilo.

## Definindo o estilo iOS

![botão estilo iOS](/assets/img/on-off/switch-button.gif)

Aqui, nossa `label` será o elemento principal para criação do desenho. Primeiro, vamos definir um tamanho para ela, uma cor e também esse aspecto arredondado.

```css
.switch--shadow + label {
  padding: 2px;
  width: 120px;
  height: 60px;
  background-color: #dddddd;
  border-radius: 60px;
}
```

Com esse primeiro passo, teremos nada mais que um retângulo com as bordas completamente arredondadas, num fundo cinza.

Depois, na própria label, iremos utilizar o seletor `:before`, que vai ser responsável por fazer a transição entre o cinza e o fundo verde. E vamos usar o seletor `:after` para criar a bolinha, que irá de um lado para o outro.

```css
.switch--shadow + label:before,
.switch--shadow + label:after {
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  content: '';
}
.switch--shadow + label:before {
  right: 1px;
  background-color: #f1f1f1;
  border-radius: 60px;
  transition: all 0.4s;
}
.switch--shadow + label:after {
  width: 62px;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.4s;
}
```

As primeiras propriedades que são em conjunto para o `:before` e para o `:after`, servem para definir conteúdo para os mesmos, para que assim, possamos manipular.

Preste atenção, que eu coloco `transition: all 0.4s` para o before e o after, para que ocorra a transição suave, entre o estado de ON para o estado de OFF e vice-versa.

Com esses estilos, nós já temos o nosso botão prontinho, só falta criar a interação.

## Criando interação com clique no CSS

Esse é um truque bem legal e que serve para muitas coisas, existe um seletor no css, chamado `:checked`, que verifica se o input foi marcado ou não. Com isso em mãos, podemos fazer a seguinte regra:

```css
.switch--shadow:checked + label:before {
  background-color: #8ce196;
}
.switch--shadow:checked + label:after {
  transform: translateX(60px);
}
```

Verificando se o input foi marcado e caso tenha sido, mudar a cor e também mover a bolinha para o lado. E pronto! Seu switch botão no estilo iOS está criado! Se quiser, você pode brincar com o CSS e fazer outros estilos, como um flat ou qualquer outro. Segue abaixo uma Demo do que fizemos:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jWOgVM" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/jWOgVM">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Atualização

Meu amigo [Davidson](https://twitter.com/davidsonFellipe) lá de NY resolveu dar uma de flanelinha de layout =p
Brincadeiras a parte, ele fez umas edições para que o visual ficasse um pouco mais realista e condizente com o iOS. A mudança foi basicamente no tamanho da bolinha, que estava erroneamente com `width:58px`, se quiser, dá uma olhadinha na [pen original](http://codepen.io/fellipe/pen/adzmPR) dele também.

## Conclusão

Bom, mais um post bem rapidinho, mas que espero que tenha gostado. Se gostaram, não deixe de compartilhar e também fazer outros estilos e comentar aqui embaixo. Até a próxima o/
